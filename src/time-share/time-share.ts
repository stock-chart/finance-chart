// import { area, line } from 'd3-shape';
// import { scaleLinear } from 'd3-scale';
// import { max, min } from 'd3-array';
// import Chart, { autoResetStyle, shouldRedraw, ChartOptions } from '../chart/chart';

// export interface TimeShareOptions extends ChartOptions {
// }
// export class TimeShare extends Chart {
//   minValue: number
//   maxValue: number
//   constructor(options : TimeShareOptions) {
//     super(options);

//     this.recalculate();
//   }
//   private recalculate() {
//     const { options } = this;
//     this.maxValue = max(options.main.data);
//     this.minValue = min(options.main.data);
//     this.resetExtent();
//   }
//   protected resetXExtent() {
//     const { options } = this;
//     this.xExtent = scaleLinear()
//       .domain([0, options.count])
//       .range([0, this.width]);
//   }
//   protected resetYExtent() {
//     const { options } = this;
//     const firstData = options.main.data[0];
//     const flexible = 0.03;
//     this.yExtent = scaleLinear()
//       .domain([firstData * (1 - flexible), firstData * (1 + flexible)])
//       .range([options.height, 0]);
//   }
//   draw() {
//     console.log('draw');
//     this.drawTimeShareLine();
//   }
//   @autoResetStyle()
//   protected drawTimeShareLine() {
//     const { options, context: ctx, yExtent, xExtent } = this;

//     const drawArea = area<number>()
//       .x((d, i) => xExtent(i))
//       .y0(d => yExtent(d))
//       .y1(options.height)
//       .context(ctx);
//     const drawLine = line<number>()
//       .x((d, i) => xExtent(i))
//       .y(d => yExtent(d))
//       .context(ctx);
//     ctx.beginPath();
//     drawArea(options.main.data);
//     const linearGradient = ctx.createLinearGradient(0, 0, 0, options.height);
//     linearGradient.addColorStop(0, 'rgba(75, 153, 251, 0.4)');
//     linearGradient.addColorStop(1, 'rgba(75, 153, 251, 0)');
//     ctx.fillStyle = linearGradient;
//     ctx.fill();
//     ctx.beginPath();
//     drawLine(options.main.data);
//     ctx.strokeStyle = '#4B99FB';
//     ctx.lineWidth = 1;
//     ctx.stroke();
//   }  
// }
