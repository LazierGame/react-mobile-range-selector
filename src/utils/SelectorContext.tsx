import React, { createContext } from 'react'
import useMethods  from "use-methods";

export const SelectorContext = createContext<any | null>(null);

const initialState = {count: 0}

const methods = (state: {count: number}) => ({
  reset() {
    return initialState;
  },
  increment() {
    state.count++;
  },
  decrement() {
    state.count--;
  }
})


function useSelectorProviderElement(props: any) {
  const [
    state,
    dispatch,
  ] = useMethods(methods, initialState);

  return (
    <SelectorContext.Provider value={{state, dispatch}}>
      {props.children}
    </SelectorContext.Provider>
  )
}

export default function SelectorContextProvide(props: any) {
  const SelectorElement = useSelectorProviderElement(props);
  return (
    <React.Fragment>
      {SelectorElement}
    </React.Fragment>
  )
}
