import qs from 'qs';

//查询学校列表
export async function schoolQueryList(params) {
    return serviceRequest(`${BASE_URL}/education/school/queryList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//添加学校
export async function addSchool(params) {
    return serviceRequest(`${BASE_URL}/education/school/addSchool`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//添加学校
export async function sendMessage(params) {
    return serviceRequest(`${BASE_URL}/sms/sendMessage`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

