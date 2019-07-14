import {
  queryForOrganMessage,
  checkIncludingModal,
  OrganMangeFreeze,
  freezeAfterOperation,
  getAllSaasPayment
} from "../../services/OrganBusiness/organMessage";
import { updateToSs } from "../../services/packageUpdate/packageUpdate";
import { parse } from "qs";
import { message } from "antd";
import qs from "qs";

//用户管理
export default {
  namespace: "packageUpdate",

  state: {
    loading: false, //列表加载状态
    list: [], //列表数据
    total: 0, //列表总条数
    pageIndex: 0, //列表当前页码
    pageSize: 10, //列表每页显示数量
    searchData: {}, //模糊查询数据
    searchVisible: true, //模糊查询是否显示
    checkModalVisible: false, //点击'包含模版'下内容是弹窗是否显示
    checkModalContent: [], //点击'包含模版'获取到的值
    checkModalNoDefaultExpandedKeys: [], //查看模板数量默认树状展示
    OrganMessageDetailVisible: false,
    OrganMessageDetailDateSource: [],
    type: "",
    selectedRowKeys: [], //选中项的key值
    selectedRows: [] //选中项的内容
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === "/package_update") {
          dispatch({
            type: "queryForOrganMessage",
            payload: {
              pageSize: 10,
              pageIndex: 0
            }
          });
        }
      });
    }
  },

  effects: {
    *queryForOrganMessage({ payload }, { put, call, select }) {
      yield put({ type: "tableShowLoading" });
      const { ret, err } = yield call(queryForOrganMessage, parse(payload));
      if (ret && ret.errorCode === 9000) {
        delete payload.pageIndex;
        delete payload.pageSize;
        yield put({
          type: "updateState",
          payload: {
            list: ret.results,
            total: ret.data.resultCount,
            pageIndex: ret.data.pageIndex || 0, //列表当前页码
            pageSize: ret.data.pageSize || 10, //列表每页显示数量
            searchData: payload
          }
        });
      } else if (ret && ret.errorMessage) {
        message.error(ret.errorMessage);
      } else {
        message.error("您的网络状况不佳，请检查您的网络");
      }
      yield put({ type: "tableCloseLoading" });
    },

    /*机构冻结*/
    *OrganMangeFreeze({ payload }, { put, call, select }) {
      yield put({ type: "showTableLoading" });
      let { ret } = yield call(OrganMangeFreeze, parse(payload));
      if (ret && ret.errorCode === 9000) {
        message.success(ret.errorMessage);
        yield put({
          type: "AfterFreezeQuery"
        });
      } else if (ret && ret.errorMessage) {
        message.error(ret.errorMessage);
      } else {
        message.error("您的网络状况不佳，请检查您的网络");
      }
      yield put({ type: "closeTableLoading" });
    },

    /*列表查看套餐包含模板*/
    *AfterOperationQuery({ payload }, { call, put, select }) {
      yield put({ type: "showLoading" });
      const { ret, err } = yield call(checkIncludingModal, parse(payload));
      if (ret && ret.errorCode === 9000) {
        let expandedKeys = [];
        for (let i in ret.results[0]) {
          expandedKeys.push(i);
        }
        yield put({
          type: "updateState",
          payload: {
            checkModalVisible: true,
            checkModalContent: ret.results[0],
            checkModalNoDefaultExpandedKeys: expandedKeys
          }
        });
      } else {
        ret && ret.errorMessage && message.error(ret.errorMessage);
      }
      yield put({ type: "closeLoading" });
    },

    /*冻结后的列表展示*/
    *AfterFreezeQuery({ payload }, { call, put, select }) {
      let packageUpdate = yield select(state => state.packageUpdate);
      let searchData = packageUpdate.searchData || {};
      let pageIndex = packageUpdate.pageIndex;
      let pageSize = packageUpdate.pageSize;
      let params = { pageIndex, pageSize, ...searchData };
      const { ret, err } = yield call(freezeAfterOperation, parse(params));
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: "updateState",
          payload: {
            list: ret.results,
            total: ret.data.resultCount,
            pageSize: ret.data.pageSize || 10, //每页展示条目数
            pageIndex: ret.data.pageIndex || 0 //页码
          }
        });
      } else {
        ret && ret.errorMessage && message.error(ret.errorMessage);
      }
    },
    /*获取套餐详情*/
    *getAllSaasPayment({ payload }, { call, put, select }) {
      const { ret, err } = yield call(getAllSaasPayment, parse(payload));
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: "updateState",
          payload: {
            OrganMessageDetailDateSource: ret.results
          }
        });
      } else {
        ret && ret.errorMessage && message.error(ret.errorMessage);
      }
    },
    /* 套餐升级 */
    *updateToSs({ payload }, { call, put, select }) {
      let packageUpdate = yield select(state => state.packageUpdate);
      const { ret, err } = yield call(updateToSs, parse(payload));
      if (ret && ret.errorCode === 9000) {
        yield put({
          type: "queryForOrganMessage",
          payload: {
            pageSize: 10,
            pageIndex: 0
          }
        });
        packageUpdate.selectedRowKeys = [];
        packageUpdate.selectedRows = [];
        ret && ret.errorMessage && message.success(ret.errorMessage);
      } else {
        ret && ret.errorMessage && message.error(ret.errorMessage);
      }
    }
  },
  reducers: {
    //列表加载状态
    tableShowLoading(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    //列表取消加载
    tableCloseLoading(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    //更新查询框的频道列表
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
