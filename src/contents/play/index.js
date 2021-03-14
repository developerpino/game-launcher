import { useCallback, useContext } from 'react'
import { store } from '../../Store.js';
import { data, images } from './Resource'
import './Play.css'

export const Play = () => {
  const globalState = useContext(store)
  const {state: {type}} = globalState
  const changeType = useCallback(item => {
    globalState.dispatch({type: 'type', value: item})
  }, [])
  const clickBtn = useCallback(({target: {dataset: {item}}}) => {
    if (typeof item==='string') {
      changeType(item)
    }
  }, [changeType])
  const getDotClass = useCallback((item) => {
    return typeof item==='string' && item !== type ? 'off-dot' : ''
  }, [type])

  return (
    <div className='box'>
      <div className='play'>
        <div>
          <img className='mainImg' src={data[type].img} alt='service moving info' />
          </div>
        <div className='title'>
          {data[type].title}
        </div>
        <div className='content'>
          {data[type].content}
        </div>
        <footer>
          <div className='btns'>
            <img onClick={clickBtn} data-item='L' src={images.L1Btn} alt='button L1'/>
            <img className={getDotClass('L')} onClick={clickBtn} data-item='L' src={images.dotImg} alt='selected unselected dot'/>
            <img className={getDotClass('R')} onClick={clickBtn} data-item='R' src={images.dotImg} alt='selected unselected dot'/>
            <img onClick={clickBtn} data-item='R' src={images.R1Btn} alt='button R1'/>
          </div>
          <div className='more'>
            <div
             onClick={()=>{
               window.open('https://www.krafton.com/kr/', 'krafton', 1000, 600)
             }}
             >
              <img src={images.squareImg} alt='button square' />
              Read More
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}