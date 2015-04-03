
<?php

//calling the right file
require_once(__DIR__ . "/../model/config.php");

//storing the text into a variable , input is to filter the input making sure no errors with the input.
// Input post is to send the info to us so we can recieve it.
//Sanatize string is to make sure no errors are going on
// the code is to receive the info 
$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
$post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);
$date = new DateTime("today");
$time = new DateTime("America/Los_Angeles");
//see if query runs successfully , establish query to database
//using single quote on the title to make sure it was being sent, its a string thats being stored
$query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post = '$post'");
//checking if a true value is stored within query 
//if its true
if ($query) {
    echo "<p> Successfully inserted post: $title </p> ";
    echo "posted on: " . $date->format('M/D/Y') . "at" . $time->format('g:i');
}

//there is two double quotes that is being used, and thats an issue
//had to cuncatinate 
else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}

header("Location: " . $path . "index.php");