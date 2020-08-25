class Index {
    constructor() {
        // console.log(this);
        bindEve(all('#header>ul>li')[1], 'mouseenter', this.enterone);
        bindEve($('#second'), 'mouseleave', this.leave);
        bindEve(all('#header>ul>li')[2], 'mouseenter', this.enter);
        bindEve($('#three'), 'mouseleave', this.leave);


        this.goTop();
        this.hover();
        // 登录注册
        bindEve($('#person'), 'mouseenter', this.login);
        bindEve($('#login'), 'mouseleave', this.out);

        bindEve($('#login .login'), 'click', this.loginFn);
        bindEve($('#login .reg'), 'click', this.regFn);

        bindEve($('.icon-icon-test11'), 'click', this.cartFn)

        // 给手机，绑定点击事件，跳转到商品列表
        bindEve($('#second #click'), 'click', this.goodsList);

        // 给logo 绑定点击事件，跳转到首页；
        bindEve($('#header h1'), 'click', this.index);

    }
    enterone() {
        $('#second').style.display = 'none';
        $('#three').style.display = 'flex';
        $('#three').style.borderTop = '1px solid gray';
        for (let i = 0; i < all('#header>ul>li').length; i++) {
            all('#header>ul>li')[i].className = '';
        }
        this.className = 'active';
    }
    enter() {
        // console.log(this);
        $('#three').style.display = 'none';
        $('#second').style.display = 'flex';
        $('#second').style.borderTop = '1px solid gray';
        for (let i = 0; i < all('#header>ul>li').length; i++) {
            all('#header>ul>li')[i].className = '';
        }
        this.className = 'active';
    }
    leave() {
        $('#second').style.display = 'none';
        $('#three').style.display = 'none';
        $('#header').style.borderBottom = '';
        all('#header>ul>li')[1].className = '';
        all('#header>ul>li')[2].className = '';
    }




    login() {
        $('#login').style.display = 'block';

        // 判断用户是否登录；登录则显示用户名；
        let userName = localStorage.getItem('userName');
        let str = '';
        if (userName) {
            str = `
                <p class="login">${userName}</p>
                <p class="reg  logout" >退出</p>
            `;
            $('#login').innerHTML = str;
            $('.logout').onclick = function () {
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                location.reload();
            }

        }
    }
    out() {
        $('#login').style.display = 'none';
    }


    hover() {
        // console.log(1212);
        let divObjs = all('#content>div');
        for (let i = 0; i < divObjs.length; i++) {
            divObjs[i].setAttribute('index', i);
            divObjs[i].onmouseover = function () {
                for (var j = 0; j < divObjs.length; j++) {
                    divObjs[j].classList.remove("two")
                }
                // console.log(this); // this 指向当前的标签；
                let index = this.getAttribute('index');
                divObjs[index].className = 'one two';
            }
            divObjs[i].onmouseout = function () {
                divObjs[i].classList.remove("two")
            }
        }
    }


    // 返回顶部；
    goTop() {
        window.onscroll = function () {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(top);
            if (top < 100) {
                $('.gotop1').style.display = 'none';
            } else {
                $('.gotop1').style.display = 'block';
            }
        }
        bindEve($('.toptop'), 'click', this.top);
    }
    // 点击之后，返回顶部
    top() {
        clearInterval(times);
        var times = setInterval(() => {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(top);
            if (top <= 0) {
                clearInterval(times);
            } else {
                document.documentElement.scrollTop = top - 100;
            }
        }, 100);
    }


    // 注册、登录跳转；
    loginFn() {
        location.href = 'http://localhost/pro/login.html';
    }
    regFn() {
        location.href = 'http://localhost/pro/register.html';
    }
    cartFn() {
        location.href = 'http://localhost/pro/carts.html';
    }


    // 
    goodsList() {
        // 跳转到商品列表
        location.href = 'http://localhost/pro/goods.html';
    }
    index() {
        // 跳转到首页；
        location.href = 'http://localhost/pro/index-one.html';
    }

}
new Index;
