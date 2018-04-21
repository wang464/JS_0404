'use strict';
// function print(s) {
//     console.log(s);
// } // 函数命令   函数命令可以不使用;号结尾

// var print = function(s){
//     console.log(s);
// }; // 函数表达式

// function foo(){
//     return 'hello wold';
// } // 构造函数

// console.log(foo());  

// var myFunc = function(){};

// function test(f) {
//     console.log(f.name);
// };

// test(myFunc); // 调用函数,显示打印结果



// function fff() {
//     var a = 999;
//     function f3() {
//         console.log(a);        
//     }
//     return f3;
// }
// var f5 = fff();
// f5();
// 我现在不明白的地方在于:我建立了一个函数, 并且设置了返回值, 最后进行了调用. 结果没有显示结果.这个让我无语. 
//  也就是说在JS里面的打印和在Python的打印是两个不同的功能. 所以不能使用Python的打印思维来测试JS的代码. 



// function creatIncrementor(start) {
//     return function () {
//         return start++;
//     };
// }
// var inc = creatIncrementor(4);
// console.log(inc());
// inc()
// console.log(inc());
// console.log(inc());
// 原来JS里面.所有的运算都需要写function这个变量声明. 简直太弱了. 每次运行之后, 就会自动清理内存, 所以我之前只是一个log才会和示例的内容不一样.  下面的内容是实例内容
// function createIncrementor(start) {
//     return function () {
//       return start++;
//     };
//   }  
//   var inc = createIncrementor(5);  
//   console.log(inc()); // 5
//   console.log(inc()); // 6
//   console.log(inc()); // 7
  
