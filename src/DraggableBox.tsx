import React, { useEffect } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { ItemTypes } from './interfaces'
import { Box } from './components/Box'

function getStyles(
  left: number,
  isDragging: boolean,
): React.CSSProperties {
  const transform = `translateX(${left}px)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export interface DraggableBoxProps {
  boxWidth: number;
  left: number;
  onRemove: () => void;
  onBoxWidthChange: (width: number) => void;
}

export const DraggableBox: React.FC<DraggableBoxProps> = (props) => {
  const {boxWidth, left, onRemove, onBoxWidthChange} = props

  const [{isDragging}, drag, preview] = useDrag({
    item: {type: ItemTypes.BOX, left, top, width: boxWidth},
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleRemove = () => onRemove()

  useEffect(() => {
    preview(<div>231</div>, {captureDraggingState: true})
  }, [])

  return (
    <div ref={drag} onDoubleClick={handleRemove} style={getStyles(left, isDragging)}>
      <Box onChange={onBoxWidthChange} width={boxWidth}/>
    </div>
  )
}
