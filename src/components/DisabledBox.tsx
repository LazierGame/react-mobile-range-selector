import React, { useRef } from 'react'
import { Box } from './Box'

function getStyles(
  left: number
): React.CSSProperties {
  const transform = `translateX(${left}px)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform
  }
}

export interface DisabledBoxProps {
  isDisableTimeRange: boolean;
  boxWidth: number;
  height: number;
  left: number;
}

export const DisabledBox: React.FC<DisabledBoxProps> = (props) => {

  const {
    boxWidth,
    left,
    height,
    isDisableTimeRange
  } = props

  const doubleTouchRef = useRef<boolean>(false)

  const handleTouch = () => {
    setTimeout(() => {
      doubleTouchRef.current = false
    }, 750)
    doubleTouchRef.current = true
  }


  return (
    <div
      style={getStyles(left)}
      onTouchStart={handleTouch}
    >
      <Box
        height={height}
        disabled
        isDisableTimeRange={isDisableTimeRange}
        width={boxWidth}
      />
    </div>
  )
}
