<?php
function connect_database() {


  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "social_media_db";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } else {
    return $conn;
  }
}
?>