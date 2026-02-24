import * as utils from "./_js_Functions.js";
import { fileData } from "./_js_Functions.js";

import { removeShow, loadInfoDivs, radioBtns, enableUserInterface } from "./display_html.js"
import { select_each_comment } from "./iterateComments.js"
import { getSettings } from "./settings.js"
import { setPlaceholder } from "./dropdown_input.js";
import { Hamburger } from "./burger.js";
customElements.define("aj-burger", Hamburger);
import { Checkbox, formInputs } from "./aj_checkbox.js";
customElements.define('aj-checkbox', Checkbox);

const zipFileInput = document.getElementById('zipFileInput')
const upArrow = document.getElementById('upArrow')
const nav = document.querySelector('#top-nav-bar')
const dropMsg = document.querySelector('#dropZone .drop_msg')
const templateInput = document.getElementById('templateInput')
const burger = document.querySelector('.burger')


/////////////////////////////////////////////////////////
////////               basic setup               //////// 

burger.onclick = () => {
  nav.classList.toggle('active')
}

//  Scroll to top of page on refresh
setTimeout(() => {
  window.scrollTo(0, 0);
}, 50);

//  This gets rid of everything after the actual file address 
//     like the get values (after ?)  maybe the # value as well
const baseUrl = window.location.href.split("?")[0];
window.history.pushState('name', '', baseUrl);

upArrow.onclick = () => {
  window.scrollTo(0, 0)
}

//  Get Settings - getSettings resets the settings to default status
getSettings()
//  userInfo & highlights were initiated in the index file
console.log({ highlights });
console.log({ userInfo })

/////////////////////////////////////////////////////////
////////               header btns               //////// 

//   Navigate top half pages: getCode, settings, upload, instructions
document.querySelector('.header-nav-btns.left').onclick = (e) => {
  //  Get button clicked & section class names
  const section = e.target.className.replace('Btn', '')
  const sections = ['getCode', 'upload', 'settings', 'instructions']
  if (!sections.includes(section)) return

  //   Underline current nav btn
  document.querySelectorAll('.header-nav-btns.left li').forEach(li => li.style.textDecoration = 'none')
  e.target.style.textDecoration = 'underline'

  //  Turn the X back into a hamburger
  // if (burger.classList.contains('active')) 
  burger.classList.remove('active')
  burger.querySelector('aj-burger').dataset.active = false

  //  Clear the message in 'Upload Zip'
  dropMsg.innerHTML = "<h2>Drag & drop</h2><p>- or -</p><h3>Click to pick</h3>"

  sections.forEach(sect => {
    const sectionEl = document.querySelector('section.' + sect)
    sectionEl.classList.remove('active')
    if (sect !== section)
      setTimeout(() => {
        // This delay is needed to allow time for the fade-out
        sectionEl.classList.add('hide')
      }, 300);
  })

  nav.classList.remove('active')
  document.querySelector('section.' + section).classList.remove('hide')
  //  setTimeout is needed for DOM to recognize 'hide' is removed before fade-in
  setTimeout(() => {
    document.querySelector('section.' + section).classList.add('active')
  }, 50);
}


////////////////////////////////////////////////////////
////////                Get Code                //////// 

document.getElementById('getCode').onclick = (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  startGettingCode()
}

document.getElementById('refreshPrev').onclick = (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  console.log('here, dear')
  startGettingCode()
}


function startGettingCode() {
  console.log(templateInput)
  if (templateInput.dataset.foldertype !== 'template') {
    utils.alertMessage(['Choose a Template first...'])
    return
  }

  //  On way to getting the code for a template
  removeShow()
  radioBtns.forEach(btn2 => btn2.style.textDecoration = 'none')
  fetchCode('includes/_get_info'); //  No form created yet
}

