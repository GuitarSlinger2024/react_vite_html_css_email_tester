import React, { useState, useRef, useEffect } from 'react'
import '../styles/dropdown.css'
import Checkbox from './Checkbox'
import CreateEmailOption from './CreateEmailOption'

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
  mode,
  selectOpts,
  setSelectOpts,
}) {
  const [showList, setShowList] = useState(false)
  const [value, setValue] = useState(currentOpt)
  const [checkAll, setCheckAll] = useState(false)
  const myRef = useRef()

  useEffect(() => {
    console.log('%cRed', 'color: red;font-size:20px', { options })
  }, [options])



  //                  Start here for emails !!!!
  function createCheckAllOption(opt) {
    return (
      <div
        onClick={e => {
          checkAllOptionClicked(e)
        }}
      >
        {selectOpts && (
          <Checkbox
            label=""
            mode={mode}
            checked={checkAll}
            setChecked={setCheckAll}
          />
        )}
        <p className="emailOpt">Check All</p>
      </div>
    )
  }

  //                  Start with CreateEmailOption.jsx for emails !!!!

  function checkboxClicked(e) {
    console.log('CHECKBOX Clicked!')
    myRef.current.focus()
    setTimeout(() => {}, 100)
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
      //  Put the message in the message display area...
      return
    }

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
    setValue(createEmailValue(e.target.value))
  }

  function checkAllOptionClicked(e) {
    console.log('check all was clicked')
    setCheckAll(!checkAll)
    const checkBoxes = document.querySelectorAll(
      '.email .option:not(.checkAll) div.checkbox'
    )
    console.log(checkBoxes)
    checkBoxes.forEach(box => {
      console.log(typeof box.getAttribute('checked'), typeof checkAll)
      console.log(box.getAttribute('checked'), checkAll)
      console.log(box.getAttribute('checked') === checkAll)
      if (Boolean(box.getAttribute('checked') === 'true') !== !checkAll)
        box.click()
    })
  }

  function emailOptionClicked(e) {
    let target = e.target
    console.log(e.target)
    if (target.className === 'empty') return
    target =
      target.className === 'emailName' || target.className === 'emailDomain'
        ? (target = target.parentElement)
        : target
    if (selectOpts) {
      console.log(target.parentElement.querySelector('.checkbox'))
      target.parentElement.querySelector('.checkbox').click()
    } else {
      setCurrentOpt(target.textContent)
      setValue(createEmailValue(target.textContent))
    }
  }

  function inputBlurred(e) {
    // console.log(e.target)
    console.log(document.activeElement)
    console.log('show list', showList)
    if (!checkAll) {
      setTimeout(() => {
        setShowList(false)
      }, 150)
    }
  }

  return (
    <div className={`form-container ${showList ? 'show' : 'dontShow'}`}>
      <div className={`dropdown ${className}`}>
        <div className="input-container">
          <label>{label}</label>
          <div className="selectCheckboxContainer">
            <Checkbox
              label="Select Addresses"
              mode={mode}
              checked={selectOpts}
              setChecked={setSelectOpts.bind(null, !selectOpts)}
              className="select-addresses"
            />
          </div>

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
            {selectOpts && (
              <div
                className="option checkAll"
                key={'selectOpts'}
              >
                {createCheckAllOption(['Check All', ''])}
              </div>
            )}
            {options.length > 0 &&
              options.map((opt, i) => (
                <div
                  className="option"
                  key={i}
                >
                  <CreateEmailOption
                    opt={opt}
                    selectOpts={selectOpts}
                    mode={mode}
                    deleteAddress={deleteAddress}
                    emailOptionClicked={emailOptionClicked}
                  />
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
