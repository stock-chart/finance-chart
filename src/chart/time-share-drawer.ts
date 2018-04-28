import { MainDrawer, Rect, Chart, autoResetStyle } from "./chart"
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { area, line } from 'd3-shape'
import { scaleLinear } from 'd3-scale'

export class TimeShareDrawer implements MainDrawer {
  context: CanvasRenderingContext2D
  yExtent: ScaleLinear<number, number>
  frame: Rect
  constructor(public chart: Chart, public data: number[] = []) {
    this.context = chart.context
  }
  public drawXAxis(rect: Rect): void {
    throw 'Not Implemented'
  }
  resize(frame: Rect) {
    this.frame = frame;
    this.resetYExtent()
  }
  public draw(){
    this.drawTimeShareLine()
    console.log('has drawed time share chart');
  }
  @autoResetStyle()
  protected drawTimeShareLine() {
    const { frame } = this;
    const { xExtent } = this.chart
    const { context: ctx, yExtent } = this
    const drawArea = area<number>()
      .x((d, i) => xExtent(i))
      .y0(d => yExtent(d))
      .y1(frame.height)
      .context(ctx)
    const drawLine = line<number>()
      .x((d, i) => xExtent(i))
      .y(d => yExtent(d))
      .context(ctx)
    ctx.beginPath()
    drawArea(this.data)
    const linearGradient = ctx.createLinearGradient(0, 0, 0, frame.height)
    linearGradient.addColorStop(0, 'rgba(75, 153, 251, 0.4)')
    linearGradient.addColorStop(1, 'rgba(75, 153, 251, 0)')
    ctx.fillStyle = linearGradient
    ctx.fill()
    ctx.beginPath()
    drawLine(this.data)
    ctx.strokeStyle = '#4B99FB'
    ctx.lineWidth = 1
    ctx.stroke()
  }
  protected resetYExtent() {
    const { frame } = this;
    const firstData = this.data[0]
    if (firstData) {
      const flexible = 0.03
      this.yExtent = scaleLinear()
        .domain([firstData * (1 - flexible), firstData * (1 + flexible)])
        .range([frame.y + frame.height, frame.y])
    }
  }
}