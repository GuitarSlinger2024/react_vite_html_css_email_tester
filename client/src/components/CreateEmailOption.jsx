import React from 'react'
import DropdownCheckbox from './DropdownCheckbox'
import trash from '../_img/trash.png'

export function CreateEmailOption({
  opt,
  selectOpts,
  mode,
  deleteAddress,
  emailOptionClicked,
}) {
  const strIndex = opt.indexOf('@')
  const name = opt.slice(0, strIndex)
  const domain = opt.slice(strIndex)
  return (
    <>
      <span>
        {selectOpts && (
          <DropdownCheckbox
            label=""
            mode={mode}
            checked={false}
            // setChecked={}
            // onclick={e => {
            //   console.log('CHECKBOX')
            //   checkboxClicked(e)
            // }}
          />
        )}
        <p
          className={`emailOpt ${selectOpts && 'shortened'}`}
          onClick={e => {
            emailOptionClicked(e)
          }}
        >
          <p className="emailName">{name}</p>
          <p className="emailDomain">{domain}</p>
        </p>
      </span>

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

export default CreateEmailOption
