//      The docs for reactjs-stylesheet can be found at:
//      https://www.npmjs.com/package/reactjs-stylesheet#reactjs-stylesheet

import Stylesheet from 'reactjs-stylesheet'
import whiteCheck from '../_img/check_marks/white.png'
import blackCheck from '../_img/check_marks/black.png'

const Checkbox = ({
  label,
  mode,
  checked,
  setChecked,
  showBox = 'block',
  radio = [],
  showNewMsg = null,
  setCurrentListName = null,
  name,
  uncheckFavorites,
  onclick,
}) => {
  function toggle() {
    if (showNewMsg) {
      showNewMsg()
      uncheckFavorites(name === 'favorites' ? 'all' : name)
      return
    }

    if (onclick) onclick()

    //       RETURN if showNewMsg !== null
    //    So far this is only used for the favorites radio btn

    //  This condition checks if it is a radio btn
    if (radio.length > 0) {
      if (setCurrentListName) setCurrentListName(name)
      //  RETURN if it is a radio btn && already checked
      if (checked) return
      //  Reset other checkboxes
      radio.forEach(box => box(false))
    }

    //  Set new checked value
    setChecked()

    const checkbox = document.querySelector('.option.checkAll div.checkbox')
    if (checkbox) checkbox.click()
  }

  const styles = Stylesheet.create({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      inlineSize: 'fit-content',
      userSelect: 'none',
      cursor: 'pointer',
    },
    box: {
      position: 'relative',
      boxSizing: 'border-box',
      flexShrink: '0',
      border: `.625em solid ${mode === 'light' ? 'black' : 'white'}`,
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
      cursor: 'pointer',
    },
  })

  return (
    <div
      style={styles.container}
      // onChange={toggle}
      onClick={toggle}
      className="checkbox noSelect"
    >
      <div style={{ ...styles.box, display: showBox }}>
        {checked && (
          <img
            src={mode !== 'dark' ? blackCheck : whiteCheck}
            alt="check"
            style={styles.img}
          />
        )}
      </div>
      <label
        style={{
          ...styles.label,
          marginLeft: showBox === 'none' ? '.4em' : '0',
        }}
        className="checkbox"
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
