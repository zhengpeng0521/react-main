import qs from 'qs';

export async function QueryApplyUserList(params) {
    return serviceRequest(`${BASE_URL}/tenantHost/hostQueryList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//域名审核表单提交
export async function DomainNameExamineModalSubmit(params) {
    return serviceRequest(`${BASE_URL}/tenantHost/auditHost`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//域名开通表单提交
export async function DomainNameOpenModalSubmit(params) {
    return serviceRequest(`${BASE_URL}/tenantHost/openHost`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


