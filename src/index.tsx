import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import styles from './styles.module.css'


interface TimeRangeSelectorProps {
  text: string;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {
  return (
    <DndProvider backend={TouchBackend}>
      <div className="ruler horizontal">
        <div data-styled-id="rCS1z0diox" className="scena-manager scena-horizontal  rCS1z0diox"
             style="width: 100%; height: 100%;">
          <div className="scena-guide-origin"></div>
          <canvas width="2820" height="60" style="left: 30px; width: calc(100% - 30px); height: 100%;"></canvas>
        </div>
      </div>
      <div className={styles.test}>Example Component: {props.text}</div>
    </DndProvider>
  )
}

export default TimeRangeSelector
