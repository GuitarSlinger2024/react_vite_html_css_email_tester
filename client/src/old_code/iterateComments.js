import { formInputs } from "./aj_checkbox.js";
import { returnedData } from "./script.js";


export function select_each_comment(data, action) {
  
  const dropDown = document.getElementById('dropDown')
  const loadComment = document.getElementById('loadComments')
  const commentCount = document.getElementById('commentCount')

  //  three buttons: save, delete, cancel
  const saveCmnt = document.getElementById('saveCmnt')
  const deleteCmnt = document.getElementById('deleteCmnt')
  const cancelSelect = document.getElementById('cancelSelect')

  const deleteThese = []
  let commentNum = 0

  dropDown.classList.add('active')
  const countTotal = data['comments'].length
  
  function one_at_a_time() {
    commentCount.innerHTML = `${+commentNum + 1} of ${countTotal}`
    const commentDiv = document.createElement('pre')
    commentDiv.className = "commentList"
    commentDiv.innerText = data['comments'][commentNum]
    loadComment.innerHTML = '';
    loadComment.appendChild(commentDiv)
  }

  one_at_a_time()

  saveCmnt.onclick = () => next()

  deleteCmnt.onclick = () => {
    deleteThese.push(data['comments'][commentNum])
    next()
  }

  function next() {
    commentNum++
    if (commentNum > countTotal - 1) {
      dropDown.classList.remove('active')
      delete_selected_comments(deleteThese, data['fileName'], action)
    }
    else
    one_at_a_time()
  }
  
  cancelSelect.onclick = () => {
    dropDown.classList.remove('active')
  }
}


function delete_selected_comments(deleteThese, file, action) {
  const arr = file.split('.')
  arr.pop()
  const name = arr.join('')

  const fd = new FormData(form1)
  fd.append('folder', name)
  const removeBlanks = formInputs.form1.radioBtns[1].querySelector('aj-checkbox[data-checked="true"]').dataset.value
  fd.append('blanks', removeBlanks)
  fd.append('delete_these', JSON.stringify(deleteThese))
  fetch('includes/_select_comments.inc.php', {
    method: 'POST',
    body: fd
  })
    .then(data => data.json())
    .then(data => {
      returnedData(data, action)
      //  same return values as create file or get info
    })
}