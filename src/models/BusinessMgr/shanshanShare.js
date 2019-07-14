import { queryList,SearchTopic,formSubmit } from '../../services/BusinessMgr/shanshanShare';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//用户管理
export default {

  namespace: 'shanshanShare',

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
    schoolType: [],       //学校类型
    formLoading : false,    //表单按钮是否加载中
    formData : {},       //表单数据
    newTopicData : {},    //查询后新的数据
    justify:'null',   //判断表单数据是之前还是查询之后的 'null'之前/'exist'之后
    formVisible : false,    //表单窗口是否显示
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    searchChannelList : [], //可选择的频道列表
    previewModalVisible : false,
    previewUrl : 'http://www.baidu.com',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/shanshan_share') {
            dispatch({
                type: 'queryList'
            });
        }
      });
    },
  },

  effects: {

    *'queryList'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        /*let shanshanShare = yield select(state => state.shanshanShare);
        let pageIndex = shanshanShare.pageIndex;
        let pageSize = shanshanShare.pageSize;
        let params = { pageIndex, pageSize,...payload };*/
        let { ret } = yield call(queryList);
        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'querySuccess',
              payload: {
                list: ret.results,
              },
            });
        } else {
              ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    *'SearchTopic'({ payload }, { call, put, select }){
        let { ret,err } = yield call(SearchTopic,parse(payload));
        if (ret && ret.errorCode === 9000) {
            if('500'==ret.data.status){
                message.error('帖子不存在');
            }else{
                yield put({
                    type: 'querySuccess',
                    payload: {
                        newTopicData: ret.data,
                        justify:'exist',
                    },
                });
            }
        } else {
              ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    *'formSubmit'({ payload }, { call, put, select }){
        yield put({
            type:'updateState',
            payload:{
                formLoading:true,
            }
        });
        let { ret,err } = yield call(formSubmit,parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
              type: 'querySuccess',
              payload: {
                newTopicData: {},
                formLoading:false,
                formVisible:false,
              },
            });
            yield put({type:'queryList'})
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

    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload,};
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
    UpdateSearchUserList(state, action) {
        return { ...state, ...action.payload };
    },

    //更新查询框的频道列表
    updateState(state, action) {
        return { ...state, ...action.payload };
    },
    //点击新增，编辑弹框，点击外围，取消，X，取消弹框
    addModal(state, action){ return { ...state, ...action.payload}; },
  },

};
