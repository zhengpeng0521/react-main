import { create, updateHtmlDetail, createFormSubmit,updateFormSubmit, query,
            getHtmldetail, detail,queryGoods, trialActivityDetailList,
        balanceAccess, balanceReject, balanceSubmit,
    } from '../../services/GoldBusiness/applicableActivitiesMgr';
import { parse } from 'qs';
import { message,Alert } from 'antd';

//主题管理
export default {

  namespace: 'applicableActivitiesMgr',

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
    formUpdateVisible : false,
    imgVisible : false,
    imgContent : '',    //点击小图展示大图的url
    formType : 'create',       //表单类型 'create' / 'update'
    searchData : {},     //模糊查询数据
    searchVisible : true,  //模糊查询是否显示
    goodsList : [], //可选择的商品
    previewModalVisible : false,
    previewUrl : '',
    balanceTableLoading : false,
    balanceBtnLoading : false,
    balanceVisible : false,
    balanceDataList : [],
    balanceResultCount : '',
    balanceTrialActivityId : undefined,//结算试用活动参与用户
    balanceFilterUserNickname : undefined, //结算用户列表 过滤出的用户
    balancePageSize : 10,
    balancePageIndex : 0,
    imgUrl:'http://www.baidu.com',  //预览地址
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/applicable_activities_mgr') {
            dispatch({
                type: 'query'
            });
            dispatch({
                type: 'queryGoods'
            });
        }
      });
    },
  },

  effects: {

    *query({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });

        let bannerMgr = yield select(state => state.applicableActivitiesMgr);
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
                imgUrl : ret.data.trailImgURL,
              },
            });
          } else {
              ret && ret.errorMessage && message.error(ret.errorMessage);
          }
    },

    //获取待选择的地区和目标列表
    *queryGoods({ payload }, { call, put, select }) {

      let { ret } = yield call(queryGoods, parse(payload));

        if (ret && ret.errorCode === 9000) {
            yield put({
              type: 'updateState',
              payload: {
                goodsList : ret.results, //可选择的地区列表
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
                previewUrl : `${BASE_URL}/business/getHtmldetail?id=${payload.id}`,
            }
        });
    },

    //打开编辑页面
    *openUpdate({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' });
      const { ret,err } = yield call(detail, parse(payload));

      if (ret && ret.errorCode === 9000) {
        let detail = ret.data;
        let imgurl = [{
            uid : -1,
            url : detail.imgurl
        }];
        detail.imgurl = imgurl;
        yield put({
            type: 'updateState',
            payload : {
                loading: false,
                formLoading : false,    //表单按钮是否加载中
                formData : detail,       //表单数据
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

    //打开结算窗口
    *openBalance({ payload }, { call, put, select }) {
        yield put({
            type: 'updateState',
            payload : {
                balanceBtnLoading : false,
                balanceVisible : true,
                balanceTrialActivityId : payload.trialActivityId,
            }
        });
        yield put({
            type: 'queryTrialActivityDetails',
        });
    },

     //查询试用活动参与用户
    *queryTrialActivityDetails({ payload }, { call, put, select }) {
        let applicableActivitiesMgr = yield select(state => state.applicableActivitiesMgr);
        let trialActivityId = applicableActivitiesMgr.balanceTrialActivityId;
        let params = {...payload,trialActivityId};

        yield put({
            type: 'updateState',
            payload : {
                balanceTableLoading : true,
                balanceBtnLoading : true,
            },
        });

      const { ret,err } = yield call(trialActivityDetailList, parse(params));

      if (ret && ret.errorCode === 9000) {

        yield put({
            type: 'updateState',
            payload : {
                balanceTableLoading : false,
                balanceDataList : ret.results,
                balanceResultCount : ret.data.resultCount,
                balanceBtnLoading : false,
            }
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
          type: 'updateState',
          payload : {
              balanceTableLoading : false,
              balanceBtnLoading : false,
          },
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

    //新增提交
    *'createFormSubmit'({ payload }, { call, put, select }) {
        yield put({ type: 'showLoading' });
        yield put({
          type: 'updateState',
          payload : {
              formLoading : true,
          }
        });
      const { ret,err } = yield call(createFormSubmit, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
            type: 'updateState',
            payload : {
                formLoading : false,
                formUpdateVisible : false,
                formCreateVisible : false,
            }
        });
        yield put({
            type: 'query'
        });
        yield put({ type: 'closeLoading' });
      } else {
            ret && ret.errorMessage && message.error(ret.errorMessage);
            yield put({
                type: 'updateState',
                payload : {
                    formLoading : false,
                }
            });
            yield put({ type: 'closeLoading' });
      }
    },

    //编辑提交
    *'updateFormSubmit'({ payload }, { call, put, select }) {
        yield put({
          type: 'updateState',
          payload : {
              formLoading : true,
          }
        });
      const { ret,err } = yield call(updateFormSubmit, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
            type: 'updateState',
            payload : {
                formLoading : false,
                formUpdateVisible : false,
                formCreateVisible : false,
            }
        });
        yield put({
            type: 'query'
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

    //结算试用活动
    *balanceSubmit({ payload }, { call, put, select }) {
        yield put({
          type: 'updateState',
          payload : {
              balanceBtnLoading : true,
              balanceTableLoading : true,
          }
        });

      const { ret,err } = yield call(balanceSubmit, parse(payload));

      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
            type: 'updateState',
            payload : {
                balanceBtnLoading : false,
                balanceVisible : false,
                balanceTableLoading : false,
            }
        });
        yield put({
            type: 'query'
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
            type: 'updateState',
            payload : {
                balanceBtnLoading : false,
                balanceTableLoading : false
            }
        });
      }
    },

    //结算试用活动
    *balanceAccess({ payload }, { call, put, select }) {
        yield put({
          type: 'updateState',
          payload : {
              balanceBtnLoading : true,
              balanceTableLoading : true,
          }
        });

      const { ret,err } = yield call(balanceAccess, parse(payload));

      if (ret && ret.errorCode === 9000) {
        if('500'==ret.data.status){
            message.error(ret.data.message);
        }else{
            message.success(ret.errorMessage);
        }
        yield put({
            type: 'queryTrialActivityDetails'
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
            type: 'updateState',
            payload : {
                balanceBtnLoading : false,
                balanceTableLoading : false,
            }
        });
      }
    },

        //结算试用活动
    *balanceReject({ payload }, { call, put, select }) {
        yield put({
          type: 'updateState',
          payload : {
              balanceBtnLoading : true,
              balanceTableLoading : true,
          }
        });

      const { ret,err } = yield call(balanceReject, parse(payload));

      if (ret && ret.errorCode === 9000) {
        if('500'==ret.data.status){
            message.error(ret.data.message);
        }else{
            message.success(ret.errorMessage);
        }
        yield put({
            type: 'queryTrialActivityDetails'
        });
      } else {
          ret && ret.errorMessage && message.error(ret.errorMessage);
          yield put({
            type: 'updateState',
            payload : {
                balanceBtnLoading : false,
                balanceTableLoading : false,
            }
        });
      }
    },
  },

  reducers: {
    //表格加载中
    showLoading(state) {
      return { ...state, loading: true };
    },
    closeLoading(state) {
      return { ...state, loading: false };
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
