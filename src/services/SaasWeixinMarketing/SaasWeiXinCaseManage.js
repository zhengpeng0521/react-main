import qs from 'qs';

/*微信活动列表加载*/
export async function weiXinActivityCaseList(params) {
    return serviceRequest(`${BASE_URL}/instance/instanceList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*活动管理列表加载--------------------------------------------------------------------------*/
export async function weiXinAdminiCaseList(params) {
    return serviceRequest(`${BASE_URL}/micNetActivity/micActivityList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*预约试听列表加载--------------------------------------------------------------------------*/
export async function weiXinAppointCaseList(params) {
    return serviceRequest(`${BASE_URL}/reservationManage/reservationList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*微信活动模板名称下拉列表内容*/
export async function weiXinActivityCaseSelectModalName(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/wechatActOrLeafleftList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*机构类型下拉列表内容*/
export async function orgSchoolTypeSelectModal(params) {
    return serviceRequest(`${BASE_URL}/organInfo/getSchoolType`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏列表加载*/
export async function weiXinGameCaseList(params) {
    return serviceRequest(`${BASE_URL}/instance/instanceList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*微信游戏模板名称下拉列表内容*/
export async function weiXinGameCaseSelectModalName(params) {
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信市场列表加载*/
export async function weiXinMarketCaseList(params) {
    return serviceRequest(`${BASE_URL}/zsb/market/instance/queryList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取域名*/
export async function getWeiXinMarketInit(params) {
    return serviceRequest(`${BASE_URL}/zsb/market/instance/init`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信线下传单列表加载*/
export async function weiXinOfflineLeafletsCaseList(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/allLeafletInst`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信线下传单模板名称下拉列表内容*/
export async function weiXinOfflineLeafletsCaseSelectModalName(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/wechatActOrLeafleftList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*微信游戏请求模板预览url*/
export async function getWeiXinGamePreviewUrl(params) {
    return serviceRequest(`${BASE_URL}/instance/dispatch/action`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


///*活动管理请求模板预览url---------------------------------------------------------------------------------*/
//export async function getWeiXinAdminiPreviewUrl(params) {
//    return serviceRequest(`${BASE_URL}/micNetActivity/barcodes`, {
//        method: 'post',
//        headers: {
//            "Content-Type": "application/x-www-form-urlencoded",
//        },
//        body: qs.stringify(params),
//    });
//}


//
///*预约试听请求模板预览url---------------------------------------------------------------------------------*/
//export async function getWeiXinAppointPreviewUrl(params) {
//    return serviceRequest(`${BASE_URL}/micNetActivity/barcodes`, {
//        method: 'post',
//        headers: {
//            "Content-Type": "application/x-www-form-urlencoded",
//        },
//        body: qs.stringify(params),
//    });
//}
