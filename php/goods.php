<?php
    include('./mysql.php');

    // 获取ajax请求的方法;
    $fn = $_GET['fn'];
    $fn();

    // 获取数据库中所有的商品信息
    function listAll(){
        $sql = "select * from product";
        $data = select($sql);
        if($data){
            echo json_encode([
                'stateCode'=>200,
                'state'=>'success',
                'data'=>$data
            ]);
        }else{
            echo json_encode([
                'stateCode'=>404,
                'state'=>'error',
                'data'=>''
            ]);
        }
    }


    // 商品添加到购物车中
    function add(){
        $userId = $_POST['userId'];
        $gId = $_POST['gId'];
        $gNum = $_POST['gNum'];

        $sql = "insert into carts(userId,productId,num) values('$userId','$gId', '$gNum') on duplicate key update num=num+$gNum";
        $res = query($sql);
        if($res == 1){
            echo json_encode([
                'stateCode'=>200,
                'state'=>'success',
                'data'=>''
                ]);
        }else{
            echo json_encode([
                'stateCode'=>315,
                'state'=>'error',
                'data'=>''
                ]);
        }
    }


?>