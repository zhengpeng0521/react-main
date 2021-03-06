import { create, remove, update, query, queryForSearchChannelList,
        addEssence,clearCache,recommend,doUp,
        batchAddEssence,batchRecommend,batchCancelRecommend,batchDoUp,batchClearCache,batchDelete,addImgTextTopic,updateImgTextTopic,defaultList} from '../../services/TopicMgr/topicMgr';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//主题管理
export default {

  namespace: 'topicMgr',

  state: {
    loading : false,            //列表加载状态
    list : [],                  //列表数据
    selectedRowKeys : [],       //列表选中项
    selectedRows : [],          //列表选中项数据
    total : 0,                  //列表总条数
    pageIndex : 0,              //列表当前页码
    pageSize : 10,              //列表每页显示数量
    sortColName : '',           //列表排序字段
    sortColType : '',           //列表排序类型
    formLoading : false,        //表单按钮是否加载中
    formData : {},              //表单数据
    addFormVisible : false,     //新增表单窗口是否显示
    updateFormVisible : false,  //编辑表单窗口是否显示
    formType : 'create',        //表单类型 'create' / 'update'
    searchData : {},            //模糊查询数据
    searchVisible : true,       //模糊查询是否显示
    searchChannelList : [],     //可选择的频道列表
    previewModalVisible : false,
    previewUrl : 'http://www.baidu.com',
    imgUrl:'http://www.baidu.com',
    imgContents:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/topic_mgr') {
            dispatch({
                type: 'queryForSearchChannelList'
            });
            dispatch({
                type: 'defaultList'
            });
        }
      });
    },
  },

  effects: {

    *query({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        let topicMgr = yield select(state => state.topicMgr);
        let searchData = topicMgr.searchData || {};
        let pageIndex = topicMgr.pageIndex;
        let pageSize = topicMgr.pageSize;
        let channelId = searchData.channelId;
        let params = { searchData,pageIndex, pageSize,channelId,...payload };
        let { ret } = yield call(query, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'querySuccess',
              payload: {
                list: ret.results,
                total: ret.data.resultCount,
                pageIndex : ret.data.pageIndex,
                pageSize : ret.data.pageSize,
                imgUrl : ret.data.topicImgURL,
              },
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);

      }
    },

    //导出
    *'export'({ payload } , { call , put , select }){
        window.open(`${BASE_URL}/topic/topicExport?${qs.stringify({...payload})}`);
    },

    *'queryForSearchChannelList'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { ret } = yield call(queryForSearchChannelList);
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: 'updateState',
          payload: {
            searchChannelList : ret.results
          },
        });
      }else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
      }
    },

    *'defaultList'({ payload }, { call, put }){
      yield put({ type: 'showLoading' });
      const { ret } = yield call(defaultList);
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: ret.results,
            total: ret.data.resultCount,
            pageIndex : ret.data.pageIndex,
            pageSize : ret.data.pageSize,
            imgUrl : ret.data.topicImgURL,
          },
        });
      }else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
      }
    },

    *'addImgTextTopic'({ payload } , { call , put , select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(addImgTextTopic, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'query',
            });
        } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
        }
    },

    *'updateImgTextTopic'({ payload } , { call , put , select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(updateImgTextTopic, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'query',
            });
        } else {
            console.log('fail');
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
        }
    },

    *'delete'({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(remove, parse(payload));
      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //设置精华
    *addEssence({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(addEssence, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',

        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //批量设置精华
    *batchAddEssence({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(batchAddEssence, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
        yield put({
            type:'updateState',
            payload:{
                   selectedRowKeys : [],
                   selectedRows : [],
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //批量推荐
    *batchRecommend({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(batchRecommend, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
            type: 'query',
        });
        yield put({
            type:'updateState',
            payload:{
                   selectedRowKeys : [],
                   selectedRows : [],
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //批量置顶
    *batchDoUp({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(batchDoUp, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
        yield put({
            type:'updateState',
            payload:{
                   selectedRowKeys : [],
                   selectedRows : [],
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //批量清除缓存
    *batchClearCache({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(batchClearCache, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
        yield put({
            type:'updateState',
            payload:{
                   selectedRowKeys : [],
                   selectedRows : [],
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

     //批量删除
    *batchDelete({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(batchDelete, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
        yield put({
            type:'updateState',
            payload:{
                   selectedRowKeys : [],
                   selectedRows : [],
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //清除缓存
    *clearCache({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(clearCache, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //设置为推荐
    *recommend({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(recommend, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //设置为置顶
    *doUp({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(doUp, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
              type: 'query',
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },

    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },
  },

  reducers: {
    //表格加载中
    showLoading(state) {
      return { ...state, loading: true };
    },

    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload, loading: false };
    },

    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list.map(user => {
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
        return { ...state, searchVisible : !state.searchVisible };
    },

    //更新查询框的频道列表
    updateSearchChannelList(state, action) {
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
  },

};
