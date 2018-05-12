import detectIt from 'detect-it';
import clamp from 'lodash.clamp';
import { ScaleLinear } from '../../node_modules/@types/d3-scale/index'
import { scaleLinear } from 'd3-scale'
import { Rect, Point } from '../graphic/primitive';
import './chart.scss';
import { TITLE_HEIGHT, PADDING_LEFT, PADDING_RIGHT } from '../constants/constants';

export interface DrawerContructor {
  new (chart: Chart, data: any[]): Drawer
}

export interface FrontSightDetail {
  left: string;
  right: string;
}

export class Drawer {
  context: CanvasRenderingContext2D
  frame: Rect = { x: 0, y: 0, width: 0, height: 0}
  chartFrame: Rect = { x: 0, y: 0, width: 0, height: 0}
  protected data: Object[]
  protected selectedIndex: number
  protected minValue = 0
  protected maxValue = 0
  protected xAxisTickHeight = 0
  protected yScale: ScaleLinear<number, number>
  constructor(public chart: Chart, data: Object[]) {
    this.context = chart.context
    this.selectedIndex = data.length - 1
  }
  draw() {

  }
  drawFrontSight() {

  }
  resize(frame: Rect) {
    const { resolution } = this.chart.options
    this.frame = frame
    this.chartFrame = {
      ...frame,
      y: frame.y + this.titleHeight,
      height: frame.height -
        this.titleHeight -
        this.xAxisTickHeight * resolution
    }
  }
  setData(data: Object[]) {
    this.data = data;
  }
  detailProvider(selectedIndex: number): FrontSightDetail {
    this.selectedIndex = selectedIndex
    return {
      left: '',
      right: ''
    }
  }
  protected get titleHeight() {
    return TITLE_HEIGHT * this.chart.options.resolution
  }
  protected topValue = ((lastMaxValue = 0, lastTopValue = Number.MIN_VALUE) => 
    () => {
      const top = this.maxValue * (1.01)
      if (top > lastTopValue) {
        lastTopValue = top
      }
      return lastTopValue
    }
  )()
  protected bottomValue = ((lastMinValue = 0, lastBottomValue = Number.MAX_VALUE) => 
    () => {
      const bottom = this.minValue * (0.99)
      if (bottom < lastBottomValue) {
        lastBottomValue = bottom
      }
      return lastBottomValue
    }
  )()
  protected resetYScale() {
    const { chartFrame } = this;
    const resolution = this.chart.options.resolution
    this.yScale = scaleLinear()
      .domain([this.bottomValue(), this.topValue()])
      .range([chartFrame.y + chartFrame.height, chartFrame.y + 15 * resolution])
  }
}

export interface ChartOptions {
  /**
   * Selector use in document.querySelector or an document element
   */
  selector: string | HTMLElement;
  lastPrice: number;
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
    lastPrice,
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
    lastPrice,
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
  static Theme = {
    frontSight: '#4B99FB'
  }
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
  data: any[]
  /**
   * 昨收价
   */
  lastPrice: number
  private detailPoint: Point
  private interactive: InteractiveState = InteractiveState.None
  private touchTimeoutId: number = null

