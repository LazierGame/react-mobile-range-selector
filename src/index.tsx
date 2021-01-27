import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TimeRange } from "./interfaces";
import DragContainer from "./components/DragContainer";
import Container from "./components/Container";
import { CustomDragLayer } from "./components/CustomDragLayer";
import DragAndDrop from "./utils/DropContext";
import { rangeByType, RangeType } from "./utils/range";
import { snapToGrid } from "./utils/snapToGrid";
import { generateUUID } from "./utils/uid";
// @ts-ignore
import AlloyFinger from 'alloyfinger'

import './index.css'

interface TimeRangeSelectorProps {
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
  /** 滚动速度 */
  scrollSpeed?: number;
  /** 每次移动时候跳针的宽度 */
  snap?: number;
  /** 包含块点击时候穿出当前点击的位置 */
  onContainClick?: (value: number) => void;
  /** 调整到左边 left 的距离(px) */
  scrollLeft?: number;
  /** 为 0 或者 不传递则没有，否则为当前颜色的宽度 */
  disableBoxBorderWidth?: number;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {
  const {
    onContainClick,
    ruler = true,
    snap = 1,
    isSnapToGrid = true,
    value = null,
    height = 100,
    splitWidth = 100,
    disabled = false,
    scrollSpeed = 25,
    disabledTimeRanges = [[0, 9], [20, 24]],
    onChange,
    scrollLeft,
    disableBoxBorderWidth = 0
  } = props

  const uidRef = useRef<string>(generateUUID())

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
    if (typeof scrollLeft === "number") {
      // chorme 浏览器 40 版本下会无效
      scrollRef.current?.scrollTo({left: scrollLeft})
    }
  }, [scrollLeft])

  const boxWidth: number = Array.isArray(timeRange) && timeRange.length === 2 ? (timeRange[1] - timeRange[0]) * splitWidth : 0

  const handleContainClick = (value: number) => {
    console.log('value', value)
    const left = scrollRef.current.scrollLeft
    let clickPosition: number = left + value
    if (isSnapToGrid) {
      clickPosition = snapToGrid(clickPosition, snapWidth)
    }
    onContainClick && onContainClick(clickPosition / splitWidth)
  }
  const totalWidth: number = splitWidth * range.current.length


  useLayoutEffect(() => {
    setTimeout(() => {
      // todo, 先解决当前问题,  后续用 nextTick 解决
      const currentDom = document.getElementById(uidRef.current)
      new AlloyFinger(currentDom, {
        tap: function (e: any) {
          const tapValue = e?.changedTouches?.[0]?.clientX
          handleContainClick(tapValue)
        },
      });
    }, 750)
  }, [])

  return (
    <div
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
        {
          disabled ? (
            <Container
              uid={uidRef.current}
              left={value?.[0] ? value![0] * splitWidth : 0}
              boxWidth={boxWidth}
              isDisableTimeRange={isDisableTimeRange}
              totalWidth={totalWidth}
              splitWidth={splitWidth}
              disabledTimeRanges={disabledTimeRanges}
              height={height}
              disableBoxBorderWidth={disableBoxBorderWidth}
            />
          ) : (
            <DragAndDrop>
              <DragContainer
                uid={uidRef.current}
                totalWidth={totalWidth}
                splitWidth={splitWidth}
                disabled={disabled}
                disabledTimeRanges={disabledTimeRanges}
                isDisableTimeRange={isDisableTimeRange}
                isSnapToGrid={isSnapToGrid}
                snapWidth={snapWidth}
                height={height}
                scrollRef={scrollRef}
                value={timeRange}
                boxWidth={boxWidth}
                disableBoxBorderWidth={disableBoxBorderWidth}
                onChange={handleChange}
              />
              <CustomDragLayer
                height={height}
                disabled={disabled}
                scrollRef={scrollRef}
                scrollSpeed={scrollSpeed}
                isDisableTimeRange={isDisableTimeRange}
                boxWidth={boxWidth}
              />
            </DragAndDrop>
          )
        }
      </div>
    </div>
  )
}

export default TimeRangeSelector
