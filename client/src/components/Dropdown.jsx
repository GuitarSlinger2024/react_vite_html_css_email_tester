import React, { useState, useRef, useEffect } from 'react'
import trash from '../_img/trash.png'
import '../styles/dropdown.css'

function Dropdown({
  label,
  placeHolder,
  options,
  setOptions,
  currentOpt,
  setCurrentOpt,
  updateDb,
  emptyMsg,
}) {
  const [showList, setShowList] = useState(false)
  const [value, setValue] = useState(currentOpt)
  const myRef = useRef()

  function validateNewInput() {
    //  Used when enter is pressed instead of clicking an option
    const check = validateEmail(myRef.current.textContent)
    if (!check) {
      return
    }
    myRef.current.blur()
    console.log('Creating New Email')
    console.log(myRef.current.textContent)
    setCurrentOpt(myRef.current.textContent)
    setValue(createEmailValue(myRef.current.textContent))
  }

  // Source - https://stackoverflow.com/a/46181
  // Posted by John Rutherford, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-02-12, License - CC BY-SA 4.0

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  function createEmailValue(opt) {
    console.log(opt)
    const strIndex = opt.indexOf('@')
    const name = opt.slice(0, strIndex)
    const domain = opt.slice(strIndex)
    return (
      <p
        className="emailOpt"
        onClick={e => {
          optionClicked(e)
        }}
      >
        <p className="emailName">{name}</p>
        <p className="emailDomain">{domain}</p>
      </p>
    )
  }

  function keyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      validateNewInput()
    }
  }

  function handleChange(e) {
    setValue(createEmailValue(e.target.value))
  }

  function optionClicked(e) {
    let target = e.target
    console.log(target.className)
    if (target.className === 'empty') return
    target =
      target.className === 'emailName' || target.className === 'emailDomain'
        ? (target = target.parentElement)
        : target
    console.log('%c' + target.className, 'background: lightgreen')
    setCurrentOpt(target.textContent)
    setValue(createEmailValue(target.textContent))
  }

  function createOption(option) {
    if (label === 'Send To:') return emailOption(option)
    else return folderTemplateOption(option)
  }

  function emailOption(opt) {
    const strIndex = opt.indexOf('@')
    const name = opt.slice(0, strIndex)
    const domain = opt.slice(strIndex)
    return (
      <>
        <p
          className="emailOpt"
          onClick={e => {
            optionClicked(e)
          }}
        >
          <p className="emailName">{name}</p>
          <p className="emailDomain">{domain}</p>
        </p>

        <p className="trashCan">
          <img
            src={trash}
            alt="delete button"
            onClick={deleteAddress}
          />
        </p>
      </>
    )
  }

  function deleteAddress(e) {
    if (e.target.nodeName !== 'IMG') return
    const trashText = e.target.parentElement.parentElement.textContent
    const newArray = options.filter(opt => {
      return opt !== trashText
    })
    console.log(newArray)
    setOptions(newArray)
    updateDb(newArray)
    console.log(currentOpt)
    console.log(trashText)
    console.log(currentOpt === trashText)
    if (currentOpt === trashText) setValue('')
  }

  function folderTemplateOption(opt) {
    return opt
  }

  return (
    <div className={`form-container ${showList ? ' show' : ''}`}>
      <div className="dropdown">
        <div className="input-container">
          <label>{label}</label>
          <div
            ref={myRef}
            className="input"
            value={value}
            contenteditable="true"
            placeholder={placeHolder}
            onChange={handleChange}
            onKeyDown={keyDown}
            onFocus={() => {
              document
                .querySelectorAll('.show')
                .forEach(visible => visible.classList.remove('show'))
              setShowList(true)
              setValue(myRef.current.textContent)
            }}
            onBlur={() => {
              validateNewInput()
              setTimeout(() => {
                setShowList(false)
              }, 150)
            }}
          >
            {value}
            {/* {(currentOpt && titleCase(currentOpt.replace('_', ' '))) || (
            <span className="placeHolder">{placeHolder}</span>
          )} */}
          </div>
        </div>

        <div className={`datalist-container`}>
          <datalist className="datalist">
            {options.length > 0 &&
              options.map((opt, i) => (
                <div
                  className="option"
                  key={i}
                >
                  {createOption(opt)}
                </div>
              ))}
            {options.length === 0 && (
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

export default Dropdown
