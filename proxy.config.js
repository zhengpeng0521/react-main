'use strict';

//const mock = {}
//require('fs').readdirSync(require('path').join(__dirname + '/mock'))
//  .forEach(function (file) {
//	console.info(file)
//    Object.assign(mock, require('./mock/' + file));
//  });

const mock = {

        '/guanli/*': 'http://192.168.1.69:9080',//开发环境代理接口

};

module.exports = mock;
