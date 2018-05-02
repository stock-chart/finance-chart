import { line } from 'd3-shape';
import { ScaleLinear } from 'd3-scale';
import { Point } from '../../dist/paint-utils/index';
import { Rect } from '../../dist/graphic/primitive';

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
  tickValues: number[],
  frame: Rect,
  scale: ScaleLinear<number, number>,
  resolution = 1,
  withLine = true,
  lineColor = 'black',
  formatter = (v: number) => v.toString()
) {
    ctx.save()
    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.lineWidth = 0.8
    tickValues.forEach(v => {
      const y = scale(v)
      ctx.moveTo(40 * resolution, y)
      ctx.lineTo(frame.width, y)
    })
    ctx.stroke()
    ctx.restore()
}
export function drawHorizontalTick(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  textColor = 'black',
  withLine = true) {
}