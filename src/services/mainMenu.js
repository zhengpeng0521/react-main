import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}

/*模板-详情新增和修改*/
export async function initMenuAccept(params) {
  params = params || {};
  params.isThinknode = true;
  return serviceRequest('/web/manager/post/initMenuAccept', {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*点击修改密码*/
export async function ChangePwd(params) {
    return serviceRequest(`${BASE_URL}/updatePassword`, {
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
