import React, { useCallback, useEffect, useState } from 'react'
import { TimeRange } from "./interfaces";
import Container from "./components/Container";
import { CustomDragLayer } from "./components/CustomDragLayer";
import DragAndDrop from "./utils/SingleContext";
import './index.css'

interface TimeRangeSelectorProps {
  /** 是否有标尺 */
  ruler?: boolean;
  /** 是否需要对齐格子 */
  isSnapToGrid?: boolean;
  /** 当前滑动条的高度 */
  height?: number;
  /** 当前滑动条刻度的宽度 */
  splitWidth?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 时间范围 */
  value?: TimeRange;
  /** 禁用的时间范围 */
  disabledTimeRanges?: TimeRange[];
  /** 修改 */
  onChange?: (value: TimeRange | null) => void;
  /** 每次移动时候跳针的宽度 */
  snap?: number;
  /** 点击时候添加时间块 */
  addByClick?: boolean;
  /** 具有双击去除 */
  removeByDbClick?: boolean;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {
  const {
    ruler = true,
    isSnapToGrid = true,
    value = null,
    height = 100,
    disabled = false,
    disabledTimeRanges = [[0, 9], [20, 24]],
    onChange,
    removeByDbClick = false
  } = props

  const [timeRange, setTimeRange] = useState<TimeRange | null>(value)

  useEffect(() => {
    setTimeRange(value)
  }, [value])

  const handleChange = useCallback((value: TimeRange | null) => {
    if (disabled) {
      return
    }
    setTimeRange(value)
    onChange && onChange(value)
  }, [])


  // 是否是不可用时间段，即不可用时间
  const [isDisableTimeRange, setIsDisableTimeRange] = useState(false)

  useEffect(() => {
    if (!Array.isArray(timeRange) || timeRange.length !== 2) {
      setIsDisableTimeRange(false)
      return
    }

    const isDisable: boolean = disabledTimeRanges.some(x => {
      const maxNum = Math.max(...[timeRange[0], timeRange[1], x[0], x[1]])
      const minNum = Math.min(...[timeRange[0], timeRange[1], x[0], x[1]])
      return maxNum - minNum < (timeRange[1] - timeRange[0]) + (x[1] - x[0])
    })

    setIsDisableTimeRange(isDisable)
  }, [disabledTimeRanges, timeRange])

  const boxWidth: number = Array.isArray(timeRange) && timeRange.length === 2 ? (timeRange[1] - timeRange[0]) * 100 : 0

  return (
    <div style={{
      borderTop: '1px solid rgba(0,0,0,.08)',
      borderBottom: '1px solid rgba(0,0,0,.08)'
    }}>
      <div style={{
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          /* 文本不会换行，文本会在在同一行上继续 */
          whiteSpace: 'nowrap',
          /* 可滑动 */
          overflowX: 'scroll'
        }}>
          <ul
            id='scroll'
            style={{
              paddingTop: 6,
              height: 30,
              width: 2400,
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(x => (
                <li
                  key={x}
                  style={{
                    ...ruler && {
                      borderLeft: '1px solid #c8c8c8'
                    },
                    paddingTop: 6,
                    height: 30,
                    boxSizing: "border-box",
                    paddingLeft: 4,
                    width: x !== 24 ? 100 : 0,
                    display: 'inline-block'
                  }}
                >{`${('00' + x).slice(-2)}:00`}</li>
              ))
            }
          </ul>
          <DragAndDrop>
            <Container
              disabled={disabled}
              disabledTimeRanges={disabledTimeRanges}
              isDisableTimeRange={isDisableTimeRange}
              isSnapToGrid={isSnapToGrid}
              height={height}
              value={timeRange}
              boxWidth={boxWidth}
              onChange={handleChange}
              removeByDbClick={removeByDbClick}
            />
            <CustomDragLayer
              height={height}
              disabled={disabled}
              isDisableTimeRange={isDisableTimeRange}
              boxWidth={boxWidth}
            />
          </DragAndDrop>
        </div>
      </div>
    </div>
  )
}

export default TimeRangeSelector
