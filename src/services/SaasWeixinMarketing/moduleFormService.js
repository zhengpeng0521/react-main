import qs from 'qs';

/*模板-详情查询*/
export async function moduleFormDetail(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/wechatActOrLeafleftDetail`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*模板-详情新增和修改*/
export async function moduleFormSubmit(params) {
    return serviceRequest(`${BASE_URL}/wechatMarketing/updateWechatActOrLeafleftById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取标签*/
export async function getTagGroups(params){
    return serviceRequest(`${BASE_URL}/ProductLabelController/alllabel/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*线下传单模板-详情查询*/
export async function moduleOfflineLeafletsFormDetail(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/getDefMsg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*线下传单模板-详情新增和修改*/
export async function moduleOfflineLeafletsFormSubmit(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/createDef`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*修改和保存编辑数据*/
export async function saveOfflineLeafletsConfig(params) {
    return serviceRequest(`${BASE_URL}/offlineManager/updateDefPage`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*图片上传*/
export async function uploadImageMethods(params) {
			
	let value = undefined;
	
	return new Promise(function(resolve, reject) {

		var formData = new FormData();

		formData.append("file", params);

		var request = new XMLHttpRequest();

		request.open("post", window.manager_platform == 'thinknode' ? '/thinknode/upload/image' : `${BASE_URL}/systemController/upload`);

			request.onload = function(oEvent) {

				if(oEvent.currentTarget.status === 200) {		

					let response = JSON.parse(oEvent.currentTarget.response);					
					var img = new Image();
					img.src = response.data.url;

					img.onload = function(){
						response.data.width = img.width;
						response.data.height = img.height;
						value = resolve(response);
					}
				} else {
					reject(new Error('图片上传失败'))
				}
			}

		request.send(formData);	
	}).catch(function(err) {
		_(err);	
	})
}
