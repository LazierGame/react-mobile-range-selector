import React from 'react'
import { TimeRange } from "../interfaces";

interface BanBoxProps {
  height: number;
  splitWidth: number;
  range: TimeRange
}


/**
 * 禁用的区域
 * @constructor
 */
function BanBlock(props: BanBoxProps) {
  const {range, height, splitWidth} = props
  const width: number = (range[1] - range[0]) * splitWidth
  const color = range[2] || ''+ 'rgba(200, 200, 200, .5)'
  const background = `linear-gradient(45deg, ${color} 0, ${color} 25%, transparent 25%, transparent 50%,${color} 50%, ${color} 75%, transparent 75%, transparent)`
  return <div
    style={{
      width,
      height,
      background,
      backgroundSize: '4px 4px',
      position: 'absolute',
      transform: `translateX(${range[0] * splitWidth}px)`,
    }}
  />
}

export default BanBlock
