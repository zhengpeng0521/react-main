import qs from 'qs';

//交易统计报表
export async function queryPromoterList(params) {
    return serviceRequest(`${BASE_URL}/wsmchController/queryTradeReport`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
