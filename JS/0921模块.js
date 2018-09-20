'use strict';
var counter = function (arr) {
    return '这里面有' + arr.length + '元素';
}

// console.log(counter(['ruby', 'nodejs', 'vue']));
var pi = 3.14;

module.exports.counter = counter;
module.exports.pi = pi;
//module.exports表示被引入的模块. 这是一种写法. 下面是另一种写法.
module.exports = {
    counter: counter,
    pi: pi,
}
//这是第二种写法