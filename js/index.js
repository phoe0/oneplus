class Index {
    constructor() {
        // console.log(this);
        bindEve(all('#header>ul>li')[1], 'mouseenter', this.enterone);
        // bindEve(all('#header>ul>li')[1], 'mouseleave', this.leave);
        bindEve($('#second'), 'mouseleave', this.leave);
        bindEve(all('#header>ul>li')[2], 'mouseenter', this.enter);
        // bindEve(all('#header>ul>li')[2], 'mouseleave', this.leave);
        bindEve($('#three'), 'mouseleave', this.leave);


        this.goTop();
        this.hover();
        // 登录注册
        bindEve($('#person'), 'mouseenter', this.login);
        bindEve($('#login'), 'mouseleave', this.out);
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
        // console.log(1112);

        window.onscroll = function () {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 100) {
                $('.gotop1').style.display = 'none';
            } else {
                $('.gotop1').style.display = 'block';
            }
        }
        bindEve($('.toptop'), 'click', this.top);
    }
    top() {

        clearInterval(times);
        var times = setInterval(() => {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top <= 0) {
                clearInterval(times);
            } else {
                document.documentElement.scrollTop = top - 100;
            }
        }, 100);
    }






}
new Index;
