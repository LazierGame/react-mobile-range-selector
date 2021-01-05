import React  from 'react'
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";
import { snapToGrid as doSnapToGrid } from '../utils/snapToGrid'

const styles: React.CSSProperties = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
  position: "relative"
}

export interface BoxProps {
  /** 当前为禁用项 */
  disabled?: boolean
  /** 当前宽度 */
  width?: number;
  /** 修改宽度 */
  onChange?: (width: number) => void;
}

function getBackgroundColor(isDisable: boolean) {
  return isDisable ? '#cfcfcf' : '#f59b9d'
}

export const Box: React.FC<BoxProps> = (
  {
    width: oldWidth = 30,
    disabled = false,
    onChange,
  }: BoxProps) => {

  const handleResizeChange = (_e: TouchEvent, _direction: Direction, _ref: HTMLElement, d: NumberSize) => {
    const currentWidth = doSnapToGrid(oldWidth + d.width)
    onChange && onChange(currentWidth)
  }

  const currentColor = getBackgroundColor(false)

  return<Resizable
      style={{
        ...styles,
        borderColor: currentColor,
        background: currentColor
      }}
      size={{width: oldWidth, height: 100,}}
      enable={{
        top: false,
        right: !disabled,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      onResizeStop={handleResizeChange}
    >
      {
        !disabled && <span
          style={{
            position: 'absolute',
            left: '100%',
            top: '50%',
            background: '#fff',
            transform: 'translate(-50%, -50%)',
            display: 'block',
            border: '2px solid #f0f0f0',
            borderColor: currentColor,
            width: 16,
            height: 16,
            borderRadius: '50%'
          }}
        />
      }
    </Resizable>
}
