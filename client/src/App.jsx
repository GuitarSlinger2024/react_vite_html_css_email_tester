import { useEffect, useState } from 'react'
import './App.css'
import TopOfScreen from './components/TopOfScreen'
import Header from './components/Header'
import Main from './components/main'

function App() {
  const [mode, setMode] = useState('dark')
  const [currentDiv, setCurrentDiv] = useState('')

  return (
    <>
      <TopOfScreen mode={mode} setMode={setMode}/>
      <Header currentDiv={currentDiv} setCurrentDiv={setCurrentDiv} />
      <Main currentDiv={currentDiv} mode={mode}/>
      <Header currentDiv={currentDiv} setCurrentDiv={setCurrentDiv} />
    </>
  )
}

export default App
