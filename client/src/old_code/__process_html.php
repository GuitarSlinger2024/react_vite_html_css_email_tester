<!-- 
  
$folder_path = $_SESSION['template_dir']['current_folder'];
$folder_array = explode('/', $folder_path);
$folder_name = array_pop($folder_array);
$file_name = $folder_name . '.html';

$remove = Input::get('removeComments');

$remove_blanks = Input::get('blanks'); 

-->

<?php



//                     Add in User's full name and confirmation code
$new_template = str_replace('[NameHere]', $user_full_name, $new_template);
$new_template = str_replace('[C O D E]', $confirmation_code, $new_template);

include_once '_convert_to_hex.php';

//  $new_template is the haystack
$last_pos = 0;
$hex_array = [];

preg_match_all('/hsl\((.*?)\)/', $new_template, $hsl_array);

$hsl_array[0] = array_unique($hsl_array[0]);  //  full hsl property
$hsl_array[1] = array_unique($hsl_array[1]);  //  number values (with %'s), separated by commas

foreach ($hsl_array[1] as $key => $hsl) {
  $array = explode(',', $hsl);

  if (count($array) === 3) {

    $hue = trim($array[0]);
    $sat = trim(str_replace('%', '', $array[1]));
    $lit = trim(str_replace('%', '', $array[2]));

    try {
      $hex = convert_hsl((int)$hue, (int)$sat, (int)$lit);
      $new_template = str_replace($hsl_array[0][$key], $hex, $new_template);
    } catch (Exception $e) {
      $hsl = [$hsl_array[1][$key], $hsl_array[1][$key]];
    }

    array_push($hex_array, [$hex, $hsl_array[0][$key]]);
  } else {
    array_push($hex_array, ['error', $hsl_array[0][$key]]);
  }
}

//                    $template = original HTML code
//                    $new_template = modified email HTML (image paths & hsla)
//                    $images items should have:  ['marks'], ['file_name'], ['reference']

//      Create PHP snippets
$current = str_replace('./', '/', $_SESSION['template_dir']['current_folder']);
$absolute_path = $_SESSION['template_dir']['root'] . $current . "/$image_folder/";

$php_code = "<?php\n" . '$absolute_path = "' . $absolute_path . '";' . "\n";
$php_code2 = "<?php\n \$absolute_path = str_replace('\\', '/', __DIR__) . '/template folder/image folder/'\n";

foreach ($images as $imgObj) {
  $code = "\n" . '$image_path = $absolute_path . ' . $imgObj['file_name'] . ";\n";
  $code .= '$reference = ' . $imgObj['reference'] . ";\n";
  $code .= '$mail->AddEmbeddedImage($image_path, $reference);' . "\n";
  $php_code .= $code;
  $php_code2 .= $code;
}

function getComments($new)
{
  //   HTML comments   <!--   -->
  preg_match_all("/<!--(?!>)[\S\s]*?-->/", $new, $comments1, PREG_PATTERN_ORDER);

  //   CSS comments  /* */
  preg_match_all("/\s*(?!<\")\/\*[^\*]+\*\/(?!\")\s*/", $new, $comments2, PREG_PATTERN_ORDER);

  $comments = array_merge($comments1[0], $comments2[0]);

  return $comments;
}

function removeCommentsFunc($new, $comments)
{
  $removed = [];
  foreach ($comments as $key => $value) {
    if (strpos($new, $value) !== false) {
      $new = str_replace($value, "", $new);
      array_push($removed, $value);
    }
  }

  return [$new, $removed];
}


function addColor($new)
{
  // return
  preg_match_all("/<!--(?!>)[\S\s]*?-->/", $new, $html, PREG_PATTERN_ORDER);
  if (count($html[0]) > 0)
    foreach ($html[0] as $key => $value) {
      $new = str_replace($value, "<pre>$value</pre>", $new);
    }

  preg_match_all("/\s*(?!<\")\/\*[^\*]+\*\/(?!\")\s*/", $new, $css, PREG_PATTERN_ORDER);
  foreach ($css[0] as $key => $value) {
    $new = str_replace("$value", "<pre>$value</pre>", $new);
  }

  return $new;
}
