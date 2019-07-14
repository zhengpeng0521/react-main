import qs from 'qs';

export async function queryForOrganMessage(params) {
  return serviceRequest(`${BASE_URL}/organInfo/organList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*冻结机构*/
export async function OrganMangeFreeze(params) {
    return serviceRequest(`${BASE_URL}/organInfo/managerOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*机构开通模板包含模块*/
export async function checkIncludingModal(params) {
    return serviceRequest(`${BASE_URL}/mealOpening/openingModelListById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*冻结后的列表展示*/
export async function freezeAfterOperation(params) {
    return serviceRequest(`${BASE_URL}/organInfo/organList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*编辑机构经纬度*/
export async function editOrganMessageLongitude(params) {
    return serviceRequest(`${BASE_URL}/organInfo/positionOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取套餐详情*/
export async function getAllSaasPayment(params) {
    let para = '';
    if(params.type == 'saas'){
        para = 'getAllSaasPayment'
    }else if(params.type == 'zsb'){
        para = 'getAllZsbPayment'
    }
    delete params.type
    return serviceRequest(`${BASE_URL}/organInfo/${para}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
