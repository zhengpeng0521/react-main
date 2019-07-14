import qs from 'qs';

export async function query(params) {
    return serviceRequest(`${BASE_URL}/channel/manager/queryChannel?${qs.stringify(params)}`);
}

export async function create(params) {
  return serviceRequest('/api/users', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return serviceRequest(`${BASE_URL}/channel/manager/disable`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function addEssence(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/addEssence`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function clearCache(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/clearCache`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function recommend(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/recommend`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function doUp(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/doUp`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function update(params) {
  return serviceRequest('/api/users', {
    method: 'put',
    body: qs.stringify(params),
  });
}

export async function queryForSearchChannelList(params) {
  return serviceRequest(`${BASE_URL}/channel/manager/queryChannel?pageSize=10&pageIndex=0`);
}

export async function formUpdateSubmit(params) {
  return serviceRequest(`${BASE_URL}/channel/manager/updateChannel`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function formCreateSubmit(params){
    return serviceRequest(`${BASE_URL}/channel/manager/addChannel`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
