import uniq from 'lodash.uniq'
import { Drawer, Chart, autoResetStyle, FrontSightDetail } from "./chart";
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index";
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { Rect, Point } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";
import { drawYAxis, drawXAxis } from "../paint-utils/index";
import { divide } from "../algorithm/divide";
import { TITLE_HEIGHT } from '../constants/constants';

const VOLUME_THEME = {
  rise: '#F55559',
  fall: '#7DCE8D',
  volumeText: '#F78081',
  titleBackground: '#F2F4F4',
  title: '#333',
  gridLine: '#E7EAEB'
}


export interface VolumeData {
  volume: number
}

const volumeLabel = (v: number) => `VOL: ${v.toFixed(2)}`
/**
 * Volume chart drawer
 */
export class VolumeDrawer implements Drawer {
  static proportion = 100
  static unit = '手'
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect = { x: 0, y: 0, width: 0, height: 0}
  chartFrame: Rect = { x: 0, y: 0, width: 0, height: 0}
  titleDrawer: ChartTitle
  minValue = 0
  maxValue = 0
  data: VolumeData[]
  constructor(public chart: Chart, data: VolumeData[]) {
    this.context = chart.context
    this.titleDrawer = new ChartTitle(
      this.context,
      '成交量', [
        {
          x: 100,
          label: volumeLabel(0),
          color: VOLUME_THEME.volumeText
        }
      ],
      VOLUME_THEME.titleBackground,
      VOLUME_THEME.title,
      this.chart.options.resolution
    )
    this.setData(data)
  }
  public resize(frame: Rect): void {
    this.frame = frame
    this.chartFrame = {
      ...frame,
      y: frame.y + this.titleHeight,
      height: frame.height - this.titleHeight
    }
    this.resetYScale()
  }
  public draw(): void {
    const { frame, data } = this
    if (data.length === 0 ) return
    this.drawAxes()
    this.updateTitle(data.length - 1)
    this.drawVolumes()
  }
  public setData(data: VolumeData[]) {
    this.data = data
    this.minValue = min(data, d => d.volume)
    this.maxValue = max(data, d => d.volume)
    this.resetYScale()
  }
  public detailProvider(point: Point, selectedIndex: number): FrontSightDetail {
    this.updateTitle(selectedIndex)
    return {
      left: '',
      right: ''
    }
  }
  private updateTitle(i: number) {
    this.titleDrawer.setLabel(0, volumeLabel(this.data[i].volume))
    this.redrawTitle()
  }
  private redrawTitle() {
    const { context: ctx, frame } = this
    ctx.clearRect(0, frame.y, frame.width, this.titleHeight)
    this.titleDrawer.draw({
      ...this.frame,
      height: this.titleHeight
    })
  }
  get titleHeight() {
    return TITLE_HEIGHT * this.chart.options.resolution
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
      VOLUME_THEME.gridLine,
    )
  }
  protected drawAxes() {
    this.drawXAxis()
    this.drawYAxis()
  }
  protected drawYAxis() {
    const tickValues = uniq(divide(0, this.maxValue, 4)).map(n => ({ value: Math.round(n) }));
    const maxTickValue = parseInt(
      (max(tickValues, d => d.value) / VolumeDrawer.proportion).toString(),
      10
    ).toString()
    const useWUnit = maxTickValue.length > 4
    drawYAxis(
      this.context,
      tickValues,
      this.frame,
      this.yScale,
      this.chart.options.resolution,
      true,
      VOLUME_THEME.gridLine,
      (v, i) => {
        const scaledV = v / VolumeDrawer.proportion
        if (i === 0) {
          if (useWUnit) {
            return `万${VolumeDrawer.unit}`
          }
          return VolumeDrawer.unit
        }
        return useWUnit ? `${(scaledV / 10000 ).toFixed(2)}` : scaledV.toFixed(0)
      }
    )
  }
  @autoResetStyle()
  protected drawVolumes() {
    const { frame } = this
    const { xScale } = this.chart
    const { context: ctx, yScale } = this

    this.data.forEach((d, i) => {
      ctx.fillStyle = this.calcDeltaPrice(d, i, this.data) > 0 ? VOLUME_THEME.rise : VOLUME_THEME.fall;
      const x = xScale(i),
            y = yScale(d.volume),
            height = frame.height - (y - frame.y),
            width = xScale(1) - xScale(0) - 2;
      ctx.fillRect(x - width / 2, y, width, height)
    });
  }
  protected resetYScale() {
    const { frame } = this;
    this.yScale = scaleLinear()
      .domain([0, this.maxValue])
      .range([frame.y + frame.height, frame.y + (TITLE_HEIGHT + 15) * this.chart.options.resolution])
  }
  calcDeltaPrice(currentValue: VolumeData, currentIndex: number, data: VolumeData[]): number {
    if (currentIndex === 0) {
      return 0;
    }
    return currentValue.volume - data[currentIndex - 1].volume;
  }
}
