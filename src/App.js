import {useEffect, useRef} from 'react';
import './App.css';


function App() {
  const backgroundAudio = useRef(null);
  const backgroundVideo = useRef(null);
  const backgroundVideoSource = useRef(null);
  const videoNames = ['Title1', 'Title2', 'Title3', 'BG'];
  let videoIdx = 3;

  useEffect(() => {
    if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
    }
  }, []);

  function nextVideo() {
    if (videoIdx < 3) {
      videoIdx++;
      backgroundVideo.current.src = '/static/videos/'+videoNames[videoIdx]+'.webm';
    }
    backgroundVideo.current.play();
  }
  return (
    <>
      <video
        autoPlay
        muted
        onEnded={nextVideo}
        ref={backgroundVideo}
      >
        <source src={"/static/videos/"+videoNames[videoIdx]+".webm"} type="video/webm" ref={backgroundVideoSource}/>
        Your browser does not support the video tag.
      </video>
      <audio autoPlay loop ref={backgroundAudio}>
        <source src="/static/sounds/BGM_Launcher.wav" type="audio/wav"/>
        If you're reading this, audio isn't supported.
      </audio>
    </>
  );
}

export default App;
