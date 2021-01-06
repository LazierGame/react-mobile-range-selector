import React, { memo } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid, snapToFloor as doSnapToFloor } from '../utils/snapToGrid'
import { DragItem, ItemTypes, TimeRange } from '../interfaces'
import BanBlock from "./BanBlock";

const styles: React.CSSProperties = {
  width: 2300,
  border: '1px solid solid',
  position: 'relative',
}

export interface ContainerProps {
  boxWidth: number;
  removeByDbClick: boolean;
  snapToGrid: boolean;
  height: number;
  isDisableTimeRange: boolean;
  disabledTimeRanges: TimeRange[];
  value: TimeRange | null;
  onChange: (value: TimeRange | null) => void;
}


const Container: React.FC<ContainerProps> = (
  {
    snapToGrid,
    height,
    onChange,
    value,
    removeByDbClick,
    disabledTimeRanges,
    isDisableTimeRange,
    boxWidth
  }
) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,

    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let left = Math.round(item.left + delta.x)
      if (snapToGrid) {
        left = doSnapToGrid(left)
      }

      // 如果 left 左边小于 0，强制为 0
      if (left <= 0) {
        left = 0
      }
      onChange([left / 100, ((left + boxWidth) / 100)])
      return undefined
    },
  })

  const handleRemove = () => {
    if (removeByDbClick) {
      onChange(null)
    }
  }

  const handleBoxSet = (e: any) => {
    if (boxWidth) {
      return
    }
    const clientX: number = e.changedTouches['0'].clientX
    const currentTimeLeft = (doSnapToFloor(clientX) / 100)
    const currentTimeRange: TimeRange = [currentTimeLeft, currentTimeLeft + 0.5]
    onChange(currentTimeRange)
  }

  const handleBoxChange = (currentBoxWidth: number) => {
    const currentTimeRange: TimeRange = [value![0], value![0] + (currentBoxWidth / 100)]
    onChange(currentTimeRange)
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
        onTouchEnd={handleBoxSet}
      >
        {
          disabledTimeRanges.map(x => (
            <BanBlock key={x[0]} range={x}/>
          ))
        }
        {
          boxWidth && <DraggableBox
            isDisableTimeRange={isDisableTimeRange}
            boxWidth={boxWidth}
            left={value![0] * 50}
            onBoxWidthChange={handleBoxChange}
            onRemove={handleRemove}
          />
        }
      </div>
    </div>

  )
}

export default memo(Container)
