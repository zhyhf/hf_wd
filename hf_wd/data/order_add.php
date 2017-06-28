<?php
header('Content-Type:application/json');
$output = [];
@$userid = $_REQUEST['did'];
@$phone = $_REQUEST['phone'];
@$user_name = $_REQUEST['user_name'];
@$addr = $_REQUEST['addr'];
@$price = $_REQUEST['totalPrice'];

$order_time = time()*1000;   //PHP中的time()函数返回当前系统时间对应的整数值



//访问数据库
require('init.php');


$sql = "insert into wd_order values(null,'$userid','$phone','$user_name','$order_time','$addr','$price')";
$result = mysqli_query($conn, $sql);

$arr = [];
if($result){    //INSERT语句执行成功，需要获取新产生的订单id
    $oid = mysqli_insert_id($conn); //获取最近执行的一条INSERT语句生成的自增主键
    //json数据转换为json数组
    //$cart = json_decode($cartDetail);


    $arr['msg'] = 'succ';
    $arr['reason'] = "订单生成成功";
    $arr['oid'] = $oid;
}else{          //INSERT语句执行失败
    $arr['msg'] = 'error';
    $arr['reason'] = "订单生成失败";
}
$output[] = $arr;
echo json_encode($output);
?>
