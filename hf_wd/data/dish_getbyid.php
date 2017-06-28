<?php
header('Content-Type:application/json');

@$id = $_REQUEST['id'];
if(empty($id)){
  echo '[]';
  return;
}
require('init.php');

$sql = "SELECT did,name,img_lg,detail,price FROM wd_dish WHERE did=$id";

$result = mysqli_query($conn,$sql);
$output = [];

$row = mysqli_fetch_assoc($result);

$output[] = $row;

echo json_encode($output);
?>