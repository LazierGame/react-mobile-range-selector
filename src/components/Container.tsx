import React from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid } from '../utils/snapToGrid'
import { DragItem, ItemTypes, TimeRange } from '../interfaces'
import BanBlock from "./BanBlock";

const styles: React.CSSProperties = {
  border: '1px solid solid',
  position: 'relative',
}

export interface ContainerProps {
  splitWidth: number;
  boxWidth: number;
  isSnapToGrid: boolean;
  totalWidth: number;
  disabled: boolean;
  height: number;
  isDisableTimeRange: boolean;
  disabledTimeRanges: TimeRange[];
  value: TimeRange | null;
  snapWidth: number;
  onContainClick: (value: number) => void;
  scrollRef: any;
  onChange: (value: TimeRange | null) => void;
}


const Container: React.FC<ContainerProps> = (
  {
    totalWidth,
    snapWidth,
    splitWidth,
    isSnapToGrid,
    height,
    onChange,
    disabled,
    value,
    disabledTimeRanges,
    isDisableTimeRange,
    boxWidth,
    scrollRef,
    onContainClick
  }
) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(_item: DragItem, monitor) {
      const delta = monitor.getSourceClientOffset() as {
        x: number
        y: number
      }

      console.log()

      let left = Math.round(scrollRef.current.scrollLeft + delta.x)
      console.log('hh', delta.x, _item.left)
      if (isSnapToGrid) {
        left = doSnapToGrid(left, snapWidth)
      }
      console.log(left)

      // 如果 left 左边小于 0，强制为 0
      if (left <= 0) {
        left = 0
      }
      onChange([left / splitWidth, ((left + boxWidth) / splitWidth)])
      return undefined
    },
  })


  const handleBoxChange = (currentBoxWidth: number) => {
    if (isSnapToGrid) {
      currentBoxWidth = doSnapToGrid(currentBoxWidth, snapWidth)
    }
    const currentTimeRange: TimeRange = [value![0], value![0] + (currentBoxWidth / splitWidth)]
    onChange(currentTimeRange)
  }

  const handleContainClick = (e: any) => {
    onContainClick(e.changedTouches['0'].clientX)
  }


  return (
    <div style={{
      background: '#fff',
    }}>
      <div
        ref={drop}
        style={{
          ...styles,
          height,
        }}
        onTouchEnd={handleContainClick}
      >
        <div style={{
          position: 'absolute',
          width: totalWidth,
          height,
        }}/>
        {
          disabledTimeRanges.map(x => (
            <BanBlock
              splitWidth={splitWidth}
              height={height}
              key={x[0]}
              range={x}
            />
          ))
        }
        {
          !!boxWidth && <DraggableBox
            height={height}
            disabled={disabled}
            isDisableTimeRange={isDisableTimeRange}
            boxWidth={boxWidth}
            left={value![0] * splitWidth}
            onBoxWidthChange={handleBoxChange}
          />
        }
      </div>
    </div>

  )
}

export default Container
