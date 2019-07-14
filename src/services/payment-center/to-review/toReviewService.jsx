import qs from 'qs';

//提现申请列表
export async function toReviewList(params) {
    return serviceRequest(`${BASE_URL}/PayAccountController/sett/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//审核操作
export async function toReviewFun(params) {
    return serviceRequest(`${BASE_URL}/PayAccountController/sett/operation`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
