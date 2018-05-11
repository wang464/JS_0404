// ==UserScript==
// @name        批量下载贴吧原图
// @name:zh     批量下载贴吧原图
// @name:en     Batch srcImage downloader for tieba
// @version     2.1.1
// @description   一键打包下载贴吧中一页的原图
// @description:zh  一键打包下载贴吧中一页的原图
// @description:en  Batch Download Src Image From Baidu Tieba
// @supportURL  http://imcoder.site/article.do?method=detail&aid=124
// @match       http://tieba.baidu.com/*
// @match       https://tieba.baidu.com/*
// @match       http://imgsrc.baidu.com/*
// @match       https://imgsrc.baidu.com/*
// @grant       GM_xmlHttpRequest
// @grant       GM.xmlHttpRequest
// @grant       GM_notification
// @require 	http://code.jquery.com/jquery-latest.js
// @require 	https://cdn.bootcss.com/jszip/3.1.5/jszip.min.js
// @author      Jeffrey.Deng
// @namespace https://greasyfork.org/users/129338
// ==/UserScript==

// @weibo       http://weibo.com/3983281402
// @blog        http://imcoder.site
// @date        2017.6.3

// @更新日志
// V 2.1        2018.4.2       1.调用Tampermonkey API 实现跨域下载，无需修改启动参数
// V 2.0        2018.4.1       1.压缩包内增加贴子地址txt
//                             2.修复https不能下载
// V 1.9        2018.4.1       1.新增打包下载,图片重命名（需开启浏览器跨域）
// V 1.8        2018.3.31      1.修复BUG
//                             2.可自定义输入文件名后缀
// V 1.7        2017.6.9       1.修复魅族等贴吧下载图标不显示的问题
// V 1.6        2017.6.5       1.提高下载的图片正确率
// V 1.5        2017.6.4       1.增加右键新标签打开图片直接打开原图
// V 1.4        2017.6.3       1.更新对 https 的支持
//                             2.提高图片匹配成功率

