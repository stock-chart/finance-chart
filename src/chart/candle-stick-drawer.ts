import uniq from 'lodash.uniq'
import { Chart, autoResetStyle, Drawer, YAxisDetail } from "./chart"
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { area } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { drawLine, drawYAxis, drawXAxis } from '../paint-utils/index'
import { Rect } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";
import { divide } from "../algorithm/divide";
import { formateDate } from "../algorithm/date";
import { trimNulls } from "../algorithm/arrays";
import { TITLE_HEIGHT, X_AXIS_HEIGHT } from '../constants/constants';
import { Point } from '../graphic/primitive';

const THEME = {
  rise: '#F55559',
  fall: '#7DCE8D',
  same: '#7DCE8D',
  titleBackground: '#F2F4F4',
  title: '#5E667F',
  gridLine: '#E7EAEB'
}

export interface CandleStickData {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
  [key: string]: number|string
}

export interface MAIndicator {
  key: string;
  color: string;
}

export class CandleStickDrawer extends Drawer {
  static MAIndicators: MAIndicator[] = []

  titleDrawer: ChartTitle
  protected data: CandleStickData[] = []
  constructor(chart: Chart, data: CandleStickData[] = []) {
    super(chart, data)
    this.context = chart.context
    this.titleDrawer = new ChartTitle(
      this.context,
      'MA', this.MAIndicators.map(({key, color}, i) => ({
        x: i * 80 + 60,
        label: `${key.toUpperCase()}: 0`,
        color
      })),
      THEME.titleBackground,
      THEME.title,
      this.chart.options.resolution
    );
    this.setData(data)
  }
  public setData(data: CandleStickData[]) {
    this.data = data;
    const keys = this.MAIndicators.map(d => d.key)
    keys.push('low', 'high')
    let minV = Number.MAX_VALUE
    let maxV = Number.MIN_VALUE
    for (let i = 0, lenI = data.length; i < lenI; ++i) {
      keys.forEach((key) => {
        const v = data[i][key] as number
        // ma data may be null, ignore it
        if (v === null) return
        if (v < minV) {
          minV = v
        } else if (v > maxV) {
          maxV = v
        }
      })
    }
    this.minValue = minV
    this.maxValue = maxV
    this.resetYScale()
  }
  public resize(frame: Rect) {
    super.resize(frame)
    this.resetYScale()
  }
  public draw(){
    const { data } = this
    if (data && data.length > 0){
      const { frame } = this;
      this.drawTitle(this.selectedIndex || this.data.length - 1)
      this.drawAxes();
      this.drawCandles()
      this.drawMA()
    }
  }
  public getYAxisDetail(y: number): YAxisDetail {
    return {
      left: this.yScale.invert(y).toFixed(2)
    }
  }
  get MAIndicators() {
    return Object.getPrototypeOf(this).constructor.MAIndicators as MAIndicator[]
  }
  private drawTitle(i: number) {
    const { context: ctx, frame } = this
    const d = this.data[i]
    this.MAIndicators.forEach(({ key }, i) => {
      const m = ((d[key] as number) || 0).toFixed(2)
      this.titleDrawer.setLabel(i, `${key.toUpperCase()}: ${m}`)
    })
    ctx.clearRect(0, frame.y, frame.width, this.titleHeight)
    this.titleDrawer.draw({
      ...this.frame,
      height: this.titleHeight
    })
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
    let tickValues = uniq(divide(0, this.chart.options.count - 1, 5)
      .map(t => Math.floor(t)))
    drawXAxis(
      this.context,
      tickValues,
      this.chartFrame,
      this.chart.xScale,
      this.chart.options.resolution,
      true,
      THEME.gridLine,
      (t: number) => {
        const d = this.data[t]
        if (d) {
          return formateDate(d.time, 'yyyy/MM/dd')
        }
        return ''
      }
    )
  }
  protected drawAxes() {
    this.drawXAxis()
    this.drawYAxis()
  }
  protected drawMA() {
    const { data, yScale } = this
    const { xScale } = this.chart
    this.MAIndicators.forEach(({key, color}) => {
      const trimed = trimNulls(data.map(d => d[key] as number))
      drawLine(
        this.context,
        trimed.result.map((d, i) => ({
          x: xScale(i + trimed.deleted),
          y: yScale(d)
        })),
        color
      )
    })
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
            height = Math.abs(yScale(d.close) - yScale(d.open))
      let width = xScale(1) - xScale(0)
      width -= width * 0.2
      const x = xScale(i) - width / 2
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
}