import { line } from 'd3-shape';

export interface Point {
  x: number;
  y: number;
}

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