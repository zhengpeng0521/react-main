import { queryForSearchChannelList,queryForSearchTopicActivityList,queryTopicList,formCreateSubmit,formUpdateSubmit,ChangeStatus } from '../../services/Back-Deploy/topicActivity';
import { parse } from 'qs';
import { message } from 'antd';

//后台配置 帖子专题
export default {

  namespace: 'topicActivity',

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
    transData : [],      //穿梭框数据
    formVisible : false,    //表单窗口是否显示
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    searchChannelList : [], //可选择的频道列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/topic_activity') {
            dispatch({
                type: 'queryForSearchChannelList'
            });
            dispatch({
                type: 'queryForSearchTopicActivityList'
            });
        }
      });
    },
  },

  effects: {
    //频道接口
    *'queryForSearchChannelList'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(queryForSearchChannelList);
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

    //列表内容接口
    *'queryForSearchTopicActivityList'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        let topicActivity = yield select(state => state.topicActivity);
        let searchData = topicActivity.searchData || {};
        let pageIndex = topicActivity.pageIndex;
        let pageSize = topicActivity.pageSize;
        let params = { ...searchData, pageIndex, pageSize,...payload };
        let { ret,err } = yield call(queryForSearchTopicActivityList, parse(params));
        if (ret && ret.errorCode === 9000) {
            let array = [];
            for(let i=0;i<ret.results.length;i++){
                array.push(i);
            }
            for(let i=0;i<ret.results.length;i++){
               if(ret.results[i].content.length>30){
                   array[i] = ret.results[i].content.substr(0,30)+'......';
                   ret.results[i].shortIntro = array[i];
                   ret.results[i].thisLong = '1';
                   ret.results[i].expend = '展开全部';
                   ret.results[i].shrink = '收起';
               }else{
                   ret.results[i].shortIntro = ret.results[i].content;
                   ret.results[i].thisLong = '0';
               }
            }
            yield put({
              type: 'querySuccess',
              payload: {
                list: ret.results,
                total: ret.data.resultCount,
                pageIndex : ret.data.pageIndex,
                pageSize : ret.data.pageSize,
              },
            });
       }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
       }
    },

    //搜索
    *'queryTopicList'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let { ret,err } = yield call(queryTopicList, parse(payload));
        if (ret && ret.errorCode === 9000) {
            let array = [];
            for(let i=0;i<ret.results.length;i++){
                array.push(i);
            }
            for(let i=0;i<ret.results.length;i++){
               if(ret.results[i].content.length>30){
                   array[i] = ret.results[i].content.substr(0,30)+'......';
                   ret.results[i].shortIntro = array[i];
                   ret.results[i].thisLong = '1';
                   ret.results[i].expend = '展开全部';
                   ret.results[i].shrink = '收起';
               }else{
                   ret.results[i].shortIntro = ret.results[i].content;
                   ret.results[i].thisLong = '0';
               }
            }
            yield put({
              type: 'querySuccess',
              payload: {
                list: ret.results,
                total: ret.data.resultCount,
                pageIndex : ret.data.pageIndex,
                pageSize : ret.data.pageSize,
              },
            });
       }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
       }
    },

    //帖子新增
    *'formCreateSubmit'({ payload }, { call, put, select }){
        yield put({ type: 'showFormLoading' });
        let { ret,err } = yield call(formCreateSubmit, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({ type: 'closeFormLoading' });
            yield put({
                type: 'updateState',
                payload:{
                    formVisible:false,
                }
            });
            yield put({
                type: 'queryTopicList',
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({ type: 'closeFormLoading' });
        }

    },

    //帖子编辑
    *'formUpdateSubmit'({ payload }, { call, put, select }){
        yield put({ type: 'showFormLoading' });
        let { ret,err } = yield call(formUpdateSubmit, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload:{
                    formVisible:false,
                }
            });
            yield put({
                type: 'queryTopicList',
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
        yield put({ type: 'closeFormLoading' });
    },

    //帖子上下架
    *'ChangeStatus'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        let { ret,err } = yield call(ChangeStatus, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'queryTopicList',
            });
        }else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
        }
        yield put({ type: 'closeLoading' });
    },

  },

  reducers: {
    //表格加载中
    showLoading(state, action) {
      return { ...state,...action.payload,loading: true };
    },
    closeLoading(state, action) {
      return { ...state,...action.payload,loading: false };
    },
    showFormLoading(state, action){
      return { ...state, ...action.payload, formLoading: true };
    },
    closeFormLoading(state, action){
      return { ...state, ...action.payload, formLoading: false };
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
