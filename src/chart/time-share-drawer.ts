import { Chart, autoResetStyle, Drawer } from "./chart"
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { area } from 'd3-shape'
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale'
import { drawLine, drawYAxis } from "../paint-utils/index";
import { Rect } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";
import { divide } from "../agorithm/divide";

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
  top: 25
};

export interface TimeShareData {
  price: number;
  avg: number;
}

export class TimeShareDrawer implements Drawer {
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect
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
    this.minValue = min<TimeShareData, number>(data, d => d.price)
    this.maxValue = max<TimeShareData, number>(data, d => d.price)
  }
  protected drawXAxis(rect: Rect) {
    throw 'Not Implemented'
  }
  protected drawYAxis() {
    drawYAxis(
      this.context,
      divide(this.bottomValue, this.topValue),
      this.frame,
      this.yScale,
      this.chart.options.resolution,
      true,
      TIME_SHARE_THEME.gridLine,
    )
  }
  public drawAxes() {
    this.drawYAxis();
  }
  resize(frame: Rect) {
    this.frame = frame;
    this.resetYScale()
  }
  public draw(){
    const { frame } = this;
    this.titleDrawer.draw({
      ...frame,
      height: PADDING.top * this.chart.options.resolution
    })
    this.drawTimeShare()
  }
  @autoResetStyle()
  protected drawTimeShare() {
    const { frame } = this
    const { xScale } = this.chart
    const { context: ctx, yScale } = this

    this.drawAxes();

    const drawArea = area<TimeShareData>()
      .x((d, i) => xScale(i))
      .y0(d => yScale(d.price))
      .y1(frame.height)
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
  get topValue() {
    const flexible = 0.01
    return this.maxValue * (1 + flexible)
  }
  get bottomValue() {
    const flexible = 0.01
    return this.minValue * (1 - flexible)
  }
  protected resetYScale() {
    const { frame } = this;
    const firstData = this.data[0]
    if (firstData) {
      this.yScale = scaleLinear()
        .domain([this.bottomValue, this.topValue])
        .range([frame.y + frame.height, frame.y + (PADDING.top + 5) * this.chart.options.resolution])
    }
  }
}