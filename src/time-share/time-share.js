import { area, line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';


function autoResetStyle () {
  return function(target, name, descriptor) {
    const raw = target[name];
    descriptor.value = function () {
      this.context.save();
      const r = raw.apply(this, arguments);
      this.context.restore();
      return r;
    };
    return descriptor;
  }
}

function shouldRedraw() {
  return function(target, name, descriptor) {
    const raw = target[name];
    descriptor.value = function () {
      raw.apply(this, arguments);
      this.draw();
    };
    return descriptor;
  }
}

/**
 * @typedef {Object} TimeShareOptions
 * @prop {string} selector
 * @prop {number} height
 * @prop {number} width
 * @prop {number} resolution 
 * @prop {number[]} data
 * @prop {number} count
 */

function createOptions(
  /**
   * @type {TimeShareOptions}
   */
  {
    selector,
    height = 300,
    resolution = 1,
    data = [],
    count = 240
  }
) {
  return {
    selector,
    height,
    resolution,
    data,
    count,
  };
}

export class TimeShare {
  /**
   * 
   * @param {TimeShareOptions} options 
   */
  constructor(options) {
    this.options = createOptions(options);
    this.willRedrawAtEndOfFrame = false;
    
    this.resize = this.resize.bind(this);
    this._drawAtEndOfFrame = this._drawAtEndOfFrame.bind(this);

    this._init();
  }
  _init() {
    this._create();
    this._recalculate();

    this.draw();
  }
  _create() {
    const { options } = this;
    this.rootElement =
      (options.selector instanceof HTMLElement)
        ? options.selector
        : document.querySelector(options.selector);
    this.canvas = document.createElement('canvas');
    this.resize();
    window.addEventListener('resize', this.resize);
    this.rootElement.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
  }
  _recalculate() {
    const { options } = this;
    this.maxValue = max(options.data);
    this.minValue = min(options.data);
    this._resetExtent();
  }
  _resetExtent() {
    const { options } = this;
    if (options.data.length > 0) {
      this._resetYExtent();
    }
    this._resetXExtent();
  }
  _resetXExtent() {
    const { options } = this;
    this.xExtent = scaleLinear()
      .domain([0, options.count])
      .range([0, this.width]);
  }
  _resetYExtent() {
    const { options } = this;
    const firstData = options.data[0];
    const flexible = 0.03;
    this.yExtent = scaleLinear()
      .domain([firstData * (1 - flexible), firstData * (1 + flexible)])
      .range([options.height, 0]);
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
    this._resetExtent();
  }
  draw() {
    console.log('draw call');
    if (!this.willRedrawAtEndOfFrame) {
      requestAnimationFrame(this._drawAtEndOfFrame);
      this.willRedrawAtEndOfFrame = true;
    }
  }
  _drawAtEndOfFrame() {
    this._drawTimeShareLine();
    this.willRedrawAtEndOfFrame = false;
    console.log('draw at end of frame');
  }
  @autoResetStyle()
  _drawTimeShareLine() {
    const { options, context: ctx, yExtent, xExtent } = this;

    const drawArea = area()
      .x((d, i) => xExtent(i))
      .y0(d => yExtent(d))
      .y1(options.height)
      .context(ctx);
    const drawLine = line()
      .x((d, i) => xExtent(i))
      .y(d => yExtent(d))
      .context(ctx);
    ctx.beginPath();
    drawArea(options.data);
    const linearGradient = ctx.createLinearGradient(0, 0, 0, options.height);
    linearGradient.addColorStop(0, 'rgba(75, 153, 251, 0.4)');
    linearGradient.addColorStop(1, 'rgba(75, 153, 251, 0)');
    ctx.fillStyle = linearGradient;
    ctx.fill();
    ctx.beginPath();
    drawLine(options.data);
    ctx.strokeStyle = '#4B99FB';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  destroy() {
    window.removeEventListener('resize', this.resize);
    this.rootElement.removeChild(this.canvas);
  }
}