class DetailsTwo {
    constructor() {

        this.bind();

    }
    bind() {
        // 获取浏览器传过来的参数，商品id
        let gId = location.search.split('=')[1];
        ajax.post('./php/goods.php?fn=getGoodsInfo', { gId: gId }).then(resArr => {
            // console.log(resArr);
            if (resArr[0] == 200) {
                const goodDel = resArr[2][0];

                // let delObj = $('#cont .imgdel');
                // console.log(delObj);
                // delObj.querySelector('.imgdel');
                // console.log(delObj.querySelector('.imgdel'));
                $('#cont .imgdel').src = goodDel.gImgSrc;
                $('#cont .big-img').src = goodDel.gImgSrc;
                $('.right .model').innerHTML = goodDel.gName;
                $('.right .price').innerHTML = '￥：' + goodDel.gPrice + '元';
            }
        });
    }

    static changeN(eleObj, flag) {
        // console.log(eleObj, flag);

        let gNum = flag == 1 ? eleObj.nextElementSibling.value : eleObj.previousElementSibling.value;
        gNum = flag == 1 ? gNum - 0 - 1 : gNum - 0 + 1;
        if (flag == 1) {
            eleObj.nextElementSibling.value = gNum;
        } else {
            eleObj.previousElementSibling.value = gNum;
        }
        if ($('.buy-num #num').value - 1 < 1) {
            $('.buy-num #num').value = 1;
        }
    }

    // 点击按钮，加入购物车
    static addNow() {
        let gId = location.search.split('=')[1];
        let gNum = $('.buy-num #num').value;

        DetailsTwo.addCart(gId, gNum);
    }


    // 加入购物车的方法
    static addCart(gId, gNum) {
        // console.log(gId, gNum);  // 当前点击商品的id和要添加的数量；

        // 判断当前是否有用户登录；
        if (localStorage.getItem('userId')) {   //
            // 如果用户登录，则存入数据库
            DetailsTwo.setDateBase(gId, gNum);
        } else {
            // 用户没登录，则存入浏览器；
            DetailsTwo.setLocal(gId, gNum);
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
        console.log(gNum);
        let carts = localStorage.getItem('carts');
        if (carts) {
            let cartsObj = JSON.parse(carts);
            // for (let attr in cartsObj) {
            //     if (attr == gId)
            //        // gNum = cartsObj[gId] - 0 + 1;
            //         cartsObj[gId] = gNum;
            // }
            cartsObj[gId] = gNum;
            localStorage.setItem('carts', JSON.stringify(cartsObj));
        } else {
            // 浏览器中此时没有数据
            // 构造商品信息
            let tmpObj = { [gId]: gNum };
            localStorage.setItem('carts', JSON.stringify(tmpObj));
        }
        alert('已添加至购物车');
    }

}
new DetailsTwo;



/*
{   gId: "10",
    gName: "OnePlus 8 Pro 砂岩全包保护壳 砂岩黑",
    gPrice: "79.90", gNum: "45",
    gImgSrc: "https://image01.oneplus.cn/ebp/202003/26/1059/61e3e6884765d7bc143360fd45ebae3a_320_320.png"}
*/