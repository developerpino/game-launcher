import { useContext } from 'react'
import { store } from '../Store.js';
import logo from '../static/images/img_launcher_tera_logo.png'
import login from '../static/images/default-pic.png';
import sword from '../static/images/icon_launcher_txt_focus.png'
import xBTN from '../static/images/btn_shortcut_x.png'
import './LeftMenu.css'

export const LeftMenu = () => {
  const globalState = useContext(store)
  const {state: {menu}} = globalState
  return (
    <div className='left-menu'>
      <div>
        <img className='logo' src={logo} alt='big tera logo in launcher' />
      </div>
      <div className='login'>
        <div>
          <img src={login} alt='display your profile area' /> <span>Welcome, Pino</span>
        </div>
      </div>
      <div className='select'>
        <div
          className={menu==='play' ? 'item selected' : 'item'}
          onClick={()=>{
            globalState.dispatch({type: 'menu', value: 'play'})
          }}
        >
          <div className='text'><span className='sword'><img src={sword} alt='if selected menu, I wanna show you sword' /></span>Play</div>
        </div>
        <div
          className={menu==='terms' ? 'item selected' : 'item'}
          onClick={()=>{
            globalState.dispatch({type: 'menu', value: 'terms'})
          }}
        >
          <div className='text'><span className='sword'><img src={sword} alt='if selected menu, I wanna show you sword' /></span>Terms of Service</div>
        </div>
      </div>
      <div className='footer'>
        {menu==='play' &&
          <div
            className='playBtn'
            onClick={()=>{
              window.open('https://www.krafton.com/kr/', 'krafton', 1200, 600)
            }}
          >
            <img src={xBTN} alt='x button for select'/> Select
          </div>
        }
      </div>
    </div>
  )
}