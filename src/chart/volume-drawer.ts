import { Drawer, Chart, Rect, autoResetStyle } from "./chart";
import { ScaleLinear } from "../../node_modules/@types/d3-scale/index";
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export class VolumeDrawer implements Drawer {
  context: CanvasRenderingContext2D
  yExtent: ScaleLinear<number, number>
  frame: Rect
  constructor(public chart: Chart, public data: number[]) {
    this.context = chart.context
  }

  public resize(frame: Rect): void {
    this.frame = frame
    this.resetYExtent();
  }
  public draw(): void {
    console.log(this.frame);
  }
  @autoResetStyle()
  protected drawVolumes() {
    const { frame } = this;
  }
  protected resetYExtent() {
    const { frame } = this;
    this.yExtent = scaleLinear()
      .domain([0, max(this.data)])
      .range([frame.y + frame.height, frame.y])
  }
}