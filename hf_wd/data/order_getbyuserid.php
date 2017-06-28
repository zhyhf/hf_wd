<?php
header('Content-Type:application/json');

$output = [];

@$userid = $_REQUEST['userid'];

if(empty($userid)){
    echo "[]"; //若客户端未提交用户id，则返回一个空数组，
    return;    //并退出当前页面的执行
}

//访问数据库
require('init.php');

//三表查询--查出订单页需要的数据，实现表与表之间的关联

$sql = "SELECT wd_order.oid,wd_order.userid,wd_order.phone,wd_order.addr,wd_order.totalprice,wd_order.user_name,wd_order.order_time,wd_dish.img_sm from wd_order,wd_dish,wd_cart WHERE wd_cart.did = wd_dish.did and wd_cart.userid = wd_order.userid and wd_order.userid='$userid'";
$result = mysqli_query($conn, $sql);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
?>
