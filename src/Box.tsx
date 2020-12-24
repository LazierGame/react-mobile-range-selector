import React, { useRef, useState } from 'react'

const styles: React.CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export interface BoxProps {
  width?: number;
  title?: string;
}

export const Box: React.FC<BoxProps> = ({title, width: oldWidth = 30}: BoxProps) => {

  const isDown = useRef<boolean>(false)

  const [width, setWidth] = useState(oldWidth)

  const handleDrawMouseDown = (e: any) => {
    e.stopPropagation();
    isDown.current = true;
  }

  const handleDrawMouseUp = () => {
    console.log('xxx')
    isDown.current = false
  }

  const handleDrawMouseMove = (e: any) => {
    if (!isDown.current) {
      return
    }
    console.log(e)
    setWidth(width)
  }

  return <div
    style={{
      ...styles,
      width
    }}
  >{title}<span
    onTouchStart={handleDrawMouseDown}
    onTouchEnd={handleDrawMouseUp}
    onTouchMove={handleDrawMouseMove}
  /></div>
}
