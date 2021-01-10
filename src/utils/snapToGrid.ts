export function snapToGrid(x: number, round: number = 50): number {
  return Math.round(x / round) * round
}
