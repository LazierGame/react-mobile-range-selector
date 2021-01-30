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

export interface DragContainerProps {
  uid: string;
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
  disableBoxBorderWidth: number;
  scrollRef: any;
  onContainerClick: any;
  onChange: (value: TimeRange | null) => void;
}


const DragContainer: React.FC<DragContainerProps> = (
  {
    uid,
    totalWidth,
    snapWidth,
    splitWidth,
    isSnapToGrid,
    height,
    disabled,
    value,
    disableBoxBorderWidth,
    disabledTimeRanges,
    isDisableTimeRange,
    boxWidth,
    scrollRef,
    onContainerClick,
    onChange,
  }
) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(_item: DragItem, monitor) {
      const delta = monitor.getSourceClientOffset() as {
        x: number
        y: number
      }

      let left = Math.round(scrollRef.current.scrollLeft + delta.x)
      if (isSnapToGrid) {
        left = doSnapToGrid(left, snapWidth)
      }

      // 如果 left 左边小于 0，强制为 0
      if (left <= 0) {
        left = 0
      } else if ((left + boxWidth) >= totalWidth) {
        left = totalWidth - boxWidth
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
        id={uid}
        onClick={onContainerClick}
      >
        <div style={{
          position: 'absolute',
          width: totalWidth,
          height,
        }}/>
        {
          disabledTimeRanges.map(x => (
            <BanBlock
              disableBoxBorderWidth={disableBoxBorderWidth}
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

export default DragContainer
