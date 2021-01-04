import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid } from './utils/snapToGrid'
import { DragItem, ItemTypes } from './interfaces'

const styles: React.CSSProperties = {
  width: 2300,
  border: '1px solid solid',
  position: 'relative',
}

export interface ContainerProps {
  snapToGrid: boolean;
  height: number;
  boxWidth: number;
  onBoxWidthChange: (width: number) => void
}

interface BoxProps {
  left: number;
  width?: number;
}


export const Container: React.FC<ContainerProps> = (
  {
    snapToGrid,
    height,
    onBoxWidthChange,
    boxWidth
  }
) => {

  const [currentRange, setCurrentRange] = useState<BoxProps | null>(null)

  const moveBox = useCallback(
    (left: number) => {
      setCurrentRange({...currentRange, left,})
    }, [currentRange],
  )

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,

    drop(item: DragItem, monitor) {
      console.log('drop', item)
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let left = Math.round(item.left + delta.x)
      if (snapToGrid) {
        left = doSnapToGrid(left)
      }
      if (left < 0) {
        left = 0
      }
      moveBox(left)
      return undefined
    },
  })

  const handleRemove = () => {
    setCurrentRange(null)
    onBoxWidthChange(0)
  }

  const handleBoxSet = (e: any) => {
    if (currentRange?.left) {
      return
    }
    console.log('xxxx', e.left, e.clientX, e.currentTarget.left)
    setCurrentRange({left: 20,})
  }


  return (
    <div
      ref={drop}
      style={{...styles, height, background: '#fff'}}
      onTouchEnd={handleBoxSet}
    >
      {
        currentRange && <DraggableBox
          boxWidth={boxWidth}
          {...currentRange}
          onBoxWidthChange={onBoxWidthChange}
          onRemove={handleRemove}
        />
      }
    </div>
  )
}
