import React from 'react'
import image from '../_img/6d584fb48005.svg'

function InfoHeader() {
  return (
    <nav id="infoHeader">
      <div class="header-nav-btns">
        <ul id="showInfo">
          <div>
            <img id="refreshPrev" src={image} alt="Refresh Preview"/>
            <li className="radio" id="viewTemplate">
              Refresh
            </li>
          </div>
          <div style={{
            display: 'flex'
          }}>
            <li className="radio" id="showOldHTML">
              Before
            </li>
            <li className="radio" id="showNewHTML">
              After
            </li>
            <li className="radio" id="showArray">
              Values
            </li>
            <li className="radio" id="showPHP">
              Snippets
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default InfoHeader
