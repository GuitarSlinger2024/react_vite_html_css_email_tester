import '../styles/settings.css'
import SETTINGS from '../data/settings.json'
import { showColorSettings } from '../scripts/colorFunctions'
import { useEffect, useRef, useState } from 'react'

function Settings({ currentDiv }) {
  const [colorSettings, setColorSettings] = useState(SETTINGS)
  const resetRef = useRef() //  reset button

  useEffect(() => {
    console.log('%csettings', 'color:blue', colorSettings)
    showColorSettings(colorSettings)
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

        <div class="colorChoices">
          <div class="colorSelector oldSrc">
            <div class="darkSide">
              <span class="image">./images/img.png</span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="image">./images/img.png</span>
            </div>
          </div>

          <div class="colorSelector newSrc">
            <div class="darkSide">
              <span class="cid">cid:image_1</span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="cid">cid:image_1</span>
            </div>
          </div>

          <div class="colorSelector hslValues">
            <div class="darkSide">
              <span class="hsl">hsl(216, 60%, 55%)</span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="hsl">hsl(216, 60%, 55%)</span>
            </div>
          </div>

          <div class="colorSelector hexValues">
            <div class="darkSide">
              <span class="hex">#4980d2</span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="hex">#4980d2</span>
            </div>
          </div>

          <div class="colorSelector commentsColor">
            <div class="darkSide">
              <span class="comment">{'<-- Comments -->'}</span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="comment">{'<-- Comments -->'}</span>
            </div>
          </div>

          <div class="colorSelector hslErrorsText">
            <div class="darkSide">
              <span class="error">hsla( error - text )</span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="error">hsla( error - text )</span>
            </div>
          </div>

          <div class="colorSelector hslErrorsBkground">
            <div class="darkSide">
              <span class="error">hsla( error - bkgrnd ) </span>
            </div>
            <input
              type="string"
              class="centerOf"
            />
            <div class="lightSide">
              <span class="error">hsla( error - bkgrnd ) </span>
            </div>
          </div>

          <div
            class="colorSelector boxShadow"
            style={{ blockSize: 'max-content' }}
          >
            <div class="darkSide">
              <span>Sample Blur</span>
            </div>
            <div
              class="centerOf"
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
                  class="borderRadius"
                />
                <span>px</span>
              </div>
            </div>
            <div class="lightSide">
              <span>Sample Blur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
