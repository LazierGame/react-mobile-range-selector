
export type RangeType = 'day'

export const rangeByType: Record<RangeType, string[]> = {
  day: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(x => `${('00' + x).slice(-2)}:00`),
}
