import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { ItemTypes } from './interfaces'
import { BoxDragPreview } from './BoxDragPreview'
import { snapToGrid } from './utils/snapToGrid'

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
    x = snapToGrid(x)
    x += initialOffset.x
  }
  if (x <= 0) {
    x = 0
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
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const {boxWidth, snapToGrid} = props
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
        return <BoxDragPreview width={boxWidth} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  } else {
    if (currentOffset?.x) {
      const leftNumber = currentOffset!.x  + 100
      console.log('bbb', leftNumber)
      if (leftNumber > window.innerWidth) {
        // const data = document.getElementById('scroll')
      }
    }

    //
    //
    // console.log('aaa', window.innerWidth)
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, snapToGrid)}
      >
        {renderItem()}
      </div>
    </div>
  )
}
