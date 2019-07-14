import qs from 'qs';

//商户信息列表
export async function queryWSMaterialApplyList(params) {
    return serviceRequest(`${BASE_URL}/wsmchController/queryWSMaterialApplyList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//商户信息列表
export async function editWSMaterialApply(params) {
    return serviceRequest(`${BASE_URL}/wsmchController/editWSMaterialApply`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

////短信发送
export async function materialExpressMessage(params) {
    return serviceRequest(`${BASE_URL}/wsmchController/materialExpressMessage`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

