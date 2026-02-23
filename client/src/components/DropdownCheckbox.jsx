//      The docs for reactjs-stylesheet can be found at:
//      https://www.npmjs.com/package/reactjs-stylesheet#reactjs-stylesheet

import Stylesheet from 'reactjs-stylesheet'
import whiteCheck from '../_img/check_marks/white.png'
import blackCheck from '../_img/check_marks/black.png'
import { useEffect, useState } from 'react'

const DropdownCheckbox = ({
  label,
  mode,
  showBox = 'block',
}) => {
  const [checkThis, setCheckThis] = useState(false)
  function toggle() {
    console.log(`is checked? : ${!checkThis}`)
    //  Set new checked value
    setCheckThis(!checkThis)
  }
  
const styles = Stylesheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    inlineSize: 'fit-content',
    userSelect: 'none',
    cursor: 'pointer'
  },
  box: {
    position: 'relative',
    boxSizing: 'border-box',
    flexShrink: '0',
    border: `.0625em solid ${mode === 'light' ? 'black' : 'white'}`,
    marginInlineEnd: '.7em',
    blockSize: '1em',
    inlineSize: '1em',
  },
  img: {
    position: 'absolute',
    inlineSize: '170%',
    insetBlockStart: '-.4em',
    left: '-.25em',
  },
  label: {
    userSelect: 'none',
    whiteSpace: 'wrap',
    textWrap: 'balance',
    lineHeight: 1,
    cursor: 'pointer'
  },
})

  return (
    <div
      style={styles.container}
      checked={`${checkThis}`}
      onClick={toggle}
      className="checkbox noSelect"
    >
      <div style={{...styles.box, display: `${showBox ? 'block' : 'none'}`}}>
        {checkThis && (
          <img
            src={mode !== 'dark' ? blackCheck : whiteCheck}
            alt="check"
            style={styles.img}
          />
        )}
      </div>
      <label
        style={{...styles.label, marginLeft: showBox === 'none' ? '.4em' : '0'}}
        className="checkbox"
      >
        {label}
      </label>
    </div>
  )
}

export default DropdownCheckbox

