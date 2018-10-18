<?php
    header("Content-type: text/html; charset=utf-8");
    include 'connect.php';
    $user = isset($_POST['username']) ? $_POST['username'] : "";
    $psd = isset($_POST['password']) ? $_POST['password'] : "";

     //查询语句 1、写sql语句
     $sql="SELECT * FROM users  WHERE username='$user' ";
    
     if($psd){
        $sql="SELECT username FROM users  WHERE username='$user'  and password='$psd' ";
     }
     //查询语句 2、执行语句
     $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);
    if($res->num_rows>0){
        echo "1";
    }else{
        echo "0";
    }
     $conn->close();//关闭数据库的链接

?>