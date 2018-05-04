import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { scaleLinear } from 'd3-scale'
import { Rect } from "../graphic/primitive";

const PADDING = {
  left: 10,
  right: 10
}

export interface DrawerContructor {
  new (chart: Chart, data: any[]): Drawer
}

export interface Drawer {
  chart: Chart
  context: CanvasRenderingContext2D
  frame: Rect
  draw(): void
  resize(frame: Rect): void
  setData(data: Object[]): void
}

export interface ChartOptions {
  /**
   * Selector use in document.querySelector or an document element
   */
  selector: string | HTMLElement
  data: any[],
  mainDrawer?: DrawerContructor
  resolution?: number
  count?: number
  mainRatio?: number
  auxiliaryDrawers?: DrawerContructor[]
}


export function autoResetStyle () {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const raw = target[propertyKey]
    descriptor.value = function (this: { context: CanvasRenderingContext2D }) {
      this.context.save()
      const r = raw.apply(this, arguments)
      this.context.restore()
      return r
    }
    return descriptor
  }
}
export function shouldRedraw() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const raw = target[propertyKey]
    descriptor.value = function (this: Chart) {
      raw.apply(this, arguments)
      this.drawAtEndOfFrame()
    }
    return descriptor
  }
}

function createOptions(
  {
    selector,
    data = [],
    resolution = 1,
    count = 240,
    mainDrawer,
    mainRatio = 0.65,
    auxiliaryDrawers = [],
  }: ChartOptions
) {
  if (mainDrawer) {
    if (auxiliaryDrawers.length === 0) {
      mainRatio = 1
    }
  } else {
    mainRatio = 0
  }
  return {
    selector,
    data,
    resolution,
    count,
    mainDrawer,
    mainRatio,
    auxiliaryDrawers
  }
}

export class Chart {
  options: ChartOptions
  requestAnimationFrameId: number = null
  rootElement: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  xScale: ScaleLinear<number, number>
  width: number = 0
  height: number = 0
  mainDrawer: Drawer
  auxiliaryDrawer: Drawer[] = []
  selectedAuxiliaryDrawer = 0
  destroyed = false
  constructor(options: ChartOptions) {
    this.options = createOptions(options)
    this.resize = this.resize.bind(this)
  
    this.create()
  }
  get mainChartY() {
    return 0
  }
  get mainChartHeight() {
    return this.height * this.options.mainRatio
  }
  get auxiliaryChartHeight() {
    return this.height - this.mainChartHeight
  }
  get auxiliaryChartY() {
    return this.mainChartHeight + 1
  }
  private create() {
    const { options } = this
    this.rootElement = (options.selector instanceof HTMLElement)
        ? options.selector as HTMLElement
        : document.querySelector(options.selector as string)
    this.canvas = document.createElement('canvas')
    window.addEventListener('resize', this.resize)
    this.rootElement.appendChild(this.canvas)
    this.context = this.canvas.getContext('2d')
    if (options.mainDrawer) {
      this.mainDrawer = new options.mainDrawer(this, options.data)
    }
    options.auxiliaryDrawers.forEach((drawer) => {
      this.auxiliaryDrawer.push(new drawer(this, options.data))
    })
    this.resize()
  }
  @shouldRedraw()
  public resize() {
    const { options } = this
    this.width = this.rootElement.clientWidth * options.resolution
    this.height = this.rootElement.clientHeight * options.resolution
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.resetXScale()
    this.mainDrawer && this.mainDrawer.resize({
      x: 0,
      y: this.mainChartY,
      width: this.width,
      height: this.mainChartHeight
    })
    this.auxiliaryDrawer.forEach((drawer) => {
      drawer.resize({
        x: 0,
        y: this.auxiliaryChartY,
        width: this.width,
        height: this.auxiliaryChartHeight
      })
    })
  }
  @shouldRedraw()
  public setData(data: any) {
    if (this.destroyed) {
      throw new Error('Chart has been destroyed, method#setData didn\'t allow to be called')
    }
    this.mainDrawer && this.mainDrawer.setData(data)
    this.auxiliaryDrawer && this.auxiliaryDrawer.forEach(drawer => drawer.setData(data))
  }
  resetXScale() {
    const { resolution } = this.options;
    this.xScale = scaleLinear()
      .domain([0, this.options.count])
      // .range([0, this.width])
      .range([PADDING.left * resolution, this.width - PADDING.right * resolution])
  }
  public drawAtEndOfFrame() {
    if (!this.requestAnimationFrameId) {
      this.requestAnimationFrameId = requestAnimationFrame(() => {
        this.context.clearRect(0, 0, this.width, this.height)
        if (process.env.NODE_ENV === 'development') {
          console.time('rendering cost');
        }
        this.mainDrawer && this.mainDrawer.draw()
        this.auxiliaryDrawer[this.selectedAuxiliaryDrawer] &&
          this.auxiliaryDrawer[this.selectedAuxiliaryDrawer].draw()
        this.requestAnimationFrameId = null

        if (process.env.NODE_ENV === 'development') {
          console.timeEnd('rendering cost');
        }
      })
    }
  }
  destroy() {
    this.destroyed = true
    window.removeEventListener('resize', this.resize)
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId)
    }
    this.rootElement.removeChild(this.canvas)

    // clear referecne to Chart instance
    this.mainDrawer.chart = null
    this.auxiliaryDrawer.forEach(drawer => {
      drawer.chart = null
    })
    this.mainDrawer = null
    this.auxiliaryDrawer = null
  }
}