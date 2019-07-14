import qs from 'qs';

export async function query(params) {
    return serviceRequest(`${BASE_URL}/organRegister/registerList?${qs.stringify(params)}`);
}

export async function makeDeal(params) {
  return serviceRequest(`${BASE_URL}/organRegister/updateStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function CreateSaas(params) {
  return serviceRequest(`${BASE_URL}/organRegister/registerTenant`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function queryForSearchOrganRegister(params) {
  return serviceRequest(`${BASE_URL}/organRegister/registerList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function queryForSearchSchoolType() {
  return serviceRequest(`${BASE_URL}/organRegister/getSchoolType`);
}

export async function organRegisterAfterOperation(params) {
  return serviceRequest(`${BASE_URL}/organRegister/registerList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function getHtmlDetail(params) {
  return serviceRequest(`${BASE_URL}/freeApply/getList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function editHrefModalSubmit(params) {
  return serviceRequest(`${BASE_URL}/freeApply/updateConfig`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

