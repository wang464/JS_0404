// let greet = require('./JS4-10');
// let s = 'Michael';

// greet(s) // JS调用模块内容
'use strict';
let fs = require('fs');

fs.readFile('try.txt ','utf-8',function(err, data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});   //  node使用fs模块读取文件