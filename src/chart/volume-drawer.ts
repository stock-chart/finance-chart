import { Drawer, Chart, autoResetStyle, CHART_PADDING } from "./chart";
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index";
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { Rect } from "../graphic/primitive";
import { ChartTitle } from "./chart-title";

const VOLUME_THEME = {
  rise: '#F55559',
  fall: '#7DCE8D',
  volumeText: '#F78081',
  titleBar: '#F2F4F4',
  title: '#333'
}

export interface VolumeDrawerData {
  volume: number
}
/**
 * Volume chart drawer
 */
export class VolumeDrawer implements Drawer {
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect
  titleDrawer: ChartTitle
  constructor(public chart: Chart, public data: VolumeDrawerData[]) {
    this.context = chart.context
    this.titleDrawer = new ChartTitle(
      this.context,
      '成交量', [
        {
          x: 100,
          label: 'VOL: 0',
          color: VOLUME_THEME.volumeText
        }
      ],
      VOLUME_THEME.titleBar,
      VOLUME_THEME.title,
      this.chart.options.resolution
    )
  }
  public resize(frame: Rect): void {
    this.frame = frame
    this.resetYScale()
  }
  public draw(): void {
    const { frame } = this
    this.titleDrawer.draw({
      ...frame,
      height: CHART_PADDING.top * this.chart.options.resolution
    })
    this.drawVolumes()
  }
  @autoResetStyle()
  protected drawVolumes() {
    const { frame } = this;
    const { xScale } = this.chart;
    const { context: ctx, yScale } = this
    this.data.forEach((d, i) => {
      ctx.fillStyle = this.calcDeltaPrice(d, i, this.data) >= 0 ? VOLUME_THEME.rise : VOLUME_THEME.fall;
      const x = xScale(i),
            y = yScale(d.volume),
            height = frame.height - (y - frame.y),
            width = xScale(1) - 2;
      ctx.fillRect(x - width / 2, y, width, height);
    });
  }
  protected resetYScale() {
    const { frame } = this;
    this.yScale = scaleLinear()
      .domain([0, max(this.data, d => d.volume)])
      .range([frame.y + frame.height, frame.y + CHART_PADDING.top * this.chart.options.resolution])
  }
  calcDeltaPrice(currentValue: VolumeDrawerData, currentIndex: number, data: VolumeDrawerData[]): number {
    if (currentIndex === 0) {
      return 0;
    }
    return currentValue.volume - data[currentIndex - 1].volume;
  }
}
