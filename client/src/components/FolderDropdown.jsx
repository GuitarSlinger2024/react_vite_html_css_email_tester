import React, { useState, useRef, useEffect } from 'react'
import trash from '../_img/trash.png'
import '../styles/dropdown.css'
import { json } from 'body-parser'

function FolderDropdown({
  label,
  placeHolder,
  options,
  setOptions,
  currentOpt,
  folderPath,
  fileTree,
  setFolderPath,
  setCurrentOpt,
  updateDb,
  emptyMsg,
  className,
}) {
  const [showList, setShowList] = useState(false)
  const [value, setValue] = useState(currentOpt)
  const myRef = useRef()

  useEffect(() => {
    console.log('%cRed', 'color: red;font-size:20px', { options })
  }, [options])

  //                  Start here for emails !!!!

  function createTemplateOption(opt) {
    console.log('%c - - - - - - -', 'font-size:24px', { opt })
    return (
      <>
        <div
          className={`templateOpt ${opt[1]}`}
          onClick={e => {
            templateOptionClicked(e)
          }}
        >
          {opt[0]}
        </div>
      </>
    )
  }

  function handleChange(e) {
    console.log(e.target)
    setValue(e.target.value)
  }

  async function templateOptionClicked(e) {
    let target = e.target

    console.log('Template option clicked')
    // setShowList(false)
    // setValue(target.textContent)
    let newPath = JSON.parse(JSON.stringify(folderPath))
    //  Add to the folderPath

    if (!target.classList.contains('back'))
      newPath = [...folderPath, e.target.textContent]
    else newPath.splice(-1)
    setFolderPath(newPath)

    const content = getNewFolderContent(newPath)
    console.log('%c content', 'color: blue;font-weight: 900', content)
    setOptions(content)

    const keys = Object.keys(content)
    const currentFiles = {}
    keys.forEach(key => {
      const type = content[key][key] ? 'template' : 'directory'
      currentFiles[key] = type
    })
    console.log('current', currentFiles)
    setOptions(currentFiles)
  }

  function getNewFolderContent(pathArray) {
    let branch = JSON.parse(JSON.stringify(fileTree))
    pathArray.forEach(keyVal => {
      branch = branch[keyVal]
    })
    return branch
  }

  function inputBlurred() {
    setTimeout(() => {
      setShowList(false)
    }, 150)
  }

  return (
    <div className={`form-container ${showList ? ' show' : ''}`}>
      <div className={`dropdown ${className}`}>
        <div className="input-container">
          <label>
            {label}
            {folderPath.length > 0
              ? folderPath.map((el, i) => <span key={i}> / {el}</span>)
              : <span> / root</span>}
          </label>
          <div
            ref={myRef}
            className="input"
            value={value}
            onChange={handleChange}
            contenteditable={'true'}
            placeholder={placeHolder}
            onFocus={() => {
              document
                .querySelectorAll('.show')
                .forEach(visible => visible.classList.remove('show'))
              setShowList(true)
              setValue(myRef.current.textContent)
              setTimeout(function () {
                const range = document.createRange()
                const selection = window.getSelection()

                range.setStart(myRef.current.childNodes[0], 0)
                range.collapse(true)

                selection.removeAllRanges()
                selection.addRange(range)
              }, 0)
            }}
            onBlur={inputBlurred}
          >
            {value}
            {/* {(currentOpt && titleCase(currentOpt.replace('_', ' '))) || (
            <span className="placeHolder">{placeHolder}</span>
          )} */}
          </div>
        </div>

        <div className={`datalist-container`}>
          <datalist className="datalist">
            {Object.entries(options).length > 0 && (
              <>
                {Object.entries(options).map((opt, i) => (
                  <div
                    className="option"
                    key={i}
                  >
                    {createTemplateOption(opt)}
                  </div>
                ))}
                {folderPath.length > 0 && (
                  <div
                    className="option"
                    key={'backBtn'}
                  >
                    {createTemplateOption(['Back One', 'back'])}
                  </div>
                )}
              </>
            )}

            {Object.entries(options).length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  inlineSize: '100%',
                }}
                className="back"
                onClick={e => {
                  optionClicked(e)
                }}
              >
                {emptyMsg}
              </div>
            )}
          </datalist>
        </div>
      </div>
    </div>
  )
}

export default FolderDropdown
