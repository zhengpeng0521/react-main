import qs from 'qs';

/*获取列表*/
export async function GetTableList(params){
    return serviceRequest(`${BASE_URL}/hqPack/headOrgList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//点击剩余套餐
export async function OpenLeftPackageModal(params){
    return serviceRequest(`${BASE_URL}/hqPack/leftPackList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//查看分配记录
export async function CheckRecord(params){
    return serviceRequest(`${BASE_URL}/hqPack/allotPackRecordList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//点击分配套餐查看套餐列表
export async function ClickDispatch(params){
    return serviceRequest(`${BASE_URL}/hqPack/hqMealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//套餐点击分配
export async function PackageModalSubmit(params){
    return serviceRequest(`${BASE_URL}/hqPack/allotPack`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

