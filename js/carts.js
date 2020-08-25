class Carts {
    constructor() {
        // 1、获取[cart表]中的数据；
        this.listCart();

        // 全选按钮
        all('.check-all')[0].addEventListener('click', this.checkAll);
        all('.check-all')[1].addEventListener('click', this.checkAll);
    }

    // 获取数据库 [cart表] 中的数据；
    listCart() {
        // 根据登录状态获取 商品的id和数量；
        let userId = localStorage.getItem('userId');
        // 声明变量。保存购物车的id, 构造一个id序列；
        let cartGoodsIds = '';

        // 如果登录了，执行 if 语句，就去cart表中获取商品的id；
        if (userId) {
            ajax.get('./php/cart.php', { fn: 'getGoodsId', userId: userId }).then(resArr => {
                // console.log(resArr);
                if (resArr[0] == 200) {
                    // console.log(resArr[2]);  
                    // 是一个数组，每一个元素是一个对象，包含每一个商品的id和数量

                    if (!resArr[2]) return;  // 数据为空，则终止；

                    let cartIdNum = {};
                    resArr[2].forEach(ele => {
                        // console.log(ele);
                        cartGoodsIds += ele.productId + ',';
                        cartIdNum[ele.productId] = ele.num;
                    });
                    // console.log(cartGoodsIds, cartIdNum);

                    Carts.getCartGoods(cartGoodsIds, cartIdNum);
                }
            });

        } else {
            // 如果没登录，执行else语句，去浏览器获取商品id;
            let cartsIdNum = JSON.parse(localStorage.getItem('carts'));
            // console.log(carts);
            // 如果数据为空，则停止
            if (!cartsIdNum) {
                return;
            }
            for (let gId in cartsIdNum) {
                cartGoodsIds += gId + ',';   // 构造商品id的序列。
            }
            // console.log(goodsId);  // 商品id 
            // console.log(cartsIdNum);    // 商品 {id:数量} 的对象
            Carts.getCartGoods(cartGoodsIds, cartsIdNum);
        }
    }


    static getCartGoods(gIds, gIdNums) {
        // console.log(gIds, gIdNums);
        ajax.post('./php/cart.php?fn=lst', { gId: gIds }).then(resArr => {
            // console.log(resArr);
            if (resArr[0] == 200) {
                // console.log(resArr[2]);
                let str = '';
                resArr[2].forEach(ele => {
                    str += `
                    <tr>
                        <td class="check-box">
                            <input class="check-one check" onclick="Carts.goodsCheck(this)" type="checkbox">
                        </td>
                        <td class="goods">
                            <img src="${ele.gImgSrc}" alt=""> 
                            <span>${ele.gName}</span>                        
                        </td>                        
                        <td class="price">${ele.gPrice}</td>
                        <td class="count">
                            <button class="change" onclick="Carts.changeNum(this,${ele.gId},1)">-</button>
                            <input class="count-input" type="text" value="${gIdNums[ele.gId]}">
                            <button class="change"  onclick="Carts.changeNum(this,${ele.gId},2)">+</button>
                        </td>
                        <td class="subtotal">${ele.gPrice}</td>
                        <td class="operation">
                            <button class="delete" onclick="Carts.delGoods(this,${ele.gId})"> 删除</button>
                        </td>
                    </tr>
                    `;
                });
                // 将数据追加到tbody中；
                $('tbody').innerHTML = str;
            }
        });
    }


    // 全选按钮
    checkAll() {
        // console.log(this);  // this指向当前点击的按钮
        let state = this.checked;
        all('.check-all')[this.getAttribute('all-key')].checked = state;

        // 点击全选，所有的单选框都选中；
        let checkOnes = all('.check-one');  // 获取所有的单选框；
        checkOnes.forEach(ele => {
            // console.log(ele);
            ele.checked = state;
        });


        // 计算总的[数量和价格]
        Carts.sumNumPrice();
    }


    // 单选按钮
    static goodsCheck(eleObj) {
        // console.log(eleObj); // eleObj 指向当前的单选框；

        if (!eleObj.checked) {   // 有一个单选取消选中，全选取消
            all('.check-all')[0].checked = false;
            all('.check-all')[1].checked = false;
        } else {  // 所有单选 选中，全选选中；
            let checkOnes = all('.check-one');  // 获取所有的单选框
            let len = checkOnes.length;  // 获取所有的单选框的个数；
            let checkCount = 0;   // 计算选中的个数；
            checkOnes.forEach(ele => {
                // 当前面的为true时，执行后面的 ++;
                ele.checked && checkCount++;
            });
            if (checkCount == len) {
                all('.check-all')[0].checked = true;
                all('.check-all')[1].checked = true;
            }
        }


        // 计算总的[数量和价格]
        Carts.sumNumPrice();
    }


    // 改变数量
    static changeNum(eleObj, gId, flag) {
        let gNum = flag == 2 ? eleObj.previousElementSibling.value : eleObj.nextElementSibling.value;
        gNum = flag == 2 ? gNum - 0 + 1 : gNum - 0 - 1;

        if (flag == 2) {
            eleObj.previousElementSibling.value = gNum;
        } else {
            eleObj.nextElementSibling.value = gNum;
        }

        if (localStorage.getItem('userId')) {
            // 若登录，则修改数据库cart表的数量
            Carts.updateCartNums(gId, gNum);
        } else {
            // 未登录，则修改浏览器的数量
            Carts.updaLocalNums(gId, gNum);
        }
        // 小计的实现；
        let priceObj = eleObj.parentNode.nextElementSibling;
        priceObj.innerHTML = (eleObj.parentNode.previousElementSibling.innerHTML * gNum).toFixed(2);
    }


    // 修改数据库的数量  
    static updateCartNums(gId, gNum) {
        // console.log(gId, gNum);
        let userId = localStorage.getItem('userId');
        ajax.get('./php/cart.php', { fn: 'update', gId: gId, userId: userId, gNum: gNum }).then(resArr => {
            console.log(resArr);
        });
    }
    // 修改浏览器的数量；
    static updaLocalNums(gId, gNum) {
        let cartLocal = JSON.parse(localStorage.getItem('carts'));
        cartLocal[gId] = gNum;
        localStorage.setItem('carts', JSON.stringify(cartLocal));
        console.log(gId, gNum);
        if (gNum == 0) {
            let eleObj = $('.change');
            Carts.delGoods(eleObj, gId);
        }
    }


    // 计算总的[数量和价格]
    static sumNumPrice() {
        let checkOnes = all('.check-one');  // 获取所有的单选框
        let count = 0;  // 保存总的数量
        let xj = 0;   // 保存总的价钱
        checkOnes.forEach(ele => {   // 遍历所有的单选框
            // console.log(ele);
            if (ele.checked) {
                let trObj = ele.parentNode.parentNode;  // 获取当前的行
                let tmpCount = trObj.querySelector('.count-input').value;
                let tmpXj = trObj.querySelector('.subtotal').innerHTML;

                count += tmpCount - 0;
                xj += tmpXj - 0;
            }
        });
        $('#selectedTotal').innerHTML = count;
        $('#priceTotal').innerHTML = parseInt(xj * 100) / 100;
    }


    // 删除
    static delGoods(eleObj, gId) {
        let userId = localStorage.getItem('userId');
        let trObj1 = eleObj.parentNode.parentNode;

        if (userId) {   // 如果登录，删除数据库
            ajax.get('./php/cart.php', { fn: 'delete', userId: userId, gId: gId }).then(resArr => {
                console.log(resArr);
                if (resArr[0] == 200) {
                    trObj1.remove();
                }
            });
        } else {  // 未登录，删除浏览器；
            let cartsDel = JSON.parse(localStorage.getItem('carts'));
            console.log(cartsDel);
            delete cartsDel[gId];
            localStorage.setItem('carts', JSON.stringify(cartsDel));
            trObj1.remove();
        }
    }


}
new Carts;