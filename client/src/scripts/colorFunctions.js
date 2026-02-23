

export function showColorSettings(highlights) {
  function getBoxShadow() {
    const blur = highlights.filter(color => color.className == 'blurInput')[0]
    const spread = highlights.filter(
      color => color.className == 'spreadInput'
    )[0]
    const obj = {
      className: 'boxShadow',
      value: '0px 0px ' + blur.value + 'px ' + spread.value + 'px',
      cssName: '--box-shadow',
      type: 'shadow',
    }
    return obj
  }

  const boxShadowObj = getBoxShadow()
  highlights.push(boxShadowObj)
  console.log(highlights)


  highlights.forEach(color => {
    console.log(color)
    // const inputElem =
    //   color.type === 'hsla' || color.type == 'shadow'
    //     ? document.querySelector('.' + color.className + ' .centerOf')
    //     : document.querySelector('#' + color.className)

    // if (!color.skipSetProp) {
    //   inputElem.setAttribute('spellcheck', false)
    //   const val = color.type == 'border' ? color.value + 'px' : color.value
    //   document.body.style.setProperty(`${color.cssName}`, `${val}`)
    // }
    // inputElem.value = color.value
    // inputElem.onfocus = () => enterColorValue(inputElem, color)
  })
}

function checkHsla(hsla) {
  const array = hsla.split(',').map(arr => arr.trim())
  const values = []
  let check = true //  everything is ok so far
  let num = null //  temp for number values
  if (array.length !== 4) return false
  array.forEach((val, i) => {
    switch (i) {
      case 0:
        num = Number(val)
        if (!(num >= 0 && num <= 255) || (!Number(num) && Number(num) !== 0))
          check = false
        else values.push(num)
        break
      case 1:
      case 2:
        if (val.substr(val.length - 1, 1) !== '%') check = false
        num = val.substr(0, val.length - 1)
        if (num.trim() == '') check = false
        num = Number(num)
        if (!Number.isInteger(num)) check = false
        if (num < 0 || num > 100) check = false
        values.push(num)
        break
      case 3:
        if (val.substr(val.length - 1, 1) !== ')') check = false
        num = Number(val.substr(0, val.length - 1))
        if (!Number(num)) check = false
        if (num < 0 || num > 1) check = false
        values.push(num)

        // num = Number(val)
        // if (!Number(num)) check = false
        // if (num < 0 || num > 1) check = false
        break
    }
  })
  if (check)
    return (
      'hsla(' +
      values[0] +
      ', ' +
      values[1] +
      '%, ' +
      values[2] +
      '%, ' +
      values[3] +
      ')'
    )
  else return false
}

function checkColorSyntax(colorString, color) {
  let cssVarValue
  if (color.type !== 'hsla') {
    const typeOfData = color.type == 'border' ? 'border' : 'shadow'
    const data = highlights.filter(hi => hi.type == typeOfData)[0]
    const index = color.className == 'blurInput' ? 2 : 3
    switch (color.className) {
      case 'blurInput':
      case 'spreadInput':
        const shadowArray = data.value.split(' ')
        shadowArray[index] = colorString + 'px'
        const shadowString = shadowArray.join(' ')
        data.value = shadowString
        color.value = colorString
        cssVarValue = shadowString
        break
      case 'borderRadius':
        cssVarValue = colorString + 'px'
        color.value = colorString
        break
    }

    return { type: typeOfData, newVal: cssVarValue, inputVal: colorString }
  } else if (colorString.substr(0, 5) === 'hsla(')
    return checkHsla(colorString.substr(5, colorString.length - 5))
  else if (colorString.substr(0, 1) === '#') return checkHex(colorString)
  else if (colorString.substr(0, 5) === 'rgba(') return checkRgba(colorString)
  else return false
}

//  This is done first when an input is focussed on
export function enterColorValue(colorInput, color) {
  const initValue = colorInput.value

  if (colorInput.type == 'number') {
    let currentValue

    colorInput.onchange = () => {
      intInputChange()
    }

    colorInput.onblur = () => {
      intInputChange()
    }

    function intInputChange() {
      let valueObj = checkColorSyntax(colorInput.value, color)
      let newValue
      if (!valueObj) newValue = initValue
      else newValue = valueObj.newVal

      const cssVarName =
        color.type == 'blur' || color.type == 'spread'
          ? '--box-shadow'
          : '--border-radius'

      // changeColorValue(colorInput, color, color.cssName, newValue)

      changeColorValue(colorInput, cssVarName, newValue)

      if (!valueObj) {
        colorInput.classList.add('colorError')
      } else {
        colorInput.classList.remove('colorError')
      }
    }

    colorInput.onkeydown = e => {
      if (e.key == 'Enter') {
        colorInput.blur()
      }
    }
  } else {
    let newValue

    colorInput.onkeyup = e => {
      if (e.key == 'Enter') colorInput.blur()
      newValue = checkColorSyntax(colorInput.value, color)
      const start = colorInput.selectionStart
      if (!newValue) {
        colorInput.classList.add('colorError')
      } else {
        colorInput.classList.remove('colorError')
        colorInput.value = newValue
        colorInput.setSelectionRange(start, start)
      }
    }

    colorInput.onblur = () => {
      if (!checkColorSyntax(newValue, color)) newValue = initValue
      color.value = newValue
      changeColorValue(colorInput, color.cssName, newValue)
    }
  }
}

function changeColorValue(input, cssName, inputValue) {
  input.blur()
  document.body.style.setProperty(`${cssName}`, `${inputValue}`)
  postNewSettings()
}


const formInputs = [];
document.querySelectorAll('form').forEach(form => {
  formInputs[form.id] = []
  formInputs[form.id]['radioBtns'] = document.querySelectorAll(`#${form.id} .radioBtns`)
  formInputs[form.id]['inputs'] = [
    ...document.querySelectorAll(`#${form.id} input`),
  ]
})

export function postNewSettings(reset = false) {
  const fd = new FormData()
  fd.append('reset', reset)

  console.log('%c---------', 'color:red;font-size:24px')
  console.log(formInputs)

  //  Append the name and value of the checked radio buttons to the fd object
  formInputs['form1']['radioBtns'].forEach(radioButtons => {
    const checkedBtn = radioButtons.querySelector('aj-checkbox[data-checked="true"]')
    fd.append(checkedBtn.dataset.name, checkedBtn.dataset.value)
  })

  //  Get the values of the inputs in form1
  formInputs['form1']['inputs'].forEach(input => {
    fd.append(input.dataset.name, input.dataset.value)
  })

  //  Get all the highlight color data EXCEPT the boxShadow, which is an object maybe? I forgot.
  const highlightsBuffer = highlights.filter(colorData => {
    return colorData.className !== 'boxShadow'
  })


  fd.append('settings', JSON.stringify(highlightsBuffer))
  fd.append('data_', 'some data')

  console.log('0 0 0 0 0 0 0 0 0 0')
  for (var pair of fd.entries()) {
    console.log(pair[0] + ' - - ' + pair[1]);
  }
  console.log('0 0 0 0 0 0 0 0 0 0')

  fetch('./includes/_update_color_settings.inc.php', {
    method: 'POST',
    body: fd
  })
    .then(data => data.json())
    .then(data => {
      if (data.reset) getSettings()
    })
}
