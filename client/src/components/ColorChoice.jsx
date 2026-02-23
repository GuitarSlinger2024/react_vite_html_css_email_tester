import React, { useState, useEffect, useRef } from 'react'

function ColorChoice({ colorVal, setNewVal, index }) {
  const [value, setValue] = useState(colorVal.value)
  const [text, setText] = useState(colorVal.text)

  useEffect(() => {
    console.log(colorVal, setNewVal, index)
  }, [])

  useEffect(() => {
    document.body.style.setProperty(colorVal.cssName, value)
  }, [value])

  useEffect(() => {
    setValue(colorVal.value)
  }, [colorVal])

  function handleChange(e) {
    setValue(e.target.value)
    setNewVal({ ...colorVal, value: e.target.value })
  }

  function handleKeyboard(e) {
    console.log(e.key)
    if (e.key === 'Enter') e.target.blur()
  }

  return (
    <>
      <div className={`darkSide ${colorVal.className}`}>
        <span className={`image`}>{text}</span>
      </div>
      <div className={`centerOf ${colorVal.className}`}>
        <input
          type="text"
          name={colorVal.id}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyboard}
        />
      </div>

      <div className={`lightSide ${colorVal.className}`}>
        <span className={`image`}>{text}</span>
      </div>
    </>
  )
}

export default ColorChoice
