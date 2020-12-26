import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import { DragItem, ItemTypes } from './interfaces'

const styles: React.CSSProperties = {
  border: '1px solid black',
  position: 'relative',
}

export interface ContainerProps {
  snapToGrid: boolean;
  height: number
}

interface BoxProps {
  left: number;
  title: string
}


export const Container: React.FC<ContainerProps> = (
  {
    snapToGrid,
    height
  }
) => {

  const [currentRange, setCurrentRange] = useState<BoxProps | null>(null)

  const moveBox = useCallback(
    (left: number) => {
      setCurrentRange({...currentRange, left, title: 'Drag me around'})
    }, [currentRange],
  )

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let left = Math.round(item.left + delta.x)
      if (snapToGrid) {
        ;[left] = doSnapToGrid(left)
      }
      moveBox(left)
      return undefined
    },
  })

  const handleRemove = () => setCurrentRange(null)

  const handleBoxSet = (e: any) => {
    if (currentRange?.left) {
      return
    }
    setCurrentRange({left: 20, title: '333333'})
    console.log(e.clientX, e.currentTarget)
  }

  return (
    <div ref={drop} style={{...styles, height}} onClick={handleBoxSet}>
      {
        currentRange && <DraggableBox
          {...currentRange}
          onRemove={handleRemove}
        />
      }
    </div>
  )
}
