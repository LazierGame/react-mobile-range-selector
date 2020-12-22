export function snapToGrid(x: number): [number] {
  const snappedX = Math.round(x / 32) * 32
  return [snappedX]
}
