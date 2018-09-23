'use strict';


console.log("I'd like some Spaghetti!");
console.log("I'd like some Chocolate Moose!");


// 另外一种可读性高的写法
// 这种写法在我看来. 如果需要重复设计的话, 这种写法是好的. 如果只是使用一次的话, 上面那种未尝不可. 
function SwedishChef(food) {
    console.log("I'd like some " + food + '!');
}
SwedishChef('Spaghetti');
SwedishChef('Chocolate Moose');

// 来源链接 http://justjavac.com/javascript/2012/04/05/can-your-programming-language-do-this.html  
// 讲的内容是. 通过函数对于代码进行简写和归类. 这样可以减少bug的出现.