'use strict';

// 写一个对象

let dock = {
  name: 'After',
  number: 2,
  say: function () {
    return console.log('你好啊');
  }
}
console.log(dock.say);

// 构造函数需要用空格分开一下?
// 为什么我写的不符合严格模式? 严格模式的构造函数怎么写?  还是因为我自己写的规则问题?

function Dogs () {
  this.name = 'nih';
  this.year = '13';
}

let myDogs = new Dogs();
console.log(myDogs.name);
