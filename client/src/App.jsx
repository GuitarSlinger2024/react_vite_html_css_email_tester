import { useEffect, useState } from 'react'
import './App.css'
import TopOfScreen from './components/TopOfScreen'
import Header from './components/Header'
import Main from './components/main'
import DisplayCode from './components/displayPages/DisplayCode'

function App() {
  const [mode, setMode] = useState('dark')
  const [currentDiv, setCurrentDiv] = useState('')
  const [templateData, setTemplateData] = useState({originalHtml: null})


  return (
    <>
      <TopOfScreen
        mode={mode}
        setMode={setMode}
      />
      <Header
        currentDiv={currentDiv}
        setCurrentDiv={setCurrentDiv}
      />
      <Main
        currentDiv={currentDiv}
        mode={mode}
        templateData={templateData}
        setTemplateData={setTemplateData}
        />
      <DisplayCode 
        templateData={templateData}
        setTemplateData={setTemplateData}
      />
    </>
  )
}

export default App
