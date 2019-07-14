import fetch from 'dva/fetch';
import qs from 'qs';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
window.serviceRequest = function(url, options) {
    let manager_platform = window.manager_platform || '';
    if(manager_platform && manager_platform == "thinknode") {
        let service = url;
        let data = qs.parse(options && options.body);

        let params = {
            service, data,
        }

        options = {
            method: 'post',
            credentials: 'include',     //fetch  请求加上cookie
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        };

        if(data && data.isLogin) {
            url = '/thinknode/web/manager/login/service';
        } else if(data && data.isThinknode) {
            url = '/thinknode' + url;
        } else {
            url = '/thinknode/web/manager/post/service';
        }
    }

    options = {
        ...options,
        credentials: 'include',     //fetch  请求加上cookie
        headers: {
            ...options.headers,
            isAjax: 'yes',
        }
    };

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((ret) => ({ ret }))
        .catch(function(err) {
        console.info('fetch error', err);
    });
}

window._ = function(...value) {
	console.info('console', ...value);
}
