This is meant to be a way to send HTML CSS email by first previewing them in the app, then by sending them to one or more email address so you can look at what is actually sent. The github repo for this can be found at:

  https://react-vite-html-css-email-tester.onrender.com

This project is not done yet. To see a working version that uses vanilla JS & php, go here:

  https://andrewjames.site/programs/10_developers_tools/test_html_email_forms/index.php

The new version uses React, with express for the server-side, with one great new feature added in. With this version bulk emails can be stored, with any/all of them being selected for any mailing. This means it not only helps to preview the emails, it is also a great way to store email addresses in a dropdown mailing list. 

There are two downsides that I am working on. First, there are two 'email_forms' folders, and the server side directory needs to match the client side. The server side templates need to include an [template name].html file with the same name as the folder, and an image folder(named '_img', '_imgs' or 'images'). Niether the html file nor the images folder need to have any content on the server side, as long as they match the client side. All the editing as well as the actual images are kept on the client side.

The reason for this is because of the folder navigation. I can't seem to find a way to read the folder names from the public folder for the folder dropdown menu, so this info is attained with a post request to the server. But I also can get the html templates to render (with images) from the backend because of cors restrictions that I haven't found the right answer to. Some old zonbie code is left commented out because of ideas I was working with.

with the server side running in a localhost environment, HTML CSS email developers should work on new templates in the client side folder, and 'npm run build' each time the code is edited. Not too bad. Also run build before deploying it if the server does not do this automatically. If your server does include run build, then .gitignore should include 'client'.

The second is that  
