import qs from 'qs';

//列表及查询
export async function cusSeatList(params) {
    return serviceRequest(`${BASE_URL}/calloutcusSeat/cusSeatList`, {
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
/*搜索账号*/
export async function seatUserSearch(params) {
    return serviceRequest(`${BASE_URL}/calloutcusSeat/seatUserSearch`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*新增保存*/

export async function seatUserAdd(params) {
    return serviceRequest(`${BASE_URL}/calloutcusSeat/seatUserAdd`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*改绑新员工查询*/
export async function seatUserBindQuery(params) {
    return serviceRequest(`${BASE_URL}/calloutcusSeat/seatUserBindQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*改绑保存*/
export async function seatUserBind(params) {
    return serviceRequest(`${BASE_URL}/calloutcusSeat/seatUserBind`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
