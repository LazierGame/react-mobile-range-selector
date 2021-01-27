import React from 'react'
import BanBlock from "./BanBlock";
import { TimeRange } from "../interfaces";
import { DisabledBox } from "./DisabledBox";

const styles: React.CSSProperties = {
  border: '1px solid solid',
  position: 'relative',
}

export interface ContainerProps {
  boxWidth: number;
  left: number;
  isDisableTimeRange: boolean;
  splitWidth: number;
  totalWidth: number;
  height: number;
  disabledTimeRanges: TimeRange[];
  onContainClick: (value: number) => void;
}


const Container: React.FC<ContainerProps> = (
  {
    boxWidth,
    left,
    isDisableTimeRange,
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
        {
          boxWidth &&  <DisabledBox
            isDisableTimeRange={isDisableTimeRange}
            boxWidth={boxWidth}
            height={height}
            left={left}
          />
        }
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
