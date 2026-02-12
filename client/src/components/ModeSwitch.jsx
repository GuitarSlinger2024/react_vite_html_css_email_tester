import { useEffect, useState } from 'react'
import cloudsAndSun from '../_img/clouds_sun_weather.png'
import '../styles/modeSwitch.css'

function ModeSwitch({mode, setMode}) {
  const body = document.getElementsByTagName('body')[0]

  function changeMode() {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    body.classList.add(newMode)
    body.classList.remove(mode)
  }
  
  useEffect(() => {
    body.classList.add(mode)
  }, [])
  
  return (
    <div className="switch"
      onClick={changeMode}
    >
      <div className="flicker"></div>
      <div className="moon"></div>
      <img
        id="sun"
        src={cloudsAndSun}
        alt=""
      ></img>
    </div>
  )
}

export default ModeSwitch
