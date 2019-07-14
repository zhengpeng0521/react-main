
import { parse } from 'qs';
import { message } from 'antd';
import { settOperateQueryList, queryAppInfoList } from '../../../services/payment-center/ws-settlementReport/WsSettlementReportService'
export default {

    namespace: 'WsSettlementReportModel',

    state: {
        tableLoading : false,
        dataSource : [],        //表格数据
        isShowSearch : true,    //是否显示搜索框
        total : '',             //表格数据总量
        pageSize : 10,
        pageIndex : 0,
        searchContent : {},     //搜索对象
		appNameList : [],      //服务商信息下拉列表
		appId : '',           //服务商信息
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/ws_settlementReport') {
                    dispatch({
                        type : 'settOperateQueryList',
                        payload : {
                            pageIndex : 0,
                            pageSize : 10
                        }
                    });
					dispatch({
						type : 'queryAppInfoList',
					});
                }
            });
        },
    },

    effects: {
        *settOperateQueryList({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(settOperateQueryList, parse(params));
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
	   /*服务商下拉选择*/
	   *queryAppInfoList({ payload }, { call, put, select }) {
            let params = {};
            let { ret } = yield call(queryAppInfoList, parse(params));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'updateState',
                    payload : {
                        appNameList : ret.results,
                    }
                });
            } else {
                ret && message.error(ret.errorMessage || '查询出错啦');
            }
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
