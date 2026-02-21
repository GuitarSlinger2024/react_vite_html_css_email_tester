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
      <div className={`centerOf ${className}`}  >
      <input
        type="string"
        value={value}
      />        
      </div>

      <div className={`lightSide ${className}`}>
        <span className={`image`}>{text}</span>
      </div>
    </>
  )
}

export default ColorChoice
