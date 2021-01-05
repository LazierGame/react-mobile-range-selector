import React, { useState } from 'react'
import { TimeRange } from "./interfaces";
import SelectController from "./components/SelectController";
import './index.css'
import ScrollContext from "./components/ScrollContext";

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
    setTimeRange(value)
    onChange && onChange(value)
  }




  return (
    <div style={{
      background: '#f6f6f6',
      marginTop: 100
    }}>
      <ScrollContext

      />
      <SelectController
        timeRange={timeRange}
        disabledTimeRanges={disabledTimeRanges}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
}

export default TimeRangeSelector
