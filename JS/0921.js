'use strict';
// console.log('hello world');
// 乘法口诀表
// for (var i = 1; i <= 9; i++) {
//     for (var j = 1; j <= 9; j++) {
//         console.log(j + '*' + i + '=' + i * j + ' ');

//     }
// };

// console.log(Math.random()); // 随机数

// // 显示时间
// setTimeout(() => {
//     console.log('你好啊');
// }, 1000);

// setTimeout(function () {
//     console.log('你好啊');
// }, 5000); // 两者是等价的写法. 上面一种是es6的语法. 这个是原来的语法

var time = 0;

setInterval(function () {
    time +=2;
    console.log(time + '一直写下去');
    
},1000);