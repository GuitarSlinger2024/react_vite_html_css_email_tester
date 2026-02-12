import { useEffect, useState } from 'react'
import '../styles/getCode.css'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'

function GetCode({ mode }) {
  const [currentEmail, setCurrentEmail] = useState('')
  const [emailOptions, setEmailOptions] = useState([])
  const [currentFolder, setCurrentFolder] = useState('')
  const [folderOptions, setFolderOptions] = useState([])
  const [removeComments, setRemoveComments] = useState('yes') //  yes   no   only   select
  const [removeBlanks, setRemoveBlanks] = useState('remove') //  remove   reduce   leave
  
  useEffect(async () => {
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
  }, [])

  useEffect(() => {
    if (!currentEmail) return
    console.log(currentEmail)
    const opts = emailOptions.filter(x => x)
    if (currentEmail) opts.push(currentEmail)
    if (!emailOptions.includes(currentEmail)) {
      setEmailOptions(opts)
      updateEmails(opts)
    }
  }, [currentEmail])

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

  return (
    <section className="section getCode active">
      <form id="form1">
        <Dropdown
          label={'Send To:'}
          placeHolder={'Ender or Choose an email address'}
          options={emailOptions}
          setOptions={setEmailOptions}
          currentOpt={currentEmail}
          setCurrentOpt={setCurrentEmail}
          updateDb={updateEmails}
          emptyMsg={'No email addresses have been entered'}
        />

        <Dropdown
          label={'Folder:'}
          placeHolder={'Choose a folder or a template'}
          currentOpt={currentFolder}
          class={'selectPlaceholder'}
          options={folderOptions}
          setOption={setCurrentFolder}
          emptyMsg={'There no email templates on file'}
        />

        {/* 
              className="ellipsContainer" 
        */}

        <div className="remove-comments-container">
          <p className="radioBtnTitle">Remove HTML & CSS Comments</p>

          <div className="radioBtns">
            <Checkbox
              label={'Yes'}
              mode={mode}
              checked={removeComments === 'yes'}
              setChecked={setRemoveComments.bind(null, 'yes')}
            />

            <Checkbox
              label={'No'}
              mode={mode}
              checked={removeComments === 'no'}
              setChecked={setRemoveComments.bind(null, 'no')}
            />

            <Checkbox
              label="Only *"
              mode={mode}
              checked={removeComments === 'only'}
              setChecked={setRemoveComments.bind(null, 'only')}
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
          <button id="getCode">Get Code</button>
          <button
            type="submit"
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
