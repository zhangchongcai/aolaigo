<?php
    header("content-type:text/html;charset=utf-8");
    include 'connect.php';
    $username = isset($_POST['username']) ? $_POST['username'] : "";
    $password = isset($_POST['password']) ? $_POST['password'] : "";

     //查询语句 1、写sql语句
     $sql="INSERT into users(username,password) values ('$username','$password')";

     //查询语句 2、执行语句
     $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);
     
    if($res){
        echo "1";
    }else{
        echo "0";
    }

    //  $res->close();//关闭结果集
     $conn->close();//关闭数据库的链接

?>