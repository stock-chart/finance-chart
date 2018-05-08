export function divide(minValue: number, maxValue: number, length = 5) {
  const step = (maxValue - minValue) / (length - 1);
  const result = [minValue];
  for (let i = 1; i < length - 1; i += 1) {
    result.push(minValue + (step * i));
  }
  result.push(maxValue);
  return result;
}
