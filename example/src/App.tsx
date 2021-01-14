import React, { useState } from 'react'
import TimeRangeSelector  from 'react-time-range-selector'
import 'react-time-range-selector/dist/index.css'
import { TimeRange } from "../../src/interfaces";

const App = () => {
  const [state, setState] = useState([9, 10] as TimeRange)

  const handleChange = (value: any) => {
    setState(value)
  }

  const [state2, setState2] = useState([1, 2] as TimeRange)

  const handleChange2 = (value: any) => {
    setState2(value)
  }
  return <div>
    <TimeRangeSelector initialScrollIndex={(new Date()).getHours()} isSnapToGrid={false} snap={0.25} range='day' value={state} onChange={handleChange}  />
    <button onClick={() => setState(prevState => [prevState[0], prevState[1] + 1])}> +</button>
    <TimeRangeSelector initialScrollIndex={(new Date()).getHours()} isSnapToGrid={false} snap={0.25} range='day' value={state2} onChange={handleChange2}  />
  </div>
}

export default App
