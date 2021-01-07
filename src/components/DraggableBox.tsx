import React, { useEffect, useRef } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { ItemTypes } from '../interfaces'
import { Box } from './Box'

function getStyles(
  left: number,
  isDragging: boolean,
): React.CSSProperties {

  const transform = `translateX(${left}px)`

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export interface DraggableBoxProps {
  isDisableTimeRange: boolean;
  disabled: boolean;
  boxWidth: number;
  height: number;
  left: number;
  onRemove: () => void;
  onBoxWidthChange: (width: number) => void;
}

export const DraggableBox: React.FC<DraggableBoxProps> = (props) => {
  const {boxWidth, left,
    height, disabled, isDisableTimeRange, onRemove, onBoxWidthChange} = props

  const [{isDragging}, drag] = useDrag({
    item: {type: ItemTypes.BOX, left, top, width: boxWidth},
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })


  const handleRemove = () => {
    onRemove()
  }

  const doubleTouchRef = useRef<boolean>(false)

  const handleTouch = () => {
    setTimeout(() => {
      doubleTouchRef.current = false
    }, 750)
    if (doubleTouchRef.current) {
      handleRemove()
    }
    doubleTouchRef.current = true
  }

  // 如果当前滚动了，去除双次点击 ref
  useEffect(() => {
    if (isDragging) {
      doubleTouchRef.current = false
    }
  }, [isDragging])


  return (
    <div
      ref={drag}
      style={getStyles(left, isDragging)}
      onTouchStart={handleTouch}
    >
      <Box
        height={height}
        disabled={disabled}
        isDisableTimeRange={isDisableTimeRange}
        width={boxWidth}
        onChange={onBoxWidthChange}
      />
    </div>
  )
}
