import React, { useEffect, useState } from 'react'
import { TimeRange } from "../interfaces";
import { d_flex, justify_content_between } from "../utils/style";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'


interface SelectControllerProps {
  timeRange?: TimeRange | null;
  disabledTimeRanges?: TimeRange[];
  onChange: (value: TimeRange | null) => void;
}

const controllerStyle: React.CSSProperties = {
  ...d_flex,
  ...justify_content_between,
  padding: '6px 12px'
}

function getParseTime(time: number): string {
  let splitTime = ('' + time).split('.')
  return `${('00' + splitTime[0]).slice(-2)} : ${splitTime.length === 2 ? '30' : '00'}`
}

function SelectController(props: SelectControllerProps) {
  const {timeRange, disabledTimeRanges, onChange} = props

  let leftTime: string = '';
  let rightTime: string = '';
  let minute: number = 0
  if (Array.isArray(timeRange) && timeRange.length === 2) {
    leftTime = getParseTime(timeRange[0])
    rightTime = getParseTime(timeRange[1])
    minute = (timeRange[1] - timeRange[0]) * 60
  }

  const [prevClickable, setPrveClickable] = useState<boolean>(true);
  const [nextClickable, setNextClickable] = useState<boolean>(true);

  useEffect(() => {
    if (!timeRange || timeRange?.length !== 2) {
      setPrveClickable(false)
      setNextClickable(false)
      return
    }

    if (!disabledTimeRanges?.length) {
      return;
    }

    let currentPrevClickable: boolean = true
    let currentNextClickable: boolean = true
    for (let disabledTime of disabledTimeRanges) {
      if (disabledTime[1] >= timeRange[0]) {
        currentPrevClickable = false
      }
      if (disabledTime[0] <= timeRange[1]) {
        currentNextClickable = false
      }
    }
    setPrveClickable(currentPrevClickable)
    setNextClickable(currentNextClickable)

  }, [disabledTimeRanges, timeRange])

  console.log(prevClickable)
  console.log(nextClickable)

  const handleChange = (identification: string) => () => {
    if (!Array.isArray(timeRange)) {
      return
    }
    if (identification === 'prev') {
      if (prevClickable && timeRange[0] > 0) {
        onChange([timeRange[0] - 0.5, timeRange[1]])
      }
    } else {
      if (nextClickable && timeRange[1] < 24) {
        onChange([timeRange[0], timeRange[1] + 0.5])
      }
    }
  }


  return <div
    style={controllerStyle}
  >
    <span onClick={handleChange('prev')}>
    <MinusCircleOutlined/>
    </span>
    <div>
      {
        leftTime && rightTime &&
        <span>{leftTime} - {rightTime}, </span>
      }
      <span>{minute} 分钟</span>
    </div>
    <span onClick={handleChange('next')}>
      <PlusCircleOutlined/>
    </span>
  </div>
}

export default SelectController
