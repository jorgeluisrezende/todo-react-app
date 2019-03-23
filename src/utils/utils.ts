export function turnObjectIntoArray (obj:any) : Array<object> {
  const result = Object.keys(obj).map((key) => obj[key])
  return result
}