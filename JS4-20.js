import { request } from 'http';
import { Z_DEFLATED } from 'zlib';

'use strict';
// 获取图片
let http = require('http');   // http路由
let cheerio = require('cheerio');  // html解析
let fs = require('fs');   // 储存

let queryHref = "http://www.haha.mx/topic/1/new/";   // 目标网址
let querySearch = 1 ;   // 设置分页位置
let urls = [] ;  // 所有需要下载的图片的地址

function getHtml(href, search) {
    let pageData = '';
    let req  = http.get(href + search,function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            pageData += chunk; 
        });
        res.on('end', function(){
            $ = cheerio.load(pageData);
            let html = $('.joke-list-item .joke-main-content a img');

            for(let i = 0 ; i < html.length ; i++){
                let src =html[i].attribs.src;

                if(src.indexOf(''))
            }
        })
    }
}