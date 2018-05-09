import 'core-js/modules/es6.object.assign'
import { line } from 'd3-shape';
import { ScaleLinear } from 'd3-scale';
import { Point, Rect } from '../graphic/primitive';
import { PADDING_LEFT, PADDING_RIGHT } from '../constants/constants';

export function drawLine(ctx: CanvasRenderingContext2D, data: Point[], color = 'black', lineWidth = 1) {
  ctx.save()
  ctx.beginPath()
  line<Point>()
    .x(d => d.x)
    .y(d => d.y)
    .context(ctx)(data)
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.stroke()
  ctx.restore()
}

export interface TextStyle {
  font?: string;
  color?: string;
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, position: Point = { x: 0, y: 0 }, styles: TextStyle = {}) {
  const defaultStyles = {
    font: '11px serif',
    color: 'black'
  };
  const mergeStyles = Object.assign({}, defaultStyles, styles);
  ctx.save()
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.font = mergeStyles.font
  ctx.fillStyle = mergeStyles.color
  ctx.fillText(text, position.x, position.y)
  ctx.restore()
}

export function drawYAxis(
  ctx: CanvasRenderingContext2D,
  tickValues: { value: number; color?: string; }[],
  frame: Rect,
  scale: ScaleLinear<number, number>,
  resolution = 1,
  withLine = true,
  lineColor = 'black',
  formatter: (v: number, i: number) => string = (v: number) => v.toFixed(2),
  align: 'left' | 'right' = 'left'
) {
    ctx.save()
    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.lineWidth = 0.8
    ctx.font = `${10 * resolution}px sans-serif`
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    tickValues.forEach(({value, color = '#5E667F' }, i) => {
      const y = scale(value)
      let x = align === 'left' ? (PADDING_LEFT - 3) * resolution : frame.width
      if (withLine) {
        ctx.moveTo(PADDING_LEFT * resolution, y)
        ctx.lineTo(frame.width - PADDING_RIGHT * resolution, y)
      }
      ctx.fillStyle = color
      ctx.fillText(formatter(value, i), x, y)
    })
    ctx.stroke()
    ctx.restore()
}

export function drawXAxis(
  ctx: CanvasRenderingContext2D,
  tickValues: number[],
  frame: Rect,
  scale: ScaleLinear<number, number>,
  resolution = 1,
  withTick = true,
  lineColor = 'black',
  formatter: (v: number, i: number) => string = (v: number) => v.toFixed(2),
  tickColor = '#5E667F'
) {
    ctx.save()
    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.lineWidth = 0.8
    ctx.font = `${11 * resolution}px sans-serif`
    ctx.textAlign = 'left'
    ctx.fillStyle = tickColor
    ctx.textBaseline = 'top'
    const bottomY = frame.y + frame.height
    tickValues.forEach((value, i) => {
      const x = scale(value)
      ctx.moveTo(x, frame.y)
      ctx.lineTo(x, bottomY)
      if (withTick) {
        ctx.fillText(formatter(value, i), x, bottomY)
      }
    })
    ctx.stroke()
    ctx.restore()
}
