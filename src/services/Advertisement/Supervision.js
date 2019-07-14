import qs from 'qs';
/*广告列表*/
export async function SupervisionList(params) {
    return serviceRequest(`${BASE_URL}/advertController/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*添加广告*/
export async function SupervisionAdd(params) {
    return serviceRequest(`${BASE_URL}/advertController/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*修改广告状态*/
export async function SupervisionUpdateState(params) {
    return serviceRequest(`${BASE_URL}/advertController/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*编辑广告*/
export async function SupervisionEdit(params) {
    return serviceRequest(`${BASE_URL}/advertController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
