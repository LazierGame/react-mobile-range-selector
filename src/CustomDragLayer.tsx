import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { ItemTypes } from './interfaces'
import { BoxDragPreview } from './BoxDragPreview'
import { snapToGrid } from './snapToGrid'

const layerStyles: React.CSSProperties = {
  position: 'fixed',
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
    ;[x] = snapToGrid(x)
    x += initialOffset.x
  }
  if (x <= 0 ) {
    x = 0
  }

  const transform = `translate(${x}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export interface CustomDragLayerProps {
  snapToGrid: boolean
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const {
    itemType,
    isDragging,
    item,
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
        return <BoxDragPreview title={item.title} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {renderItem()}
      </div>
    </div>
  )
}