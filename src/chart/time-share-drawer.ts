import uniq from 'lodash.uniq'
import { Chart, autoResetStyle, Drawer, YAxisDetail } from "./chart"
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { area } from 'd3-shape'
import { min, max } from 'd3-array';
import { scaleLinear } from 'd3-scale'
import { drawLine, drawYAxis, drawXAxis } from "../paint-utils/index";
import { Rect, Point } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";
import { divide } from "../algorithm/divide";
import { formateDate } from "../algorithm/date";
import { TITLE_HEIGHT, X_AXIS_HEIGHT } from '../constants/constants';

const TIME_SHARE_THEME = {
  price: '#4B99FB',
  rise: '#F55559',
  fall: '#7DCE8D',
  same: '#7DCE8D',
  linearGradient: [
    'rgba(75, 153, 251, 0.4)',
    'rgba(75, 153, 251, 0)'
  ],
  avg: '#F89D37',
  titleBackground: '#F2F4F4',
  gridLine: '#E7EAEB'
}

export interface TimeShareData {
  price: number;
  avg: number;
  time: number;
}

export class TimeShareDrawer extends Drawer {
  titleDrawer: ChartTitle
  protected data: TimeShareData[]
  constructor(chart: Chart, data: TimeShareData[] = []) {
    super(chart, data)
    this.context = chart.context
    this.titleDrawer = new ChartTitle(
      this.context,
      null, [
        {
          x: 5 * this.chart.options.resolution,
          label: '分时走势',
          color: TIME_SHARE_THEME.price
        },
        {
          x: 50 + 5 * this.chart.options.resolution,
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
  public drawFrontSight() {
    const { context: ctx, yScale, data } = this
    const { xScale } = this.chart
    const selectedIndex = this.selectedIndex
    const x = xScale(selectedIndex)
    const size = 5 * this.chart.options.resolution
    ctx.beginPath()
    ctx.arc(x, yScale(data[selectedIndex].price), size, 0, Math.PI * 2)
    ctx.fillStyle = TIME_SHARE_THEME.price
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x, yScale(data[selectedIndex].avg), size, 0, Math.PI * 2)
    ctx.fillStyle = TIME_SHARE_THEME.avg
    ctx.fill()
  }
  public resize(frame: Rect) {
    super.resize(frame)
    this.resetYScale()
  }
  public getYAxisDetail(y: number): YAxisDetail {
    const value = this.yScale.invert(y)
    return {
      left: value.toFixed(2),
      right: this.deltaInPercentage(value)
    }
  }
  protected drawYAxis() {
    const lastPrice = this.chart.options.lastPrice
    const tickValues = divide(this.bottomValue(), this.topValue()).map(n => ({
        value: n,
        color: n > lastPrice ? TIME_SHARE_THEME.rise : TIME_SHARE_THEME.fall
    }));
    drawYAxis(
      this.context,
      tickValues,
      this.frame,
      this.yScale,
      this.chart.options.resolution,
      true,
      TIME_SHARE_THEME.gridLine,
    )
    drawYAxis(
      this.context,
      tickValues,
      this.frame,
      this.yScale,
      this.chart.options.resolution,
      false,
      TIME_SHARE_THEME.gridLine,
      (v) => this.deltaInPercentage(v),
      'right'
    )
  }
  protected deltaInPercentage(value: number): string {
    const lastPrice = this.chart.options.lastPrice
    return `${((value - lastPrice) / lastPrice * 100).toFixed(2)}%`
  }
  protected drawXAxis() {
    let tickValues = uniq(divide(0, this.chart.options.count - 1, 5)
      .map(t => Math.floor(t)))
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
        const data = this.data[t]
        if (data) {
          d.setTime(data.time * 60 * 1000)
          return formateDate(d, 'HH:mm')
        } else {
          return ''
        }
      }
    )
  }
  protected drawAxes() {
    this.drawXAxis()
    this.drawYAxis()
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
}