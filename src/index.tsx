import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TimeRange } from "./interfaces";
import Container from "./components/Container";
import { CustomDragLayer } from "./components/CustomDragLayer";
import DragAndDrop from "./utils/DropContext";
import { rangeByType, RangeType } from "./utils/range";
import { snapToGrid } from "./utils/snapToGrid";
import './index.css'

interface TimeRangeSelectorProps {
  /** 初始化滚动位置 */
  initialScrollIndex?: number;
  /** 范围 */
  range: string[] | RangeType;
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
  /** 包含块点击时候穿出当前点击的位置 */
  onContainClick?: (value: number) => void;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {
  const {
    initialScrollIndex,
    onContainClick,
    ruler = true,
    snap = 1,
    isSnapToGrid = true,
    value = null,
    height = 100,
    splitWidth = 100,
    disabled = false,
    disabledTimeRanges = [[0, 9], [20, 24]],
    onChange,
  } = props

  const snapWidth: number = snap * splitWidth

  const scrollRef = useRef<any>(null)

  const range = useRef<string[]>((typeof props.range === 'string' ? rangeByType[props.range as RangeType] : props.range) || [])

  const [timeRange, setTimeRange] = useState<TimeRange | null>(value)

  useEffect(() => {
    setTimeRange(value)
  }, [value])

  const handleChange = useCallback((value: TimeRange | null) => {
    if (disabled) {
      return
    }
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


  useLayoutEffect(() => {
    if (typeof initialScrollIndex === "number") {
      scrollRef.current.scrollTo({left: snapToGrid(initialScrollIndex & splitWidth, snapWidth)})
    }
  }, [])

  const boxWidth: number = Array.isArray(timeRange) && timeRange.length === 2 ? (timeRange[1] - timeRange[0]) * splitWidth : 0

  const handleContainClick= (value: number) => {
    const left = scrollRef.current.scrollLeft
    const clickPosition = snapToGrid(left + value, snapWidth)
    onContainClick && onContainClick(clickPosition / splitWidth)
  }

  const totalWidth: number = splitWidth * range.current.length

  return (
    <div
      id='scroll'
      style={{
        borderTop: '1px solid rgba(0, 0, 0, .08)',
        borderBottom: '1px solid rgba(0, 0, 0, .08)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
      }}>
      <div
        ref={scrollRef}
        style={{
          /* 文本不会换行，文本会在在同一行上继续 */
          whiteSpace: 'nowrap',
          /* 可滑动 */
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollPadding: '0 0 0 10px',
        }}>
        <ul
          style={{
            paddingTop: 6,
            height: 30,
            width: totalWidth,
            maxWidth: totalWidth,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {
            range.current.map(x => (
              <li
                key={x}
                style={{
                  ...ruler && {
                    borderLeft: '1px solid #c8c8c8'
                  },
                  scrollSnapAlign: 'start',
                  paddingTop: 6,
                  height: 30,
                  boxSizing: "border-box",
                  paddingLeft: 4,
                  width: splitWidth,
                  display: 'inline-block'
                }}
              >{x}</li>
            ))
          }
        </ul>
        <DragAndDrop>
          <Container
            totalWidth={totalWidth}
            splitWidth={splitWidth}
            disabled={disabled}
            disabledTimeRanges={disabledTimeRanges}
            isDisableTimeRange={isDisableTimeRange}
            isSnapToGrid={isSnapToGrid}
            snapWidth={snapWidth}
            height={height}
            value={timeRange}
            boxWidth={boxWidth}
            onChange={handleChange}
            onContainClick={handleContainClick}
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
  )
}

export default TimeRangeSelector
