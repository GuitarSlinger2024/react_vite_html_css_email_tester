import '../styles/main.css'
import { useState } from 'react'
import GetCode from './GetCode'
import UploadZip from './UploadZip'
import Settings from './Settings'
import Instructions from './Instructions'

function Main({ currentDiv, mode, templateData, setTemplateData }) {
  console.log(
    '%c' + currentDiv,
    'font-size: 24px;font-weight:900;color:lightgreen'
  )

  return (
    <main id="main">
      <GetCode
        mode={mode}
        templateData={templateData}
        setTemplateData={setTemplateData}
      />
      <UploadZip currentDiv={currentDiv} />
      <Settings currentDiv={currentDiv} />

      <Instructions currentDiv={currentDiv} />
    </main>
  )
}

export default Main
