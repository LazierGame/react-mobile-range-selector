import React from 'react'
import { TimeRange } from "../interfaces";

interface BanBoxProps {
  range: TimeRange
}


/**
 * 禁用的区域
 * @constructor
 */
function BanBlock(props: BanBoxProps) {
  const {range} = props
  const width: number = (range[1] - range[0]) * 100
  return <div
    style={{
      width,
      height: 100,
      background: 'linear-gradient(45deg,rgba(200, 200, 200, .5) 0, rgba(200, 200, 200, .5) 25%, transparent 25%, transparent 50%,rgba(200, 200, 200, .5) 50%, rgba(200, 200, 200, .5) 75%, transparent 75%, transparent)',
      backgroundSize: '8px 8px',
      position: 'absolute',
      transform: `translateX(${range[0] * 100}px)`,
    }}
  />
}

export default BanBlock
