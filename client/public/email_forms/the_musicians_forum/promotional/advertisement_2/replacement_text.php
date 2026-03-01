<?php 

$replace_name = (isset($_SESSION['full_name'])) ? $_SESSION['full_name'] : "Your_Name";

$replacement_texts = [
    ["[NameHere]", "$replace_name"],
    ["[C O D E]", "1 2 3 4"]
];

/*
          This is an optional file. If the program you plan to use this code in
          needs to replace any text by, for example by adding a name to personalize
          it or if there is a verification code that needs to be included, then these
          values can be included here. Each array within the $replacement_texts array
          should have two texts: the text to be searched for (also called the $needle)
          in the HTML template (referred to as the $haystack), and the text used to 
          replace the needle.

          The $_SESSION variable used above is a part of my portfolio where this program
          was downloaded from. The session variables used within your own phpMailer can
          be used as the 
*/