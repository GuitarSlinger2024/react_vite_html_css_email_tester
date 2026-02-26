import { useEffect, useState } from 'react'
import '../styles/getCode.css'
import EmailDropdown from './EmailDropdown_2'
import FolderDropdown from './FolderDropdown'
import Checkbox from './Checkbox'

function GetCode({ mode, templateData, setTemplateData }) {
  //  Data to transfer
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentTemplate, setCurrentTemplate] = useState('')
  const [removeComments, setRemoveComments] = useState('only') //  only   all   none   select
  const [removeBlanks, setRemoveBlanks] = useState('remove') //  remove   reduce   leave
  //  Email Addresses
  const [emailOptions, setEmailOptions] = useState([])
  const [selectAddresses, setSelectAddresses] = useState(false)
  //  File Options
  const [fileTree, setFileTree] = useState({})
  const [currentFolder, setCurrentFolder] = useState([])
  const [folderPath, setFolderPath] = useState([])
  const [folderOptions, setFolderOptions] = useState([])

  //  These are simple booleans to help with folder input placeholder
  const [areFolders, setAreFolders] = useState(false)
  const [areTemplates, setAreTemplates] = useState(false)

  useEffect(async () => {
    //  First get the list of email addresses on file (done)
    try {
      fetch('/getAddresses', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then(data => {
          console.log({ data })
          setEmailOptions(data)
        })
    } catch (error) {
      console.log(error.message)
    }

    //  Then get the ARRAY of templates as a 'folder tree'  (in progress)
    try {
      fetch('/getTemplates', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(data => data.json())
        .then(data => {
          console.log('root', { data })
          setFileTree(data)
        })
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  useEffect(() => {
    const keys = Object.keys(fileTree)
    if (keys.length === 0) return

    console.log('fileTree', fileTree)
    console.log({ keys })

    let templates = 0
    let folders = 0
    const currentFiles = {}
    keys.forEach(key => {
      const type = fileTree[key][key] ? 'template' : 'directory'
      currentFiles[key] = type
      if (type === 'template') templates++
      if (type === 'directory') folders++
    })
    console.log('current', currentFiles)
    setFolderOptions(currentFiles)
    setAreFolders(folders > 0)
    setAreTemplates(templates > 0)
  }, [fileTree])

  useEffect(() => {
    if (!currentEmail) return
    const opts = emailOptions.filter(x => x)
    if (currentEmail) opts.push(currentEmail)
    if (!emailOptions.includes(currentEmail)) {
      setEmailOptions(opts)
      updateEmails(opts)
    }
  }, [currentEmail])

  useEffect(() => {
    if (!currentTemplate) return

    console.log({
      data: {
        currentTemplate,
        folderPath,
        removeBlanks,
        removeComments,
      },
    })
  }, [currentTemplate, removeBlanks, removeComments])

  //  email options can also be updated from Dropdown.jsx
  function updateEmails(addresses) {
    try {
      fetch('/updateAddresses', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOptions: addresses }),
      })
        .then(data => data.json())
        .then(data => {
          console.log({ data })
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  async function getTemplate(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!currentTemplate) return

    console.log({
      data: {
        folderPath,
        currentTemplate,
        removeComments,
        removeBlanks,
      },
    })

    fetch('/template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: { folderPath, currentTemplate, removeComments, removeBlanks },
      }),
    })
      .then(data => data.json())
      .then(data => {
        console.log('data', data )
        setTemplateData(data)
      })
  }

  return (
    <section className="section getCode active">
      <form id="form1">
        <EmailDropdown
          label={'Send To:'}
          placeHolder={'Enter or Choose an email address'}
          options={emailOptions}
          setOptions={setEmailOptions}
          currentOpt={currentEmail}
          setCurrentOpt={setCurrentEmail}
          updateDb={updateEmails}
          emptyMsg={'No email addresses have been entered'}
          className={'email'}
          mode={mode}
          selectAddresses={selectAddresses}
          setSelectAddresses={setSelectAddresses}
        />

        <FolderDropdown
          label={'Folder:'}
          currentOpt={currentFolder}
          setCurrentOpt={setCurrentTemplate}
          folderPath={folderPath}
          fileTree={fileTree}
          setFolderPath={setFolderPath}
          setFolderOptions={setFolderOptions}
          class={'selectPlaceholder'}
          options={folderOptions}
          setOptions={setFolderOptions}
          // setOption={setCurrentFolder}
          emptyMsg={'There are no folders or templates on file'}
          className={'template'}
          areFolders={areFolders}
          setAreFolders={setAreFolders}
          areTemplates={areTemplates}
          setAreTemplates={setAreTemplates}
        />

        <div className="remove-comments-container">
          <p className="radioBtnTitle">Remove HTML & CSS Comments</p>

          <div className="radioBtns">
            <Checkbox
              label="Only *"
              mode={mode}
              checked={removeComments === 'only'}
              setChecked={setRemoveComments.bind(null, 'only')}
            />

            <Checkbox
              label={'All'}
              mode={mode}
              checked={removeComments === 'all'}
              setChecked={setRemoveComments.bind(null, 'all')}
            />

            <Checkbox
              label={'None'}
              mode={mode}
              checked={removeComments === 'none'}
              setChecked={setRemoveComments.bind(null, 'none')}
            />

            <Checkbox
              label="Select"
              mode={mode}
              checked={removeComments === 'select'}
              setChecked={setRemoveComments.bind(null, 'select')}
            />
          </div>
        </div>

        <div className="deleteMultiLines">
          <p className="radioBtnTitle">Remove Blank Lines</p>
          <div id="blankLines">
            <div className="radioBtns">
              <Checkbox
                label="Remove"
                mode={mode}
                checked={removeBlanks === 'remove'}
                setChecked={setRemoveBlanks.bind(null, 'remove')}
              />

              <Checkbox
                label="Reduce"
                mode={mode}
                checked={removeBlanks === 'reduce'}
                setChecked={setRemoveBlanks.bind(null, 'reduce')}
              />

              <Checkbox
                label="Leave 'as-is'"
                mode={mode}
                checked={removeBlanks === 'leave'}
                setChecked={setRemoveBlanks.bind(null, 'leave')}
              />
            </div>
          </div>
        </div>

        <div className="btnContainer">
          <button
            id="getCode"
            onClick={getTemplate}
            className={`${!currentTemplate ? 'disabled' : ''}`}
          >
            Get Code
          </button>

          <button
            value="submit"
            name="send-email"
            id="send"
            disabled
            className="doSomething doSomething1"
          >
            Send
          </button>
          <button
            disabled
            className="doSomething doSomething2 downloadBtn"
            id="download_template"
          >
            Download
          </button>
        </div>

        <div className="message response">
          <h3>No message at this time</h3>
        </div>
      </form>
    </section>
  )
}

export default GetCode
