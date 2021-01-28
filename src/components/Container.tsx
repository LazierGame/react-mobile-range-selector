import React from 'react'
import BanBlock from "./BanBlock";
import { TimeRange } from "../interfaces";
import { DisabledBox } from "./DisabledBox";

const styles: React.CSSProperties = {
  border: '1px solid solid',
  position: 'relative',
}

export interface ContainerProps {
  uid: string;
  boxWidth: number;
  left: number;
  isDisableTimeRange: boolean;
  splitWidth: number;
  totalWidth: number;
  height: number;
  disabledTimeRanges: TimeRange[];
  disableBoxBorderWidth: number;
}


const Container: React.FC<ContainerProps> = (
  {
    uid,
    boxWidth,
    left,
    isDisableTimeRange,
    totalWidth,
    splitWidth,
    height,
    disabledTimeRanges,
    disableBoxBorderWidth
  }
) => {


  return (
    <div style={{
      background: '#fff',
    }}>
      <div
        style={{
          ...styles,
          height,
        }}
        id={uid}
      >
        {
          !!boxWidth &&  <DisabledBox
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
              disableBoxBorderWidth={disableBoxBorderWidth}
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
