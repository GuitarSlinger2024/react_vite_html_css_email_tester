import React from 'react'
import image from '../../_img/6d584fb48005.svg'

function InfoHeader() {
  function refreshInfo(params) {
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <nav id="infoHeader">
      <div class="header-nav-btns">
        <ul id="showInfo">
          <div onClick={refreshInfo}>
            <img id="refreshPrev" src={image} alt="Refresh Preview"/>
            <li id="viewTemplate">Refresh</li>
          </div>
          <div style={{
            display: 'flex'
          }}>
            <li id="showOldHTML" onClick={refreshInfo}>
              Before
            </li>
            <li id="showNewHTML" onClick={refreshInfo}>
              After
            </li>
            <li id="showArray" onClick={refreshInfo}>
              Values
            </li>
            <li id="showPHP" onClick={refreshInfo}>
              Snippets
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default InfoHeader
