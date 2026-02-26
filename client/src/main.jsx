import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SettingsProvider } from './context/ColorContext'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <SettingsProvider>
    <App />
  </SettingsProvider>
)
