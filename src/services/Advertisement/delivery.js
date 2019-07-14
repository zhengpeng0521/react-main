import qs from 'qs';
/*广告列表*/
export async function adCollectList(params) {
    return serviceRequest(`${BASE_URL}/modelAdvertController/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function adComList(params) {
    return serviceRequest(`${BASE_URL}/advertController/summary`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*投放广告*/
export async function handleCreateAdCollect(params) {
    return serviceRequest(`${BASE_URL}/modelAdvertController/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*取消投放广告*/
export async function handleCancleAdCollect(params) {
    return serviceRequest(`${BASE_URL}/modelAdvertController/del`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}