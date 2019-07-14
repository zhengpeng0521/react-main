import qs from 'qs';


/*获取列表*/
export async function getTagsGroupsList(params){
    return serviceRequest(`${BASE_URL}/ProductLabelController/labelmicdef/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取游戏列表*/
export async function getGameTagList(params){
    return serviceRequest(`${BASE_URL}/ProductLabelController/labelMicGame/micGameLabelQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取标签*/
export async function getTagGroups(params){
    return serviceRequest(`${BASE_URL}/ProductLabelController/alllabel/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*打标签*/
export async function setLabeling(params){
    return serviceRequest(`${BASE_URL}/ProductLabelController/label/set`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
