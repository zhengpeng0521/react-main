import qs from 'qs';

/*营销套餐列表*/
export async function showMarketingPackageList(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/mealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*查看套餐内包含模板*/
export async function checkIncludingModal(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/mealModelListById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*上下架*/
export async function packageChangeStatus(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/dealMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增套餐时打开新增表单并且获取所有套餐*/
export async function openAddPackageModal(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/allModelList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑套餐时打开新增表单并且获取所有套餐*/
export async function openEditPackageModal(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/allModelList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*更新购买记录*/
export async function tableWeiXinPackageUpdateBuyRecord(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/updatePurchaseRecord`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*上下架和编辑后的列表展示*/
export async function weiXinPackageAfterOperation(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/mealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增提交*/
export async function addPackageSubmit(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/addMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑提交*/
export async function editPackageSubmit(params) {
    return serviceRequest(`${BASE_URL}/marktingMeal/updateMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*查询模版或者实例*/
export async function queryPackageMoule(params) {
    return serviceRequest(`${BASE_URL}/GameBase/queryPrivilege`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
