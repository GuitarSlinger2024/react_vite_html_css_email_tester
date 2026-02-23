import React, { useState, useRef, useEffect } from 'react'
import trash from '../_img/trash.png'
import '../styles/dropdown.css'
import { json } from 'body-parser'

function FolderDropdown({
  label,
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
  areFolders, setAreFolders,
  areTemplates, setAreTemplates
}) {
  const [showList, setShowList] = useState(false)
  const [value, setValue] = useState('')
  const myRef = useRef()

  useEffect(() => {
    if (options.length === 0) return
    console.log('%c Folder Dropdown Gold', 'color: gold;font-size:20px', { options })
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
    // let target = e.target.classList.includes('option') ? e.target.querySelector('.templateOpt') : e.target
    let target = e.target

    console.log('Template option clicked')
    console.log('template? ' + target.classList.contains('template'))
    setValue('')
    const iAmTemplate = target.classList.contains('template')

    // setShowList(false)
    // setValue(target.textContent)
    let newPath = JSON.parse(JSON.stringify(folderPath))
    //  Add to the folderPath

    if (target.classList.contains('back')) newPath.splice(-1)
    // else if (target.classList.contains(''))
    else if (!iAmTemplate) newPath = [...folderPath, e.target.textContent]
    setFolderPath(newPath)

    let content = getNewFolderContent(newPath)
    console.log('%c content', 'color: blue;font-weight: 900', content)

    if (iAmTemplate) {
      setValue(<span className='template'>{target.textContent}</span>)
      // content = []
    }

    ///  It's a folder - either directory or template
    setOptions(content)

    const keys = Object.keys(content)
    const currentFiles = {}
    let templates = 0
    let directories = 0
    keys.forEach(key => {
      const type = content[key][key] ? 'template' : 'directory'
      if (type === 'template') templates++
      if (type === 'directory') directories++
      currentFiles[key] = type
    })
    console.log('current 1:', currentFiles)

    setAreFolders(directories > 0)
    setAreTemplates(templates > 0)
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
            {folderPath.length > 0 ? (
              folderPath.map((el, i) => <span key={i}> / {el}</span>)
            ) : (
              <span> / root</span>
            )}
          </label>
          <div
            spellCheck='false'
            ref={myRef}
            className="input"
            value={value}
            onChange={handleChange}
            contenteditable={'true'}
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
          </div>
          {!value && (
            <div className="placeHolder">
              {`Choose `}
              {areTemplates && (
                <>
                  a <span className="template">template </span>
                </>
              )}
              {<span>{Boolean(areTemplates && areFolders) && ` or `}</span>}
              {areFolders && (
                <>
                  a <span className="directory">folder </span>
                </>
              )}
            </div>
          )}
        </div>

        <div className={`datalist-container`}>
          <datalist className="datalist">
            {Boolean(Object.entries(options).length > 0 || folderPath.length > 0) && (
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
                    {createTemplateOption(['Back', 'back'])}
                  </div>
                )}
              </>
            )}

            {Boolean(Object.entries(options).length === 0 && folderPath.length === 0) && (
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
