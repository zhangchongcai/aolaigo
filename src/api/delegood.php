<?php
    header("content-type:text/html;charset=utf-8");
    include 'connect.php';
    $goodid = isset($_POST['goodid']) ? $_POST['goodid'] : "1";
    $username = isset($_POST['username']) ? $_POST['username'] : "1";

     //查询语句 1、写sql语句 删除
     $sql="DELETE FROM orders where username=$username AND goodid=$goodid";

     //查询语句 2、执行语句
     $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);
 
     $conn->close();//关闭数据库的链接
?>