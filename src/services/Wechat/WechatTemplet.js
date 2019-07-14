import qs from 'qs';
//列表
export async function viewpagerQuery(params) {
    return serviceRequest(`${BASE_URL}/mini/queryMini`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新增
export async function viewpagerCreate(params) {
    return serviceRequest(`${BASE_URL}/mini/addMini`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//详情
export async function viewpagerDetail(params) {
    return serviceRequest(`${BASE_URL}/mini/queryMiniInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//草稿箱列表
export async function draftList(params) {
    return serviceRequest(`${BASE_URL}/mini/draftList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//详情模版列表
export async function tplList(params) {
    return serviceRequest(`${BASE_URL}/mini/tplList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//草稿变为模版
export async function draftToTpl(params) {
    return serviceRequest(`${BASE_URL}/mini/draftToTpl`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//将该模版设为默认的模版
export async function updateVersion(params) {
    return serviceRequest(`${BASE_URL}/mini/updateVersion`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//删除某个模版
export async function delTpl(params) {
    return serviceRequest(`${BASE_URL}/mini/delTpl`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

