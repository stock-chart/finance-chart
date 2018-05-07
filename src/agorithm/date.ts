export function formateDate(date: Date | number | string, format: string) {
  let d: Date
  if (typeof date === 'number') {
    d = new Date(date)
  } else if (typeof date === 'string') {
    d = new Date(date.replace(/-/g, '/'))
  } else {
    d = date
  }
  const dict: { [key: string]: string | number} = {
    yyyy: d.getFullYear(),
    M: d.getMonth() + 1,
    d: d.getDate(),
    H: d.getHours(),
    m: d.getMinutes(),
    s: d.getSeconds(),
    MM: (`${d.getMonth() + 101}`).substr(1),
    dd: (`${d.getDate() + 100}`).substr(1),
    HH: (`${d.getHours() + 100}`).substr(1),
    mm: (`${d.getMinutes() + 100}`).substr(1),
    ss: (`${d.getSeconds() + 100}`).substr(1),
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, key => dict[key] as string)
}