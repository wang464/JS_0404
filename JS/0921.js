'use strict';
// console.log('hello world');
// 乘法口诀表
// for (var i = 1; i <= 9; i++) {
//     for (var j = 1; j <= 9; j++) {
//         console.log(j + '*' + i + '=' + i * j + ' ');

//     }
// };

// console.log(Math.random());

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});

