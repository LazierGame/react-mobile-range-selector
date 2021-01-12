import React, { useRef } from "react";
import { DndProvider, createDndContext } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

const RNDContext = createDndContext(TouchBackend);

interface DNDProps {
  children: React.ReactNode
}

function useDNDProviderElement(props: DNDProps) {
  const manager = useRef(RNDContext);

  if (!props.children) {
    return null;
  }

  return (
    <DndProvider manager={manager.current.dragDropManager!}>
      {props.children}
    </DndProvider>
  )
}

export default function DragAndDrop(props: DNDProps) {
  const DNDElement = useDNDProviderElement(props);
  return (
    <React.Fragment>
      {DNDElement}
    </React.Fragment>
  )
}
