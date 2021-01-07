import React from 'react'
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
  isDisableTimeRange: boolean;
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const {boxWidth, height, disabled, isDisableTimeRange} = props

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

  if (!isDragging) {
    return null
  } else {
    if (currentOffset?.x) {
      const leftNumber = currentOffset!.x + boxWidth
      if (leftNumber + 20 > window.innerWidth) {
        const data = document.getElementById('scroll')

        if (data?.scrollLeft) {
          data.scrollTo({
            left: data?.scrollWidth
          })
        }

      }
    }
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
