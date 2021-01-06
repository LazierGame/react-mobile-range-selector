import React, { memo, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import Container from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";
import { TimeRange } from "../interfaces";


interface ScrollContextProps {
  height: number;
  disabledTimeRanges: TimeRange[]
  removeByDbClick: boolean;
  disabled: boolean;
  value: TimeRange | null;
  onChange: (value: TimeRange | null) => void;
}

function ScrollContext(props: ScrollContextProps) {
  const {value,disabled, onChange, removeByDbClick, disabledTimeRanges, height} = props


  // 是否是不可用时间段，即不可用时间
  const [isDisableTimeRange, setIsDisableTimeRange] = useState(false)

  useEffect(() => {
    if (!Array.isArray(value) || value.length !== 2) {
      setIsDisableTimeRange(false)
      return
    }

    const isDisable: boolean = disabledTimeRanges.some(x => {
      const maxNum = Math.max(...[value[0], value[1], x[0], x[1]])
      const minNum = Math.min(...[value[0], value[1], x[0], x[1]])
      return maxNum - minNum < (value[1] - value[0]) + (x[1] - x[0])
    })

    setIsDisableTimeRange(isDisable)
  }, [disabledTimeRanges, value])


  const boxWidth: number = Array.isArray(value) && value.length === 2 ? (value[1] - value[0]) * 100 : 0


  const [contextLeft, setContextLeft] = useState<number>(0)

  const handleTouchStart = (e: any) => {
    console.log(e)
  }

  const handleTouchMove = (e: any) => {
    console.log(e)
    setContextLeft(0)
  }

  return <div style={{
    overflow: 'hidden',
    position: 'relative'
  }}>
    <div style={{
      width: 2400,
      /* 文本不会换行，文本会在在同一行上继续 */
      whiteSpace: 'nowrap',
      /* 可滑动 */
      overflowX: 'scroll'
    }}>
      <ul
        onTouchStartCapture={handleTouchStart}
        onTouchMoveCapture={handleTouchMove}
        style={{
          position:'relative',
          left: contextLeft,
          listStyle: 'none',
          margin: 0,
          marginBottom: 10,
          padding: 0,
        }}
      >
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(x => (
            <li
              key={x}
              style={{
                width: x !== 24 ? 100 : 0,
                display: 'inline-block'
              }}
            >{`${('00' + x).slice(-2)}:00`}</li>
          ))
        }
      </ul>
      <DndProvider backend={TouchBackend}>
        <Container
          left={contextLeft}
          disabled={disabled}
          disabledTimeRanges={disabledTimeRanges}
          isDisableTimeRange={isDisableTimeRange}
          snapToGrid
          height={height}
          value={value}
          boxWidth={boxWidth}
          onChange={onChange}
          removeByDbClick={removeByDbClick}
        />
        <CustomDragLayer
          height={height}
          disabled={disabled}
          isDisableTimeRange={isDisableTimeRange}
          snapToGrid={false}
          boxWidth={boxWidth}
        />
      </DndProvider>
    </div>
  </div>
}

export default memo(ScrollContext)
