class DetailsTwo {
    constructor() {
        this.bind();

    }
    bind() {
        // 获取浏览器传过来的参数，商品id
        let gId = location.search.split('=')[1];
        ajax.post('./php/goods.php?fn=getGoodsInfo', { gId: gId }).then(resArr => {
            console.log(resArr);
            if (resArr[0] == 200) {
                const goodDel = resArr[2][0];

                let delObj = $('#cont .imgdel');
                console.log(delObj);
                // delObj.querySelector('.imgdel');
                // console.log(delObj.querySelector('.imgdel'));
                $('#cont .imgdel').src = goodDel.gImgSrc;
                $('#cont .big-img').src = goodDel.gImgSrc;
                $('.right .model').innerHTML = goodDel.gName;
                $('.right .price').innerHTML = '￥：' + goodDel.gPrice + '元';
            }
        });
    }

}
new DetailsTwo;



/*
{   gId: "10",
    gName: "OnePlus 8 Pro 砂岩全包保护壳 砂岩黑",
    gPrice: "79.90", gNum: "45",
    gImgSrc: "https://image01.oneplus.cn/ebp/202003/26/1059/61e3e6884765d7bc143360fd45ebae3a_320_320.png"}
*/