'use strict';
var counter = require('./0921模块').counter;
//第一种写法

console.log(counter(['ni', 'nodejs']));

var pi = require('./0921模块').pi;
//第二种写法
console.log(pi);

var try0921 = require('./0921模块');
//第三种写法
console.log(try0921.pi);
