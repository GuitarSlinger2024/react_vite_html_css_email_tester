import React, { useState } from 'react'
import '../../styles/header.css'
import InfoHeader from './InfoHeader'
import InfoView from './InfoView'
import InfoSnippets from './InfoSnippets'
import InfoAfter from './infoAfter'
import InfoBefore from './InfoBefore'

function DisplayCode({templateData, setTemplateData}) {

  return (
    <>
      <section id="displayCode">
        <InfoHeader />
        <div id="info">
          <InfoView
                  templateData={templateData}
                  setTemplateData={setTemplateData}
          />
          <InfoBefore />
          <InfoAfter />
          <InfoSnippets />
        </div>
      </section>
      <div id="theBottomLine">
        <div
          id="toTop"
          onClick={() => {
            window.scrollTo(0, 0)
          }}
        >
          Back To Top
        </div>
      </div>
    </>
  )
}

export default DisplayCode
