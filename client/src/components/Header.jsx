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
        href="https://github.com/GuitarSlinger2024/react_vite_html_css_email_tester.git"
        target='_blank'
      >
        <button>Github Repo</button>
      </a>

    </header>
  )
}

export default Header
