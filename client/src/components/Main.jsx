import '../styles/main.css'
import { useState } from 'react'
import GetCode from './GetCode'
import UploadZip from './UploadZip'
import Settings from './Settings'
import Instructions from './Instructions'

function Main({ currentDiv, mode }) {
  console.log(
    '%c' + currentDiv,
    'font-size: 24px;font-weight:900;color:lightgreen'
  )

  return (
    <main id="main">
      <GetCode mode={mode} />
      {currentDiv === 'uploadZip' && <UploadZip currentDiv={currentDiv} />}
      {currentDiv === 'settings' && <Settings currentDiv={currentDiv} />}
      {currentDiv === 'instructions' && (
        <Instructions currentDiv={currentDiv} />
      )}
    </main>
  )
}

export default Main
