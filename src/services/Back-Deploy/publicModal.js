import qs from 'qs';

/*模板1*/
/*点击路由加载栏目列表*/
export async function queryForColumnListModalOne(params) {
    return serviceRequest(`${BASE_URL}/column/queryColumn?pageSize=10&pageIndex=0`);
}

/*栏目列表查询*/
export async function queryColumnModalOne(params) {
    return serviceRequest(`${BASE_URL}/column/queryColumn?${qs.stringify(params)}`);
}

/*新增栏目*/
export async function CreateColumnModalOne(params){
    return serviceRequest(`${BASE_URL}/column/addColumn`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑栏目*/
export async function UpdateColumnModalOne(params) {
    return serviceRequest(`${BASE_URL}/column/updateColumn`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除栏目*/
export async function deleteColumnModalOne(params) {
    return serviceRequest(`${BASE_URL}/column/deleteColumn`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击查看主题加载主题列表*/
export async function showTopicModalOne(params) {
    return serviceRequest(`${BASE_URL}/theme/queryTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*主题列表分页*/
export async function queryTopicModalOne(params) {
    return serviceRequest(`${BASE_URL}/theme/queryTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增主题*/
export async function CreateTopicModalOne(params) {
    return serviceRequest(`${BASE_URL}/theme/addTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑主题*/
export async function UpdateTopicModalOne(params) {
    return serviceRequest(`${BASE_URL}/theme/updateTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除主题*/
export async function DeleteTopicModalOne(params) {
    return serviceRequest(`${BASE_URL}/theme/deleteTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击查看文章加载列表*/
export async function showArticleModalOne(params) {
    return serviceRequest(`${BASE_URL}/article/queryArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*文章列表分页*/
export async function queryArticleModalOne(params) {
    return serviceRequest(`${BASE_URL}/article/queryArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增文章*/
export async function CreateArticleModalOne(params) {
    return serviceRequest(`${BASE_URL}/article/addArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑文章*/
export async function UpdateArticleModalOne(params) {
    return serviceRequest(`${BASE_URL}/article/updateArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除文章*/
export async function DeleteArticleModalOne(params) {
    return serviceRequest(`${BASE_URL}/article/deleteArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*模板2*/
/*点击路由加载关键词列表*/
export async function queryForKeyListModalTwo(params) {
    return serviceRequest(`${BASE_URL}/theme/queryTheme?pageSize=10&pageIndex=0`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*关键词列表查询*/
export async function queryKeyListModalTwo(params) {
    return serviceRequest(`${BASE_URL}/theme/queryTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击'状态栏设置'*/
export async function openSetState() {
    return serviceRequest(`${BASE_URL}/column/queryTemplate`);
}

/*'状态栏设置'提交*/
export async function setStateSubmit(params) {
    return serviceRequest(`${BASE_URL}/column/addTemplateTitle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增关键词*/
export async function CreateKeyModalTwo(params) {
    return serviceRequest(`${BASE_URL}/theme/addTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑关键词*/
export async function UpdateKeyModalTwo(params) {
    return serviceRequest(`${BASE_URL}/theme/updateTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*关键词删除*/
export async function DeleteKeyModalTwo(params) {
    return serviceRequest(`${BASE_URL}/theme/deleteTheme`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击'查看测评项目'*/
export async function showCommentModalTwo(params) {
    return serviceRequest(`${BASE_URL}/article/queryArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*测评项目分页查看*/
export async function queryCommentModalTwo(params) {
    return serviceRequest(`${BASE_URL}/article/queryArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增测评项目*/
export async function createCommentModalTwo(params) {
    return serviceRequest(`${BASE_URL}/article/addArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑测评项目*/
export async function updateCommentModalTwo(params) {
    return serviceRequest(`${BASE_URL}/article/updateArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
/*删除测评项目*/
export async function deleteCommentModalTwo(params) {
    console.log('service',params);
    return serviceRequest(`${BASE_URL}/article/deleteArticle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


