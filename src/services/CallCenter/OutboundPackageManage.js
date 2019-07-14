import qs from 'qs';

//销售产品设置列表及查询
export async function cusPackageList(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//销售产品设置操作（上架、下架、删除）
export async function cusPackageEdit(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageEdit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//销售产品设置编辑
export async function cusPackageQuery(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//销售产品设置新增保存
export async function cusPackageAdd(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageAdd`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//销售产品设置编辑保存
export async function cusPackageEditor(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageEditor`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*搜索机构信息*/
export async function cusManageTenantOrg(params) {
    return serviceRequest(`${BASE_URL}/calloutcusManage/cusManageTenantOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//打开开通套餐获取坐席套餐或时长包下拉列表
export async function cusPackageOpenPro(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenPro`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//选择坐席人数
export async function seatUserBindQuery(params) {
    return serviceRequest(`${BASE_URL}/calloutcusSeat/seatUserBindQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//套餐开通保存
export async function cusPackageOpenAdd(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenAdd`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//套餐开通列表
export async function cusPackageOpenList(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//套餐详情
export async function cusPackageOpenEdit(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenEdit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//套餐编辑保存
export async function cusPackageOpenEditor(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenEditor`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//套餐审核保存
export async function cusPackageOpenAudit(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenAudit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//审核查看坐席
export async function cusPackageOpenSeatQuery(params) {
    return serviceRequest(`${BASE_URL}/calloutcusPackage/cusPackageOpenSeatQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
