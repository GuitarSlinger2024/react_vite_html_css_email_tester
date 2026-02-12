
import '../styles/main.css'
import { useState } from 'react'
import GetCode from './GetCode'
import UploadZip from './UploadZip'
import Settings from './Settings'
import Instructions from './Instructions'

function Main({currentDiv, mode}) {

  return <main id="main">
    { currentDiv === 'getCode' && <GetCode mode={mode} />}
    { currentDiv === 'uploadZip' && <UploadZip />}
    { currentDiv === 'settings' && <Settings />}
    { currentDiv === 'instructions' && <Instructions />}
  </main>
}

export default Main
