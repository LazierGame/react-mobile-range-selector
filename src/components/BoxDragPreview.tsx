import React, { useEffect, useState, memo } from 'react'
import { Box } from './Box'

const styles = {
  // marginTop: 28
}

export interface BoxDragPreviewProps {
  width: number;
  isDisableTimeRange: boolean;
}

export interface BoxDragPreviewState {
  tickTock: any

}

export const BoxDragPreview: React.FC<BoxDragPreviewProps> = memo(
  ({width, isDisableTimeRange}) => {
    const [tickTock, setTickTock] = useState(false)

    useEffect(
      function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500)
        return () => clearInterval(interval)
      },
      [tickTock],
    )

    return (
      <div style={styles}>
        <Box isDisableTimeRange={isDisableTimeRange} width={width}/>
      </div>
    )
  },
)
