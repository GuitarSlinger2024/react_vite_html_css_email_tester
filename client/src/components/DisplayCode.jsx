import React from 'react'
import '../styles/header.css'
import InfoHeader from './InfoHeader'
import InfoSnippets from './infoSnippets'
import InfoAfter from './infoAfter'
import InfoBefore from './InfoBefore'

function DisplayCode() {
  return (
    <>
      <section id="displayCode">
        <div id="info">
          <InfoHeader />
          <InfoBefore />
          <InfoAfter />
          <InfoSnippets />
        </div>
      </section>
      <div id="theBottomLine">
        <div id="upArrow">Back To Top</div>
      </div>
    </>
  )
}

export default DisplayCode
