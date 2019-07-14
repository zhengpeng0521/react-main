import { queryForColumnListModalOne,  //点击路由默认进入公众号模板1列表加载
         queryColumnModalOne, CreateColumnModalOne,UpdateColumnModalOne,deleteColumnModalOne,//模板1栏目列表增删改查
         showTopicModalOne, //模板1点击查看主题
         queryTopicModalOne,CreateTopicModalOne,UpdateTopicModalOne,DeleteTopicModalOne,//模板1主题增删改查
         showArticleModalOne, //模板1点击查看文章
         queryArticleModalOne,CreateArticleModalOne,UpdateArticleModalOne,DeleteArticleModalOne,//模板1文章增删改查
         queryForKeyListModalTwo, //点击路由模板2列表加载
         openSetState,setStateSubmit,  //'状态栏设置查询与修改'
         queryKeyListModalTwo,CreateKeyModalTwo,UpdateKeyModalTwo,DeleteKeyModalTwo,//模板2关键词列表增删改查
         showCommentModalTwo,
         queryCommentModalTwo,createCommentModalTwo,updateCommentModalTwo,deleteCommentModalTwo, //模板2测评项目列表增删改查
       }
        from '../../services/Back-Deploy/publicModal';
import { parse } from 'qs';
import { message } from 'antd';

