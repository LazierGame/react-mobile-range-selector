import React from 'react'
import { DndProvider } from 'react-dnd'
// import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'


interface TimeRangeSelectorProps {
  text: string;
}

function TimeRangeSelector(props: TimeRangeSelectorProps) {
  const {text} = props
  console.log(text)

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{
        marginLeft: 300
      }}>
        <Container snapToGrid/>
        <CustomDragLayer snapToGrid/>
      </div>
    </DndProvider>
  )
}

export default TimeRangeSelector
