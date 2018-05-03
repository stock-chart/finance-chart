export function formateDate(date: Date, format: string) {
  const dict: { [key: string]: string | number} = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: (`${date.getMonth() + 101}`).substr(1),
    dd: (`${date.getDate() + 100}`).substr(1),
    HH: (`${date.getHours() + 100}`).substr(1),
    mm: (`${date.getMinutes() + 100}`).substr(1),
    ss: (`${date.getSeconds() + 100}`).substr(1),
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, key => dict[key] as string)
}