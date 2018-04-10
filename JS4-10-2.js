// let greet = require('./JS4-10');
// let s = 'Michael';

// greet(s) // JS调用模块内容


'use strict';
// let fs = require('fs');

// fs.readFile('try.txt ','utf-8',function(err, data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// });   //  node使用fs模块读取文件


// let fs = require('fs');

// let data = 'hello, Node.js';
// fs.writeFile('output.txt', data, function (err) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('ok');
//     }
// });  // node使用fs模块写入文件


//  使用node处理http协议
var http = require('http');

var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ':'+request.url);
    response.writeHead(200,{'Content-Type':'text/html'});
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.end('<h1>hello world!</h1>');
    // 将HTTP响应的HTML内容写入response:
});
// 让服务器监听8080端口:
server.listen(8080);   // 之前写成了[]
console.log('server is running at http://127.0.0.1:8080/');   // 忘记写;结束了



// 导入http模块:
// var http = require('http');

// // 创建http server，并传入回调函数:
// var server = http.createServer(function (request, response) {
//     // 回调函数接收request和response对象,
//     // 获得HTTP请求的method和url:
//     console.log(request.method + ': ' + request.url);
//     // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     // 将HTTP响应的HTML内容写入response:
//     response.end('<h1>Hello world!</h1>');
// });

// // 让服务器监听8080端口:
// server.listen(8080);

// console.log('Server is running at http://127.0.0.1:8080/');