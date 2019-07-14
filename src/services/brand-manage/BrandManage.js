import qs from 'qs';

/*获取列表*/
export async function GetTableList(params){
    return serviceRequest(`${BASE_URL}/tenantBrand/queryList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*品牌审核*/
export async function ExamineModalSubmit(params){
    return serviceRequest(`${BASE_URL}/tenantBrand/auditBrand`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
