import React, { useEffect, useRef } from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { ItemTypes } from '../interfaces'
import { BoxDragPreview } from './BoxDragPreview'

const layerStyles: React.CSSProperties = {
  marginTop: 30,
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let {x} = currentOffset

  const transform = `translate(${x}px)`

  return {
    transform,
    WebkitTransform: transform,
  }
}

export interface CustomDragLayerProps {
  boxWidth: number;
  disabled: boolean;
  height: number;
  scrollRef: any;
  isDisableTimeRange: boolean;
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const {boxWidth, height, disabled, isDisableTimeRange, scrollRef} = props

  const {
    itemType,
    isDragging,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview
          height={height}
          isDisableTimeRange={isDisableTimeRange}
          disabled={disabled}
          width={boxWidth}
        />
      default:
        return null
    }
  }

  const initialLeftRef = useRef<any>(null)
  const lastLeftRef = useRef<any>(null)

  // 开始拖动
  const starDragRef = useRef<boolean>(false)

  const handleScrollWhenDragging = (currentX: number) => {
    const scrollLeft: number = scrollRef.current.scrollLeft
    let currentLeft = scrollLeft
    if (currentX < 0) {
      currentLeft -= 20
    }
    lastLeftRef.current = currentLeft
    console.log('last', currentLeft)
    starDragRef.current = false
    scrollRef.current.scrollTo({left: currentLeft})
  }


  const getCurrentX = (): number => {
    const x = currentOffset?.x || 0
    console.log(x)
    return x
  }

  useEffect(() => {
    const scrollLeft: number = scrollRef.current.scrollLeft
    console.log('initial', initialLeftRef.current)
    if (!isDragging && !starDragRef.current) {
        if (
          typeof initialLeftRef.current === 'number' &&
          typeof lastLeftRef.current === 'number') {
          console.log('gggggggg', initialLeftRef.current - lastLeftRef.current)
        }
    } else {
      if (!starDragRef.current) {
        starDragRef.current = true
        initialLeftRef.current = scrollLeft
        console.log('initial', initialLeftRef.current)
      }
    }
    if (!scrollRef || !currentOffset) {
      return
    }

    // const {x} = currentOffset
    const intervalRef = setInterval(() => {
      handleScrollWhenDragging(getCurrentX() as number)
    }, 50)
    return () => {
      clearInterval(intervalRef)
    }
  }, [isDragging, currentOffset])

  if (!isDragging) {
    return null
  }


  return (
    <div style={layerStyles}>
      <div
        style={
          getItemStyles(initialOffset, currentOffset)
        }
      >
        {renderItem()}
      </div>
    </div>
  )
}
