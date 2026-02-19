import React from 'react'
import '../styles/topOfScreen.css'
import ModeSwitch from './ModeSwitch'

function TopOfScreen({mode, setMode}) {
  return (
    <>
      <div className="top_of_screen">
        <div className="userName">
          <h5>User Name:</h5>
          <p id="userName">general public</p>
        </div>

        <ModeSwitch mode={mode} setMode={setMode} />

        <h1 className="main-title">
          <span>Test HTML CSS Emails</span>
        </h1>
      </div>
    </>
  )
}

export default TopOfScreen