//后台配置 帖子专题
export default {

  namespace: 'publicModal',

  state: {
    loading : false,        //列表加载状态
    selectedRowKeys : [],  //列表选中项
    selectedRows : [],     //列表选中项数据
    formLoading : false,    //表单按钮是否加载中
    formData : {},       //表单数据
    formType : '',       //表单类型('新增'或'修改')
    searchData : {},     //模糊查询数据
    searchVisible : false,  //模糊查询是否显示
    searchChannelList : [], //可选择的频道列表

    /*模板1*/
    typeModalOne : '1',  //模版类型'1'

    listColumnModalOne : [],           //栏目列表数据
    listTopicModalOne : [],           //主题列表数据
    listArticleModalOne : [],           //文章列表数据

    totalColumnModalOne : 0,          //栏目列表总条数
    totalTopicModalOne : 0,          //主题列表总条数
    totalArticleModalOne : 0,          //文章列表总条数

    pageColumnIndexModalOne : 0,      //栏目列表当前页码
    pageColumnSizeModalOne : 10,       //栏目列表每页显示数量
    pageTopicIndexModalOne : 0,   //主题页面页码
    pageTopicSizeModalOne : 10,   //主题页面每页显示数量
    pageArticleIndexModalOne : 0,   //文章页面页码
    pageArticleSizeModalOne : 10,   //文章页面每页显示数量

    columnIdModalOne:'',   //存储栏目id,主题新增分页时需要,
    topicIdModalOne:'',   //存储主题id,文章新增分页时需要,

    columnUrlVisibleModalOne : false,    //栏目链接按钮点击弹出模态框
    columnAddOrEditModalVisibleModalOne : false,  //栏目'新增' '编辑'模态框
    topicAddOrEditModalVisibleModalOne : false,  //主题'新增' '编辑'模态框
    articleAddOrEditModalVisibleModalOne : false,  //文章'新增' '编辑'模态框
    columnEditListVisibleModalOne : false, //栏目点击查看主题态框显示
    topicEditListVisibleModalOne : false,  //主题点击查看文章框显示

    columnUrlContentModalOne : '',    //列表页面链接弹框内容

    columnModalTitleModalOne : '' ,  //主题模态框的标题
    topicModalTitleModalOne : '',  //文章模态框的标题

    /*模板2*/
    typeModalTwo : '2',  //模版类型'1'

    listKeyModalTwo : [],         //关键词列表数据
    listCommentModalTwo : [],       //测评列表数据

    totalKeyModalTwo : 0,  //关键词列表总条数
    totalCommentModalTwo : 0,//测评列表总条数

    pageKeyIndexModalTwo : 0,  //关键词类表当前页码
    pageKeySizeModalTwo: 10,   //关键词列表每页显示数量
    pageCommentIndexModalTwo : 0,  //测评项目表当前页码
    pageCommentSizeModalTwo : 10,  //测评项目表每页显示数量

    keyIdModalTwo:'',   //存储关键词id,测评项目分页时需要,

    keyUrlVisibleModalTwo : false,  //关键词页面点击链接
    PublicModalSetStateVisibleModalTwo : false, //关键词页面点击'状态栏设置'
    keyAddOrEditModalVisibleModalTwo : false,  //关键词页面新增模态框
    commentAddOrEditModalVisibleModalTwo : false, //关键词页面点击'新增''编辑'模态框显示
    commentEditModalVisibleModalTwo : false, //测评项目页面编辑模态框显示

    keyUrlContentModalTwo : '',    //列表页面链接弹框内容

    commentModalTitleModalTwo : '' ,  //测评项目模态框的标题

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/public_modal') {
            dispatch({
                type: 'queryForColumnListModalOne'
            });
             dispatch({
                type: 'queryForKeyListModalTwo'
            });
        }
      });
    },
  },

  effects: {

    /*模板1*/
    //点击路由加载页面模板1
    *'queryForColumnListModalOne'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        const { ret } = yield call(queryForColumnListModalOne);
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateList',
                payload: {
                    listColumnModalOne : ret.results,
                    totalColumnModalOne : ret.data.resultCount,
                    pageColumnIndexModalOne : ret.data.pageIndex,
                    pageColumnSizeModalOne : ret.data.pageSize,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //栏目分页查看
    *'queryColumnModalOne'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageColumnIndexModalOne;
        let pageSize = publicModal.pageColumnSizeModalOne;
        let params = { pageIndex, pageSize };
        let { ret } = yield call(queryColumnModalOne, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'updateState',
              payload: {
                listColumnModalOne: ret.results,
                totalColumnModalOne: ret.data.resultCount,
                pageColumnIndexModalOne : ret.data.pageIndex,
                pageColumnSizeModalOne : ret.data.pageSize,
                formLoading : false,
              },
            });
            yield put({
              type: 'querySuccess',
            });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type : 'updateState',
              payload : {
                 formLoading : false,
              }
          });
      }
    },
    //模板1新增栏目
    *'CreateColumnModalOne'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(CreateColumnModalOne, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    columnAddOrEditModalVisibleModalOne : false,
                }
            });
            yield put({
                type: 'queryColumnModalOne',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //模板1编辑栏目
    *'UpdateColumnModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(UpdateColumnModalOne, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    columnAddOrEditModalVisibleModalOne : false,
                }
            });
            yield put({
                type: 'queryColumnModalOne',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //模板1删除栏目
    *'deleteColumnModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(deleteColumnModalOne, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'queryColumnModalOne',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //模板1点击查看主题列表
    *'showTopicModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageTopicIndexModalOne;
        let pageSize = publicModal.pageTopicSizeModalOne;
        let type = publicModal.typeModalOne;
        let params = { pageIndex,pageSize,type, ...payload };
        const { ret,err } = yield call(showTopicModalOne, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateList',
                payload: {
                    listTopicModalOne : ret.results,
                    totalTopicModalOne : ret.data.resultCount,
                    pageTopicIndexModalOne : ret.data.pageIndex,
                    pageTopicSizeModalOne : ret.data.pageSize,
                },
            });
            yield put({
                type: 'querySuccess',
            })
        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //模板1主题列表分页查询
    *'queryTopicModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageTopicIndexModalOne;
        let pageSize = publicModal.pageTopicSizeModalOne;
        let columnId = publicModal.columnIdModalOne;
        let type = publicModal.typeModalOne;
        let params = { pageIndex, pageSize, columnId, type };
        let { ret,error } = yield call(queryTopicModalOne, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload: {
                    listTopicModalOne: ret.results,
                    totalTopicModalOne: ret.data.resultCount,
                    pageTopicIndexModalOne : ret.data.pageIndex,
                    pageTopicSizeModalOne : ret.data.pageSize,
                    formLoading : false,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
              type : 'updateState',
              payload : {
                 formLoading : false,
              }
            });
        }
    },
     //模板1新增主题
     *'CreateTopicModalOne'({ payload },{ call , put , select }){
         yield put({ type: 'showLoading' });
         let publicModal = yield select(state => state.publicModal);
         let columnId = publicModal.columnIdModalOne;
         let type = publicModal.typeModalOne;
         let params = { columnId, type, ...payload };
         let { ret,error } = yield call(CreateTopicModalOne, parse(params));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    topicAddOrEditModalVisibleModalOne : false,
                },
            });
            yield put({
                type: 'queryTopicModalOne',
            });
            yield put({
                type: 'queryColumnModalOne',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //模板1编辑主题
     *'UpdateTopicModalOne'({ payload },{ call , put , select }){
         yield put({ type: 'showLoading' });
         let { ret,error } = yield call(UpdateTopicModalOne, parse(payload));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    topicAddOrEditModalVisibleModalOne : false,
                },
            });
            yield put({
                type: 'queryTopicModalOne',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //模板1删除主题
     *'DeleteTopicModalOne'({ payload },{ call , put , select }){
         yield put({ type: 'showLoading' });
         let { ret,error } = yield call(DeleteTopicModalOne, parse(payload));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'queryTopicModalOne',
            });
            yield put({
                type: 'queryColumnModalOne',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //模板1点击查看文章列表
     *'showArticleModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageArticleIndexModalOne;
        let pageSize = publicModal.pageArticleSizeModalOne;
        let params = {pageSize,pageIndex,...payload}
        const { ret,err } = yield call(showArticleModalOne, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateList',
                payload: {
                    listArticleModalOne : ret.results,
                    totalArticleModalOne : ret.data.resultCount,
                    pageArticleIndexModalOne : ret.data.pageIndex,
                    pageArticleSizeModalOne : ret.data.pageSize,
                },
            });
            yield put({
                type: 'querySuccess',
            })
        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //模板1文章列表分页查询
    *'queryArticleModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageArticleIndexModalOne;
        let pageSize = publicModal.pageArticleSizeModalOne;
        let themeId = publicModal.topicIdModalOne;
        let params = { pageIndex, pageSize, themeId };
        let { ret,error } = yield call(queryArticleModalOne, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload: {
                    listArticleModalOne : ret.results,
                    totalArticleModalOne : ret.data.resultCount,
                    pageArticleIndexModalOne : ret.data.pageIndex,
                    pageArticleSizeModalOne : ret.data.pageSize,
                    formLoading : false,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
              type : 'updateState',
              payload : {
                 formLoading : false,
              }
           });
        }
    },

    //模板1新增文章
    *'CreateArticleModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let columnId = publicModal.columnIdModalOne;
        let themeId = publicModal.topicIdModalOne;
        let params = { columnId, themeId , ...payload};
        let { ret,error } = yield call(CreateArticleModalOne, parse(params));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    articleAddOrEditModalVisibleModalOne : false,
                },
            });
            yield put({
                type: 'queryArticleModalOne',
            });
            yield put({
                type: 'queryTopicModalOne',
            });
            yield put({
                type: 'queryColumnModalOne',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //模板1编辑文章
    *'UpdateArticleModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let { ret,error } = yield call(UpdateArticleModalOne, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    articleAddOrEditModalVisibleModalOne : false,
                },
            });
            yield put({
                type: 'queryArticleModalOne',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //模板1删除文章
     *'DeleteArticleModalOne'({ payload },{ call , put , select }){
        yield put({ type: 'showLoading' });
        let { ret,error } = yield call(DeleteArticleModalOne, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'queryArticleModalOne',
            });
            yield put({
                type: 'queryTopicModalOne',
            });
            yield put({
                type: 'queryColumnModalOne',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     /*模板2*/
     //点击路由加载页面模板2
    *'queryForKeyListModalTwo'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let type = publicModal.typeModalTwo;
        let params = {type , ...payload};
        const { ret,error } = yield call(queryForKeyListModalTwo,parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateList',
                payload: {
                    listKeyModalTwo : ret.results,
                    totalKeyModalTwo : ret.data.resultCount,
                    pageKeyIndexModalTwo : ret.data.pageIndex,
                    pageKeySizeModalTwo : ret.data.pageSize,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
     },

     //关键词分页查看
     *'queryKeyListModalTwo'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageKeyIndexModalTwo;
        let pageSize = publicModal.pageKeySizeModalTwo;
        let type = publicModal.typeModalTwo;
        let params = { pageIndex, pageSize, type };
        let { ret } = yield call(queryKeyListModalTwo, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload: {
                    listKeyModalTwo : ret.results,
                    totalKeyModalTwo : ret.data.resultCount,
                    pageKeyIndexModalTwo : ret.data.pageIndex,
                    pageKeySizeModalTwo : ret.data.pageSize,
                    formLoading : false,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
                type : 'updateState',
                payload : {
                    formLoading : false,
                }
            });
        }
     },

     //点击'状态栏设置'弹框内容请求
     *'openSetState'({ payload }, { call, put, select }){
         yield put({ type: 'showFormLoading'});
         let { ret,error } = yield call(openSetState);
         if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload:{
                    formData:ret.results[0],
                    formLoading:false,
                }
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //'状态栏设置'提交
     *'setStateSubmit'({ payload }, { call, put, select }){
         yield put({ type: 'showLoading' });
         let { ret,error } = yield call(setStateSubmit,parse(payload));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload:{
                    PublicModalSetStateVisibleModalTwo : false,
                }
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
         yield put({ type: 'closeLoading' });
     },

     //新增关键词列表项
     *'CreateKeyModalTwo'({ payload }, { call, put, select }){
         yield put({ type: 'showLoading' });
         let publicModal = yield select(state => state.publicModal);
         let type = publicModal.typeModalTwo;
         let params = { type , ...payload};
         let { ret,error } = yield call(CreateKeyModalTwo, parse(params));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    keyAddOrEditModalVisibleModalTwo : false,
                },
            });
            yield put({
                type: 'queryKeyListModalTwo',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //编辑关键词列表项
     *'UpdateKeyModalTwo'({ payload }, { call, put, select }){
         yield put({ type: 'showLoading' });
         let { ret,error } = yield call(UpdateKeyModalTwo, parse(payload));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    keyAddOrEditModalVisibleModalTwo : false,
                },
            });
            yield put({
                type: 'queryKeyListModalTwo',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //关键词列表删除
     *'DeleteKeyModalTwo'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(DeleteKeyModalTwo, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'queryKeyListModalTwo',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
     },

     //查看测评项目列表
     *'showCommentModalTwo'({ payload }, { call, put, select }){
         yield put({ type: 'showLoading' });
         let publicModal = yield select(state => state.publicModal);
         let pageIndex = publicModal.pageCommentIndexModalTwo;
         let pageSize = publicModal.pageCommentSizeModalTwo;
         let params = {pageIndex,pageSize,...payload}
         const { ret,err } = yield call(showCommentModalTwo, parse(params));
         if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateList',
                payload: {
                    listCommentModalTwo : ret.results,
                    totalCommentModalTwo : ret.data.resultCount,
                    pageCommentIndexModalTwo : ret.data.pageIndex,
                    pageCommentSizeModalTwo : ret.data.pageSize,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
     },

     //测评项目分页查看
     *'queryCommentModalTwo'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let publicModal = yield select(state => state.publicModal);
        let pageIndex = publicModal.pageCommentIndexModalTwo;
        let pageSize = publicModal.pageCommentSizeModalTwo;
        let themeId = publicModal.keyIdModalTwo;
        let params = { pageIndex, pageSize, themeId };
        let { ret } = yield call(queryCommentModalTwo, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload: {
                    listCommentModalTwo : ret.results,
                    totalCommentModalTwo : ret.data.resultCount,
                    pageCommentIndexModalTwo : ret.data.pageIndex,
                    pageCommentSizeModalTwo : ret.data.pageSize,
                    formLoading : false,
                },
            });
            yield put({
                type: 'querySuccess',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
            type : 'updateState',
                payload : {
                    formLoading : false,
                }
            });
        }
     },

     //新增测评项目
     *'createCommentModalTwo'({ payload }, { call, put, select }){
         yield put({ type: 'showLoading' });
         let publicModal = yield select(state => state.publicModal);
         let themeId = publicModal.keyIdModalTwo;
         let params = { themeId , ...payload};
         let { ret,error } = yield call(createCommentModalTwo, parse(params));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    commentAddOrEditModalVisibleModalTwo : false,
                },
            });
            yield put({
                type: 'queryCommentModalTwo',
            });
            yield put({
                type: 'queryKeyListModalTwo',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //修改测评项目
     *'updateCommentModalTwo'({ payload }, { call, put, select }){
         yield put({ type: 'showLoading' });
         let { ret,error } = yield call(updateCommentModalTwo, parse(payload));
         if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload: {
                    commentAddOrEditModalVisibleModalTwo : false,
                },
            });
            yield put({
                type: 'queryCommentModalTwo',
            });
         }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
         }
     },

     //删除测评项目
     *'deleteCommentModalTwo'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(deleteCommentModalTwo, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'queryCommentModalTwo',
            });
            yield put({
                type: 'queryKeyListModalTwo',
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
     }
  },

  reducers: {
    //表格加载中
    showLoading(state) {
        return { ...state, loading: true };
    },
    closeLoading(state) {
        return { ...state, loading: false };
    },
    showFormLoading(state,action){
        return { ...state, ...action.payload, formLoading: true };
    },
    closeFormLoading(state,action){
        return { ...state, ...action.payload, formLoading: false };
    },
    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload, loading: false };
    },

    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list && state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    },

    //查询成功
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },

    //变更查询框是否展示
    changesearchVisible(state, action) {
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateList(state, action) {
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
    //点击新增弹出
    addModal(state, action){
        return { ...state, ...action.payload};
    },
  },

};
