export function snapToGrid(x: number, round: number = 50): number {
  console.log(round, Math.round(x / round) * round)
  return Math.round(x / round) * round
}

export function snapToFloor(x: number, round: number = 50): number {
  console.log(round, Math.round(x / round) * round)
  return Math.floor(x / round) * round
}