  constructor(options: ChartOptions) {

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.options = createOptions(options)
    this.data = this.options.data
    this.lastPrice = this.options.lastPrice
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
    this.rootElement.className = 'finance-chart'
    this.canvas = document.createElement('canvas')
    window.addEventListener('resize', this.resize)
    this.rootElement.appendChild(this.canvas)
    this.context = this.canvas.getContext('2d')
    this.createDrawer()
    if (typeof this.options.detailProvider === 'function') {
      this.watchDetail()
    }
  }
  private createDrawer() {
    const { options } = this
    if (options.mainDrawer) {
      this.mainDrawer = new options.mainDrawer(this, this.data)
    }
    options.auxiliaryDrawers.forEach((drawer) => {
      this.auxiliaryDrawer.push(new drawer(this, this.data))
    })
    this.resize()
  }
  private destroyDrawer() {
    // clear referecne to Chart instance
    this.mainDrawer.chart = null
    this.auxiliaryDrawer.forEach(drawer => {
      drawer.chart = null
    })
    this.mainDrawer = null
    this.auxiliaryDrawer = []
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
  public setData(data: any[], clean = false) {
    if (this.destroyed) {
      throw new Error('Chart has been destroyed, method#setData didn\'t allow to be called')
    }
    this.data = data
    if (clean) {
      this.destroyDrawer()
      this.createDrawer()
    }
    this.mainDrawer && this.mainDrawer.setData(data)
    this.auxiliaryDrawer && this.auxiliaryDrawer.forEach(drawer => drawer.setData(data))
  }
  @shouldRedraw()
  public setLastPrice(value: number) {
    this.lastPrice = value
  }
  resetXScale() {
    const { resolution, count } = this.options;
    this.xScale = scaleLinear()
      .domain([0, count - 1])
      .range([PADDING_LEFT * resolution, this.width - PADDING_RIGHT * resolution])
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
        if (this.interactive === InteractiveState.ShowDetail) {
          this.drawFrontSight();
        }

        // if (process.env.NODE_ENV === 'development') {
        //   console.timeEnd('rendering cost');
        // }
      })
    }
  }
  @autoResetStyle()
  private drawFrontSight() {
    const { context: ctx } = this
    const { resolution } = this.options
    let { x, y } = this.detailPoint
    const { xScale } = this
    x = xScale(this.clampSelectedIndex())
    ctx.beginPath()
    ctx.moveTo(x, TITLE_HEIGHT * resolution)
    ctx.lineTo(x, this.height)
    ctx.moveTo(0, y)
    ctx.lineTo(this.width, y)
    ctx.lineWidth = 1
    ctx.strokeStyle = Chart.Theme.frontSight
    // not support in ie 10
    if (typeof ctx.setLineDash === 'function') {
      ctx.setLineDash([2, 5, 15, 5])
    }
    ctx.stroke()

    this.forEachVisibleDrawer(drawer => drawer.drawFrontSight())
    this.drawDetail()
  }
  private watchDetail() {
    const { canvas } = this;
    this.detailElement = document.createElement('div')
    this.detailElement.className = 'chart-detail'
    this.rootElement.appendChild(this.detailElement)
    canvas.addEventListener('contextmenu', e => e.preventDefault())
    // 'hybrid' on android system
    if (detectIt.deviceType === 'mouseOnly') {
      canvas.addEventListener('mouseenter', this.onMouseEnter)
      canvas.addEventListener('mousemove', this.onMouseMove)
      canvas.addEventListener('mouseleave', this.onMouseLeave)
    } else {
      canvas.addEventListener('touchstart', this.onTouchStart)
      canvas.addEventListener('touchmove', this.onTouchMove)
      canvas.addEventListener('touchend', this.onTouchEnd)
    }
  }
  private onTouchStart(e: TouchEvent) {
    const rect = (<HTMLElement>e.target).getBoundingClientRect()
    const { clientX, clientY } = e.touches[0]
    this.touchTimeoutId = window.setTimeout(() => {
      this.showDetail(
        clientX - rect.left,
        clientY - rect.top
      )
      this.touchTimeoutId = null
    }, 100)
  }
  private onTouchMove(e: TouchEvent) {
    if (this.interactive === InteractiveState.ShowDetail) {
      e.preventDefault()
      const rect = (<HTMLElement>e.target).getBoundingClientRect()
      const { clientX, clientY } = e.touches[0]
      this.showDetail(
        clientX - rect.left,
        clientY - rect.top
      )
    } else {
      this.clearTouchTimeout()
    }
  }
  private onTouchEnd(e: TouchEvent) {
    this.clearTouchTimeout()
    this.hideDetail()
  }
  private clearTouchTimeout() {
    if (this.touchTimeoutId) {
      clearTimeout(this.touchTimeoutId);
    }
    this.touchTimeoutId = null;
  }
  private onMouseEnter(e: MouseEvent) {
    const rect = (<HTMLElement>e.target).getBoundingClientRect()
    this.showDetail(
      e.clientX - rect.left,
      e.clientY - rect.top
    )
  }
  private onMouseMove(e: MouseEvent) {
    const rect = (<HTMLElement>e.target).getBoundingClientRect()
    this.showDetail(
      e.clientX - rect.left,
      e.clientY - rect.top
    )
  }
  private onMouseLeave(e: MouseEvent) {
    const x = e.clientX - (<HTMLElement>e.target).getBoundingClientRect().left,
          y = e.clientY - (<HTMLElement>e.target).getBoundingClientRect().top
    this.hideDetail()
  }
  @shouldRedraw()
  private showDetail(x: number, y: number) {
    const { data } = this
    const { resolution } = this.options
    this.detailPoint = {
      x: x * resolution,
      y: y * resolution
    }
    if (!data || data.length === 0) return
    if (y < TITLE_HEIGHT) {
      this.hideDetail()
      return
    }
    this.interactive = InteractiveState.ShowDetail
    this.detailElement.style.display = 'block'
    if (this.detailPoint.x > this.width / 2) {
      this.detailElement.style.right = 'auto'
      this.detailElement.style.left = '0'
    } else {
      this.detailElement.style.left = 'auto'
      this.detailElement.style.right = '0'
    }
    this.detailAt(this.clampSelectedIndex())
  }
  private detailAt(i: number) {
    this.forEachVisibleDrawer(drawer => drawer.detailProvider(i))
  }
  private forEachVisibleDrawer(action: (drawer: Drawer) => void) {
    this.mainDrawer && action(this.mainDrawer)
    const drawer = this.auxiliaryDrawer[this.selectedAuxiliaryDrawer]
    drawer && action(drawer)
  }
  private clampSelectedIndex() {
    return clamp(
      Math.round(this.xScale.invert(this.detailPoint.x)), 0,
      this.data.length - 1
    )
  }
  private drawDetail() {
    const xScale = this.xScale.clamp(true)
    const detailIndex = Math.min(
      Math.round(xScale.invert(this.detailPoint.x)),
      this.data.length - 1
    )
    const { title, tables } = this.options.detailProvider(detailIndex, this.data)
    const fragment = document.createDocumentFragment()
    const $title = document.createElement('div')
    $title.className = 'chart-detail__title'
    $title.textContent = title
    fragment.appendChild($title)
    tables.forEach(row => {
      const $row = document.createElement('div'),
        $name = document.createElement('span'),
        $value = document.createElement('span')
      $row.className = 'chart-detail__row'
      $name.className = 'chart-detail__row__name'
      $name.textContent = row.name
      $value.className = 'chart-detail__row__value'
      $value.textContent = row.value
      $value.style.color = row.color || 'black'
      $row.appendChild($name)
      $row.appendChild($value)
      fragment.appendChild($row)
    })
    this.detailElement.innerHTML = ''
    this.detailElement.appendChild(fragment)
  }
  @shouldRedraw()
  private hideDetail() {
    this.interactive = InteractiveState.None
    this.detailElement.style.display = 'none'
    this.detailAt(null)
  }
  destroy() {
    this.destroyed = true
    window.removeEventListener('resize', this.resize)
    this.canvas.removeEventListener('mouseenter', this.onMouseEnter)
    this.canvas.removeEventListener('mousemove', this.onMouseEnter)
    this.canvas.removeEventListener('mouseleave', this.onMouseEnter)
    this.canvas.removeEventListener('touchstart', this.onTouchStart)
    this.canvas.removeEventListener('touchmove', this.onTouchMove)
    this.canvas.removeEventListener('touchend', this.onTouchEnd)
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId)
    }
    this.rootElement.removeChild(this.canvas)
    this.detailElement && this.rootElement.removeChild(this.detailElement)

    this.destroyDrawer()
  }
}