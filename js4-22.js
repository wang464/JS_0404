'use strict';

var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.ziroom.com/';

http.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        // var slideListData = html;
        // 打印信息
        console.log(html);
        });
});

// Python代码
// url = html
// data = request(html,)
// print(data)
// JS的问题, 代码量和阅读效率低于Python. 当然这个可能是我使用的方法的问题. 
