import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { scaleLinear } from 'd3-scale'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface DrawerContructor {
  new (chart: Chart, data: any[]): Drawer
}
export interface MainDrawerContructor {
  new (context: Chart, data: any[]): MainDrawer
}
export interface Drawer {
  chart: Chart
  context: CanvasRenderingContext2D
  frame: Rect
  draw(): void
  resize(frame: Rect): void
}

export interface MainDrawer extends Drawer {
  drawXAxis(rect: Rect): void
}


interface AuxiliaryOptions {
  data: any[]
  drawer: DrawerContructor
}
interface MainOptions extends AuxiliaryOptions {
  drawer: MainDrawerContructor
}

export interface ChartOptions {
  /**
   * Selector use in document.querySelector or an document element
   */
  selector: string | HTMLElement
  main: MainOptions
  resolution?: number
  count?: number
  mainRatio?: number
  auxiliaries?: AuxiliaryOptions[]
}


export function autoResetStyle () {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const raw = target[propertyKey]
    descriptor.value = function (this: Chart) {
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
    resolution = 1,
    count = 240,
    main,
    mainRatio = 0.65,
    auxiliaries = [],
  }: ChartOptions
) {
  if (auxiliaries.length === 0) mainRatio = 1
  return {
    selector,
    resolution,
    count,
    main,
    mainRatio,
    auxiliaries
  }
}

export class Chart {
  options: ChartOptions
  willRedrawAtEndOfFrame = false
  rootElement: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  xScale: ScaleLinear<number, number>
  width: number = 0
  height: number = 0
  mainDrawer: MainDrawer
  auxiliaryDrawer: Drawer[] = []
  selectedAuxiliaryDrawer = 0
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
    this.mainDrawer = new options.main.drawer(this, options.main.data)
    options.auxiliaries.forEach((options) => {
      this.auxiliaryDrawer.push(new options.drawer(this, options.data))
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
    this.mainDrawer.resize({
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
  resetXScale() {
    this.xScale = scaleLinear()
      .domain([0, this.options.count])
      .range([0, this.width])
  }
  public drawAtEndOfFrame() {
    console.log('will draw at end of frame')
    if (!this.willRedrawAtEndOfFrame) {
      this.willRedrawAtEndOfFrame = true
      requestAnimationFrame(() => {
        this.mainDrawer.draw()
        this.auxiliaryDrawer[this.selectedAuxiliaryDrawer].draw()
        this.willRedrawAtEndOfFrame = false
      })
    }
  }
  destroy() {
    window.removeEventListener('resize', this.resize)
    this.rootElement.removeChild(this.canvas)

    // clear referecne to Chart instance
    this.mainDrawer.chart = null
    this.auxiliaryDrawer.forEach(drawer => {
      drawer.chart = null
    })
  }
}