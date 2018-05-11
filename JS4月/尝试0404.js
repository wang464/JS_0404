// ==UserScript==
// @name         New Userscript   脚本的名称
// @namespace    http://tampermonkey.net/   该脚本的命名空间
// @version      0.1   版本号。
// @description  能不能用中文?   简介
// @author       wang464  作者
// @match        http://*/*   脚本生效地址
// @grant        none   用于添加GM_ 函数到白名单
// ==/UserScript==

// alert('hello,world')   // 编写错误了, 该先看看API接口的内容.先尝试调用接口

// 解释内容的含义2018-4-4_19:36:27

//   javascript:% 20void ((function ()% 20{ var% 20element % 20=% 20document.createElement('script'); element.id % 20=% 20'outfox_seed_js'; element.charset % 20=% 20'utf-8', element.setAttribute('src',% 20'http://fanyi.youdao.com/web2/seed.js?' % 20 +% 20Date.parse(new% 20Date())); document.body.appendChild(element); }) ())   看不懂有道的点击翻译功能