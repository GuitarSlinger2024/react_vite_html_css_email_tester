import React, { useState, useRef, useEffect } from 'react'
import trash from '../_img/trash.png'
import '../styles/dropdown.css'

function EmailDropdown({
  label,
  placeHolder,
  options,
  setOptions,
  currentOpt,
  setCurrentOpt,
  updateDb,
  emptyMsg,
  className,
}) {
  const [showList, setShowList] = useState(false)
  const [value, setValue] = useState(currentOpt)
  const myRef = useRef()
  const errorRef = useRef()

  useEffect(() => {
    console.log('%cRed', 'color: red;font-size:20px', { options })
  }, [options])

  //                  Start here for emails !!!!
  function createEmailOption(opt) {
    const strIndex = opt.indexOf('@')
    const name = opt.slice(0, strIndex)
    const domain = opt.slice(strIndex)
    return (
      <>
        <p
          className="emailOpt"
          onClick={e => {
            emailOptionClicked(e)
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

  function createTemplateOption(opt) {
    console.log('%cOPT!!!', 'color: red;font-size:20px', opt)
    return (
      <>
        <p
          className="templateOpt"
          onClick={e => {
            templateOptionClicked(e)
          }}
        >
          {opt[0]}
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
    setOptions(newArray)
    updateDb(newArray)
    if (currentOpt === trashText) setValue('')
  }

  //  The template dropdown does not allow typed input
  function keyDown(e) {
    if (label !== 'Send To:') {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      validateEmailInput()
    }
  }

  //  Validate an email after the input field is blurred
  function validateEmailInput() {
    //  Used when enter is pressed instead of clicking an option
    const check = validateEmail(myRef.current.textContent)
    if (!check && myRef.current.textContent !== '') {
      errorRef.current.classList.add('showErrorMsg')
      return
    }
    errorRef.current.classList.remove('showErrorMsg')
    myRef.current.blur()
    setCurrentOpt(myRef.current.textContent)
    setValue(createEmailValue(myRef.current.textContent))
  }

  const validateEmail = email => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  function createEmailValue(opt) {
    const strIndex = opt.indexOf('@')
    const name = opt.slice(0, strIndex)
    const domain = opt.slice(strIndex)
    return (
      <div
        className="emailOpt"
        onClick={e => {
          optionClicked(e)
        }}
      >
        <p className="emailName">{name}</p>
        <p className="emailDomain">{domain}</p>
      </div>
    )
  }

  function handleChange(e) {
    if (label === 'Send To:') setValue(createEmailValue(e.target.value))
    else {
      console.log(e.target)
      setValue(e.target.value)
    }
  }

  function emailOptionClicked(e) {
    let target = e.target
    if (target.className === 'empty') return
    target =
      target.className === 'emailName' || target.className === 'emailDomain'
        ? (target = target.parentElement)
        : target
    errorRef.current.classList.remove('showErrorMsg')
    setCurrentOpt(target.textContent)
    setValue(createEmailValue(target.textContent))
  }
  
  async function templateOptionClicked(e) {
    console.log('Template option clicked')
    let target = e.target
    if (target.className === 'empty') return

    const newFolder = getFolder()
  }

  function inputBlurred() {
    if (label === 'Send To:') {
      validateEmailInput()
      setTimeout(() => {
        setShowList(false)
      }, 150)
    } else {
      //  Code for template input blurred not needed?
    }
  }

  return (
    <div className={`form-container ${showList ? ' show' : ''}`}>
      <div className={`dropdown ${className}`}>
        <div className="input-container">
          <label>{label}</label>
          {label === 'Send To:' && (
            <p
              className="errorMsg"
              ref={errorRef}
            >
              Invalid Email Format
            </p>
          )}
          <div
            ref={myRef}
            className="input"
            value={value}
            contenteditable={'true'}
            placeholder={placeHolder}
            onChange={handleChange}
            onKeyDown={keyDown}
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
            {options.length > 0 && label === 'Send To:'
              ? options.map((opt, i) => (
                  <div
                    className="option"
                    key={i}
                  >
                    {createEmailOption(opt)}
                  </div>
                ))
              : Object.entries(options).map((opt, i) => (
                  <div
                    className="option"
                    key={i}
                  >
                    {createTemplateOption(opt)}
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

export default EmailDropdown
