import { parse } from 'qs';
import { message } from 'antd';
import { queryPromoterList } from '../../../services/payment-center/transactionStatisticsReport/TransactionStatisticsReportService'
export default {

    namespace: 'transactionStatisticsReportModel',

    state: {
        tableLoading : false,
        dataSource : [],        //表格数据
        isShowSearch : true,    //是否显示搜索框
        total : '',             //表格数据总量
        pageSize : 10,
        pageIndex : 0,
        searchContent : {},     //搜索对象
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/transactionStatisticsReport') {
                    dispatch({
                       type : 'queryPromoterList',
                       payload : {
                          pageIndex : 0,
                            pageSize : 10
                        }
                   });
                }
            });
        },
    },

    effects: {
        *queryPromoterList({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(queryPromoterList, parse(params));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'updateState',
                    payload : {
                        dataSource : ret.results,
                        total : ret.count,
                        pageIndex : payload.pageIndex,
                        pageSize : payload.pageSize,
                        searchContent
                    }
                });
            } else {
                ret && message.error(ret.errorMessage || '查询出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
      },
    },


    reducers: {
        updateState(state, action) {
            return { ...state , ...action.payload };
        },
        showTableLoading(state,action){
            return { ...state , tableLoading : true };
        },
        closeTableLoading(state,action){
            return { ...state , tableLoading : false };
        },
    },
};
