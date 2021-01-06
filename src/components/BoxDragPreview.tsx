import React, { useEffect, useState, memo } from 'react'
import { Box } from './Box'


export interface BoxDragPreviewProps {
  width: number;
  disabled: boolean
  height: number;
  isDisableTimeRange: boolean;
}

export interface BoxDragPreviewState {
  tickTock: any

}

export const BoxDragPreview: React.FC<BoxDragPreviewProps> = memo(
  ({width, isDisableTimeRange, height, disabled}) => {
    const [tickTock, setTickTock] = useState(false)

    useEffect(
      function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500)
        return () => clearInterval(interval)
      },
      [tickTock],
    )

    return (
      <div>
        <Box
          height={height}
          isDisableTimeRange={isDisableTimeRange}
          disabled={disabled} width={width}
        />
      </div>
    )
  },
)
