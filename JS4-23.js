'use strict';

// JS构造函数
// 构造函数就是一个普通的函数, 使用this做关键字, 生成对象必须使用new命令. 
// 构造函数首字母大写. 表示这个是已购车构造函数

var Vehicle = function () {
    this.price = 1000;
};  // Vehicle 这个是一个构造函数
var v = new Vehicle();
console.log(v.price);
//   调用构造函数的参数


//  给构造函数一个参数
var Vehicle2 = function (p) {
    this.price = p;
}; 
var s = new Vehicle2(500);
console.log(s.price);
// new命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。下面两行代码是等价的，但是为了表示这里是函数调用，推荐使用括号。


var Vehicle3 = function () {
    this.price = 1001;
    return 1003;
};
console.log((new Vehicle3()));
var Vehicle4 = function () {
    this.price = 1001;
    return {price:1003};
};
console.log((new Vehicle4()));
// 如果构造函数里面有return 有的时候会返回return的值. 有的时候会返回this的值. 需要注意




