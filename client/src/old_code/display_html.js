
export const radioBtns = document.querySelectorAll('#showInfo .radio')
export const infoDivs = document.querySelectorAll('.preInfo, #notPre')
console.log(infoDivs)
export function removeShow() {
  infoDivs.forEach(pre => pre.classList.remove('show'))
}

import { fileData } from "./_js_Functions.js"
//  order: before, after, snippets, src values

const infoDivContainer = document.getElementById('info')


///////////////////////////////////////////////////////////////
///////    view             before, after, values & snippets

document.querySelector('#showInfo').onclick = (el) => {
  //  Underline the active display
  radioBtns.forEach(btn2 => btn2.style.textDecoration = 'none')
  el.target.style.textDecoration = 'underline'

  const divs = ['viewTemplate', 'showOldHTML', 'showNewHTML', 'showPHP', 'showArray']
  const index = divs.indexOf(el.target.id)
  console.log(index)
  if (index >= 0) {
    //  Scroll to bottom of page
    window.scrollTo(0, document.body.scrollHeight);
    infoDivs.forEach(pre => {
      pre.classList.remove('show')
    })

    setTimeout(() => {
      infoDivs[index].classList.add('show')
    }, 50);
  }
}

////////////////////////////////////////////////
///////        Load Info Divs

//  This is done after getting a valid response from 'Get Code' btn,
//  It is here to have easy access to the three functions listed
export function loadInfoDivs(php) {
  getReferenceValues()
  loadPHP(php)
  loadHTML()
}

////////////////////////////////////////////////
///////        Load Reference Values


export function getReferenceValues() {
  infoDivs[4].innerHTML = ''
  console.log('=========          =============            ==========')
  console.log(infoDivs[4])


  const imageValues = getImageValues()
  insertValueDivs(...imageValues, 'Image References')

  const colorValues = getColorValues()
  insertValueDivs(colorValues[0], colorValues[1], 'hsl to hex')

  if (colorValues[2].childElementCount > 0) {
    const notPreTitle = document.createElement('h2')
    notPreTitle.classList.add('valuesTitle')
    notPreTitle.innerText = 'hsl errors'

    const notPreInner = document.createElement('div')
    notPreInner.classList.add('notPreInner')
    notPreInner.appendChild(colorValues[2])
    infoDivs[4].appendChild(notPreTitle)
    infoDivs[4].appendChild(notPreInner)
  }
}

function getImageValues() {
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')

  fileData['images'].forEach((image, i) => {
    const p = document.createElement('p')
    p.classList.add('fileRefs')
    p.innerHTML = '<span class="image">' + image['file_name'] + '</span>' + ' was changed to: ' + '<span class="cid">"cid:' + image['reference'].substr(1) + '</span>'
    if (i < fileData['images'].length / 2) {
      div1.appendChild(p)
    }
    else {
      div2.appendChild(p)
    }
  });
  return [div1, div2]
}

function getColorValues() {
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')
  const errorDiv = document.createElement('div')

  fileData['hsl_conversions'].forEach((hsl, i) => {
    if (hsl[0] !== 'error') {
      const p = document.createElement('p')
      p.classList.add('fileRefs')
      p.innerHTML = '<span class="hsl">' + hsl[1] + '</span>' + ' was changed to: ' + '<span class="hex">' + hsl[0] + '</span>'

      if (div1.childElementCount > div2.childElementCount) {
        div2.appendChild(p)
      }
      else {
        div1.appendChild(p)
      }
    } else {
      const p = document.createElement('p')
      p.classList.add('fileRefs', 'error')
      p.innerHTML = '<pre>' + hsl[1] + '</pre>'
      errorDiv.appendChild(p)
    }
  });
  return [div1, div2, errorDiv]
}

function insertValueDivs(div1, div2, title) {
  if (div1.childElementCount == 0) return
  //   Add title & info for images (first)
  const notPreTitle = document.createElement('h2')
  notPreTitle.classList.add('valuesTitle')
  notPreTitle.innerText = title

  const notPreInner = document.createElement('div')
  notPreInner.classList.add('notPreInner')
  notPreInner.appendChild(div1)
  notPreInner.appendChild(div2)

  infoDivs[4].appendChild(notPreTitle)
  infoDivs[4].appendChild(notPreInner)
  setTimeout(() => {
    infoDivs[4].scrollTo(0, 0)
  }, 50);
}

