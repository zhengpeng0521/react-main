import qs from 'qs';

/*banner*/
    /*获取banner列表数据*/
    export async function GetBanner(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeBanner/bannerList`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*新增banner*/
    export async function AddNewBanner(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeBanner/addBanner`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*编辑banner*/
    export async function EditExistBanner(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeBanner/updateBanner`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*banner上下架*/
    export async function ChangeBannerStatus(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeBanner/delBanner`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

/*免费申请试用*/
    /*获取免费申请试用列表*/
    export async function GetFreeTrail(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeApply/applyList`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*免费申请试用改变处理未处理状态*/
    export async function ChangeFreeTrailStatus(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeApply/handleApply`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

/*机构成功案例*/
    /*获取机构成功案例列表*/
    export async function GetSuccessCase(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeSuc/sucSchemeList`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*机构成功案例改变上下架状态*/
    export async function ChangeSuccessCaseStatus(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeSuc/delSucScheme`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*新增机构成功案例*/
    export async function AddNewSuccessCase(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeSuc/addSucScheme`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*编辑机构成功案例*/
    export async function EditExistSuccessCase(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeSuc/updateSucScheme`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

/*营销咨询*/
    /*获取营销咨询列表*/
    export async function GetYingXiaoZiXun(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeMarInfo/marInfoList`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*改变营销咨询上下架状态*/
    export async function ChangeYingXiaoZiXunStatus(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeMarInfo/delMarInfo`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*新增营销咨询*/
    export async function AddNewYingXiaoZiXun(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeMarInfo/addMarInfo`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*编辑营销咨询*/
    export async function EditExistYingXiaoZiXun(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeMarInfo/updateMarInfo`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

/*最新推荐*/
    /*获取首页最新推荐*/
    export async function getRecommend(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeRecommend/recommendList`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*删除最新推荐*/
    export async function removeRecommend(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeRecommend/delRecommend`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*新增最新推荐*/
    export async function addRecommend(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeRecommend/addRecommend`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }

    /*编辑最新推荐*/
    export async function editRecommend(params) {
        return serviceRequest(`${BASE_URL}/marketingHomeRecommend/updateRecommend`, {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(params),
        });
    }
