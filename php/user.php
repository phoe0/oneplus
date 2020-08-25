<?php
    include('./mysql.php');

    // 接收传递的方法名; 并调用该方法;
    $fn = $_GET['fn'];
    $fn();

    // 用户注册信息
    function addUser(){
        $userName = $_POST['userName'];
        $passWord = $_POST['passWord'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];

        $sql = "insert into  userinfo(userName,passWord,phone,email) values('$userName','$passWord','  $phone','$email')";
        $res = query($sql);
        if($res==1){
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

    // 核对用户登录信息；
    function login(){
        $userName = $_POST['userName'];
        $sql = "select passWord,userId from userinfo where userName='$userName'";
        $data = select($sql);
        if($data){
            echo json_encode([
                'stateCode'=>200,
                'state'=>'success',
                'data'=>$data
            ]);
        }else{
            echo json_encode([
                'stateCode'=>500,
                'state'=>'error',
                'data'=>''
            ]);
        }
       


    }


?>