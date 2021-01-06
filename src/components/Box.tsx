import React from 'react'
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
  isDisableTimeRange: boolean;
  /** 当前为禁用项 */
  disabled?: boolean;
  /** 当前时间可使用? */
  canUse?: boolean;
  /** 当前宽度 */
  width?: number;
  /** 修改宽度 */
  onChange?: (width: number) => void;
}

function getBackgroundColor(isDisable: boolean) {
  return isDisable ? '#389e0d' : '#f59b9d'
}


export const Box: React.FC<BoxProps> = (
  {
    width: oldWidth = 30,
    isDisableTimeRange,
    disabled = false,
    onChange,
  }: BoxProps) => {

  const handleResizeChange = (_e: TouchEvent, _direction: Direction, _ref: HTMLElement, d: NumberSize) => {
    const currentWidth = doSnapToGrid(oldWidth + d.width)
    onChange && onChange(currentWidth)
  }

  const currentColor = getBackgroundColor(isDisableTimeRange)

  return <Resizable
    style={{
      ...styles,
      borderLeftColor: currentColor,
      borderRightColor: currentColor,
      borderTop: currentColor,
      borderBottom: currentColor,
      background: isDisableTimeRange ? currentColor : 'rgba(245,155,157,0.3)',
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
