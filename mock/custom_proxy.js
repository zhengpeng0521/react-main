var mockRequestUtil = require('./mockRequestUtil');
//登陆
module.exports = {
    '/guanli/*' : function(req, res) {
        mockRequestUtil(req, res);
    },
}
