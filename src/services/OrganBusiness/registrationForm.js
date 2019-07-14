import qs from 'qs';

/*新建渠道*/
export async function newChannels(params) {
  return serviceRequest(`${BASE_URL}/registerChannel/create/channel`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*配置渠道注册表单*/
export async function configurationChannels(params) {
  return serviceRequest(`${BASE_URL}/registerChannel/update/channel`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*删除渠道信息*/
export async function deleteChannels(params) {
  return serviceRequest(`${BASE_URL}/registerChannel/delete/channel`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询渠道列表*/
export async function queryChannel(params) {
  return serviceRequest(`${BASE_URL}/registerChannel/channel/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询banner列表*/
export async function queryBannerChannel(params) {
  return serviceRequest(`${BASE_URL}/registerChannel/banner/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*获取注册表单详情*/
export async function getRegisterChannel(params) {
  return serviceRequest(`${BASE_URL}/registerChannel/channel/form`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
