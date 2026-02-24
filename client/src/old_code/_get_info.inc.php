<?php
session_start();
require_once('../core/auto_loader.core.php');

if (!isset($_POST['folder'])) {
  echo json_encode(['error' => 'invalidData', 'errorNum' => '1']);
  exit();
}

//    This will come from $_SESSION['template_dir']['current_folder']
// $folder_name = Input::get('folder');

$folder_path = $_SESSION['template_dir']['current_folder'];
$folder_array = explode('/', $folder_path);
$folder_name = array_pop($folder_array);
$file_name = $folder_name . '.html';

//   from the form  -   $remove = 'yes', 'no', 'deleteStar', 'selected'
$remove = Input::get('removeComments');

//    all   one   none
$remove_blanks = Input::get('blanks');

include '__process_html.php';

if ($remove == 'yes' || $remove == 'selected' || $remove == 'deleteStar') {

  //  Long method to get comments and replace values
  //          get all comments
  $comments = getComments($new_template);

  if ($remove == 'deleteStar') {
    $comments = array_filter(
      $comments,
      function ($str) {
        return (strpos($str, '*') !== false);
      }
    );
  }
  //          replace comments
  $returnedArray = removeCommentsFunc($new_template, $comments);
  $new_template = $returnedArray[0];
  $cmnts = $returnedArray[1];
} else {
  $cmnts = 'nothing removed';
  $comments = 'no comment';
}

if ($remove_blanks === 'all') {
  $new_template = preg_replace("/(\r?\n)(?:\r?\n)+/", "\n", $new_template);
  $new_template = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $new_template);
}

if ($remove_blanks === 'one') {
  $new_template = preg_replace("/(\r?\n)(?:\r?\n)+/", "\n\n", $new_template);
  $new_template = preg_replace("/^[\r\r\r]+/", "\n", $new_template);
}


$_SESSION['colorized_old'] = $colorized_old = addColor($template);
$_SESSION['colorized_new'] = $colorized_new = addColor($new_template);

$_SESSION['full_name'] = isset($full_name) ? $full_name : "";
$_SESSION['old'] = $template;
$_SESSION['images'] = $images;
$_SESSION['new'] = $new_template;
$_SESSION['php'] = $php_code;
$_SESSION['fileName'] = $file_name;
$_SESSION['comments'] = $comments;
$_SESSION['cmnts'] = $cmnts;

function Delete($path) {
  if (is_dir($path) === true) {
    $files = array_diff(scandir($path), array('.', '..'));

    foreach ($files as $file) {
      Delete(realpath($path) . '/' . $file);
    }

    return rmdir($path);
  } else if (is_file($path) === true) {
    return unlink($path);
  }

  return false;
}

Delete('../temp/temp_display_template');

//  Create a temporary folder - used as scr value for iframe
if (!file_exists('../temp/temp_display_template')) {
  mkdir('../temp/temp_display_template');
}

if (!file_exists('../temp/temp_display_template/' . $image_folder)) {
  mkdir('../temp/temp_display_template/' . $image_folder);
}

//  Append the styles to the head of the document?
$displayHTML = $old_template . "<style>body::-webkit-scrollbar {width: 0};body {scrollbar-width: 0}</style>";
$myFile = fopen($_SESSION['template_dir']['root'] . '/temp/temp_display_template/temp_display_template.html', 'w');
fwrite($myFile, $displayHTML);
fclose($myFile);

$from = '..' . $_SESSION['template_dir']['current_folder'] . '/' . $image_folder;
$files = array_diff(scandir($from), array('..', '.'));
foreach ($files as $key => $value) {
  Copy($from . '/' . $value, '../temp/temp_display_template/' . $image_folder . '/' . $value);
}





echo json_encode([
  'files' => $files,
  'images' => $images,
  'old' => $template,
  'colorizedOld' => $colorized_old,
  'colorizedNew' => $colorized_new,
  'new' => $new_template,
  'php' => $php_code2,
  'fileName' => $file_name,
  'comments' => $comments,
  'cmnts' => $cmnts,
  'action' => $remove,
  'hsl_conversions' => $hex_array,
  'blanks' => $remove_blanks,
  'folder' => $_SESSION['template_dir']['current_folder']
]);
exit();
