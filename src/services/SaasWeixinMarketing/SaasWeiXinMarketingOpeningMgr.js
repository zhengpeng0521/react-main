import qs from 'qs';

/*开通管理列表*/
export async function showMarketingOpeningMgrList(params) {
    return serviceRequest(`${BASE_URL}/mealOpening/mealOpeningList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*查看套餐包含模板*/
export async function checkIncludingModal(params) {
    return serviceRequest(`${BASE_URL}/mealOpening/openingModelListById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*搜索机构信息*/
export async function searchOrgMessage(params) {
    return serviceRequest(`${BASE_URL}/organInfo/organInfoByNameOrMobile`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*打开新增套餐模态框查询套餐*/
export async function openOpenPackageModalPackage(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/mealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*开通套餐选中模板后查看套餐类型*/
export async function addPackageModalCheckPackageType(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/mealModelListById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*开通套餐表单提交*/
export async function addPackageModalSubmit(params) {
    return serviceRequest(`${BASE_URL}/mealOpening/addMealOpening`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*请求所有微信活动，微信传单，微信游戏模板*/
export async function queryWeiXinAllModal(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/allModelList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*开通模板表单提交*/
export async function addTemplateModalSubmit(params) {
    return serviceRequest(`${BASE_URL}/mealOpening/addMealOpening`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*通过租户信息搜索租户*/
export async function GetTenantDetail(params) {
    return serviceRequest(`${BASE_URL}/organInfo/tenantInfoByCon`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*通过租户搜索机构*/
export async function GetOrgByTenantId(params) {
    return serviceRequest(`${BASE_URL}/organInfo/organListByTenantId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

