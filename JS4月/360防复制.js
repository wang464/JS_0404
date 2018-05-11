// ==UserScript==
// @name         破解防复制系统
// @version      1.2
// @description  破解360doc防复制系统（不登陆360doc时复制，不弹出请登录提示）
// @author       QIQI
// @include      http://www.360doc.com/content/*
// @include      http://www.360doc.com/document/*
// @include      https://www.zhihu.com/*
// @grant none
// @namespace https://greasyfork.org/users/16216
// ==/UserScript==

document.body.oncopy=null; //去掉当前设置的复制监听
document.body.__defineSetter__("oncopy",function(){}); //禁止修改复制监听