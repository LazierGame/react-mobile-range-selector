import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import styles from './styles.module.css'


interface Props {
  text: string
}

export const ExampleComponent = ({text}: Props) => {
  return (
    <DndProvider backend={TouchBackend}>
      <div className={styles.test}>Example Component: {text}</div>
    </DndProvider>
  )
}
