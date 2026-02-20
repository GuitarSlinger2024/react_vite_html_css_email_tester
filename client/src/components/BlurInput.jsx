import React from 'react'

function BlurInput({id, text, value, index}) {
  return (
    <div key={index}>
      <label for={id}>{text}</label>
      <input
        type="number"
        id={id}
        value={value}
      />
      <span>px</span>
    </div>
  )
}

export default BlurInput
