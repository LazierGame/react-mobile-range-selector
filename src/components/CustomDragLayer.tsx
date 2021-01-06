import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { ItemTypes } from '../interfaces'
import { BoxDragPreview } from './BoxDragPreview'
import { snapToGrid } from '../utils/snapToGrid'

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
  isSnapToGrid: boolean,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  let {x} = currentOffset

  if (isSnapToGrid) {
    x -= initialOffset.x
    x = snapToGrid(x)
    x += initialOffset.x
  }

  const transform = `translate(${x}px)`

  return {
    transform,
    WebkitTransform: transform,
  }
}

export interface CustomDragLayerProps {
  snapToGrid: boolean;
  boxWidth: number;
  disabled: boolean;
  height: number;
  isDisableTimeRange: boolean;
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const {boxWidth, snapToGrid, height, disabled, isDisableTimeRange} = props

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
          getItemStyles(initialOffset, currentOffset, snapToGrid)
        }
      >
        {renderItem()}
      </div>
    </div>
  )
}
