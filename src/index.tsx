import React from 'react'
import { DndProvider } from 'react-dnd'
// import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'
import { TimeRange } from "./interfaces";


interface TimeRangeSelectorProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 时间范围 */
  timeRange?: TimeRange;
  /** 修改 */
  onChange?: (value: TimeRange | null) => void;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {
  const {disabled = true, timeRange, onChange} = props

  console.log(disabled, timeRange, onChange)

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{marginLeft: 300}}>
        <Container snapToGrid/>
        <CustomDragLayer snapToGrid/>
      </div>
    </DndProvider>
  )
}

export default TimeRangeSelector
