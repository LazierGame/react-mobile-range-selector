import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TimeRange } from "./interfaces";
import DragContainer from "./components/DragContainer";
import Container from "./components/Container";
import { CustomDragLayer } from "./components/CustomDragLayer";
import DragAndDrop from "./utils/DropContext";
import { snapToGrid } from "./utils/snapToGrid";
import { generateUUID } from "./utils/uid";
// @ts-ignore
import AlloyFinger from 'alloyfinger'
import './index.css'

interface TimeRangeSelectorProps {
  /** 当前选择器的范围 */
  range: string[];
  /** 范围值(左边到右边) */
  value?: TimeRange;
  /** 当前滑动区高度 */
  height?: number;
  /** 当前滑动条刻度的距离 */
  splitWidth?: number;
  /** 禁用的范围区域(左值，右值，颜色) */
  disabledRanges?: TimeRange[];
  /** 禁用区域的边框宽度，为 0 则没有边框 */
  disableBoxBorderWidth?: number;
  /** 组件禁用 */
  disabled?: boolean;
  /** 滑动完成停留时是否对其刻度 */
  isSnapToGrid?: boolean;
  /** 停留时刻度值，1 表示整格，0.5 表示半格 */
  snap?: number;
  /** 选择器是否展示标尺 */
  ruler?: boolean;
  /** 滑块贴近边缘，反方向滚动速度 */
  scrollSpeed?: number;
  /** 当前左边距离原点的距离,动态调整 */
  scrollLeft?: number;
  /** 修改范围后的回调  */
  onChange?: (value: TimeRange | null) => void;
  /** 点击区域块的回调，返回当前点击的数值 */
  onContainClick?: (value: number) => void;
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
    disabledRanges = [],
    onChange,
    scrollLeft,
    disableBoxBorderWidth = 0
  } = props

  const uidRef = useRef<string>(generateUUID())

  const snapWidth: number = snap * splitWidth

  const scrollRef = useRef<any>(null)

  const range = useRef<string[]>(props.range || [])

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

    const isDisable: boolean = disabledRanges.some(x => {
      const maxNum = Math.max(...[timeRange[0], timeRange[1], x[0], x[1]])
      const minNum = Math.min(...[timeRange[0], timeRange[1], x[0], x[1]])
      return maxNum - minNum < (timeRange[1] - timeRange[0]) + (x[1] - x[0])
    })

    setIsDisableTimeRange(isDisable)
  }, [disabledRanges, timeRange])

  useLayoutEffect(() => {
    if (typeof scrollLeft === "number") {
      // chorme 浏览器 40 版本下会无效
      scrollRef.current?.scrollTo?.({left: scrollLeft})
    }
  }, [scrollLeft])

  const boxWidth: number = Array.isArray(timeRange) && timeRange.length === 2 ? (timeRange[1] - timeRange[0]) * splitWidth : 0

  const handleContainClick = (value: number) => {
    const left = scrollRef.current.scrollLeft
    let clickPosition: number = left + value
    if (isSnapToGrid) {
      clickPosition = snapToGrid(clickPosition, snapWidth)
    }
    onContainClick && onContainClick(clickPosition / splitWidth)
  }

  const totalWidth: number = splitWidth * range.current.length

  useLayoutEffect(() => {
    let af: any
    setTimeout(() => {
      // todo, 先解决当前问题,  后续用 nextTick 解决
      const currentDom = document.getElementById(uidRef.current)
      af = new AlloyFinger(currentDom, {
        tap: function (e: any) {
          const tapValue = e?.changedTouches?.[0]?.clientX
          // fix 此时会保存闭包，希望重新去一次数据
          handleContainClick(tapValue)
        },
      });
    }, 750)

    return () => {
      console.log('af', af)
      af = null
    }
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
              disabledRanges={disabledRanges}
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
                disabledRanges={disabledRanges}
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
