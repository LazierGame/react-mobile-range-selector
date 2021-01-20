import React from 'react'
import BanBlock from "./BanBlock";
import { TimeRange } from "../interfaces";

const styles: React.CSSProperties = {
  border: '1px solid solid',
  position: 'relative',
}

export interface ContainerProps {
  splitWidth: number;
  totalWidth: number;
  height: number;
  disabledTimeRanges: TimeRange[];
  onContainClick: (value: number) => void;
}


const Container: React.FC<ContainerProps> = (
  {
    totalWidth,
    splitWidth,
    height,
    disabledTimeRanges,
    onContainClick
  }
) => {

  const handleContainClick = (e: any) => {
    onContainClick(e.changedTouches['0'].clientX)
  }

  return (
    <div style={{
      background: '#fff',
    }}>
      <div
        style={{
          ...styles,
          height,
        }}
        onTouchEnd={handleContainClick}
      >
        <div style={{
          position: 'absolute',
          width: totalWidth,
          height,
        }}/>
        {
          disabledTimeRanges.map(x => (
            <BanBlock
              splitWidth={splitWidth}
              height={height}
              key={x[0]}
              range={x}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Container
