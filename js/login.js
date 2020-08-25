class Login {
    constructor() {
        this.inputs = all('.login-center input');

        // 给提交按钮,绑定点击事件
        bindEve(this.inputs[2], 'click', this.collInfo.bind(this));
    }
    collInfo() {
        let userName = this.inputs[0].value;
        let userPwd = this.inputs[1].value;
        // console.log(userName, userPwd);
        ajax.post('./php/user.php?fn=login', { userName: userName }).then(resArr => {
            // console.log(resArr);
            // console.log(resArr[2][0].passWord);
            if (resArr[0] == 200) {
                let pwdData = resArr[2][0].passWord;
                let userId = resArr[2][0].userId;
                if (userPwd == pwdData) {
                    localStorage.setItem('userName', userName)
                    localStorage.setItem('userId', userId);
                    location.href = 'http://localhost/pro/index-one.html';
                } else {
                    alert('用户名或密码错误');
                }
            }
        });
    }


}
new Login;