import qs from 'qs';

/*微信活动默认列表*/
export async function showWeiXinActivityList(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/wechatActOrLeafleftList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*活动管理默认列表----------------------------------------------------------------------------------------*/
export async function showWeiXinAdminiList(params) {
    return serviceRequest(`${BASE_URL}/micNetActivity/micActivityList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*预约试听默认列表----------------------------------------------------------------------------------------*/
export async function showWeiXinAppointList(params) {
    return serviceRequest(`${BASE_URL}/reservationManage/reservationList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏默认列表*/
export async function showWeiXinGameList(params) {
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信活动列表搜索*/
export async function queryForWeiXinActivityList(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/wechatActOrLeafleftList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*活动管理列表搜索--------------------------------------------------------------------------------*/
export async function queryForWeiXinAdminiList(params) {
    return serviceRequest(`${BASE_URL}/micNetActivity/micActivityList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*预约试听列表搜索--------------------------------------------------------------------------------*/
export async function queryForWeiXinAppointList(params) {
    return serviceRequest(`${BASE_URL}/reservationManage/reservationList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*微信游戏列表搜索*/
export async function queryForWeiXinGameList(params) {
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信线下传单列表搜索*/
export async function queryForWeiXinOfflineLeafletsList(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/modelList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信活动上下架设置*/
export async function weiXinActivityChangeStatus(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/deleteWechatActOrLeafleftById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏上下架设置*/
export async function weiXinGameChangeStatus(params) {
    return serviceRequest(`${BASE_URL}/gameManage/deleteGameById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信线下传单上下架设置*/
export async function weiXinOfflineLeafletsChangeStatus(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/updateStatus`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信活动编辑*/
export async function weiXinActivityUpdate(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/updateWechatActOrLeafleftById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏编辑*/
export async function weiXinGameUpdate(params) {
    return serviceRequest(`${BASE_URL}/gameManage/updateGameById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信线下传单编辑*/
export async function weiXinOfflineLeafletsUpdate(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/createDef`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信活动编辑或上下架设置后的列表展示*/
export async function weiXinActivityAfterOperation(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/wechatActOrLeafleftList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信活动编辑或上下架设置后的列表展示------------------------------------------------------------------------*/
export async function weiXinAdminiAfterOperation(params) {
    return serviceRequest(`${BASE_URL}/micNetActivity/micActivityList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏编辑或上下架设置后的列表展示*/
export async function weiXinGameAfterOperation(params) {
    return serviceRequest(`${BASE_URL}/gameManage/gameList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*微信游戏编辑或上下架设置后的列表展示*/
export async function weiXinOfflineLeafletsAfterOperation(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/modelList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}





