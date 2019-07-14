import qs from 'qs';

/*微信活动*/
export async function showWeiXinActivityTopAllData(params) {
    return serviceRequest(`${BASE_URL}/weMarktingStatistics/modelDataOverView`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinActivityBottomSelectValue(params) {
    return serviceRequest(`${BASE_URL}/data/select`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinActivityBottomAllData(params) {
    return serviceRequest(`${BASE_URL}/data/dataBottom`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

///*活动管理-----------------------------------------------------------------------------------------*/
//export async function showWeiXinAdminiTopAllData(params) {
//    return serviceRequest(`${BASE_URL}/weMarktingStatistics/modelDataOverView`, {
//        method: 'post',
//        headers: {
//            "Content-Type": "application/x-www-form-urlencoded",
//        },
//        body: qs.stringify(params),
//    });
//}

export async function showWeiXinAdminiBottomSelectValue(params) {
    return serviceRequest(`${BASE_URL}/data/select`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinAdminiBottomAllData(params) {
    return serviceRequest(`${BASE_URL}/data/dataBottom`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信传单*/
export async function showWeiXinFlyerTopAllData(params) {
    return serviceRequest(`${BASE_URL}/weMarktingStatistics/modelDataOverView`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinFlyerBottomSelectValue(params) {
    return serviceRequest(`${BASE_URL}/data/select`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinFlyerBottomAllData(params) {
    return serviceRequest(`${BASE_URL}/data/dataBottom`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏*/
export async function showWeiXinGameTopAllData(params) {
    return serviceRequest(`${BASE_URL}/weMarktingStatistics/modelDataOverView`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinGameBottomSelectValue(params) {
    return serviceRequest(`${BASE_URL}/data/select`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function showWeiXinGameBottomAllData(params) {
    return serviceRequest(`${BASE_URL}/data/dataBottom`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
