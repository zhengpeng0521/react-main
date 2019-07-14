import qs from 'qs';
/*列表*/
export async function MechanismList(params) {
    return serviceRequest(`${BASE_URL}/mini/queryOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*添加*/
export async function MechanismAdd(params) {
    return serviceRequest(`${BASE_URL}/mini/addOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*修改状态*/
export async function MechanismUpdateState(params) {
    return serviceRequest(`${BASE_URL}/mini/actionOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*查询单个信息*/
export async function MechanismEdit(params) {
    return serviceRequest(`${BASE_URL}/mini/queryOrgInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*编辑*/
export async function MechanismUpdate(params) {
    return serviceRequest(`${BASE_URL}/mini/updateOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
