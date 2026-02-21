import '../styles/settings.css'
// import '../styles/styles.css'
import SETTINGS from '../data/settings.json'
// import { showColorSettings } from '../scripts/colorFunctions'
import { useEffect, useRef, useState } from 'react'
import ColorChoice from './ColorChoice'
import BlurInput from './BlurInput'
import { text } from 'body-parser'

function Settings({ currentDiv }) {
  const [colorSettings, setColorSettings] = useState(SETTINGS)
  const resetRef = useRef() //  reset button

  useEffect(() => {
    console.log('%csettings', 'color:blue', colorSettings)
    colorSettings.colors.forEach(color => {
      console.log({ color })
      document.body.style.setProperty(color.cssName, color.value)
    })
    // showColorSettings(colorSettings)
  }, [colorSettings])

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
        >
          Reset
        </div>

        <div className="colorChoices">

          <div className='blankDark'></div>
          <div></div>
          <div className='blankLight'></div>


          {colorSettings.colors.map((setting, index) => {
            return (
              <ColorChoice
                className={setting.className}
                value={setting.value}
                cssName={setting.cssName}
                index={index}
                type={setting.type}
                text={setting.text}
              />
            )
          })}


            <div className="boxShadow darkSide">
              <span>Sample Blur</span>
            </div>

            <div
              className="boxShadow centerOf"
              style={{ padding: '0' }}
            >
              {colorSettings.blur.map((blurVal, index) => (
                <BlurInput
                  id={blurVal.id}
                  text={blurVal.text}
                  value={blurVal.value}
                  index={index}
                />
              ))}

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
