import '../styles/instructions.css'

function Instructions({currentDiv}) {
  return (
    <div className="instructions" id='instructions'>
      <div className={`instruction-inner ${currentDiv !== 'instructions'} ? 'hideThisDiv' : ''`}>
        <h2>Instructions</h2>
        
        <p>
          First, I have re-worked this program so you do not have to be a PHP
          programmer to use it. However, if you would like to use this program
          locally you will need to set up a local server (such as xampp). See
          'Install Locally' below.
        </p>

        <p>
          This is an aid in creating HTML Email templates. With this program you
          can delete comments and hsl color values are replaced with hex values.
          The latter part is primarily because of advice about using hsl and
          hsla to find good color matches. Any email template within the email
          root folder or subfolder can be previewed quickly as you code, then
          sent to your own email accounts & viewed on your own devices. Once
          everything seems OK, then the template can be tested with{' '}
          <a
            href="https://www.emailonacid.com"
            target="_blank"
          >
            Email On Acid
          </a>{' '}
          without wasting any credits. PHP programmers can download the final
          product with the image paths altered and the snippets needed for
          embedding the images with phpMailer.
        </p>

        <p>
          On the 'Get Code' page, checking 'Yes' or 'No' will delete all or none
          of the HTML & CSS comments. 'Only <span class="asterisk">*</span>'
          will cause any/all comments with an asterisk (
          <span class="asterisk">*</span>) included to be deleted. Clicking 'Get
          Code' when 'Select' is checked will reveal a dropdown so you can go
          through each HTML and CSS comments to 'Save' or 'Delete' it. If you
          have ghost-tables, then you should double-check the code '<u>After</u>
          ' to see which comments have been kept before sending. This does not
          effect the file itself, only what is sent or downloaded is altered.
        </p>

        <p>
          To the left of the '<u>Preview</u>' button is the refresh icon. This
          does the same as 'Get Code' while keeping whatever is being looked at
          in view (preview, before, after, values or snippets). '<u>Preview</u>'
          is to look at the email itself. Click and drag the right edge to
          resize the image for smaller screens. '<u>Before</u>' and '
          <u>After</u>' is for looking at the code before and after it is
          processed. '<u>Values</u>' and '<u>Snippets</u>' show how the images
          references have been handled, as well as any hsl to hex conversions.
        </p>

        <br />
        <h2>Customized settings</h2>

        <p>
          <u>Customize the color scheme</u> for image references, color values,
          comments and hsl errors as well as the box-shadow and border-radius.
          These settings will not be saved unless you are logged-in or you are
          running the program locally. Also, any email address you enter will
          not be saved for your account only and will not be displayed to any
          other users. Like the color settings, email addresses entered by
          un-registered users will be deleted when the browser is refreshed.
        </p>

        <br />
        <h2>Upload Template</h2>
        <p>
          First, any templates that are uploaded to this site without being
          logged-in are subject to deletion at any time. Registered users can
          have up to 2 templates uploaded at a time. Double-click any template
          to delete it.
          <br />
          <br />
          Most of the instructions needed for the folder structure is given on
          the '<u>Upload Zip</u>' page. Be sure to enclose the src values with
          double quotes, single quotes may cause an error. Starting each image
          location with "./" is also recommended to make it easier for this
          program to read and edit. Unfortunately, this program does NOT inline
          CSS... Yet.
        </p>

        <br />
        <h2>Download Template</h2>
        <p>
          Downloading a template is for PHP programmers that use phpMailer. The
          'Download' button does not become active until after a template is
          picked and 'Get Code' is clicked. The downloaded folder includes the
          html template after the image src values and any hsl or hsla colors
          are changed to hex values. A snippets.php file is also included for
          use with the program that will actually send the email. PHP
          programmers who are working with phpMailer should be able to work with
          the absolute path at the beginning of the snippets.php file.
          <br />
          <br />
          Non PHP programmers can still benefit by downloading and installing
          this program. Not only will it make it easy to send test emails to any
          email address, it can also be a good place to keep all your original
          email templates with the original image src values. No more
          downloading needed.
        </p>

        <br />

        <h2>Install Locally</h2>
        <p>
          Assuming you have a code editor set up already, you will also need to
          install a local server, like xampp. There is plenty of instruction on
          the internet for doing this. Once a local server is set up, put this
          program into the htdocs folder and you are almost ready to go.
          <br />
          <br />
          You will also need a Gmail account, and you'll need to get a 3rd party
          password from Gmail. Again, you can find plenty of instruction for
          this online. Finally, open the Config.class.php file in the classes
          folder. Find "'phpMailer' = [...]" and enter the username (your gmail
          account, example@gmail.com), and the 3rd party password. The subject
          and who the email is from (you or your company name) can also be set
          here.
          <br />
          <br />
          To run the program, use your browser to navigate to: localhost / this
          program.
        </p>

        <br />
        <h2 class="pageHeading">Trouble-shooting</h2>
        <p>
          Let's say you download this program, you have a local server and
          everything is placed within the correct folders. There is one possible
          'hiccup' that you may experience having to do with a ZipArchives class
          that is included by default for PHP 5.6 and above.
          <br />
          <br />
          Let's further assume you are using a recent version of xampp with PHP
          5.6 or above, but both download buttons result in a 404 error. To
          correct this you need to go into the php.ini file in xampp/php.
          Uncomment (remove #) from the line:
          <br />
        </p>
        <p class="instruction-highlight">'#extension=zip'</p>
        <p>Then stop and re-start the Apache server.</p>

        <p>
          If this still does not work, click 'Config' in the xampp control
          panel, then click 'Apache (httpd-ssl.conf)'. Finally, add or uncomment
          the line:
        </p>

        <p class="instruction-highlight">
          'LoadModule deflate_module modules/mod_deflate.so'
        </p>

        <p>
          Stop and start the apache server again and refresh the email form
          tester. Everything should work from there.
        </p>
      </div>
    </div>
  )
}

export default Instructions
