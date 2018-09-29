'use strict'

/*
10000从20开始翻倍. 可以走几步.
使用for循环就可以.
设置一个数是x =10000
当y 小于 x时运行
z = 20
z =  z *2

*/

var yy = function (y) {
  for (var i = 1; i <= 9; i++) {
    y.push(i)
    // console.log(i);
    console.log(y.length)
  }
}
yy(3)

var x = 5

function foo () {
  // code
}