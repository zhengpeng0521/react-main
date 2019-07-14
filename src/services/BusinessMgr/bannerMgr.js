import qs from 'qs';

export async function query(params) {
    return serviceRequest(`${BASE_URL}/business/queryBanners?${qs.stringify(params)}`);
}

export async function formSubmit(params) {
  return serviceRequest(`${BASE_URL}/business/addBanner`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function updateHtmlDetail(params) {
  return serviceRequest('/business/addBannerHtml', {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function detail(params) {
  return serviceRequest(`${BASE_URL}/business/getbannerById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function getHtmldetail(params) {
  return serviceRequest(`${BASE_URL}/business/getHtmldetail`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryAreaAndTarget(params) {
 return serviceRequest(`${BASE_URL}/business/queryAreaAndTarget`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function queryForSearchChannelList(params) {
  return serviceRequest(`${BASE_URL}/channel/queryChannelByStatus`);
}
