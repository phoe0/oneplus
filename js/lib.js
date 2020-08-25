/*
    获取节点的方法
*/
// 获取单个节点
function $(ele) {
    return document.querySelector(ele);
}
// 获取多个节点
function all(ele) {
    return document.querySelectorAll(ele);
}
// 绑定事件
function bindEve(eleObj, type, fn) {
    return eleObj.addEventListener(type, fn);
}