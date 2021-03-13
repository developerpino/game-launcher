import React, {createContext, useReducer} from 'react';
import { Sounds } from './Sounds'

const initialState = {
  step: 'ready',
  menu: 'play',
  type: 'L',
  video: 0
}
const store = createContext(initialState)
const { Provider } = store
const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action)=>{
    switch (action.type) {
      case 'video':
        return {
          ...state,
          video: action.value
        }
      case 'menu':
        Sounds.select.play()
        return {
          ...state,
          menu: action.value
        }
      case 'step':
        if (action.value === 'start') {
          Sounds.start.play()
        }
        return {
          ...state,
          step: action.value
        }
      case 'type':
        Sounds.fiqure.play()
        return {
          ...state,
          type: action.value
        }
      default:
    };
  }, initialState)

  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export { store, StateProvider }