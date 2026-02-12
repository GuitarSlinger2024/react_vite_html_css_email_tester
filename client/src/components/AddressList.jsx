import React from 'react'

function AddressList() {
  return (
    <>
      <label for="email">Send To:</label>
      <div class="dropdown_input_container emailDropdown">
        <div
          class="selectPlaceholder"
          data-ph="Enter or choose an email address"
        ></div>
        <input
          name="sendTo"
          id="emailInput"
        ></input>

        <div class="emailList-container_1">
          <div
            class="datalist"
            id="emailList"
          ></div>
        </div>
      </div>
    </>
  )
}

export default AddressList

// <?php
// /*
//         My attempt to make the email suffix to be grey so the email
//         name will stand out and the suffix will be easier to see too
// */
// if (isset($emails))
//   foreach ($emails as $name => $value) {
//     $suffix = '@' . explode('@', $value)[1];
//     // $div = "<div style='color:#888;'>$suffix</div>";
//     // $name = '<span class="ellipsis">' + $name + '<span>';

//     $name = "<div style='display:inline-block' class='ellipsis'>$name</div>";
//     $div = "<span style='color:#999;display:inline-block'>$suffix</span>";
//     echo '<li class="ellipsContainer" value="' . $value . '">' . $name . $div . '</li>';
//   }
// ?>
