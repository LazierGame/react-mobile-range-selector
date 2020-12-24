import React from 'react'
import { DndProvider } from 'react-dnd'
// import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'
import { TimeRange } from "./interfaces";

interface TimeRangeSelectorProps {
  /** 当前滑动条的高度 */
  height?: number;
  /** 当前滑动条刻度的宽度 */
  width?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 时间范围 */
  timeRange?: TimeRange;
  /** 修改 */
  onChange?: (value: TimeRange | null) => void;
  /** 每次移动时候跳针的宽度 */
  snap?: number
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {

  const {disabled = true, timeRange, onChange, height = 50, width = 300} = props

  console.log(disabled, timeRange, onChange)

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{width, overflowX: "auto"}}>
        <Container
          snapToGrid
          height={height}
        />
        <CustomDragLayer snapToGrid/>
      </div>
    </DndProvider>
  )
}

export default TimeRangeSelector
