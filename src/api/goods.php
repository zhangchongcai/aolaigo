<?php
    header("content-type:text/html;charset=utf-8");
    include 'connect.php';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : "";
    $way = isset($_GET['way']) ? $_GET['way'] : "";
    $page = isset($_GET['page']) ? $_GET['page'] : "1";
    if($sort==1){
        //查询语句 1、写sql语句
        $sql="SELECT * FROM goods ORDER BY goodid $way ";
    }elseif($sort==2){
        $sql="SELECT * FROM goods  order by sales $way ";
    }elseif($sort==3){
        $sql="SELECT * FROM goods  order by nowprice $way ";
    }elseif($sort==4){
        $sql="SELECT * FROM goods  order by beforeprice $way ";
    }elseif($sort==5){
        $sql="SELECT * FROM goods ORDER BY goodid $way ";
    }

     //查询语句 2、执行语句
     $conn->query("SET NAMES utf8");
     $res=$conn->query($sql);

    //  var_dump($res);
     //通过fetch_all(MYSQLI_ASSOC)方法得到数据，是一个数组类型
     $row=$res->fetch_all(MYSQLI_ASSOC);
     $count = count($row);
     $row = array_slice($row,($page-1)*10,10);
     $data =array("page"=>ceil($count/10),"all"=>$count,"quanlity"=>$row,"number"=>10);
 //  
//   var_dump($row);
 //  
 //  //把数组转成字符串，echo给前端
     echo json_encode($data,JSON_UNESCAPED_UNICODE);
   
     $res->close();//关闭结果集
     $conn->close();//关闭数据库的链接
?>