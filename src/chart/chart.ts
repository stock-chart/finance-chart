import { ScaleLinear } from "../../node_modules/@types/d3-scale/index";
import { scaleLinear } from 'd3-scale';

export interface ChartOptions {
  /**
   * Selector use in document.querySelector or an document element
   */
  selector: string | HTMLElement;
  height?: number;
  resolution?: number;
  count?: number;
  data?: any[];
}
export interface Resizable {
  xExtent: ScaleLinear<number, number>;
  yExtent: ScaleLinear<number, number>;
  resize(): void;
}
export interface Drawable {
  draw(): void;
}
export function autoResetStyle () {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const raw = target[propertyKey];
    descriptor.value = function (this: Chart) {
      this.context.save();
      const r = raw.apply(this, arguments);
      this.context.restore();
      return r;
    };
    return descriptor;
  }
}
export function shouldRedraw() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const raw = target[propertyKey];
    descriptor.value = function (this: Chart) {
      raw.apply(this, arguments);
      this.drawAtEndOfFrame();
    };
    return descriptor;
  }
}

function createOptions(
  {
    selector,
    height = 300,
    resolution = 1,
    data = [],
    count = 240
  }: ChartOptions
) {
  return {
    selector,
    height,
    resolution,
    data,
    count,
  };
}

export default abstract class Chart implements
  Resizable, Drawable {
  
  options: ChartOptions
  willRedrawAtEndOfFrame = false
  rootElement: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  xExtent: ScaleLinear<number, number>
  yExtent: ScaleLinear<number, number>
  width: number;

  constructor(options: ChartOptions) {
    this.options = createOptions(options);
    this.resize = this.resize.bind(this);
  
    this.create();
  }
  private create() {
    const { options } = this;
    this.rootElement = (options.selector instanceof HTMLElement)
        ? options.selector as HTMLElement
        : document.querySelector(options.selector as string);
    this.canvas = document.createElement('canvas');
    this.resize();
    window.addEventListener('resize', this.resize);
    this.rootElement.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  @shouldRedraw()
  resize() {
    const { options } = this;
    this.rootElement.style.height = `${options.height}px`;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.width = this.rootElement.clientWidth;
    this.canvas.width = this.width * options.resolution;
    this.canvas.height = options.height * options.resolution;
    this.resetExtent();
  }
  abstract draw(): void;
  drawAtEndOfFrame() {
    console.log('will draw at end of frame');
    if (!this.willRedrawAtEndOfFrame) {
      this.willRedrawAtEndOfFrame = true;
      requestAnimationFrame(() => {
        this.draw();
        this.willRedrawAtEndOfFrame = false;
      });
    }
  }
  protected resetExtent() {
    this.resetXExtent();
    if (this.options.data.length > 0) {
      this.resetYExtent();
    }
  }
  protected abstract resetXExtent(): void;
  protected abstract resetYExtent(): void;
  destroy() {
    window.removeEventListener('resize', this.resize);
    this.rootElement.removeChild(this.canvas);
  }
}