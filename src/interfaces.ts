/**
 * 时间范围 [left 表示左边， right 表示右边]
 * 0 <= left = right <= 24
 * */
export type TimeRange = [number, number, string?];

export interface DragItem {
  id: string;
  type: string;
  left: number;
  top: number;
}

export const ItemTypes = {
  BOX: 'box',
}
