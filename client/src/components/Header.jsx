import React from 'react'
import '../styles/header.css'

function Header({currentDiv, setCurrentDiv}) {
  
  function changeCurrentDiv(div) {
    console.log(div)
    setCurrentDiv(div)
  }
  
  return (
    <header id="top-nav-bar">
      <ul className="header-nav-btns">
        {/* Get Code */}
        <li
          className="getCodeBtn"
          onClick={() => {changeCurrentDiv('getCode')}}
        >
          Get Code
        </li>
        {/* Upload Zip */}
        <li
          className="uploadBtn"
          onClick={() => {changeCurrentDiv('uploadZip')}}
        >
          Upload Zip
        </li>
        {/* Settings */}
        <li
          className="settingsBtn"
          onClick={() => {changeCurrentDiv('settings')}}
        >
          Settings
        </li>
        {/* Instructions */}
        <li
          className="instructionsBtn"
          onClick={() => {changeCurrentDiv('instructions')}}
        >
          Instructions
        </li>
      </ul>

      <a
        href="test_email_forms.zip"
        id="download_file"
        download="test_php_mailer.zip"
      >
        <button>Download Program</button>
      </a>

      <div className="burger">
        <aj-burger
          size="100%"
          dur=".3s"
          color="blue"
          hover="green"
          data-active="false"
          spin
        ></aj-burger>
      </div>
    </header>
  )
}

export default Header
