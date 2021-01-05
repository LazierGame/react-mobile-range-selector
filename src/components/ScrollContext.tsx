import React, { useState, memo, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";
import { TimeRange } from "../interfaces";


interface ScrollContextProps {
  value: TimeRange | null;
  onChange: (value: TimeRange | null) => void;
}

function ScrollContext(props: ScrollContextProps) {
  const {value, onChange} = props

  const [boxWidth, setBoxWidth] = useState(0)

  useEffect(() => {
    let currentBoxWidth: number = 0
    if (Array.isArray(value) && value.length === 2){
      currentBoxWidth = (value[1] - value[0]) * 100
    }
    setBoxWidth(currentBoxWidth)
  }, [value])

  return <div style={{
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
          listStyle: 'none',
          margin: 0,
          marginBottom: 10,
          padding: 0,
        }}
      >
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(x => (
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
          snapToGrid
          height={100}
          boxWidth={boxWidth}
          onChange={onChange}
        />
        <CustomDragLayer
          snapToGrid={false}
          boxWidth={boxWidth}
        />
      </DndProvider>
    </div>
  </div>
}

export default memo(ScrollContext)
