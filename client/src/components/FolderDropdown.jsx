import React, { useState, useRef, useEffect } from 'react'
import trash from '../_img/trash.png'
import '../styles/dropdown.css'

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
    if (target.className === 'empty') return
    console.log('Template option clicked')
    // setShowList(false)
    // setValue(target.textContent)
    
    
    //  Add to the folderPath
    const newPath = [...folderPath, e.target.textContent]
    setFolderPath(newPath)
    const content = getNewFolderContent(newPath)
    console.log('%c content', 'color: blue;font-weight: 900', content)
    setOptions(content)
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
          <label>{label}</label>
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
            {Object.entries(options).length > 0 && Object.entries(options).map((opt, i) => (
                  <div
                    className="option"
                    key={i}
                  >
                    {createTemplateOption(opt)}
                  </div>
                ))}
            {Object.entries(options).length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  inlineSize: '100%',
                }}
                className="empty"
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
