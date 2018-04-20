import { request } from 'http';

'use strict';
// 获取图片
let http = require('http');   // http路由
let cheerio = require('cheerio');  // html解析
let fs = require('fs');   // 储存

let queryHref = "http://www.haha.mx/topic/1/new/";   // 目标网址
let querySearch = 1 ;   // 设置分页位置
let urls = [] ;  // 所有需要下载的图片的地址

