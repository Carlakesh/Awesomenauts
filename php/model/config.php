<?php

//accessing info
require_once(__DIR__ . "/Database.php");
require_once(__DIR__ . "/date.php");
//were creating a new database over and over again, this will help by proserving infos, we wont have to gernorate the info
session_start();
session_regenerate_id(true);

// accessing the right path
$path = "/phpblog/";

// '$' are variables , strings next to it are stored into the variable 
$host = "localhost";
$username = "root";
$password = "root";
$database = "blog_db";

//checking if the session variable excists . 
if (!isset($_SESSION["connection"])) {
    //creating new database object
    $connection = new Database($host, $username, $password, $database);
    //session variable,  were signing a value to it after the equal sign
    $_SESSION["connection"] = $connection;
}




