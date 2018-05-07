import { ScaleLinear } from "../../node_modules/@types/d3-scale/index"
import { scaleLinear } from 'd3-scale'
import { Rect } from "../graphic/primitive";
import './chart.scss';

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
  selector: string | HTMLElement;
  data: any[];
  mainDrawer?: DrawerContructor;
  resolution?: number;
  count?: number;
  mainRatio?: number;
  auxiliaryDrawers?: DrawerContructor[];
  detailProvider?:
    (selectedIndex: number, data: any[]) => {
      title: string;
      tables: ChartDetail[]
    };
}

export interface ChartDetail {
  name: string;
  value: string;
  color: string;
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
    detailProvider,
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
    auxiliaryDrawers,
    detailProvider
  }
}

enum InteractiveState {
  ShowDetail,
  Dragging,
  None
}
export class Chart {
  options: ChartOptions
  requestAnimationFrameId: number = null
  rootElement: HTMLElement
  detailElement: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  xScale: ScaleLinear<number, number>
  width: number = 0
  height: number = 0
  mainDrawer: Drawer
  auxiliaryDrawer: Drawer[] = []
  selectedAuxiliaryDrawer = 0
  destroyed = false
  
  private interactive: InteractiveState = InteractiveState.None

  constructor(options: ChartOptions) {

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)

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
    this.rootElement.classList.add('finance-chart')
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
    if (typeof this.options.detailProvider === 'function') {
      this.watchDetail()
    }
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
      .range([PADDING.left * resolution, this.width - PADDING.right * resolution])
  }
  public drawAtEndOfFrame() {
    if (!this.requestAnimationFrameId) {
      this.requestAnimationFrameId = requestAnimationFrame(() => {
        this.context.clearRect(0, 0, this.width, this.height)
        // if (process.env.NODE_ENV === 'development') {
        //   console.time('rendering cost');
        // }
        this.mainDrawer && this.mainDrawer.draw()
        this.auxiliaryDrawer[this.selectedAuxiliaryDrawer] &&
          this.auxiliaryDrawer[this.selectedAuxiliaryDrawer].draw()
        this.requestAnimationFrameId = null

        // if (process.env.NODE_ENV === 'development') {
        //   console.timeEnd('rendering cost');
        // }
      })
    }
  }
  private watchDetail() {
    console.log('watch detail')
    const { canvas } = this;
    this.detailElement = document.createElement('div')
    this.detailElement.classList.add('chart-detail');
    this.rootElement.appendChild(this.detailElement)
    canvas.addEventListener('mouseenter', this.onMouseEnter)
    canvas.addEventListener('mousemove', this.onMouseMove)
    canvas.addEventListener('mouseleave', this.onMouseLeave)
  }
  private onMouseEnter(e: MouseEvent) {
    this.showDetail(e.clientX - (<HTMLElement>e.target).getBoundingClientRect().left)
  }
  private onMouseMove(e: MouseEvent) {
    this.showDetail(e.clientX - (<HTMLElement>e.target).getBoundingClientRect().left)
  }
  private onMouseLeave(e: MouseEvent) {
    const x = e.clientX - (<HTMLElement>e.target).getBoundingClientRect().left,
          y = e.clientY - (<HTMLElement>e.target).getBoundingClientRect().top
    this.hideDetail()
  }
  private showDetail(x: number) {
    const { data } = this.options
    if (!data || data.length === 0) return
    this.interactive = InteractiveState.ShowDetail
    this.detailElement.style.display = 'block'
    if (x > this.width / this.options.resolution / 2) {
      this.detailElement.style.right = 'unset'
      this.detailElement.style.left = '0'
    } else {
      this.detailElement.style.left = 'unset'
      this.detailElement.style.right = '0'
    }
    const xScale = this.xScale.clamp(true)

    const detailIndex = Math.min(
      Math.round(xScale.invert(x * this.options.resolution)),
      data.length - 1
    )
    const { title, tables } = this.options.detailProvider(detailIndex, data)
    const fragment = document.createDocumentFragment()
    const $title = document.createElement('div')
    $title.classList.add('chart-detail__title')
    $title.textContent = title
    fragment.appendChild($title)
    tables.forEach(row => {
      const $row = document.createElement('div'),
        $name = document.createElement('span'),
        $value = document.createElement('span');
      $row.classList.add('chart-detail__row')
      $name.classList.add('chart-detail__row__name')
      $name.textContent = row.name
      $value.classList.add('chart-detail__row__value')
      $value.textContent = row.value
      $value.style.color = row.color || 'black'
      $row.appendChild($name)
      $row.appendChild($value)
      fragment.appendChild($row)
    })
    this.detailElement.innerHTML = ''
    this.detailElement.appendChild(fragment)
  }
  private hideDetail() {
    this.interactive = InteractiveState.None
    this.detailElement.style.display = 'none'
  }
  destroy() {
    // TODO: 移除事件
    this.destroyed = true
    window.removeEventListener('resize', this.resize)
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId)
    }
    this.rootElement.removeChild(this.canvas)
    this.detailElement && this.rootElement.removeChild(this.detailElement)

    // clear referecne to Chart instance
    this.mainDrawer.chart = null
    this.auxiliaryDrawer.forEach(drawer => {
      drawer.chart = null
    })
    this.mainDrawer = null
    this.auxiliaryDrawer = null
  }
}