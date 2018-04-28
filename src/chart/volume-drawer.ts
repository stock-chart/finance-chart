import { Drawer, Chart, Rect, autoResetStyle } from "./chart";
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index";
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export class VolumeDrawer implements Drawer {
  context: CanvasRenderingContext2D
  yScale: ScaleLinear<number, number>
  frame: Rect
  constructor(public chart: Chart, public data: number[]) {
    this.context = chart.context
  }

  public resize(frame: Rect): void {
    this.frame = frame
    this.resetYScale();
  }
  public draw(): void {
    this.drawVolumes();
  }
  @autoResetStyle()
  protected drawVolumes() {
    const { frame } = this;
    const { xScale } = this.chart;
    const { context: ctx, yScale } = this
    this.data.forEach((volume, i) => {
      console.log(volume, yScale(volume));
      ctx.fillStyle = this.calcDeltaPrice(volume, i, this.data) >= 0 ? 'red' : 'green';
      const x = xScale(i),
            y = yScale(volume),
            height = frame.height - (y - frame.y),
            width = xScale(1) - 2;
      ctx.fillRect(x - width / 2, y, width, height);
    });
  }
  protected resetYScale() {
    const { frame } = this;
    this.yScale = scaleLinear()
      .domain([0, max(this.data)])
      .range([frame.y + frame.height, frame.y])
  }
  calcDeltaPrice(currentValue: number, currentIndex: number, data: number[]): number {
    if (currentIndex === 0) {
      return 0;
    }
    return currentValue - data[currentIndex - 1];
  }
}
