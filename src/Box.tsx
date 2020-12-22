import React from 'react'

const styles: React.CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export interface BoxProps {
  title: string;
  yellow?: boolean;
}

export const Box: React.FC<BoxProps> = ({title}) => {
  return <div
    style={{...styles}}
  >{title}</div>
}
