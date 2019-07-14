import qs from 'qs';

export async function query(params) {
    return serviceRequest(`${BASE_URL}/userIntel/queryInteligent?${qs.stringify(params)}`);
}

export async function queryForSearchChannelList(params) {
  return serviceRequest(`${BASE_URL}/userIntel/queryInteligent?pageSize=10&pageIndex=0`);
}

export async function formUpdateSubmit(params) {
  return serviceRequest(`${BASE_URL}/userIntel/updateInteligent`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function formCreateSubmit(params){
    return serviceRequest(`${BASE_URL}/userIntel/addInteligent`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
export async function remove(params){
    return serviceRequest(`${BASE_URL}/userIntel/deleteInteligent?${qs.stringify(params)}`);
}

