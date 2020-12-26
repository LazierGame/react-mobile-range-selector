export function snapToGrid(x: number): [number] {
  console.log('sn', x)
  const snappedX = Math.round(x / 50) * 50
  console.log('sn', snappedX)
  return [snappedX]
}
