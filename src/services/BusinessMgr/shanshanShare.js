import qs from 'qs';

export async function queryList(params) {
  return serviceRequest(`${BASE_URL}/toShare/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function SearchTopic(params) {
  return serviceRequest(`${BASE_URL}/toShare/getSourseInfo`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function formSubmit(params) {
  return serviceRequest(`${BASE_URL}/toShare/updateToShare`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
