import '../../styles/view.css'
import React, { useEffect, useRef, useState } from 'react'

function InfoView({ templateData, setTemplateData }) {
  const [viewedHTML, setViewedHTML] = useState(null)
  const frameRef = useRef()

  useEffect(() => {
    console.log({ InfoView: templateData })
    //  This would be where to process the html to display the images
    setViewedHTML(templateData?.originalHTML || null)
    
    const iframe = document.getElementById('my-iframe')
    
    iframe.addEventListener('load', () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (!iframeDoc) {
        console.error('Failed to access iframe document (check origin).');
        return;
      }
     
      console.log('Iframe title:', iframeDoc.title); // Access iframe's title
      // const doc = iframeElement.document || iframeElement.contentDocument;
      // const images = doc.getElementsByTagName('img')
      // console.log(images)
    })
    

    // setTimeout(() => {
    // console.log({images})      
    // }, 500);
 
  }, [templateData])



  return (
    <pre
      id="preInfo_view"
      className="preInfo"
    >
      <div className="iframe-container">
        <iframe
        id='my-iframe'
        ref={frameRef}
        
        sandbox="allow-downloads"
          // width="100%"
          // height="100%"
          // src="https://www.youtube.com/embed/tmg6d3T_T6Q"
          // src={templateData.html.templateHtml : null}
          //
          src={
            viewedHTML
              ? 'data:text/html,' +
                encodeURIComponent(viewedHTML)
              : null
          }
          title="Preview HTML CSS Emails"
        ></iframe>
      </div>
    </pre>
  )
}

export default InfoView
