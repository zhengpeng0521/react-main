import { create, remove, update, query,
        addEssence,clearCache,recommend,doUp,
        batchAddEssence,batchRecommend,batchDoUp,batchClearCache,batchDelete,queryForList,queryUserByNickName,GoldShopListEdit } from '../../services/GoldBusiness/goldShop';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//金币商城
export default {

  namespace: 'goldShop',

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
    formVisible : false,    //表单窗口是否显示
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    DataNickName : [],     //自动完成窗口昵称数据
    DataUid : [],   //自动完成窗口昵称ID数据
    autoData : [],  //自动完成窗口所有数据
    searchChannelList : [], //可选择的频道列表
    previewModalVisible : false,
    previewUrl : 'http://www.baidu.com',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/gold_shop') {
            dispatch({
                type: 'queryForList'
            });
        }
      });
    },
  },

  effects: {

    *query({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        let goldShop = yield select(state => state.goldShop);
        let pageIndex = goldShop.pageIndex;
        let pageSize = goldShop.pageSize;
        let params = { pageIndex, pageSize,...payload };
        let { ret } = yield call(query , parse(params));//查询完成
        if (ret && ret.errorCode === 9000) {
            let array = [];
            for(let i=0;i<ret.results.length;i++){
                array.push(i);
            }
            for(let i=0;i<ret.results.length;i++){
               if(ret.results[i].orderDesc.length>20){
                   array[i] = ret.results[i].orderDesc.substr(0,20)+'......';
                   ret.results[i].shortIntro = array[i];
                   ret.results[i].thisLong = '1';
                   ret.results[i].expend = '展开全部';
                   ret.results[i].shrink = '收起';
               }else{
                   ret.results[i].shortIntro = ret.results[i].orderDesc;
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
                formLoading : false,
              },
            });
        } else {
              ret && ret.errorMessage && message.error(ret.errorMessage);
        }
    },

    *'queryForList'({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { ret } = yield call(queryForList);
      if (ret && ret.errorCode === 9000) {
        let array = [];
            for(let i=0;i<ret.results.length;i++){
                array.push(i);
            }
            for(let i=0;i<ret.results.length;i++){
               if(ret.results[i].orderDesc.length>20){
                   array[i] = ret.results[i].orderDesc.substr(0,20)+'......';
                   ret.results[i].shortIntro = array[i];
                   ret.results[i].thisLong = '1';
                   ret.results[i].expend = '展开全部';
                   ret.results[i].shrink = '收起';
               }else{
                   ret.results[i].shortIntro = ret.results[i].orderDesc;
                   ret.results[i].thisLong = '0';
               }
            }
        yield put({
          type: 'UpdateSearchUserList',
          payload:{
              list:ret.results,
              total: ret.data.resultCount,
              loading:false,
              formLoading : false,
          }
        });
      }
    },

    //导出
    *'export'({ payload } , { call , put , select }){
        window.open(`${BASE_URL}/goldShop/goldShopExport?${qs.stringify({...payload})}`);
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

    //用户昵称扩展搜索
    *'queryUserByNickName'({ payload }, { call, put, select }){
        let array1 = [];
        let array2 = [];
        const { ret,err } = yield call(queryUserByNickName, parse(payload));
        if (ret && ret.errorCode === 9000) {
            yield put({
                type: 'updateState',
                payload:{
                    DataNickName:array1,
                    DataUid:array2,
                    autoData:ret.results,
                }
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

    *'GoldShopListEdit'({ payload }, { select, call, put }){
        yield put({ type: 'showLoading' });
        const { ret,error } = yield call(GoldShopListEdit, parse(payload));
        if (ret && ret.errorCode === 9000) {
            message.success(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload:{
                  formVisible:false,
                },
            });
            yield put({
                type: 'query',
            });
        }else{
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
                type: 'querySuccess',
            });
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
