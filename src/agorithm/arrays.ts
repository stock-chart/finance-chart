export function trimNulls<T>(arr: T[]) {
  let i = 0, len = arr.length
  while (arr[i] === null && i < len) {
    ++i
  }
  return {
    deleted: i,
    result: arr.slice(i)
  }
}