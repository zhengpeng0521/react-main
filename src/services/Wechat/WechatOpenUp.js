import qs from 'qs';
/*列表*/
export async function OpenUpList(params) {
    return serviceRequest(`${BASE_URL}/mini/queryOpen`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*添加*/
export async function OpenUpAdd(params) {
    return serviceRequest(`${BASE_URL}/mini/addOpen`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*修改状态*/
export async function OpenUpUpdateState(params) {
    return serviceRequest(`${BASE_URL}/advertController/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*编辑*/
export async function OpenUpEdit(params) {
    return serviceRequest(`${BASE_URL}/advertController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
