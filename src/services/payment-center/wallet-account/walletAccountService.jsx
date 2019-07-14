import qs from 'qs';

//钱包账号列表
export async function walletAccountList(params) {
    return serviceRequest(`${BASE_URL}/PayAccountController/account/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//查看流水明细
export async function walletDetailList(params) {
    return serviceRequest(`${BASE_URL}/PayAccountController/history/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//导出账户信息
export async function exportAccount(params) {
    return serviceRequest(`${BASE_URL}/PayAccountController/exportAccountList`, {
        method: 'get',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
