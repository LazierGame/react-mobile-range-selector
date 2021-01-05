export function snapToGrid(x: number, round: number = 50): number {
  return Math.round(x / round) * round
}

export function snapToFloor(x: number, round: number = 50): number {
  return Math.floor(x / round) * round
}
