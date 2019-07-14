import qs from 'qs';

/*获取套餐列表数据*/
export async function GetPackageList(params) {
    return serviceRequest(`${BASE_URL}/meal/mealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增套餐*/
export async function AddNewPackage(params) {
    return serviceRequest(`${BASE_URL}/meal/addMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑套餐*/
export async function EditExistPackage(params) {
    return serviceRequest(`${BASE_URL}/meal/updateMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*套餐改变上下架状态*/
export async function SaasPackageUpOrDown(params) {
    return serviceRequest(`${BASE_URL}/meal/dealMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取模块列表*/
export async function GetModularList(params) {
    return serviceRequest(`${BASE_URL}/module/moduleList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取菜单列表数据*/
export async function GetMenuList(params) {
    return serviceRequest(`${BASE_URL}/tenantRole/getResourceTree`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*添加模块*/
export async function AddNewModular(params) {
    return serviceRequest(`${BASE_URL}/module/addModule`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑模块更新版本*/
export async function EditExistModular(params) {
    return serviceRequest(`${BASE_URL}/module/updateModule`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑模块不更新版本*/
export async function EditExistModularNotUpdate(params) {
    return serviceRequest(`${BASE_URL}/module/updateModuleAndRes`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取套餐开通列表数据*/
export async function GetPackingOpening(params) {
    return serviceRequest(`${BASE_URL}/meal/queryOpenResPackages`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*套餐列表改变状态*/
export async function SetPackageOpeningType(params) {
    return serviceRequest(`${BASE_URL}/meal/closeResPackages`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*打开表单获取套餐列表作为下拉列表数据*/
export async function GetPackageSelectList(params) {
    return serviceRequest(`${BASE_URL}/meal/mealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*通过机构名称或者手机号获取机构信息*/
export async function GetOrgDetail(params) {
    return serviceRequest(`${BASE_URL}/organInfo/organInfoByNameOrMobile`, {
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

/*开通套餐*/
export async function OpeningPackage(params) {
    return serviceRequest(`${BASE_URL}/meal/batchOpenResPackages`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
