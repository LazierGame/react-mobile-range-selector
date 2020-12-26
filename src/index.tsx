import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
// import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { Container } from './Container'
// import { CustomDragLayer } from './CustomDragLayer'
import { TimeRange } from "./interfaces";
import SelectController from "./components/SelectController";
// import './static/font_nmaf2cv9zqn/iconfont.css'
import './index.css'

console.log('xxx')

interface TimeRangeSelectorProps {
  /** 当前滑动条的高度 */
  height?: number;
  /** 当前滑动条刻度的宽度 */
  width?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 时间范围 */
  timeRange?: TimeRange;
  /** 禁用的时间范围 */
  disabledTimeRanges?: TimeRange[];
  /** 修改 */
  onChange?: (value: TimeRange | null) => void;
  /** 每次移动时候跳针的宽度 */
  snap?: number
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {

  const {
    disabled = true,
    disabledTimeRanges = [[10, 11]],
    onChange,
  } = props

  console.log(disabled, onChange)

  const [timeRange, setTimeRange] = useState<TimeRange | null>([0, 0])

  const handleChange = (value: TimeRange | null) => {
    console.log('value', value)
    setTimeRange(value)
    onChange && onChange(value)
  }


  return (
    <div>
      <div>

      </div>
      <DndProvider backend={HTML5Backend}>
        {/*<div style={{*/}
        {/*  width: '100%',*/}
        {/*  overflowX: "auto"*/}
        {/*}}>*/}
        {/*  <Container*/}
        {/*    snapToGrid*/}
        {/*    height={height}*/}
        {/*  />*/}
        {/*  <CustomDragLayer snapToGrid/>*/}
        {/*</div>*/}
      </DndProvider>
      <SelectController
        timeRange={timeRange}
        disabledTimeRanges={disabledTimeRanges}
        onChange={handleChange}
      />
    </div>
  )
}

export default TimeRangeSelector
