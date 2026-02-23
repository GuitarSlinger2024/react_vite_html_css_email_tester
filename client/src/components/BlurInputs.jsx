import React, { useEffect, useRef, useState } from 'react'

function BlurInputs({ blurVal, setNewVal, index }) {
  const [value, setValue] = useState(blurVal.value)
  const [text, setText] = useState(blurVal.text)

  const inputRef = useRef(0)

  useEffect(() => {
    console.log({ blurVal })
  }, [])

  function handleChange(e) {
    const newValue = e.target.value >= 0 ? e.target.value : 0
    setValue(newValue)
    setNewVal({ ...blurVal, value: newValue })
  }

  useEffect(() => {
    const newValue = value >= 0 && value !== '' ? value : 0
    document.body.style.setProperty(blurVal.cssName, newValue + 'px')
  }, [value])

  useEffect(() => {
    setValue(blurVal.value)
  }, [blurVal])

  function handleKeyboard(e) {
    console.log(e.key)
    if (e.key === 'Enter') e.target.blur()
  }

  return (
    <div key={index}>
      <text for={blurVal.id}>{text}</text>
      <input
        ref={inputRef}
        type="number"
        id={blurVal.id}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyboard}
      />
      <span>px</span>
    </div>
  )
}

export default BlurInputs
