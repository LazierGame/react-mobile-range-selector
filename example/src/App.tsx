import React, { useState } from 'react'
import TimeRangeSelector  from 'react-time-range-selector'
import 'react-time-range-selector/dist/index.css'
import { TimeRange } from "../../src/interfaces";

const App = () => {
  const [state, setState] = useState([9, 10] as TimeRange)
  return <div>
    <TimeRangeSelector snap={0.25} range='day' value={state}  />
    <button onClick={() => setState(prevState => [prevState[0], prevState[1] + 10])}> +</button>
  </div>
}

export default App
