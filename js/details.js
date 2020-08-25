class Details {
    constructor() {
        this.smallObj = $('#samll');

        this.bindE();
    }
    // 绑定事件的函数
    bindE() {
        // console.log('啊哈哈');
        bindEve($('#small'), 'mouseenter', this.enter);
        bindEve($('#small'), 'mouseleave', this.leave);
        bindEve($('#small'), 'mousemove', this.move);
    }

    // 鼠标移入
    enter() {
        // console.log(9090);
        //  鼠标移入small，显示滑块和大图
        $('#mask').style.display = 'block';
        $('#big').style.display = 'block';
    }
    leave() {
        //  鼠标移出small，滑块和大图消失
        $('#mask').style.display = 'none';
        $('#big').style.display = 'none';
    }
    move(eve) {
        let e = eve || window.event;
        // 1、获取鼠标相对于文档的坐标
        let pageX = e.pageX;
        let pageY = e.pageY;

        // 2、获取small父级的盒子，的坐标
        let boxLeft = $('.box-fang').offsetLeft;
        let boxTop = $('.box-fang').offsetTop;

        // 3、获取小滑块自身的宽高， 的一半
        let maskWidth = $('#mask').offsetWidth / 2;
        let maskHeight = $('#mask').offsetHeight / 2;

        // 4、计算小滑块移动时，可设置的坐标
        let tmpX = pageX - boxLeft - maskWidth;
        let tmpY = pageY - boxTop - maskHeight;

        // 6、让小滑块不出边界
        if (tmpX < 0) tmpX = 0;  // 左边界
        if (tmpY < 0) tmpY = 0;   // 右边界
        // 计算右边和下边，可以设置的最大距离
        let targetX = $('#small').offsetWidth - $('#mask').offsetWidth;
        let targetY = $('#small').offsetHeight - $('#mask').offsetHeight;
        if (tmpX > targetX) tmpX = targetX;
        if (tmpY > targetY) tmpY = targetY;

        // 5、设置小滑块的坐标
        $('#mask').style.left = tmpX + 'px';
        $('#mask').style.top = tmpY + 'px';

        /*
            滑块覆盖到哪里,对应的大盒子里图片就展示哪里
                
            mask移动的距离 / mask移动的最大距离 == img移动的距离 / img移动的最大距离
            img移动的距离 = mask移动的距离 / mask移动的最大距离 * img移动的最大距离
        */

        // 计算大图的最大移动距离 【大图的宽度-大图展示区域的宽度】
        let bigTargetX = $('.big-img').offsetWidth - $('#big').offsetWidth;
        let bigTargetY = $('.big-img').offsetHeight - $('#big').offsetHeight;

        // 计算大图移动时，可以设置的坐标
        let tmpBigX = tmpX / targetX * bigTargetX;
        let tmpBigY = tmpY / targetY * bigTargetY;
        // 设置大图的坐标
        $('.big-img').style.left = -tmpBigX + 'px';
        $('.big-img').style.top = -tmpBigY + 'px';
        // console.log(bigTargetX, bigTargetY);

    }


}
new Details;