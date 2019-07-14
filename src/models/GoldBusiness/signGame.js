import { create, remove, update, query, queryForSearchChannelList,addEssence,clearCache,recommend,doUp,formCreateSubmit,formUpdateSubmit } from '../../services/GoldBusiness/signGame';
import { parse } from 'qs';
import { message } from 'antd';

//签到游戏管理
export default {

  namespace: 'signGame',

  state: {
    loading : false,        //列表加载状态
    list : [],           //列表数据
    selectedRowKeys : [],  //列表选中项
    selectedRows : [],     //列表选中项数据
    total : 0,          //列表总条数
    pageIndex : 0,      //列表当前页码
    pageSize : 10,       //列表每页显示数量
    sortColName : '',       //列表排序字段
    sortColType : '',       //列表排序类型
    formLoading : false,    //表单按钮是否加载中
    formData : {},       //表单数据
    formVisibleEdit : false,  //表单窗口是否显示
    formVisibleAdd : false,   //表单窗口是否显示
    formVisibleGift : false,    //表单窗口是否显示
    formVisibleGiftInner : false, //表单窗口是否显示
    formVisibleOrder : false,    //表单窗口是否显示
    formVisibleOrderInner : false,  //表单窗口是否显示
    formType : 'create',       //表单类型 'create' / 'edit'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    searchChannelList : [], //可选择的频道列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sign_game_mgr') {
            dispatch({
                type: 'queryForSearchChannelList'
            });
        }
      });
    },
  },

  effects: {

    *query({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });

        let channelMgr = yield select(state => state.signGame);
        let searchData = channelMgr.searchData || {};
        let pageIndex = channelMgr.pageIndex;
        let pageSize = channelMgr.pageSize;

        let params = { ...searchData, pageIndex, pageSize,...payload };
        let { ret } = yield call(query, parse(params));
        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'querySuccess',
              payload: {
                list: ret.results,
                total: ret.data.resultCount,
                pageIndex : ret.data.pageIndex,
                pageSize : ret.data.pageSize,
              },
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
      }
    },

    *'queryForSearchChannelList'({ payload }, { call, put }) {
      /*yield put({ type: 'showLoading' });
      const { ret } = yield call(queryForSearchChannelList);

      if (ret && ret.errorCode === 9000) {
        yield put({
          type: 'updateSearchChannelList',
          payload: {
            list : ret.results,
            total: ret.data.resultCount,
            pageIndex : ret.data.pageIndex,
            pageSize : ret.data.pageSize,
            loading : false,
          },
        });
      }*/
    },

    //修改表单提交
    *'formUpdateSubmit'({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(formUpdateSubmit, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
            type: 'updateState',
            payload : {
                formLoading : false,
                formVisible : false,
            }
        });
        yield put({
            type: 'queryForSearchChannelList'
        });
        yield put({
            type: 'set',
            payload : {
                type : payload.type,
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
            type: 'queryForSearchChannelList'
         });
         yield put({
            type: 'updateState',
            payload : {
                formLoading : false,
                formVisible : false,
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
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateSearchChannelList(state, action) {
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
