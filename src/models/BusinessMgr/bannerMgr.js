import { create, updateHtmlDetail, formSubmit, query, getHtmldetail, detail,queryAreaAndTarget,queryForSearchChannelList } from '../../services/BusinessMgr/bannerMgr';
import { parse } from 'qs';
import { message } from 'antd';

//banner管理
export default {

  namespace: 'bannerMgr',

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
    formCreateVisible : false,    //表单窗口是否显示
    formUpdateVisible : false,
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    areasList : [], //可选择的地区列表
    targetList : [], //可选择的目标列表
    previewModalVisible : false,
    previewUrl : '',
    searchChannelList: '', //编辑是频道列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/banner_mgr') {
            dispatch({
                type: 'query'
            });
            dispatch({
                type: 'queryAreaAndTarget'
            });
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

        let bannerMgr = yield select(state => state.bannerMgr);
        let searchData = bannerMgr.searchData || {};
        let pageIndex = bannerMgr.pageIndex;
        let pageSize = bannerMgr.pageSize;

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
                formLoading : false,
              },
            });
          } else {
              ret && ret.errorMessage && message.error(ret.errorMessage);
          }
    },

    //获取频道列表
    *'queryForSearchChannelList'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { ret } = yield call(queryForSearchChannelList);
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: 'updateSearchChannelList',
          payload: {
            searchChannelList : ret.results
          },
        });
      }
    },

    //获取待选择的地区和目标列表
    *queryAreaAndTarget({ payload }, { call, put, select }) {

        /*
      let { ret } = yield call(queryAreaAndTarget, parse(payload));

        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'updateState',
              payload: {
                areasList : ret.data.areas, //可选择的地区列表
                targetList : ret.data.targets, //可选择的目标列表
              },
            });
          } else {
              ret && ret.errorMessage && message.error(ret.errorMessage);
          }*/
    },

    //设置获取banner的htmldetail
    *openHtmldetail({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      yield put({
            type: 'updateState',
            payload : {
                loading : false,
                previewModalVisible : true,
                previewUrl : `${BASE_URL}/business/getHtmldetail?id=${payload.id}`,
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
                formUpdateVisible : true,    //表单窗口是否显示
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

    //表单提交
    *'formSubmit'({ payload }, { call, put, select }){
        yield put({ type: 'showLoading' });
        const { ret,err } = yield call(formSubmit, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload : {
                    formLoading : false,
                    formUpdateVisible : false,
                    formCreateVisible : false,
                    formData : {},
                }
            });
            yield put({
                type: 'query'
            });
        } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
                type: 'querySuccess',
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
