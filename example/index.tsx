import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RangeSelector   from '../.'
import { TimeRange } from '../src/interfaces'

const {useState} = React

const App = () => {

  const [state, setState] = useState([9, 10] as TimeRange)
  const handleChange = (value: any) => {
    setState(value)
  }

// const [state2, setState2] = useState([9, 10] as TimeRange)
// const handleChange2 = (value: any) => {
//   setState2(value)
// }

  const hour: number = (new Date()).getHours()

  const [scrollLeft, setScrollLeft] = useState(hour * 100)
  return (
    <div>
      <RangeSelector
        isSnapToGrid={true}
        scrollLeft={scrollLeft}
        snap={0.25}
        range={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(x => '' + x)}
        value={state}
        disabledRanges={[[0,9], [20,24]]}
        scrollSnapAlign='start'
        onChange={handleChange}
      />
      <button onClick={() => setScrollLeft(prevState => prevState + 100)}> +</button>
      {/*<TimeRangeSelector initialScrollIndex={(new Date()).getHours()} isSnapToGrid={false} snap={0.25} range='day' value={state2} onChange={handleChange2}  />*/}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
