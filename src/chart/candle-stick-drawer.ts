import { Chart, autoResetStyle, Drawer } from "./chart"
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { area } from 'd3-shape'
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale'
import { drawLine, drawYAxis, drawXAxis } from "../paint-utils/index";
import { Rect } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";
import { divide } from "../agorithm/divide";
import { formateDate } from "../agorithm/date";

const THEME = {
  rise: '#F55559',
  fall: '#7DCE8D',
  same: '#333',
  titleBackground: '#F2F4F4',
  title: '#333',
  gridLine: '#E7EAEB'
}

const PADDING = {
  top: 25,
  bottom: 25,
};

export interface CandleStickData {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export class CandleStickDrawer implements Drawer {
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect = { x: 0, y: 0, width: 0, height: 0}
  chartFrame: Rect = { x: 0, y: 0, width: 0, height: 0}
  titleDrawer: ChartTitle
  minValue = 0
  maxValue = 0
  private data: CandleStickData[]
  constructor(public chart: Chart, data: CandleStickData[] = []) {
    this.context = chart.context
    this.titleDrawer = new ChartTitle(
      this.context,
      'MA', [
      ],
      THEME.titleBackground,
      THEME.title,
      this.chart.options.resolution
    );
    this.setData(data)
  }
  public setData(data: CandleStickData[]) {
    this.data = data;
    this.minValue = min(data.map(d => d.low))
    this.maxValue = max(data.map(d => d.high))
    this.resetYScale()
  }
  get titleHeight() {
    return PADDING.top * this.chart.options.resolution
  }
  get xAxisTickHeight() {
    return PADDING.bottom * this.chart.options.resolution
  }
  protected drawYAxis() {
    drawYAxis(
      this.context,
      divide(this.bottomValue(), this.topValue()).map(n => ({ value: n })),
      this.frame,
      this.yScale,
      this.chart.options.resolution,
      true,
      THEME.gridLine,
    )
  }
  protected drawXAxis() {
    const tickValues = divide(0, this.chart.options.count, 5)
    tickValues.pop()
    drawXAxis(
      this.context,
      tickValues,
      this.chartFrame,
      this.chart.xScale,
      this.chart.options.resolution,
      true,
      THEME.gridLine,
      (t, i) => {
        const d = new Date(this.data[i].time)
        return formateDate(d, 'yyyy/MM/dd')
      }
    )
  }
  public drawAxes() {
    this.drawXAxis()
    this.drawYAxis()
  }
  resize(frame: Rect) {
    this.frame = frame;
    this.chartFrame = {
      ...frame,
      y: frame.y + this.titleHeight,
      height: frame.height - this.titleHeight - this.xAxisTickHeight
    }
    this.resetYScale()
  }
  public draw(){
    const { frame } = this;
    this.drawAxes();
    this.titleDrawer.draw({
      ...frame,
      height: this.titleHeight
    })
    this.drawCandles()
  }
  @autoResetStyle()
  protected drawCandles() {
    const { frame } = this
    const { xScale } = this.chart
    const { context: ctx, yScale } = this
    
    this.data.forEach((d, i) => {
      const maxV = Math.max(d.close, d.open),
            minV = Math.min(d.close, d.open),
            y = yScale(maxV),
            height = Math.abs(yScale(d.close) - yScale(d.open)),
            width = xScale(1) - xScale(0) - 2,
            x = xScale(i) - width / 2
      if (d.close > d.open) {
        ctx.fillStyle = ctx.strokeStyle = THEME.rise
        ctx.strokeRect(x, y, width, height)
      } else if (d.close < d.open) {
        ctx.fillStyle= ctx.strokeStyle =  THEME.fall
        ctx.fillRect(x, y, width, height)
      } else {
        ctx.fillStyle = ctx.strokeStyle =  THEME.same
        ctx.fillRect(x, y, width, 1)
      }
      ctx.fillRect(x + width / 2, yScale(d.high), 1, yScale(maxV) - yScale(d.high))
      ctx.fillRect(x + width / 2, yScale(minV), 1, yScale(d.low) - yScale(minV))
    })
  }
  // @autoResetStyle()
  // protected drawLine(data: number[], color = 'black') {
  //   const { yScale, context: ctx } = this
  //   const { xScale } = this.chart
  //   drawLine(
  //     ctx,
  //     data.map((item, i) => ({
  //       x: xScale(i),
  //       y: yScale(item),
  //     })),
  //     color
  //   )
  // }
  topValue = ((lastMaxValue = 0, lastTopValue = Number.MIN_SAFE_INTEGER) => 
    () => {
      const top = this.maxValue * (1.01)
      if (top > lastTopValue) {
        lastTopValue = top
      }
      return lastTopValue
    }
  )()
  bottomValue = ((lastMinValue = 0, lastBottomValue = Number.MAX_SAFE_INTEGER) => 
    () => {
      const bottom = this.minValue * (0.99)
      if (bottom < lastBottomValue) {
        lastBottomValue = bottom
      }
      return lastBottomValue
    }
  )()
  protected resetYScale() {
    const { chartFrame } = this;
    const resolution = this.chart.options.resolution
    this.yScale = scaleLinear()
      .domain([this.bottomValue(), this.topValue()])
      .range([chartFrame.y + chartFrame.height, chartFrame.y + 15 * resolution])
  }
}