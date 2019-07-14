import qs from 'qs';

/*更新product接口*/
export async function changTba(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/label/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*获取标签组列表*/
export async function getTagGroupsList(params){
    return serviceRequest(`${BASE_URL}/ProductLabelController/labelgroup/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取标签列表*/
export async function getTagList(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/label/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*标签排序*/
export async function labelSorting(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/label/sort`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*标签组排序*/
export async function labelGroupSorting(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/labelgroup/sort`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*修改标签*/
export async function labelUpdate(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/label/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*修改标签组*/
export async function labelGroupUpdate(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/labelgroup/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增标签*/
export async function labelCreate(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/label/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增标签组*/
export async function labelGroupCreate(params) {
    return serviceRequest(`${BASE_URL}/ProductLabelController/labelgroup/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
