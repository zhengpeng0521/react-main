import qs from 'qs';

/*模板-详情新增和修改*/
export async function loginAction(params) {
    return serviceRequest(`${BASE_URL}/login`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
