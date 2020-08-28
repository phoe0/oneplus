class Goods {
    constructor() {
        this.list();

        this.dataArr = '';
        this.allData = [];


    }


    // 获取所有的商品信息
    list() {
        ajax.get('./php/goods.php', { fn: 'listAll' }).then(resArr => {
            // console.log(resArr[0]);  // 状态码   $stateCode
            // console.log(resArr[1]);  // 状态    $state
            // console.log(resArr[2]);  // 返回的数据   $data

            if (resArr[0] == 200) {
                let str = ''; // 定义一个标签，用来接收[追加商品时候的html标签];
                // console.log(resArr[2]);
                // resArr[2] 是一个数组，数组的每个元素是商品的每一行信息；
                this.dataArr = resArr[2];

                resArr[2].forEach(ele => {
                    str += `
                            <div class="goodsCon" >
                                <a target="_blank">
                                    <img src="./img/loading.gif" class="icon lazyImg" data-src="${ele.gImgSrc}" key="${ele.gId}">
                                    <h4 class="title">${ele.gName}</h4>
                                    <div class="info">限时抢购200条</div>
                                </a>
                                <div class="priceCon">
                                    <span class="price">￥${ele.gPrice}</span>
                                    <span class="oldPrice">￥${(ele.gPrice * 1.2).toFixed(2)}</span>
                                    <div>
                                        <span class="soldText">已售${ele.gNum}%</span>
                                        <span class="soldSpan">
                                            <span style="width: 87.12px;"></span>
                                        </span>
                                    </div>
                                </div>
                                <a class="button" target="_blank" onclick="Goods.addCart(${ele.gId},1)">
                                    立即抢购
                                </a>
                            </div>                                      
                    `;
                });
                $('.goods-list').innerHTML = str;

                // 跳到详情页
                Goods.targetDetail();


                //   滚动条事件
                window.onscroll = this.loadAll.bind(this);
            }
        });
    }

    // 加入购物车的方法
    static addCart(gId, gNum) {
        // console.log(gId, gNum);  // 当前点击商品的id和要添加的数量；

        // 判断当前是否有用户登录；
        if (localStorage.getItem('userId')) {   //
            // 如果用户登录，则存入数据库
            Goods.setDateBase(gId, gNum);
        } else {
            // 用户没登录，则存入浏览器；
            Goods.setLocal(gId, gNum);
        }
    }

    // 存数据库的方法
    static setDateBase(gId, gNum) {
        let userId = localStorage.getItem('userId');
        ajax.post('./php/goods.php?fn=add', { userId: userId, gId: gId, gNum: gNum }).then(resArr => {
            // console.log(resArr);
            if (resArr[0] == 200) {
                alert('成功添加至购物车');
            } else {
                alert('error');
            }
        });
    }

    // 存浏览器的方法
    static setLocal(gId, gNum) {
        // console.log(2);
        let carts = localStorage.getItem('carts');
        if (carts) {
            let cartsObj = JSON.parse(carts);
            for (let attr in cartsObj) {
                if (attr == gId)
                    gNum = cartsObj[gId] - 0 + 1;
            }
            cartsObj[gId] = gNum;
            localStorage.setItem('carts', JSON.stringify(cartsObj));
            alert('已加入本地购物车');

        } else {
            // 浏览器中此时没有数据
            // 构造商品信息
            let tmpObj = { [gId]: gNum };
            localStorage.setItem('carts', JSON.stringify(tmpObj));
            alert('已加入本地购物车');
        }
    }


    // 跳转到详情页
    static targetDetail() {
        let imgsObj = all('#conten .goodsCon img');
        // console.log(imgsObj.length);
        for (let i = 0; i < imgsObj.length; i++) {
            // imgsObj[i].addEventListener('click', this.hrefDetail);
            // bindEve(imgsObj[i], 'click', Goods.hrefDetail());
            imgsObj[i].onclick = function () {
                let gId = imgsObj[i].getAttribute('key');
                location.href = `http://localhost/pro/details.html?gId=${gId}`;
            }
        }

        // console.log(all('#conten .goodsCon img'));

    }





    loadAll() {
        var imgs = document.querySelectorAll('.lazyImg');
        lazy(imgs);


        // all('.goods-list>a>img');
        // // console.log(all('#conten .goodsCon img'));
        // // 懒加载的实现；
        // Goods.lozyLoad(all('#conten .goodsCon img'));

        // // 获取当前内容的高度
        // let contentH = parseInt(all('#conten  .goodsCon').length / 4) * ($('#conten  .goodsCon').offsetHeight);

        // // 点击调转到详情页；
        // Goods.targetDetail();
    }
    // 懒加载的方法
    // static lozyLoad(imgs) {
    //     // 获取可视区域的高度 和 滚动条的高度   ===  [显示内容的高度]
    //     let clientH = Goods.getHeight() + Goods.getTop();
    //     for (let i = 0; i < imgs.length; i++) {
    //         // console.log(Goods.getBroTop(imgs[i]));
    //         console.log(imgs[i].offsetTop);
    //         if (clientH > Goods.getBroTop(imgs[i])) {
    //             // console.log(111);
    //             (function () {
    //                 setTimeout(function () {
    //                     var tmp = new Image();
    //                     tmp.src = imgs[i].getAttribute('data-src');
    //                     tmp.onload = function () {
    //                         imgs[i].src = imgs[i].getAttribute('data-src');
    //                     }
    //                 }, 2000);
    //             })(i);
    //         }
    //     }

    // }

    // //获取窗口的宽度和高度
    // static getHeight() {
    //     return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // }
    // static getWidth() {
    //     return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // }
    // // 获取滚动条的高度
    // static getTop() {
    //     return window.pageYOffset || document.body.scrollTop
    // }
    // // 获取到浏览器顶部的距离
    // static getBroTop(ele) {
    //     return ele.offsetTop;
    // }


    // //   方法

}
new Goods;