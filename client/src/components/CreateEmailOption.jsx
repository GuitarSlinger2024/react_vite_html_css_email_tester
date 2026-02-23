import React from 'react'
import DropdownCheckbox from './DropdownCheckbox'
import trash from '../_img/trash.png'

export function CreateEmailOption({
  opt,
  selectAddresses,
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
        {(
          <DropdownCheckbox
            label=""
            mode={mode}
            checked={false}
            showBox={selectAddresses}
            onClick={e => {
              emailOptionClicked(e)
            }}
          />
        )}
        <p
          className={`emailOpt ${selectAddresses && 'shortened'}`}
          onClick={e => {
            emailOptionClicked(e)
          }}
        >
          <p className="emailName">{name}</p>
          <p className="emailDomain">{domain}</p>
        </p>
      </span>

      {!selectAddresses && (
        <p className="trashCan">
          <img
            src={trash}
            alt="delete button"
            onClick={deleteAddress}
          />
        </p>
      )}
    </>
  )
}

export default CreateEmailOption
