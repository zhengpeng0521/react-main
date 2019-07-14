import qs from 'qs';

//列表及查询
export async function cusManageList(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//详情
export async function cusManageQuery(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


//租户审核
export async function cusManageAudit(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageAudit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*搜索机构信息*/
export async function searchOrgMessage(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageTenantOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//根据机构查询地址
export async function getOrgAddrById(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/getOrgAddrById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//新增保存
export async function cusManageAdd(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageAdd`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//编辑保存
export async function cusManageEdit(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageEdit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
