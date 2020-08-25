<?php
    include('./mysql.php');
      // 接收传递的方法名; 并调用该方法;
      $fn = $_GET['fn'];
      $fn();

       //   根据用户id获取所有的商品id;
      function getGoodsId(){
          $userId = $_GET['userId'];
          // 查询商品的id 和数量；
          $sql = "select productId,num from carts where userId=$userId";
          $data = select($sql);
          if($data){
            echo json_encode([
                'stateCode'=>200,
                'state'=>'success',
                'data'=>$data
            ]);
          }else{
            echo json_encode([
                'stateCode'=>505,
                'state'=>'error',
                'data'=>''
            ]); 
          }
      }


    //   根据商品id获取，获取 [product表]中的数据;
    function lst(){
        $ids = $_POST['gId'];
        $ids = substr($ids,0,strlen($ids)-1);

        // 一次获取多条数据；
        $sql = "select * from product where gId in ($ids)";
        $data = select($sql);
        if($data){
            echo json_encode([
                'stateCode'=>200,
                'state'=>'success',
                'data'=>$data
            ]);
        }else{
            echo json_encode([
                'stateCode'=>090,
                'state'=>'error',
                'data'=>''
            ]);
        }
    }

    // 更新数据库 cart 的数量
    function update(){
        $gId = $_GET['gId'];
        $userId = $_GET['userId'];
        $gNum = $_GET['gNum'];

        $sql = "update carts set num=$gNum where productId=$gId and userId=$userId";
        $res = query($sql);
        if($res == 1){
            echo json_encode([
            'stateCode'=>200,
            'state'=>'success',
            'data'=>''
            ]);
        }else{
            echo json_encode([
            'stateCode'=>201,
            'state'=>'error',
            'data'=>''
            ]);
        }
    }

?>