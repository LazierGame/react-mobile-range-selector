import React, { useState } from 'react'
import TimeRangeSelector  from 'react-time-range-selector'
import 'react-time-range-selector/dist/index.css'
import { TimeRange } from "../../src/interfaces";

const App = () => {
  const [state, setState] = useState([9, 10] as TimeRange)

  const handleChange = (value: any) => {
    setState(value)
  }
  return <div>
    <TimeRangeSelector snap={0.25} range='day' value={state} onChange={handleChange}  />
    <button onClick={() => setState(prevState => [prevState[0], prevState[1] + 1])}> +</button>
  </div>
}

export default App
