import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
// import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'
import { TimeRange } from "./interfaces";
import SelectController from "./components/SelectController";
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
      <div style={{
        overflow: 'hidden'
      }}>
        <div style={{
          background: '#eee',
          /* 文本不会换行，文本会在在同一行上继续 */
          whiteSpace: 'nowrap',
          /* 可滑动 */
          overflowX: 'scroll'
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(x => (
                <li
                  key={x}
                  style={{
                    width: x !== 24 ? 100 : 0,
                    background: '#fff',
                    display: 'inline-block'
                  }}
                >{`${('00' + x).slice(-2)}:00`}</li>
              ))
            }
          </ul>

          <DndProvider backend={HTML5Backend}>
              <Container
                snapToGrid
                height={100}
              />
              <CustomDragLayer snapToGrid/>
          </DndProvider>
        </div>
      </div>

      <SelectController
        timeRange={timeRange}
        disabledTimeRanges={disabledTimeRanges}
        onChange={handleChange}
      />

    </div>
  )
}

export default TimeRangeSelector
