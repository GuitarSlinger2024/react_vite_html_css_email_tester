import { createContext, useEffect, useState } from 'react'
import SETTINGS from '../data/settings.json'

export const ColorContext = createContext()

export function SettingsProvider({ children }) {
  // //  This is the default values for the colors, blur & border-radius
  // const [colorDefaults, setColorDefaults] = useState(SETTINGS)

  //  //  Color
  const [imageBackground, setImageBackground] = useState()
  const [cidBackground, setCidBackground] = useState()
  const [hlsBackground, setHlsBackground] = useState()
  const [hexBackground, setHexBackground] = useState()
  const [commentColor, setCommentColor] = useState()
  const [errorColor, setErrorColor] = useState()
  const [errorBackground, setErrorBackground] = useState()

  //  //  blur & border-radius
  const [borderRadius, setBorderRadius] = useState()
  const [blurRadius, setBlurRadius] = useState()
  const [spreadRadius, setSpreadRadius] = useState()
  
  async function setDefaultValues() {
    console.log({SETTINGS})
    setImageBackground(SETTINGS.colors[0])
    setCidBackground(SETTINGS.colors[1])
    setHlsBackground(SETTINGS.colors[2])
    setHexBackground(SETTINGS.colors[3])
    setCommentColor(SETTINGS.colors[4])
    setErrorColor(SETTINGS.colors[5])
    setErrorBackground(SETTINGS.colors[6])
    setBlurRadius(SETTINGS.blur[0])
    setSpreadRadius(SETTINGS.blur[1])
    setBorderRadius(SETTINGS.blur[2])
  }

  useEffect(() => {
    setDefaultValues()
  }, [])

  const colorValues = {
    imageBackground: [imageBackground, setImageBackground],
    cidBackground: [cidBackground, setCidBackground],
    hlsBackground: [hlsBackground, setHlsBackground],
    hexBackground: [hexBackground, setHexBackground],
    commentColor: [commentColor, setCommentColor],
    errorColor: [errorColor, setErrorColor],
    errorBackground: [errorBackground, setErrorBackground],
  }

  const blurValues = {
    border: [borderRadius, setBorderRadius],
    blur: [blurRadius, setBlurRadius],
    spread: [spreadRadius, setSpreadRadius],
  }

  async function updateValues() {
    //  Color Values
    colorValues.imageBackground = [imageBackground, setImageBackground]
    colorValues.cidBackground = [cidBackground, setCidBackground]
    colorValues.hlsBackground = [hlsBackground, setHlsBackground]
    colorValues.hexBackground = [hexBackground, setHexBackground]
    colorValues.commentColor = [commentColor, setCommentColor]
    colorValues.errorColor = [errorColor, setErrorColor]
    colorValues.errorBackground = [errorBackground, setErrorBackground]
    //  Blur Values
    blurValues.border = [borderRadius, setBorderRadius]
    blurValues.blur = [blurRadius, setBlurRadius]
    blurValues.spread = [spreadRadius, setSpreadRadius]
  }


  return (
    <ColorContext.Provider
      value={{
        setDefaultValues,
        updateValues,
        colorValues,
        blurValues
      }}
    >
      {children}
    </ColorContext.Provider>
  )
}
