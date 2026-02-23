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
  radio = [],
  setCurrentListName = null,
  name,
  onclick,
}) => {
  // const [showCheckbox, setShowCheckbox] = useState(true)
  function toggle() {
    if (onclick) onclick()

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

    const checkbox = document.querySelector(
      '.option.checkAll .checkbox div img'
    )
    console.log(checkbox)
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
      display: 'block',
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
      cursor: 'pointer',
    },
  })

  return (
    <div
      style={styles.container}
      // onChange={toggle}
      onClick={toggle}
      className="checkbox noSelect"
      checked={checked}
    >
      <div style={{ ...styles.box }}>
        {checked && (
          <img
            src={mode !== 'dark' ? blackCheck : whiteCheck}
            alt="check"
            style={styles.img}
          />
        )}
      </div>
      <label
        style={{ ...styles.label, marginLeft: '0' }}
        className="checkbox"
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
