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
        <InfoHeader />
        <div id="info">
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
