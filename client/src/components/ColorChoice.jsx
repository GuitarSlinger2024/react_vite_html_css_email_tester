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
    <div key={index} className={`colorSelector ${className}`}>
      <div className="darkSide">
        <span className="image">{text}</span>
      </div>
      <input
        type="string"
        className="centerOf"
        value={value}
      />
      <div className="lightSide">
        <span className="image">{text}</span>
      </div>
    </div>
  )
}

export default ColorChoice
