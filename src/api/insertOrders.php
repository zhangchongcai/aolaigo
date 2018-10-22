<?php
    header("content-type:text/html;charset=utf-8");
    include 'connect.php';
    $stuta = isset($_POST['username']) ? $_POST['username'] : "";
    $username = isset($_POST['username']) ? $_POST['username'] : "";
    $goodid = isset($_POST['goodid']) ? $_POST['goodid'] : "";
    $color = isset($_POST['color']) ? $_POST['color'] : "";
    $quanlity = isset($_POST['quanlity']) ? $_POST['quanlity'] : "";
    $size = isset($_POST['size']) ? $_POST['size'] : "";
    
     //查询语句 1、写sql语句
    //  if($stuta==1){     
    //      //更新
    //     $sql="UPDATE `order` SET `order`.quanlity = $quanlity WHERE `order`.username =$username AND `order`.goodid=$goodid";
    //  }elseif($stuta==0){
    //      //插入
    //     $sql="INSERT INTO `order` (username,goodid,quanlity,color,size) VALUES ($username,$goodid,$quanlity,$color,`$size`)";
    //     echo $sql;
    //  }
    $sql="INSERT INTO orders (username,goodid,quanlity,color,size) VALUES ($username,$goodid,$quanlity,$color,'$size')";
    //  查询语句 2、执行语句
    //  $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);
    if($res){
        echo "1";
    }else{
        echo "0";
    }
     
     $conn->close();//关闭数据库的链接
?>