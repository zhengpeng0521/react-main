import qs from 'qs';

/*获取套餐列表数据*/
export async function getFaceList(params) {
    return serviceRequest(`${BASE_URL}/faceRecognitionMeal/getFaceMealList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*开通人脸套餐*/
export async function openFace(params) {
    return serviceRequest(`${BASE_URL}/faceRecognitionMeal/addFaceMeal`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取设备列表数据*/
export async function getDeviceList(params) {
    return serviceRequest(`${BASE_URL}/faceRecognitionMeal/bondedDevicesList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*添加设备*/
export async function saveDevice(params) {
    return serviceRequest(`${BASE_URL}/faceRecognitionMeal/bondedDevices`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
