import { useEffect, useRef, useCallback, useContext, useMemo } from 'react'
import { store } from '../Store.js';
import BG from '../static/videos/BG.webm'
import Title1 from '../static/videos/Title1.webm'
import Title2 from '../static/videos/Title2.webm'
import Title3 from '../static/videos/Title3.webm'
import launcherBGM from '../static/sounds/BGM_Launcher.wav'

export const Background = () => {
  const globalState = useContext(store)
  const {state: {video}} = globalState
  const Videos = useMemo(() => [Title1, Title2, Title3, BG], [])
  const backgroundVideo = useRef(null)
  const nextVideo = useCallback(() => {
    if (video<4) {
      globalState.dispatch({type: 'video', value: video+1})
      backgroundVideo.current.src = Videos[video]
    } else {
      backgroundVideo.current.onEnded = false
      backgroundVideo.current.loop = true
    }
    backgroundVideo.current.play()
   }, [video, backgroundVideo, Videos, globalState])

  useEffect(() => {
    const audio = new Audio(launcherBGM)
      audio.autoPlay = true
      audio.loop = true
      const played = audio.play()
      if (played !== undefined) {
        played
        .then(() => {
          console.log('Autoplay started!')
        })
        .catch(() => {
          console.log('Autoplay was prevented.')
        });
      }
      globalState.dispatch({type: 'video', value: video+1})
  }, [])

  return (
    <div className='background'>
      <video
        autoPlay
        muted
        onEnded={nextVideo}
        ref={backgroundVideo}
      >
        <source src={Videos[video]} type='video/webm'/>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}