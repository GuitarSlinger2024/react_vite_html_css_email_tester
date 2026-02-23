import '../styles/settings.css'

import { ColorContext } from '../context/ColorContext'
import { useEffect, useRef, useContext } from 'react'
import ColorChoice from './ColorChoice'
import BlurInput from './BlurInputs'

function Settings({ currentDiv }) {
  const { setDefaultValues, colorValues, blurValues, updateValues } =
    useContext(ColorContext)

  const resetRef = useRef() //  reset button

  useEffect(() => {
    if (!colorValues.imageBackground[0]) return
    Object.values(colorValues).forEach(color => {
      console.log({ color })
      document.body.style.setProperty(color[0].cssName, color[0].value)
    })
  }, [colorValues])

  useEffect(() => {
    if (!blurValues.border[0]) return
    document.body.style.setProperty(
      blurValues.blur[0].cssName,
      blurValues.blur[0].value + 'px'
    )
    document.body.style.setProperty(
      blurValues.spread.cssName,
      blurValues.spread.value + 'px'
    )
    updateValues()
  }, [blurValues])

  async function handleReset() {
    setDefaultValues()
  }

  return (
    <section
      className={`settings ${currentDiv !== 'settings' ? 'hideThisDiv' : ''}`}
      id="settings"
    >
      <div className="settings-inner">
        <h2>Color Settings</h2>
        <p>
          Each item uses the same color for both light and dark mode. You can
          change the box-shadow blur and spread values. Adding a border-radius
          can have a bigger effect when used with a box shadow instead of
          padding.
        </p>

        <div
          className="resetColorsBtn"
          ref={resetRef}
          onClick={handleReset}
        >
          Reset
        </div>

        <div className="colorChoices">
          {/* top margin */}
          <div className="blankDark"></div>
          <div></div>
          <div className="blankLight"></div>

          {/* color */}
          {colorValues.imageBackground[0] &&
            Object.values(colorValues).map((colorVal, index) => {
              return (
                <ColorChoice
                  colorVal={colorVal[0]}
                  setNewVal={colorVal[1]}
                  index={index}
                />
              )
            })}

          {/* box shadow */}
          <div className="boxShadow darkSide">
            <span>Sample Blur</span>
          </div>

          <div
            className="boxShadow centerOf"
            style={{ padding: '0' }}
          >
            {blurValues.border[0] &&
              Object.values(blurValues).map((blurVal, index) => {
                return (
                  <BlurInput
                    blurVal={blurVal[0]}
                    setNewVal={blurVal[1]}
                    index={index}
                  />
                )
              })}
          </div>
          <div className="boxShadow lightSide">
            <span>Sample Blur</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