///////        Load PHP Snippets
export function loadPHP(code) {
  const codeArray = []
  fileData['images'].forEach(image => {
    codeArray.push({ 'type': 'code', 'code': code.substr(0, code.indexOf(image['file_name'])) })
    codeArray.push({ 'type': 'image', 'code': image['file_name'] })
    code = code.substr(code.indexOf(image['file_name']) + image['file_name'].length)

    codeArray.push({ 'type': 'code', 'code': code.substr(0, code.indexOf(image['reference'])) })
    codeArray.push({ 'type': 'cid', 'code': image['reference'] })
    code = code.substr(code.indexOf(image['reference']) + image['reference'].length)
  })

  codeArray.push({ 'type': 'code', 'code': code })
  const div = createPreDiv(codeArray)
  infoDivs[3].innerHTML = ""
  infoDivs[3].appendChild(div)
  infoDivs[3].scrollTo(0, 0)
}

///////        Load HTML
export function loadHTML() {
  console.log({ fileData })
  const code = []
  let segments = (separateCodeAndComments(fileData['colorizedOld']))
  code.push(colorizeColorProperties(colorizeImages(segments, 'image'), 'hsl'))
  segments = (separateCodeAndComments(fileData['colorizedNew']))
  code.push(colorizeColorProperties(colorizeImages(segments, 'cid'), 'hex'))
  for (let div = 1; div <= 2; div++) {
    //  div = 0  old      div = 1  new
    infoDivs[div].innerHTML = ""
    infoDivs[div].appendChild(code[div - 1])
    infoDivs[div].scrollTo(0, 0)
  }

  //  Scrollbar is styled in th temp folder
  infoDivs[0].querySelector('iframe').src = './temp/temp_display_template/temp_display_template.html'

}


function separateCodeAndComments(code) {
  //  This uses the '<pre></pre>' tag inserted on server side to
  //    separate the code into segments of code and comments.

  const segments = [];
  while (code.indexOf('<pre>') >= 0) {
    const segment = code.substr(0, code.indexOf('<pre>'))
    segments.push({ 'type': 'code', 'code': segment });

    code = code.substr(code.indexOf('<pre>') + 5)

    const comment = code.substr(0, code.indexOf('</pre>'))
    segments.push({ 'type': 'comment', 'code': comment });

    code = code.substr(code.indexOf('</pre>') + 6)
  }

  //  This is a hack to get rid of extra <pre> tags that kept creeping in
  code.replaceAll('<pre>', '', code)
  code.replaceAll('</pre>', '', code)

  //  Get the last piece of code in
  if (code.length > 0) segments.push({ 'type': 'code', 'code': code })
  return segments
}

function colorizeImages(segments, type) {
  // type:   image   cid
  const imageReference = (type == 'image') ? 'full_name' : 'reference'
  const images = fileData.images
  const segments_2 = []

  one: for (let x = 0; x < segments.length; x++) {
    let segment = segments[x].code
    const typeOfSegment = segments[x].type
    let check = false

    for (let y = 0; y < images.length; y++) {

      const lookFor = (type == 'cid') ? '"cid:' + images[y][imageReference].substr(1) : images[y][imageReference];
      const index = segment.indexOf(lookFor)

      if (index >= 0) {
        const firstPart = segment.substr(0, segment.indexOf(lookFor))
        segments_2.push({ 'type': typeOfSegment, 'code': firstPart })
        segments_2.push({ 'type': type, 'code': lookFor })

        segment = segment.substr(index + lookFor.length)
      }
    }
    segments_2.push({ 'type': typeOfSegment, 'code': segment })

  }

  return segments_2
}


