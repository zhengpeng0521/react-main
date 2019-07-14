import qs from 'qs';

export async function showKouBeiGameList(params) {
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function queryForKouBeiGameList(params) {
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function kouBeiGameChangeStatus(params) {
    return serviceRequest(`${BASE_URL}/gameManage/deleteGameById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function kouBeiGameUpdate(params) {
    console.info('weiXinGameUpdate ',params);
    return serviceRequest(`${BASE_URL}/gameManage/updateGameById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function kouBeiGameAfterOperation(params) {
    console.info('weiXinGameChangeStatus ',params);
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
