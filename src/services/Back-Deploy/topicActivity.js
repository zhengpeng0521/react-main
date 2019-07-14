import qs from 'qs';


export async function queryForSearchChannelList(params) {
  return serviceRequest(`${BASE_URL}/channel/allChannel`);
}

export async function queryForSearchTopicActivityList(params) {
    return serviceRequest(`${BASE_URL}/topicActivity/showTopicAct?${qs.stringify(params)}`);
}

export async function queryTopicList(params) {
  return serviceRequest(`${BASE_URL}/topicActivity/showTopicAct`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function formCreateSubmit(params) {
  return serviceRequest(`${BASE_URL}/topicActivity/addTopicAct`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function formUpdateSubmit(params) {
    return serviceRequest(`${BASE_URL}/topicActivity/updateTopicAct`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function ChangeStatus(params) {
    return serviceRequest(`${BASE_URL}/topicActivity/putawayTopicAct`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}




