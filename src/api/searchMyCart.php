<?php
    header("content-type:text/html;charset=utf-8");
    include 'connect.php';
    $username = isset($_POST['username']) ? $_POST['username'] : "";

     //查询语句 1、写sql语句
     $sql="select a.goodid, a.bigimg1,a.title,a.nowprice, b.quanlity ,b.color ,b.size from aolaigo.goods a ,aolaigo.orders b where a.goodid = b.goodid and b.username = $username";

     //查询语句 2、执行语句
     $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);
     $row=$res->fetch_all(MYSQLI_ASSOC);
    //  var_dump($res);
     //通过fetch_all(MYSQLI_ASSOC)方法得到数据，是一个数组类型
     if($row){
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();//关闭结果集
     }else{
         echo "0";
     }
     
   
     
     $conn->close();//关闭数据库的链接
?>