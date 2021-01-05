import React, { useCallback, useState } from 'react'
import { TimeRange } from "./interfaces";
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
  snap?: number;
  /** 具有双击去除 */
  removeByDbClick?: boolean;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {

  const {
    disabled = false,
    disabledTimeRanges = [],
    onChange,
    removeByDbClick = false
  } = props

  console.log(disabled, disabledTimeRanges)


  const [timeRange, setTimeRange] = useState<TimeRange | null>(null)

  const handleChange = useCallback((value: TimeRange | null) => {
    setTimeRange(value)
    onChange && onChange(value)
  }, [])

  return (
    <div style={{
      background: '#f6f6f6',
      marginTop: 100,
      borderTop: '1px solid rgba(0,0,0,.08)',
      borderBottom: '1px solid rgba(0,0,0,.08)'
    }}>
      <ScrollContext
        value={timeRange}
        removeByDbClick={removeByDbClick}
        onChange={handleChange}
      />
    </div>
  )
}

export default TimeRangeSelector
