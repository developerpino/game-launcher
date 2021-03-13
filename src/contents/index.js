import { useCallback, useContext } from 'react'
import { LeftMenu } from './LeftMenu'
import { Play } from './play'
import { Terms } from './terms'
import { store } from '../Store.js';
import logoImg from '../static/images/img_launcher_tera_logo.png'
import shortcutXImg from '../static/images/btn_shortcut_x.png'
import './Contents.css'

export const Contents = () => {
  const globalState = useContext(store)
  const {state: {menu, step}} = globalState,
  changeStep = step => {
    globalState.dispatch({type: 'step', value: step})
    if (step==='start') {
      setTimeout(() => {
        globalState.dispatch({type: 'step', value: 'connected'})
      }, 2000)
    }
  },
  isWelcomeScreen = useCallback(() => {
    return ['ready', 'start'].includes(step)
  }, [step])
  
  return (
    <div className={isWelcomeScreen() ? 'contents logo' : 'contents'}>
      {isWelcomeScreen() &&
        <div><img src={logoImg} alt='img_launcher_tera_logo' /></div>
      }
      {step==='ready' && 
        <div className='logo-text blicker' onClick={()=>changeStep('start')}>Press the <img src={shortcutXImg} alt='btn_shortcut_x' /> button to play!</div>
      }
      {step==='start' &&
        <div className='logo-text'>Connected</div>
      }
      {step==='connected' &&
        <div className='main'>
          <LeftMenu></LeftMenu>
          <div className='container'>
            {menu==='play' &&
              <Play></Play>
            }
            {menu==='terms' &&
              <Terms></Terms>
            }
          </div>
        </div>
      }
    </div>
  )
}
