import uniq from 'lodash.uniq'
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

const TIME_SHARE_THEME = {
  price: '#4B99FB',
  linearGradient: [
    'rgba(75, 153, 251, 0.4)',
    'rgba(75, 153, 251, 0)'
  ],
  avg: '#F89D37',
  titleBackground: '#F2F4F4',
  gridLine: '#E7EAEB'
}

const PADDING = {
  top: 25,
  bottom: 25,
};

export interface TimeShareData {
  price: number;
  avg: number;
  time: number;
}

export class TimeShareDrawer implements Drawer {
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect = { x: 0, y: 0, width: 0, height: 0}
  chartFrame: Rect = { x: 0, y: 0, width: 0, height: 0}
  titleDrawer: ChartTitle
  minValue = 0
  maxValue = 0
  private data: TimeShareData[]
  constructor(public chart: Chart, data: TimeShareData[] = []) {
    this.context = chart.context
    this.titleDrawer = new ChartTitle(
      this.context,
      null, [
        {
          x: 0,
          label: '分时走势',
          color: TIME_SHARE_THEME.price
        },
        {
          x: 50,
          label: '均线',
          color: TIME_SHARE_THEME.avg
        }
      ],
      TIME_SHARE_THEME.titleBackground,
      'white',
      this.chart.options.resolution
    );
    this.setData(data)
  }
  public setData(data: TimeShareData[]) {
    this.data = data;
    const merge = [...data.map(d => d.price), ...data.map(d => d.avg)]
    this.minValue = min(merge)
    this.maxValue = max(merge)
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
      TIME_SHARE_THEME.gridLine,
    )
  }
  protected drawXAxis() {
    let tickValues = uniq(divide(0, this.data.length -1, 5)
      .map(t => Math.floor(t)))
    tickValues.pop()
    drawXAxis(
      this.context,
      tickValues,
      this.chartFrame,
      this.chart.xScale,
      this.chart.options.resolution,
      true,
      TIME_SHARE_THEME.gridLine,
      (t, i) => {
        const d = new Date()
        d.setTime(this.data[i].time * 60 * 1000)
        return formateDate(d, 'HH:mm')
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
    if (this.data && this.data.length > 0) {
      const { frame } = this;
      this.drawAxes();
      this.titleDrawer.draw({
        ...frame,
        height: this.titleHeight
      })
      this.drawTimeShare()
    }
  }
  @autoResetStyle()
  protected drawTimeShare() {
    const { frame } = this
    const { xScale } = this.chart
    const { context: ctx, yScale } = this
    const drawArea = area<TimeShareData>()
      .x((d, i) => xScale(i))
      .y0(d => yScale(d.price))
      .y1(frame.height - this.xAxisTickHeight)
      .context(ctx)
    ctx.beginPath()
    drawArea(this.data)
    const linearGradient = ctx.createLinearGradient(0, 0, 0, frame.height)
    TIME_SHARE_THEME.linearGradient.forEach((color, i) =>
      linearGradient.addColorStop(i, color))
    ctx.fillStyle = linearGradient
    ctx.fill()
    this.drawLine('price', TIME_SHARE_THEME.price)
    this.drawLine('avg', TIME_SHARE_THEME.avg)
  }
  @autoResetStyle()
  protected drawLine(key: keyof TimeShareData, color = 'black') {
    const { yScale, context: ctx } = this
    const { xScale } = this.chart
    drawLine(
      ctx,
      this.data.map((item, i) => ({
        x: xScale(i),
        y: yScale(item[key]),
      })),
      color
    )
  }
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