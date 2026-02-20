import '../styles/settings.css'
// import '../styles/styles.css'
import SETTINGS from '../data/settings.json'
// import { showColorSettings } from '../scripts/colorFunctions'
import { useEffect, useRef, useState } from 'react'
import ColorChoice from './ColorChoice'

function Settings({ currentDiv }) {
  const [colorSettings, setColorSettings] = useState(SETTINGS)
  const resetRef = useRef() //  reset button

  useEffect(() => {
    console.log('%csettings', 'color:blue', colorSettings)
    // showColorSettings(colorSettings)
  }, [colorSettings])

  return (
    <section
      className={`settings ${currentDiv !== 'settings' ? 'hideThisDiv' : ''}`}
      id="settings"
    >
      <div className="settings-inner">
        <h2>Settings</h2>
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

          {colorSettings.colors.map((setting, index) => {
            return (<ColorChoice 
              className={setting.className}
              value={setting.value}
              cssName={setting.cssName}
              index={index}
              type={setting.type}
              text={setting.text}
            />)
          })}

          <div
            className="colorSelector boxShadow"
            style={{ blockSize: 'max-content' }}
          >
            <div className="darkSide">
              <span>Sample Blur</span>
            </div>
            <div
              className="centerOf"
              style={{ padding: '0' }}
            >
              <div>
                <label for="blurInput">blur-radius</label>
                <input
                  type="number"
                  id="blurInput"
                />
                <span>px</span>
              </div>
              <div>
                <label for="spreadInput">spread-radius</label>
                <input
                  type="number"
                  id="spreadInput"
                />
                <span>px</span>
              </div>
              <div>
                <label for="borderRadius">border-radius</label>
                <input
                  type="number"
                  id="borderRadius"
                  className="borderRadius"
                />
                <span>px</span>
              </div>
            </div>
            <div className="lightSide">
              <span>Sample Blur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
