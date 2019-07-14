import { create, remove, update, query, queryForSearchChannelList,addEssence,clearCache,recommend,doUp,formCreateSubmit,formUpdateSubmit,set,afterAddOrModify,searchQuery,ChangeStatus } from '../../services/BusinessMgr/ggMgr';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//广告管理
export default {

  namespace: 'ggMgr',

  state: {
    loading : false,        //列表加载状态
    List : [],           //外层列表数据
    list : [],           //里层列表数据
    selectedRowKeys : [],  //列表选中项
    selectedRows : [],     //列表选中项数据
    total : 0,          //列表总条数
    pageIndex : 0,      //列表当前页码
    pageSize : 10,       //列表每页显示数量
    sortColName : '',       //列表排序字段
    sortColType : '',       //列表排序类型
    formLoading : false,    //表单按钮是否加载中
    formData : {},       //表单数据
    formVisible : false,    //点击设置表单窗口是否显示
    addFormVisible:false,   //新增框显示
    innerFormVisible : false, //点击修改表单窗口是否显示
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    searchChannelList : [], //可选择的频道列表
    previewModalVisible : false,
    previewUrl : '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/gg_mgr') {
            dispatch({
                type: 'queryForSearchChannelList'
            });
        }
      });
    },
  },

  effects: {

    *'queryForSearchChannelList'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { ret } = yield call(queryForSearchChannelList);
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: 'updateState',
          payload: {
            List : ret.results,
            total: ret.data.resultCount,
            pageIndex : ret.data.pageIndex,
            pageSize : ret.data.pageSize,
            loading : false,
          },
        });
      }
    },

    /*分页查询*/
    *'query'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        let { ret } = yield call(query, parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'querySuccess',
                payload: {
                    List: ret.results,
                    total: ret.data.resultCount,
                    pageIndex : ret.data.pageIndex,
                    pageSize : ret.data.pageSize,
                },
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //搜索查询
    *'searchQuery'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        //let ggMgr = yield select(state => state.ggMgr);
        let { ret } = yield call(searchQuery, parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'querySuccess',
                payload: {
                    List: ret.results,
                    total: ret.data.resultCount,
                    pageIndex : ret.data.pageIndex,
                    pageSize : ret.data.pageSize,
                },
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    /*直接修改上下架*/
    *'ChangeStatus'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let { ret } = yield call(ChangeStatus, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'afterAddOrModify'
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    /*新增修改后查询*/
    *'afterAddOrModify'({ payload } , { call , put , select }){
        yield put({ type: 'showLoading' });
        let ggMgr = yield select(state => state.ggMgr);
        let pageIndex = ggMgr.pageIndex;
        let pageSize = ggMgr.pageSize;
        let params = { pageIndex,pageSize };
        let { ret,err } = yield call(afterAddOrModify, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'querySuccess',
                payload: {
                    List: ret.results,
                    total: ret.data.resultCount,
                    pageIndex : ret.data.pageIndex,
                    pageSize : ret.data.pageSize,
                },
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    //导出
    *'export'({ payload } , { call , put , select }){
        window.open(`${BASE_URL}/user/userPointFlowExport?${qs.stringify({...payload})}`);
    },

    *'set'({ payload } , { call , put , select } ){
        yield put({ type: 'showLoading' });
        let { ret,err } = yield call(set, parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'querySuccess',
              payload: {
                formData: ret.results,
                addFormVisible: true,
              },
            });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
      }

    },

    //设置获取banner的htmldetail
    *openHtmldetail({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      yield put({
            type: 'updateState',
            payload : {
                loading : false,
                previewModalVisible : true,
                previewUrl : `${BASE_URL}/adInfo/update?${qs.stringify({...payload})}`,
            }
        });
    },


    //打开编辑页面
    *openUpdate({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(detail, parse(payload));

      if (ret && ret.errorCode === 9000) {
        let banner = ret.data.banner;
        let imgurl = [{
            uid : -1,
            url : banner.imgurl
        }];
        banner.imgurl = imgurl;
        yield put({
            type: 'updateState',
            payload : {
                loading: false,
                formLoading : false,    //表单按钮是否加载中
                formData : banner,       //表单数据
                formVisible : true,    //表单窗口是否显示
                formType : 'update',       //表单类型 'create' / 'update'
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
              type: 'querySuccess',
          });
      }
    },

    //修改表单提交
    *'formUpdateSubmit'({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(formUpdateSubmit, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
         yield put({
            type: 'afterAddOrModify'
         });
         yield put({
            type : 'updateState',
            payload : {
                formLoading : false,
                innerFormVisible : false,
                addFormVisible : false,
            }
         });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
            type: 'updateState',
            payload : {
                formLoading : false,
            }
        });
      }
    },

    //新增表单提交
    *'formCreateSubmit'({ payload }, { call, put, select }){
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(formCreateSubmit, parse(payload));
      if (ret && ret.errorCode === 9000) {
         message.success(ret.errorMessage);
         yield put({
            type: 'afterAddOrModify'
         });
         yield put({
            type : 'updateState',
            payload : {
                formLoading : false,
                innerFormVisible : false,
                addFormVisible : false,
            }
         });
      }else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
            type: 'updateState',
            payload : {
                formLoading : false,
            }
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
        return { ...state, ...action.payload};
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
