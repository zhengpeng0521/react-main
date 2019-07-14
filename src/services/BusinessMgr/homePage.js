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

export async function queryForlList(params) {
   return serviceRequest(`${BASE_URL}/goldShop/secondSaleList?${qs.stringify(params)}`);
}

export async function createFormSubmit(params){
    return serviceRequest(`${BASE_URL}/goldShop/createSecondSale?${qs.stringify(params)}`);
}

export async function updateFormSubmit(params){
    return serviceRequest(`${BASE_URL}/goldShop/updateSecondSale?${qs.stringify(params)}`);
}
