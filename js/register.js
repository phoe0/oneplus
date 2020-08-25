class Register {
    constructor() {
        this.inputs = all('#con-login input');  // 获取所有的input框
        this.spans = all('#con-login span');
        this.ems = all('#con-login em');


        // 每个输入框的状态
        this.nameFlag = false;
        this.pwdFlag = false;
        this.pwd2Flag = false;
        this.telFlag = false;
        this.mailFlag = false;

        // 绑定事件
        this.bindEv();
    }
    bindEv() {
        bindEve(this.inputs[0], 'blur', this.userName.bind(this));
        bindEve(this.inputs[1], 'blur', this.pwd.bind(this));
        bindEve(this.inputs[2], 'blur', this.repeatPwd.bind(this));
        bindEve(this.inputs[3], 'blur', this.phone.bind(this));
        bindEve(this.inputs[4], 'blur', this.email.bind(this));
        bindEve(this.inputs[5], 'click', this.regSubmit.bind(this));
    }


    // 用户名
    userName(eve) {
        let e = eve || window.event;
        // console.log(e.target);  //  指向当前节点
        // console.log(this);  // 指向实例化对象

        let name = e.target.value;
        //  用户名仅支持中文、字母、数字、“-”“_”的组合，4-10个字符
        let reg = /^[\w\-\u4E00-\u9FA5]{4,10}$/;
        if (reg.test(name)) {
            this.spans[0].innerHTML = '';
            this.ems[0].innerHTML = '√';
            this.nameFlag = true;
        } else {
            this.spans[0].innerHTML = '用户名不合法';
            this.ems[0].innerHTML = '';
            this.nameFlag = false;
        }
    }


    // 密码
    pwd(eve) {
        let e = eve || window.event;
        let pwd = e.target.value;
        // 数字字母特殊字符，一种类型，弱。两种类型为中，三种类型为强
        // 长度为20位
        if (pwd.length > 20 || pwd.length < 6) {
            this.spans[1].innerHTML = '密码长度不合格';
            this.ems[1].innerHTML = '';
            this.pwdFlag = false;
        } else {
            let reg1 = /\d+/;
            let a = reg1.test(pwd) ? 1 : 0;
            let reg2 = /[a-zA-Z]+/;
            let b = reg2.test(pwd) ? 1 : 0;
            let reg3 = /[^\w]+/;
            let c = reg3.test(pwd) ? 1 : 0;
            let str = '';
            switch (a + b + c) {
                case 1:
                    str = '弱类型';
                    break;
                case 2:
                    str = '中类型';
                    break;
                case 3:
                    str = '强类型';
                    break;
            }
            this.spans[1].innerHTML = '';
            this.ems[1].innerHTML = str;
            this.pwdFlag = true;
        }
    }


    // 重复密码
    repeatPwd(eve) {
        let e = eve || window.event;
        let pwd2 = e.target.value;
        // console.log(this.inputs[1].value);
        // console.log(pwd2);
        if (this.inputs[1].value == pwd2 && pwd2 != '') {
            this.spans[2].innerHTML = '';
            this.ems[2].innerHTML = '√';
            this.pwd2Flag = true;
        } else {
            this.spans[2].innerHTML = '两次密码不一致';
            this.ems[2].innerHTML = '';
            this.pwd2Flag = false;
        }
    }

    // 手机号
    phone(eve) {
        let e = eve || window.event;
        let phone = e.target.value;
        //  手机号第一位必须为1，后面再加10位数字
        let reg = /^1[3-8]\d{9}$/;
        console.log(phone);
        if (reg.test(phone)) {
            this.spans[3].innerHTML = '';
            this.ems[3].innerHTML = ' √';
            this.telFlag = true;
        } else {
            this.spans[3].innerHTML = '手机和不符合标准';
            this.ems[3].innerHTML = '';
            this.telFlag = false;
        }
    }

    // 邮箱
    email(eve) {
        let e = eve || window.event;
        let email = e.target.value;
        // 数字大小写字母_- 3到12位   @  数字字母 2到9位  . 字母2到5位
        let reg = /^[\w-]{3,12}@[a-zA-Z\d]{2,9}\.[a-zA-Z]{2,5}$/;
        if (reg.test(email)) {
            this.spans[4].innerHTML = '';
            this.ems[4].innerHTML = ' √';
            this.mailFlag = true;
        } else {
            this.spans[4].innerHTML = ' 邮箱不符合标准';
            this.ems[4].innerHTML = '';
            this.mailFlag = false;
        }
    }

    // 提交
    regSubmit() {
        console.log(111);
        if (this.nameFlag == true && this.pwdFlag == true && this.pwd2Flag == true && this.telFlag == true && this.mailFlag == true) {
            // alert('提交成功');
            // 手机表单的信息;
            let name = this.inputs[0].value;
            let pwd = this.inputs[1].value;
            let phone = this.inputs[3].value;
            let email = this.inputs[4].value;
            console.log(name, pwd, phone, email);
            ajax.post('./php/user.php?fn=addUser', { userName: name, passWord: pwd, phone: phone, email: email }).then(resArr => {
                alert('注册成功')
                console.log(resArr);
            });


        } else {
            this.spans[5].innerHTML = ' 请重新填写信息';
        }
    }
}

new Register;