function fetchCode(action) {
  console.groupCollapsed(action)
  const fd = new FormData(form1)
  //  Append the name and value of the checked radio buttons to the fd object
  formInputs['form1']['radioBtns'].forEach(radioBtns => {
    const checkedBtn = radioBtns.querySelector('aj-checkbox[data-checked="true"]')
    fd.append(checkedBtn.dataset.name, checkedBtn.dataset.value)
  })

  //  Get the values of the inputs in form1
  formInputs['form1']['inputs'].forEach(input => {
    // const checkedBtn = radioBtns.querySelector('aj-checkbox[data-checked="true"]')
    fd.append(input.dataset.name, input.dataset.value)
  })
  for (const pair of fd.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  console.groupEnd();

  fetch(action + '.inc.php', {
    method: 'POST',
    body: fd
  })
    .then(data => data.json())
    .then(data => {
      console.log(data)
      if (data['error']) {
        switch (data['error']) {
          case 'invalidChars':
            utils.alertMessage(['Invalid Characters In Form:', data['form']])
            break;
          case 'invalidData':
            if (data['errorNum'] == '2') {
              utils.alertMessage(['A Folder Or File Is Not There'])
            }
            break
          case 'invalidEmail':
            if (data['errorNum'] == '2') {
              utils.alertMessage(['An invalid email address was entered'])
            }
            break
        }
      } else {
        returnedData(data, action)
      }
    })
}

export function returnedData(data, action) {
  console.log(data)
  console.log(action)
  //  This is also used in the delete_selected_comments() function in iterateComments.js
  fileData.length = 0
  for (const key in data) { fileData[key] = data[key] }
  radioBtns.forEach(btn => btn.dataset.checked = false)

  if (fileData.action == 'selected') {
    select_each_comment(fileData, action) //  0 is the starting comment count
    return
  }

  switch (action) {
    case 'includes/_get_info':
      utils.alertMessage(['Data Successfully Retrieved For:', fileData['fileName']]);
      // document.getElementById('iframe_1').src = './' + fileData['folder'] + '/' + fileData['fileName']
      console.log('%c ' + './' + fileData['folder'] + '/' + fileData['fileName'], 'color:green;font-weight:900')
      enableUserInterface()
      loadInfoDivs(fileData.php)
      break;
    case 'includes/send_email':
      utils.alertMessage([data['file'], 'Was Successfully Sent To:', data['success']])
      break;
    default:
      console.log('Problem with: ' + action);
  }

  //  This is the container for the radio buttons
  document.getElementById('showInfo').style.opacity = 1
  document.getElementById('showInfo').style.pointerEvents = 'all'
  
}

//////////////////////////////////////////////////////////
////////                Send Email                //////// 

document.getElementById('send').onclick = (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()

  const check = utils.validateEmailInput()
  if (!check) {
    utils.alertMessage(['Enter a valid email address, please.'])
  } else {
    // Sending an email takes longer than 'Get Code'
    utils.alertMessage(['Please wait...'])
    fetchCode('includes/send_email')
  }
  console.log('And now I am here.... Ah Ha!!!')
}

/////////////////////////////////////////////////////////
////////             Upload Template             //////// 

zipFileInput.onchange = () => {
  console.log(zipFileInput.value)
  if (zipFileInput.value == '') return
  const checkBoxes = document.querySelector('.upload_folder')
  const folder = checkBoxes.querySelector('aj-checkbox[data-checked="true"]').dataset.value
  console.log(dropMsg)

  const fd = new FormData();
  fd.append('file', zipFileInput.files[0]);
  fd.append('upload_to', folder)
  //  folder =    index  or  current
  fetch('includes/_upload_form.php', {
    method: 'POST',
    body: fd
  })
    .then(data => {
      // exitUpload.click()
      zipFileInput.value = ""
      try {
        return data.json()
      } catch (err) {
        console.log(err)
        utils.alertMessage(['there was an error uploading the file'])
      }
    })
    .then(data => {
      console.log(data)
      if (data['error'] && data['error'] === 'file_exists') {

        utils.alertMessage(['<div>A file already exits named:</div><div class="ellipsContainer"><span class="ellipsis">' + data['file'] + '</span></div>'],
          true,
          dropMsg
        )
      } else {
        utils.alertMessage(['<div class= "ellipsContainer"><span class="ellipsis">' + data['file'] + '</span></div>was successfully uploaded<br><br>'], true, dropMsg)
        document.querySelector('#templateList').innerHTML = data.options
        setPlaceholder(templateInput, true, data.ph)
        console.log('%c' + data.ph, 'color:red;font-size:20px')
        console.table(data)
      }
    })
    .catch(console.error)
}

///////////////////////////////////////////////////////////
////////             Download Template             //////// 

document.querySelector('#download_template').onclick = (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  fetch('includes/_download_template.inc.php', {
    method: 'POST',
    body: 'secret'
  })
    .then(data => data.text())
    .then(data => {
      console.log(data)
      // Create a new link
      const anchor = document.createElement('a');
      anchor.href = "temp/" + data + ".zip";
      anchor.download = data + ".zip";

      // Append to the DOM
      document.body.appendChild(anchor);

      setTimeout(() => {
        // Trigger `click` event
        anchor.click();
        // Remove element from DOM
        document.body.removeChild(anchor);
      }, 1000);
    })
}