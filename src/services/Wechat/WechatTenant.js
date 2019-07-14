import qs from 'qs';
/*列表*/
export async function TenantList(params) {
    return serviceRequest(`${BASE_URL}/mini/queryTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*添加*/
export async function TenantAdd(params) {
    return serviceRequest(`${BASE_URL}/mini/addTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*修改状态*/
export async function TenantUpdateState(params) {
    return serviceRequest(`${BASE_URL}/mini/actionTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*查询单个信息*/
export async function TenantEdit(params) {
    return serviceRequest(`${BASE_URL}/mini/queryTenantInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*更新*/
export async function TenantUpdate(params) {
    return serviceRequest(`${BASE_URL}/mini/updateTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

