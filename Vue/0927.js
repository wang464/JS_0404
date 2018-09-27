'use strict';
// var value = ''
// let lis_t = ["q", "w", "e", "r", "t"];

// for (let [key, value] of lis_t) {
//     console.log(key);
// }

// let iterable = [10, 20, 30];

// for (const value of iterable) {
//   console.log(value);
// }

// 如何构成程序?  随机1w次 true false

// function GetRandomNum(Min, Max) {
//   var Range = Max - Min;
//   var Rand = Math.random();
//   return (Min + Math.round(Rand * Range));
// }
// var num = GetRandomNum(1, 2);
// console.log(num);
/*伪代码
随机数
第几次判断
总循环
未通过

循环 1000次
  x=1次循环
      随机数是否等于 1
          不用执行下面的内容.
          x = 1;
          break
      不等于1
        x = 2;
        break
  x=2循环
      随机数是否等于 2
         x=1;
         break
      不等于
        x=3;
        break
  x=3循环
      随机数是否等于 2
         x=1;
         break
      不等于
        x=4;
        break
  x=4循环
      随机数是否等于 2
         x=1;
         break
      不等于
        x=1;
        未通过 +=1
        break
  x 表示去第一个判断语句里面执行
  i 表示循环的次数
  mub 表示到达第四次的次数
  mub2 表示到达else的次数.
*/

var x = 1;
var i = 1;
var mub = 0;
var mub2 = 0;
while (i <= 1000) {
  function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }
  var num = GetRandomNum(1, 2);

  if (x == 1 && num == 1) {
    x = 2;
    // console.log( '第一个');
  } else if (x == 2 && num == 1) {
    x = 3;
    // console.log( "第二个");
  } else if (x == 3 && num == 1) {
    x = 4;
    // console.log( "第三个")
  } else if (x == 4 && num == 2) {
    x = 1;
    // console.log( "第四个");
    mub ++;
  } else {
    x = 1;
    mub2 ++;
  }
  // console.log(num);//生成的随机数
  i++;
}
console.log("到4的次数"+mub);
console.log("没有通过的次数"+mub2);

/*
1222  =  3  56
1212  =  5  49
1221  =  2  52
1111  =  4  47

*/
