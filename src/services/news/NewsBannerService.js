import qs from 'qs';
//列表
export async function viewpagerQuery(params) {
    return serviceRequest(`${BASE_URL}/excludePath/viewpager/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新增&修改
export async function viewpagerCreate(params) {
    let path = '';
    if(params.addType == 'add'){
        path = 'excludePath/viewpager/create'
    }else if(params.addType == 'edit'){
        path = 'excludePath/viewpager/update'
    }
    delete params.addType
    return serviceRequest(`${BASE_URL}/${path}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//详情
export async function viewpagerDetail(params) {
    return serviceRequest(`${BASE_URL}/excludePath/viewpager/detail`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//上下架删除
export async function viewpagerDelete(params) {
    return serviceRequest(`${BASE_URL}/excludePath/viewpager/delete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
