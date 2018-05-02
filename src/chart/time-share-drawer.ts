import { MainDrawer, Chart, autoResetStyle } from "./chart"
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { area } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { drawLine } from "../paint-utils/index";
import { Rect } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";

const TIME_SHARE_THEME = {
  price: '#4B99FB',
  linearGradient: [
    'rgba(75, 153, 251, 0.4)',
    'rgba(75, 153, 251, 0)'
  ],
  avg: '#F89D37',
  titleBackground: '#F2F4F4'
}

const PADDING = {
  top: 25
};

export interface TimeShareData {
  price: number;
  avg: number;
}

export class TimeShareDrawer implements MainDrawer {
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect
  titleDrawer: ChartTitle
  constructor(public chart: Chart, public data: TimeShareData[] = []) {
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
  }
  public drawXAxis(rect: Rect): void {
    throw 'Not Implemented'
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
    const { frame } = this;
    const { xScale } = this.chart
    const { context: ctx, yScale } = this

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
  protected resetYScale() {
    const { frame } = this;
    const firstData = this.data[0]
    if (firstData) {
      const flexible = 0.03
      this.yScale = scaleLinear()
        .domain([firstData.price * (1 - flexible), firstData.price * (1 + flexible)])
        .range([frame.y + frame.height, frame.y + PADDING.top * this.chart.options.resolution])
    }
  }
}