import qs from 'qs';

//商户信息列表
export async function queryPromoterList(params) {
    return serviceRequest(`${BASE_URL}/wsmchController/queryPromoterList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