function colorizeColorProperties(segments, colorType) {//
  // type:   hsl   hex
  const arrayIndex = (colorType === 'hex') ? 0 : 1;
  const hslConversions = fileData['hsl_conversions']
  const segments_3 = []

  one: for (let x = 0; x < segments.length; x++) {
    let segment = segments[x].code
    const typeOfSegment = segments[x].type
    let check = false

    for (let y = 0; y < hslConversions.length; y++) {
      const lookFor = (hslConversions[y][0] == 'error') ? hslConversions[y][1] : hslConversions[y][arrayIndex]
      const index = segment.indexOf(lookFor)

      if (index >= 0) {
        const firstPart = segment.substr(0, segment.indexOf(lookFor))
        segments_3.push({ 'type': typeOfSegment, 'code': firstPart })
        const typeOrError = (hslConversions[y][0] == 'error') ? 'error' : colorType
        segments_3.push({ 'type': typeOrError, 'code': lookFor })

        segment = segment.substr(index + lookFor.length)
      }
    }
    segments_3.push({ 'type': typeOfSegment, 'code': segment })

  }

  return createPreDiv(segments_3)
}



function createPreDiv(segments) {
  const div = document.createElement('pre')
  segments.forEach(seg => {
    const pre = document.createElement('span')
    let code = seg.code.replaceAll('<pre>', '')
    code = code.replaceAll('</pre>', '')
    pre.innerText = code

    if (seg.type == 'comment') pre.classList.add('comment')
    if (seg.type == 'image') pre.classList.add('image')
    if (seg.type == 'cid') pre.classList.add('cid')
    if (seg.type == 'hsl') pre.classList.add('hsl')
    if (seg.type == 'hex') pre.classList.add('hex')
    if (seg.type == 'error') pre.classList.add('error')

    div.append(pre)
  })
  return div
}


// /* ---------->   Close/Disable Interface Events   <---------- */
const sendDownloadBtns = document.querySelectorAll('.doSomething')

export function disableUserInterface() {
  sendDownloadBtns.forEach(btn => btn.setAttribute('disabled', 'disabled'))

  document.getElementById('showInfo').style.opacity = .2
  document.getElementById('showInfo').style.pointerEvents = 'none'
  radioBtns.forEach(btn => {
    btn.style.textDecoration = 'none'
    btn.dataset.checked = false
  });
  fileData.length = 0
  infoDivs.forEach(div => {
    div.classList.remove('show')
  })
  infoDivContainer.classList.remove('show')
}

export function enableUserInterface() {
  sendDownloadBtns.forEach(btn => btn.removeAttribute('disabled'))
  document.getElementById('showInfo').style.opacity = 1

  infoDivContainer.classList.add('show')

  radioBtns.forEach(btn => {
    btn.style.pointerEvents = 'all'
    btn.style.textDecoration = 'all'
    btn.dataset.checked = false
  });
  // fileData.length = 0
  // infoDivs.forEach(div => {
  //   div.classList.remove('show')
  // })
  // infoDivContainer.classList.remove('show')
}

var element = document.querySelector('.iframe-container');
const iFrame = document.querySelector('.iframe_1')

// iFrame.addEventListener("load", ev => {
//   const new_style_element = document.createElement("style");
//   new_style_element.textContent = "body::-webkit-scrollbar { width: 0px; }"
//   // ev.target.contentDocument.getElementsByTagName('body')[0].appendChild(new_style_element);
//   const content = ev.target.contentDocument.postMessage()
//   console.log(content)
//   content.appendChild(new_style_element);
// });

//create box in bottom-left
const reSizer = document.createElement('div');
const previewWidth = document.getElementById('previewWidth');
reSizer.classList.add('reSizer')
//Append Child to Element
element.appendChild(reSizer);
//box function onmousemove
reSizer.onmousedown = () => { initResize() }
reSizer.ontouchstart = () => { initResize() }

//Window funtion mousemove & mouseup
function initResize(e) {
  window.onmousemove = (e) => { Resize(e) }
  window.onmouseup = () => { stopResize() }
  reSizer.style.background = 'linear-gradient(to right, transparent, black)';

  window.ontouchmove = (e) => { Resize(e) }
  window.ontouchcancel = () => { stopResize() }
  window.ontouchend = () => { stopResize() }
}
//resize the element
function Resize(e) {
  const width = (e.clientX - element.offsetLeft - 13)
  element.style.width = previewWidth.innerText = width + 'px';
}

//on mouseup remove windows functions mousemove & mouseup
function stopResize(e) {
  window.onmousemove = null
  window.onmouseup = null
  reSizer.style.background = 'transparent';

  window.ontouchmove = null
  window.ontouchcancel = null
  window.ontouchend = null
}