import qs from 'qs';

//商户信息列表
export async function settOperateQueryList(params) {
    return serviceRequest(`${BASE_URL}/wsmchController/settOperateQueryList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//服务商信息下拉选择
export async function queryAppInfoList(params) {
    return serviceRequest(`${BASE_URL}/syb/appInfoController/queryAppInfoList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
