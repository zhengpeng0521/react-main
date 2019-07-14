import qs from 'qs';

/*获取机构类型*/
export async function GetTenantType(params) {
    return serviceRequest(`${BASE_URL}/organRegister/getSchoolType`,
    {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*搜索租户列表数据*/
export async function QueryTenantList(params) {
    return serviceRequest(`${BASE_URL}/organInfo/tenantInfoByCon`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*查看租户下所有的机构*/
export async function QueryTenantOrg(params) {
    return serviceRequest(`${BASE_URL}/organInfo/organListByTenantId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*租户下新增总部机构*/
export async function TenantAddHq(params) {
    return serviceRequest(`${BASE_URL}/organRegister/addHQ`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*租户下新增普通机构*/
export async function TenantAddOrg(params) {
    return serviceRequest(`${BASE_URL}/organRegister/addOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*租户下编辑总部或者普通机构*/
export async function TenantEditHqOrOrg(params) {
    return serviceRequest(`${BASE_URL}/organRegister/updateOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增租户*/
export async function TenantAddTet(params) {
    return serviceRequest(`${BASE_URL}/organRegister/createTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑租户*/
export async function EditTenantSubmit(params) {
    return serviceRequest(`${BASE_URL}/organRegister/updateTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑时获取租户信息*/
export async function TenantEditTet(params) {
    return serviceRequest(`${BASE_URL}/organInfo/getTenantById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击编辑机构获取机构详情*/
export async function GetOrgDetail(params) {
    return serviceRequest(`${BASE_URL}/organInfo/getOrgan`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
