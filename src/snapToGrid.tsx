export function snapToGrid(x: number): [number] {
  const snappedX = Math.round(x / 50) * 50
  return [snappedX]
}
