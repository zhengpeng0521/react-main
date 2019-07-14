'use strict';
var http = require('http');

/**
 * mock代理的工具方法
 * dora-proxy 的自定义代理请求
 *
 * req: 请求对象
 * res: 响应对象
 * hostname： 代理到的目标服务器
 * port： 代理到的目标服务器端口
 * method: 请求方法类型 POST,GET...
 * cookie: 要自定义的cookie
 *
 */

//var proxy_host = '192.168.1.191';//徐炜
//var proxy_host = '192.168.1.45';//王丁丁
//var proxy_host = '192.168.1.88';//林鹏
//var proxy_host = '192.168.1.250';//绪印
//var proxy_host = '192.168.1.80';//谢阳磊
var proxy_host = '192.168.1.69';//测试环境
//var proxy_host = '192.168.1.161';//刘鹏飞
//var proxy_host = '192.168.1.60';//测试环境

var cookieObj = require('./sstoken.js');

var proxy_port = '9080';
var proxy_method = 'POST';
var proxy_cookie_ssid = cookieObj && cookieObj.ssid || '';
var proxy_cookie_sstoken = cookieObj && cookieObj.sstoken || '';
var proxy_cookie_session = cookieObj && cookieObj.session || '';
var proxy_cookie = 'ssid=' + proxy_cookie_ssid + '; sstoken='+proxy_cookie_sstoken + '; JSESSIONID=' + proxy_cookie_session;

function mockRequestUtil(req, res, hostname, port, method, cookie) {
    res.set('Content-Type', 'application/json;charset=UTF-8');
    var buf = req.body; //dora-plugin-proxy对req、res进行了封装

    if(hostname == undefined || hostname == '') {
        hostname = proxy_host;
    }

    if(port == undefined || port == '') {
        port = proxy_port;
    }

    if(cookie == undefined || cookie == '') {
        cookie = proxy_cookie;
    }

    if(method == undefined || method == '') {
        method = proxy_method;
    }

    var options = {
            hostname: hostname,
            port: port,
            path: req.url,
            method: method,
            headers: Object.assign({},  req.headers, {
                    'host':hostname,
                    'Origin': 'http://127.0.0.1:8989',
                    'referer':'http://127.0.0.1:8989',
                    'Cookie': cookie
            })
    };

    //新建一个http.request来负责与真正提供api服务数据的服务器通信
    var _req = http.request(options, function(_res){
            var data = "";
            _res.setEncoding('UTF-8');
            _res.on('data', function(chunk){//代理响应接受到服务器数据返回
                    data += chunk ;
            })
            .on('end', function(){//提供数据服务的数据接受完毕
                    res.end(data); // 由本地的响应实例来响应代理服务器接受到的数据内容
            })
    }).on('error', function(error){
            res.end(); //本地响应实例返回空内容
    });

    _req.write(buf); //由http.request生成的请求实例来完成请求真正的提供数据服务的服务器
    _req.end();
}

module.exports = mockRequestUtil;
