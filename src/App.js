import { useContext, useEffect, useCallback } from 'react'
import { Contents } from './contents'
import { Background } from './background'
import { store } from './Store.js'

import './App.css'

function App() {
  const globalState = useContext(store)
  const {state: {video, menu, type, step}} = globalState
  const handleKeyPress = useCallback(({keyCode}) => {
    if (keyCode===88 && step==='ready') {
      globalState.dispatch({type: 'step', value: 'start'})
      setTimeout(() => {
        globalState.dispatch({type: 'step', value: 'connected'})
      }, 2000)
    } else if (step==='connected') {
      if (menu==='play') {
        if (keyCode===39 && type==='L') {
          globalState.dispatch({type: 'type', value: 'R'})
        } else if (keyCode===37 && type==='R') {
          globalState.dispatch({type: 'type', value: 'L'})
        } else if (keyCode===88 || keyCode===65) {
          window.open('https://www.krafton.com/kr/', 'krafton', 1200, 600)
        }
      }
      if (keyCode===38 || keyCode===40) {
        globalState.dispatch({type: 'menu', value: menu==='play' ? 'terms' : 'play'})
      }
      
    }
  }, [menu, type, step]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Background></Background>
      {video===4 &&
      <Contents></Contents>
      }
    </>
  )
}

export default App
