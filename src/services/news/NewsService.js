import qs from 'qs';

//列表
export async function newReportQuery(params) {
    return serviceRequest(`${BASE_URL}/excludePath/newReport/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//上下架
export async function newReportDelete(params) {
    return serviceRequest(`${BASE_URL}/excludePath/newReport/delete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新增
export async function newReportCreate(params) {
    let path = '';
    if(params.addType == 'add'){
        path = 'excludePath/newReport/create'
    }else if(params.addType == 'edit'){
        path = 'excludePath/newReport/update'
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

//回显
export async function newReportDetail(params) {
    return serviceRequest(`${BASE_URL}/excludePath/newReport/detail`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
