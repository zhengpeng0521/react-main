import qs from 'qs';

export async function query(params) {
    return serviceRequest(`${BASE_URL}/topic/queryTopic?${qs.stringify(params)}`);
}

export async function create(params) {
  return serviceRequest('/api/users', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/delTopic`, {
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

export async function batchAddEssence(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/manageAllDoEssence`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchRecommend(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/recommendAll`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchCancelRecommend(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/recommendAll`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchDoUp(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/doUpAll`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchClearCache(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/clearCache`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function batchDelete(params) {
  return serviceRequest(`${BASE_URL}/topic/manager/delTopicAll`, {
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
  return serviceRequest(`${BASE_URL}/channel/allChannel`);
}

export async function defaultList(params) {
  return serviceRequest(`${BASE_URL}/topic/queryTopic?pageIndex=0&pageSize=10`);
}

export async function addImgTextTopic(params){
  return serviceRequest(`${BASE_URL}/topic/manager/addImgTextTopic`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}updateImgTextTopic

export async function updateImgTextTopic(params){
  return serviceRequest(`${BASE_URL}/topic/manager/updateTopic`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
