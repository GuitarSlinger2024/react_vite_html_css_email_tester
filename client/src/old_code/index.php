<?php


include_once './header.php';

?>

<main id="main">

  <section class="section getCode active">
    <form id="form1">


      <!--   Email address list   -->
      <label for="email">Send To:</label>
      <div class="dropdown_input_container emailDropdown">
        <div class="selectPlaceholder" data-ph="Enter or choose an email address"></div>
        <input name="sendTo" id="emailInput">

        <div class="emailList-container_1">
          <div class="datalist" id="emailList">
            <?php
            /*
                    My attempt to make the email suffix to be grey so the email
                    name will stand out and the suffix will be easier to see too
            */
            if (isset($emails))
              foreach ($emails as $name => $value) {
                $suffix = '@' . explode('@', $value)[1];
                // $div = "<div style='color:#888;'>$suffix</div>";
                // $name = '<span class="ellipsis">' + $name + '<span>';

                $name = "<div style='display:inline-block' class='ellipsis'>$name</div>";
                $div = "<span style='color:#999;display:inline-block'>$suffix</span>";
                echo '<li class="ellipsContainer" value="' . $value . '">' . $name . $div . '</li>';
              }
            ?>
          </div>
        </div>
      </div>




      <!-- template being worked on / looked at / sent -->
      <label for="email">Folder: <span class="directory_path"><span class="directory">root</span> <span style="color:var(--text-color);font-weight:900">/</span></span></label>
      <div class="dropdown_input_container">
        <div class="selectPlaceholder" id="file_input_ph" data-ph="<?php echo $directory['ph'] ?>"></div>
        <input name="folder" id="templateInput" data-foldertype="" readonly="readonly">

        <div class="templateList-container_2">
          <div class="datalist" id="templateList">
            <?php echo $directory['menu'] ?>
          </div>
        </div>
      </div>






      <div class="remove-comments-container">
        <p>Remove HTML & CSS comments</p>

        <div class="radioBtns">
          <aj-checkbox class="removeComments checkbox" data-name="removeComments" id="remove" data-mode="dark" data-type="radio" data-value="yes" data-label="Yes" data-checked="true"></aj-checkbox>

          <aj-checkbox class="removeComments checkbox" data-name="removeComments" id="dontRemove" data-mode="dark" data-type="radio" data-value="no" data-label="No" data-checked="false"></aj-checkbox>

          <aj-checkbox class="removeComments checkbox" data-name="removeComments" id="deleteStar" data-mode="dark" data-type="radio" data-value="deleteStar" data-label="Only <span class='asterisk'>*</span></label>" data-checked="false"></aj-checkbox>

          <aj-checkbox class="removeComments checkbox" data-name="removeComments" id="selectedOnly" data-mode="dark" data-type="radio" data-value="selected" data-label="Select" data-checked="false"></aj-checkbox>
        </div>

      </div>




      <div class="deleteMultiLines">
        <p>
          Remove blank lines
        </p>
        <div id="blankLines">
          <div class="radioBtns">

            <aj-checkbox class="checkbox" data-name="blanks" id="deleteAllEmptyLines" data-mode="dark" data-type="radio" data-value="all" data-label="Remove" data-checked="true"></aj-checkbox>

            <aj-checkbox class="checkbox" data-name="blanks" id="allowOnlyOneLine" data-mode="dark" data-type="radio" data-value="one" data-label="Reduce" data-checked="false"></aj-checkbox>

            <aj-checkbox class="checkbox" data-name="blanks" id="dontDeleteAnyLines" data-mode="dark" data-type="radio" data-value="none" data-label="Leave 'as-is'" data-checked="false"></aj-checkbox>

          </div>
        </div>
      </div>


      <br>
      <div class="btnContainer">
        <button id="getCode">Get Code</button>
        <button type='submit' value='submit' name="send-email" id='send' disabled class="doSomething doSomething1">Send</button>
        <button disabled='true' class="doSomething doSomething2 downloadBtn" id="download_template">Download</button>
      </div>

      <div class="message response">
        <h3>No message at this time</h3>
      </div>

    </form>

  </section>

  <section class="section settings hide">

    <h2>Settings</h2>
    <p>
      Each item uses the same color for both light and dark mode. You can change the box-shadow blur and spread values. Adding a border-radius can have a bigger effect when used with a box shadow instead of padding.
    </p>


    <div class="resetColorsBtn">Reset</div>

    <div class="colorChoices">

      <div class="colorSelector oldSrc">
        <div class="darkSide"><span class="image">./images/img.png</span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="image">./images/img.png</span></div>
      </div>

      <div class="colorSelector newSrc">
        <div class="darkSide"><span class="cid">cid:image_1</span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="cid">cid:image_1</span></div>
      </div>

      <div class="colorSelector hslValues">
        <div class="darkSide"><span class="hsl">hsl(216, 60%, 55%)</span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="hsl">hsl(216, 60%, 55%)</span></div>
      </div>

      <div class="colorSelector hexValues">
        <div class="darkSide"><span class="hex">#4980d2</span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="hex">#4980d2</span></div>
      </div>

      <div class="colorSelector commentsColor">
        <div class="darkSide"><span class="comment"><-- Comments --></span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="comment"><-- Comments --></span></div>
      </div>

      <div class="colorSelector hslErrorsText">
        <div class="darkSide"><span class="error">hsla( error - text )</span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="error">hsla( error - text )</span></div>
      </div>

      <div class="colorSelector hslErrorsBkground">
        <div class="darkSide"><span class="error">hsla( error - bkgrnd ) </span></div>
        <input type="string" class="centerOf">
        <div class="lightSide"><span class="error">hsla( error - bkgrnd ) </span></div>
      </div>

      <div class="colorSelector boxShadow" style="height: max-content;">
        <div class="darkSide"><span>Sample Blur</span></div>
        <div class="centerOf" style="padding: 0;">
          <div>
            <label for="blurInput">blur-radius</label>
            <input type="number" id="blurInput">
            <span>px</span>
          </div>
          <div>
            <label for="spreadInput">spread-radius</label>
            <input type="number" id="spreadInput">
            <span>px</span>
          </div>
          <div>
            <label for="borderRadius">border-radius</label>
            <input type="number" id="borderRadius" class="borderRadius">
            <span>px</span>
          </div>

        </div>
        <div class="lightSide"><span>Sample Blur</span></div>
      </div>

    </div>
  </section>

  <section class="section upload hide">

    <form id="form2" action="">
      <div class="upload_instructions">
        To upload a template, create a folder with the same name as the HTML file having the css inlined. An index file with css that is not inlined is optional. The image folder should be named 'images', 'img', or '_img'.
        <br><br>
        <div>
          &nbsp;&nbsp;&nbsp;<i>TemplateName</i> <small>(main folder)</small><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>TemplateName</i>.html <small>(inlined CSS)</small>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.html <small>(optional working copy)</small><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;images <small>(.jpg, .jpeg, or .png)</small><br>
        </div>
      </div>
      <br>
      <div class="upload_folder">
        <p>Zip the folder, then upload it to the root folder (default), or
          <br>click 'Get Code' and navigate to any folder before uploading.
        </p>
        <div class="radioBtns">
          <aj-checkbox data-checked="true" data-labelcolors="[&#34;blue&#34;, &#34;lightblue&#34;]" class="checkbox" data-name="upload_to" data-mode="dark" data-type="radio" data-value="index" data-label="<span class='directory'>root</span> <span style='color: var(--text-color);font-weight:900'>/</span>">
          </aj-checkbox>

          <aj-checkbox data-checked="false" data-labelcolors="[&#34;blue&#34;, &#34;lightblue&#34;]" class="checkbox dir_path" data-name="upload_to" data-mode="dark" data-type="radio" data-value="current" data-label="<span class='directory'>root</span> <span style='color: var(--text-color);font-weight:900'>/</span>"></aj-checkbox>
        </div>
        <br>
        <p>To create a new directory, zip and upload an empty folder.</p>
        <br>
      </div>

      <div id="dropZone">
        <div class="drop_msg"></div>
        <input type="file" id="zipFileInput" accept="application/x-zip-compressed">
      </div>
    </form>

  </section>

  <section id="controls" class="section instructions hide">

    <div class='instructions'>
      <div class="instruction-inner">
        <!-- Main Instructions -->
        <h2>Instructions</h2>

        <p>
          First, I have re-worked this program so you do not have to be a PHP programmer to use it. However, if you would like to use this program locally you will need to set up a local server (such as xampp). See 'Install Locally' below.
        </p>

        <p>
          This is an aid in creating HTML Email templates. With this program you can delete comments and hsl color values are replaced with hex values. The latter part is primarily because of advice about using hsl and hsla to find good color matches. Any email template within the email root folder or subfolder can be previewed quickly as you code, then sent to your own email accounts & viewed on your own devices. Once everything seems OK, then the template can be tested with <a href="https://www.emailonacid.com" target="_blank">Email On Acid</a> without wasting any credits. PHP programmers can download the final product with the image paths altered and the snippets needed for embedding the images with phpMailer.
        </p>

        <p>
          On the 'Get Code' page, checking 'Yes' or 'No' will delete all or none of the HTML & CSS comments. 'Only <span class="asterisk">*</span>' will cause any/all comments with an asterisk (<span class="asterisk">*</span>) included to be deleted. Clicking 'Get Code' when 'Select' is checked will reveal a dropdown so you can go through each HTML and CSS comments to 'Save' or 'Delete' it.
          If you have ghost-tables, then you should double-check the code '<u>After</u>' to see which comments have been kept before sending. This does not effect the file itself, only what is sent or downloaded is altered.
        </p>

        <p>
          To the left of the '<u>Preview</u>' button is the refresh icon. This does the same as 'Get Code' while keeping whatever is being looked at in view (preview, before, after, values or snippets). '<u>Preview</u>' is to look at the email itself. Click and drag the right edge to resize the image for smaller screens. '<u>Before</u>' and '<u>After</u>' is for looking at the code before and after it is processed. '<u>Values</u>' and '<u>Snippets</u>' show how the images references have been handled, as well as any hsl to hex conversions.
          <br><br>
          Warning: the preview uses an iframe to display the html. Cached files and images may sometimes need to be cleared.
        </p>




        <br>
        <!-- Customize Settings -->
        <h2>Customized settings</h2>
        <p style="margin-top: 20px">
          <u>Customize the color scheme</u> for image references, color values, comments and
          hsl errors as well as the box-shadow and border-radius. These settings will not be saved unless you are logged-in or you are running the program locally. Also, any email address you enter will not be saved for your account only and will not be displayed to any other users. Like the color settings, email addresses entered by un-registered users will be deleted when the browser is refreshed.
        </p>

        <br>
        <h2>Upload Template</h2>
        <p>
          First, any templates that are uploaded to this site without being logged-in are subject to deletion at any time. Registered users can have up to 2 templates uploaded at a time. Double-click any template to delete it.
          <br><br>
          Most of the instructions needed for the folder structure is given on the '<u>Upload Zip</u>' page. Be sure to enclose the src values with double quotes, single quotes may cause an error. Starting each image location with "./" is
          also recommended to make it easier for this program to read and edit. Unfortunately, this program does NOT inline CSS... Yet.
        </p>


        <br>
        <h2>Download Template</h2>
        <p>
          Downloading a template is for PHP programmers that use phpMailer. The 'Download' button does not become active until after a template is picked and 'Get Code' is clicked. The downloaded folder includes the html template after the image src values and any hsl or hsla colors are changed to hex values. A snippets.php file is also included for use with the program that will actually send the email. PHP programmers who are working with phpMailer should be able to work with the absolute path at the beginning of the snippets.php file.

          <br><br>
          Non PHP programmers can still benefit by downloading and installing this program. Not only will it make it easy to send test emails to any email address, it can also be a good place to keep all your original email templates with the original image src values. No more downloading needed.
        </p>



        <br>
        <!-- Customize Settings -->
        <h2>Install Locally</h2>
        <p style="margin-top: 20px">
          Assuming you have a code editor set up already, you will also need to install a local server, like xampp. There is plenty of instruction on the internet for doing this.
          Once a local server is set up, put this program into the htdocs folder and you are almost ready to go.
          <br><br>
          You will also need a Gmail account, and you'll need to get a 3rd party password from Gmail. Again, you can find plenty of instruction for this online. Finally, open the Config.class.php file in the classes folder. Find "'phpMailer' => [...]" and enter the username (your gmail account, example@gmail.com), and the 3rd party password. The subject and who the email is from (you or your company name) can also be set here.
          <br><br>
          To run the program, use your browser to navigate to: localhost / this program.
        </p>

        <br>
        <!-- Trouble-shooting -->
        <h2 class="pageHeading">Trouble-shooting</h2>
        <p>
          Let's say you download this program, you have a local server and everything is placed within the correct folders. There is one possible 'hiccup' that you may experience having to do with a ZipArchives class that is included by default for PHP 5.6 and above.
          <br><br>
          Let's further assume you are using a recent version of xampp with PHP 5.6 or above, but both download buttons
          result in a 404 error. To correct this you need to go into the php.ini file in
          xampp/php. Uncomment (remove #) from the line:<br>

        <p class="instruction-highlight">'#extension=zip'</p>
        <p>Then stop and re-start the Apache server.</p>


        <p>
          If this still does not work, click 'Config' in the xampp control panel, then click 'Apache (httpd-ssl.conf)'. Finally, add or
          uncomment the line:
        </p>


        <p class="instruction-highlight">'LoadModule deflate_module modules/mod_deflate.so'</p>

        <p>Stop and start the apache server again
          and refresh the email form tester. Everything should work from there.
        </p>

      </div>
    </div>

    <p>The current folder path is shown in two places ('Get Code' & 'Upload Zip'). You might want to pay attention to the length of each directory name and the possible 'depth' of your folder structure.</p>

  </section>

</main>



<section id="displayCode">
  <div id="info">

    <nav id="infoHeader">
      <div id="whatIsShownBtns">
        <ul id="showInfo">
          <div>
            <img id="refreshPrev" src="./_img/6d584fb48005.svg" alt="Refresh Preview">
            <li>
              <p class="radio" id="viewTemplate">Preview</p>
            </li>
          </div>
          <div style="display: flex;">
            <li>
              <p class="radio" id="showOldHTML">Before</p>
            </li>
            <li>
              <p class="radio" id="showNewHTML">After</p>
            </li>
            <li>
              <p class="radio" id="showArray">Values</p>
            </li>
            <li>
              <p class="radio" id="showPHP">Snippets</p>
            </li>
          </div>

        </ul>
      </div>
    </nav>

    <pre id="preInfo_view" class="preInfo">
      <div class="iframe-container">
        <!-- src="./email_forms/the_musicians_forum/confirm_registration/confirm_registration.html"  -->
        <iframe class="iframe_1" id="iframe_1" name="iframe_1" title="View how the email actually looks" 
          style="::-webkit-scrollbar {
                      width: 0px;
                      height: 0px;
                    }"
          sandbox="allow-downloads"
          frameborder="0">
        </iframe>
      </div>
    </pre>
    <pre id="preInfo_before" class="preInfo"></pre>
    <pre id="preInfo_after" class="preInfo"></pre>
    <pre id="preInfo_snippets" class="preInfo"></pre>

    <div id="notPre" class="hide"></div>


  </div>
</section>

<section class="section dropDown" id="dropDown">
  <div class="commentPicker">
    <small id="commentCount"></small>
    <p class="firstPara">Unnecessary comments should be deleted</p>
    <p class="secondPara">Would you like to keep this comment?</p>
    <div id="loadComments"></div>
    <div class="commentBtns">
      <button id="saveCmnt">Save</button>
      <button id="deleteCmnt">Delete</button>
      <button id="cancelSelect">Cancel</button>
    </div>
  </div>
</section>

<div id="theBottomLine">
  <div id="previewWidth"></div>
  <div id="upArrow">Back To Top</div>
</div>

</body>

</html>

<script>
  const body = document.getElementById('body')

  const highlights = []
  const userInfo = []
</script>