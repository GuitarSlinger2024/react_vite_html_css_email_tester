import React from 'react'

function ColorChoice({
  className,
  value,
  index,
  cssName,
  type,
  text
}) {
  return (
    <>
      <div className={`darkSide ${className}`}>
        <span className={`image`}>{text}</span>
      </div>
      <input
        type="string"
        className={`centerOf ${className}`}
        value={value}
      />
      <div className={`lightSide ${className}`}>
        <span className={`image`}>{text}</span>
      </div>
    </>
  )
}

export default ColorChoice
