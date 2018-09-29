'use strict'

// 测试 eslint 是否有用.
var x = 1
var y = 2
function () {
  y = x + y
  return y
}
console.log(y)