(function (document, $) {

    var common_utils = (function(document, $) {
        function parseURL(url) {
            var a = document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function () {
                    var ret = {},
                        seg = a.search.replace(/^\?/, '').split('&'),
                        len = seg.length, i = 0, s;
                    for (; i < len; i++) {
                        if (!seg[i]) {
                            continue;
                        }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                segments: a.pathname.replace(/^\//, '').split('/')
            };
        }
        function ajaxDownload(url, callback, args) {
            var GM_download = GM.xmlHttpRequest || GM_xmlHttpRequest;
            GM_download({
                method: 'GET',
                responseType: 'blob',
                url: url,
                onreadystatechange: function(responseDetails) {
                    if (responseDetails.readyState === 4) {
                        if (responseDetails.status === 200 || responseDetails.status === 0) {
                            callback(responseDetails.response, args);
                        } else {
                            callback(null, args);
                        }
                    }
                },
                onerror: function(responseDetails) {
                    callback(null, args);
                    console.log(responseDetails.status);
                }
            });
            /*try {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = "blob";
                xhr.onreadystatechange = function(evt) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 || xhr.status === 0) {
                            callback(xhr.response, args);
                        } else {
                            callback(null, args);
                        }
                    }
                };
                xhr.send();
            } catch (e) {
                callback(null, args);
            }*/
        }
        function fileNameFromHeader(disposition, url) {
            var result = null;
            if (disposition && /filename=.*/ig.test(disposition)) {
                result = disposition.match(/filename=.*/ig);
                return decodeURI(result[0].split("=")[1]);
            }
            return url.substring(url.lastIndexOf('/') + 1);
        }
        function downloadBlobFile(content, fileName) {
            //saveAs(content, fileName);
            var aLink = document.createElement('a');
            if (fileName) {
                aLink.download = fileName;
            } else {
                aLink.download = url.substring(url.lastIndexOf('/') + 1);
            }
            //aLink.target = "_blank";
            aLink.style = "display:none;";
            var blob = new Blob([content]);
            aLink.href = URL.createObjectURL(blob);
            document.body.appendChild(aLink);
            if(document.all) {
                aLink.click(); //IE
            } else {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                aLink.dispatchEvent(evt ); // 其它浏览器
            }
            document.body.removeChild(aLink);
        }
        function downloadUrlFile(url, fileName) {
            var aLink = document.createElement('a');
            if (fileName) {
                aLink.download = fileName;
            } else {
                aLink.download = url.substring(url.lastIndexOf('/') + 1);
            }
            aLink.target = "_blank";
            aLink.style = "display:none;";
            aLink.href = url;
            document.body.appendChild(aLink);
            if(document.all) {
                aLink.click(); //IE
            } else {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                aLink.dispatchEvent(evt ); // 其它浏览器
            }
            document.body.removeChild(aLink);
        }
        var context = {
            "ajaxDownload": ajaxDownload,
            "fileNameFromHeader": fileNameFromHeader,
            "downloadBlobFile": downloadBlobFile,
            "downloadUrlFile": downloadUrlFile,
            "parseURL": parseURL
        };
        return context;
    })(document, jQuery);

    var location_info = common_utils.parseURL(document.location.href);
    var options = {
        "type": 2,
        "suffix": null,
        "callback" : {
            "parsePhotos_callback": function (location_info, options) {
                var photos = [];
                return photos;
            },
            "makeNames_callback": function (arr, location_info, options) {
                var names = {};
                var time = new Date().getTime();
                names.zipName = "pack_" + time;
                names.folderName = zipName;
                names.infoName = null;
                names.infoValue = null;
                names.prefix = time;
                names.suffix = options.suffix;
                return names;
            },
            "beforeFileDownload_callback": function(photos, location_info, options, zip, main_folder) {
            },
            "eachFileOnload_callback": function(blob, photo,  location_info, options, zipFileLength, zip, main_folder, folder) {
            }
        }
    };

    /** 批量下载 **/
    function batchDownload(config) {
        try {
            $.extend(true, options, config);
            var photos = [];
            if (options.callback.parsePhotos_callback) {
                photos = options.callback.parsePhotos_callback(location_info, options);
            }

            if (photos && photos.length > 0) {
                if (confirm("是否下载 " + photos.length + " 张图片")) {
                    var names = options.callback.makeNames_callback(photos, location_info, options);
                    if (options.type == 1) {
                        download(photos, names, location_info, options);
                    } else {
                        ajaxDownloadAndZipPhotos(photos, names, location_info, options);
                    }
                }
            } else {
                GM_notification({text: "未匹配到图片", title: "错误", highlight : true});
            }
        } catch (e) {
            console.log("批量下载照片 出现错误！");
            GM_notification("批量下载照片 出现错误！", "");
            console.log(e);
        }

    }

    /** 下载 **/
    function urlDownload(photos, names, location_info, options) {
        GM_notification("开始下载～", names.zipName);
        var index =  0;
        var interval = setInterval(function () {
            if (index <  photos.length) {
                var url = photos[i].url;
                if (!names.suffix) {
                    suffix = url.substring(url.lastIndexOf('.') + 1);
                }
                var fileName = names.prefix + "_" + (index + 1) + "." + names.suffix;
                common_utils.downloadUrlFile(url, fileName);
            } else {
                clearInterval(interval);
                return;
            }
            index++;
        }, 100);
    }

    var ajaxDownloadAndZipPhotos = function (photos, names, location_info, options) {
        GM_notification("开始下载～", names.zipName);
        if (photos && photos.length > 0) {
            var zip = new JSZip();
            var main_folder = zip.folder(names.folderName);
            var zipFileLength = 0;
            if (names.infoName) {
                main_folder.file(names.infoName, names.infoValue);
            }
            options.callback.beforeFileDownload_callback(photos, names, location_info, options, zip, main_folder);
            for (var i = 0, maxIndex = photos.length; i < maxIndex; i++) {
                common_utils.ajaxDownload(photos[i].url, function (blob, photo) {
                    var folder = photo.location ? main_folder.folder(photo.location) : main_folder;
                    var isSave = options.callback.eachFileOnload_callback(blob, photo, location_info, options, zipFileLength, zip, main_folder, folder);
                    if (isSave != false) {
                        if (photo.fileName) {
                            folder.file(photo.fileName, blob);
                        } else {
                            var suffix = names.suffix || photo.url.substring(photo.url.lastIndexOf('.') + 1);
                            var photoName = names.prefix + "_" + photo.folder_sort_index + "." + suffix;
                            folder.file(photoName, blob);
                        }
                    }
                    zipFileLength++;
                    if (zipFileLength >= maxIndex) {
                        zip.generateAsync({type: "blob"}).then(function (content) {
                            common_utils.downloadBlobFile(content, names.zipName + ".zip");
                        });
                        GM_notification({text: "打包下载完成！", title: names.zipName, highlight : true});
                    }
                }, photos[i]);
            }
        }
    };

    //右键新标签打开图片直接打开原图
    function initRightClickOpenSource() {
        var url = document.location.toString();
        var m = null;
        if (!(m = url.match(/^https?:\/\/imgsrc\.baidu\.com\/forum\/pic\/item\/.+/i))) {
            if ((m = url.match(/^(https?):\/\/(?:imgsrc|imgsa|\w+\.hiphotos)\.(?:bdimg|baidu)\.com\/(?:forum|album)\/.+\/(\w+\.(?:jpg|jpeg|gif|png|bmp|webp))(?:\?.+)?$/i))) {
                document.location = m[1] + "://imgsrc.baidu.com/forum/pic/item/" + m[2];
            }
        }
    }

    /*** start main ***/

    //右键新标签打开图片直接打开原图
    initRightClickOpenSource();

    var rightParent = null;
    var html = "";
    var liCount = $('ul', $('#tb_nav')).eq(0).find('li').length;
    var liArr = $('ul', $('#tb_nav')).eq(0).find('li');
    var rightLi = liArr[liCount - 1];
    if ($(rightLi).hasClass('none_right_border')) {
        var tab = liArr[liCount - 2];
        var isStarTie = $(rightLi).hasClass("star_nav_tab");
        var rightHtml = "";
        if (isStarTie) {
            rightHtml = '<li class="star_nav_tab ">' + $(rightLi).html() + '</li>';
        } else {
            rightHtml = '<li class="j_tbnav_tab">' + $(rightLi).html() + '</li>';
        }
        $(tab).after(rightHtml);

        if (isStarTie) {
            html = '<div class="star_nav_tab_inner"><div class="space">' +
                '<a title="点击下载本页图片" class="star_nav_ico star_nav_ico_photo" id="batchDownloadBtn"><i class="icon"></i>下载</a></div></div>';
        } else {
            html = '<div class="tbnav_tab_inner"><p class="space">' +
                '<a  title="点击下载本页图片" class="nav_icon icon_jingpin  j_tbnav_tab_a" id="batchDownloadBtn"  location="tabplay" >下载</a>' +
                '</p></div>';
        }
        $(rightLi).html(html);
    } else {
        html = '<li class="j_tbnav_tab">' +
            '<a class=" j_tbnav_tab_a" id="batchDownloadBtn">下载</a> </li>';
        $(rightLi).after(html);
    }

    $('#batchDownloadBtn').click(function () {
          tiebaImagesDownload();
    });

    unsafeWindow.tiebaImagesDownload = function (options) {
        var config = {
            "type": 2,
            "minWidth": 100,
            "suffix": null,
            "source_host": (document.location.href.indexOf("https") == -1 ? "http" : "https") + "://imgsrc.baidu.com/forum/pic/item/",
            "callback": {
                "parsePhotos_callback": function (location_info, options) {
                    var photo_arr = [];
                    var part_nodes_one = $('.post_bubble_middle,.d_post_content').find("img");
                    var part_nodes_two = $('.d_post_content_main,.post_bubble_middle,.d_post_content').find("img");
                    $.each(part_nodes_one, function(i, img){
                        if(img.clientWidth > options.minWidth) {
                            var photo = {};
                            photo.location = "";
                            var thumb_url = img.src;
                            photo.folder_sort_index = photo_arr.length + 1;
                            if (img.className == "BDE_Image" && img.getAttribute("pic_type") == "0") {
                                photo.url = options.source_host + thumb_url.substring(thumb_url.lastIndexOf('/') + 1);
                                photo_arr.push(photo);
                            } else if ((m = thumb_url.match(/^(https?):\/\/(?:imgsrc|imgsa|\w+\.hiphotos)\.(?:bdimg|baidu)\.com\/(?:forum|album)\/.+\/(\w+\.(?:jpg|jpeg|gif|png|bmp|webp))(?:\?.+)?$/i))) {
                                photo.url = options.source_host + m[2];
                                photo_arr.push(photo);
                            }
                        }
                    });
                    if (photo_arr.length === 0) {
                        $.each(part_nodes_two, function(i, img){
                            if(img.clientWidth > options.minWidth) {
                                var photo = {};
                                photo.location = "";
                                var thumb_url = img.src;
                                photo.folder_sort_index = photo_arr.length + 1;
                                var m = thumb_url.match(/^(https?):\/\/(?:imgsrc|imgsa|\w+\.hiphotos)\.(?:bdimg|baidu)\.com\/(?:forum|album)\/.+\/(\w+\.(?:jpg|jpeg|gif|png|bmp|webp))(?:\?.+)?$/i);
                                if (img.className == "BDE_Image" && m !== null) {
                                    photo.url = options.source_host + m[2];
                                    photo_arr.push(photo);
                                }
                            }
                        });
                    }
                    return photo_arr;
                },
                "makeNames_callback": function (photos, location_info, options) {
                    var names = {};
                    var tie_id = location_info.file;
                    var pn = location_info.params.pn || 1;
                    names.infoName = "tie_info.txt";
                    names.infoValue = "id：" + tie_id + "\r\n" +
                        "title：" + document.title.replace("_百度贴吧", "") + "\r\n" +
                        "url：" + location_info.source + "\r\n"  +
                        "page：" + pn + "\r\n"  +
                        "image_amount：" + photos.length + "\r\n";
                    names.zipName = "tie_" + tie_id + (pn == 1 ? "" : ("_" + pn));
                    names.folderName = names.zipName;
                    names.prefix = tie_id;
                    names.suffix = options.suffix;
                    return names;
                },
                "beforeFileDownload_callback": function(photos, names, location_info, options, zip, main_folder) {
                    var photo_urls_str = "";
                    $.each(photos, function(i, photo){
                        var photoDefaultName = names.prefix + "_" + photo.folder_sort_index + "." + (names.suffix || photo.url.substring(photo.url.lastIndexOf('.') + 1));
                        var line = ((photo.location ? (photo.location + "/") : "" ) + photoDefaultName) + "\t" +  photo.url + "\r\n";
                        photo_urls_str += line;
                    });
                    main_folder.file("photo_url_list.txt", photo_urls_str);
                },
                "eachFileOnload_callback": function(blob, photo,  location_info, options, zipFileLength, zip, main_folder, folder) {
                    return true;
                }
            }
        };
        if (options) {
            $.extend(true, config , options);
        }
        batchDownload(config);
    };

})(document, jQuery);