import React, { useState } from 'react'
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";

const styles: React.CSSProperties = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export interface BoxProps {
  width?: number;
  onChange?: (width: number) => void;
}

export const Box: React.FC<BoxProps> = ({width: oldWidth = 30, onChange}: BoxProps) => {

  const [width, setWidth] = useState(oldWidth)

  const handleResizeChange = (_e: TouchEvent, _direction: Direction, _ref: HTMLElement, d: NumberSize) => {
    const currentWidth = width + d.width
    setWidth(currentWidth);
    onChange && onChange(currentWidth)
  }

  return <Resizable
    style={{
      ...styles,
      background: '#f59b9d'
    }}
    size={{width, height: 100,}}
    enable={{
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    }}
    onResizeStop={handleResizeChange}
  >拖动<span/></Resizable>
}
