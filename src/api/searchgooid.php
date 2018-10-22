<?php
    header("content-type:text/html;charset=utf-8");
    include 'connect.php';
    $username = isset($_POST['username']) ? $_POST['username'] : "";
    
     //查询语句 1、写sql语句
     $sql="SELECT quanlity,color,size,goodid FROM orders WHERE username=$username";

     //查询语句 2、执行语句
     $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);
     
    if($res){
        $row=$res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }else{
        echo "0";
    }
   
     $conn->close();//关闭数据库的链接
?>