
import { parse } from 'qs';
import { message } from 'antd';
import { walletAccountList , walletDetailList , exportAccount , } from '../../../services/payment-center/wallet-account/walletAccountService'
export default {

    namespace: 'walletModel',

    state: {
        tableLoading : false,
        dataSource : [],        //表格数据
        isShowDetails : false,  //弹出层是否显示
        dataSource1 : [],       //弹出表格数据
        isShowSearch : true,    //搜索框是否显示
        tenantName : '',
        mchId : '',
        pageSize : 10,
        pageIndex : 0,
        searchContent : {},          //搜索的数据
        total : '',             //列表总条数
        pageSize1 : 10,
        pageIndex1 : 0,
        total1 : '',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/wallet_account') {
                    dispatch({
                        type : 'getWalletAccountList',
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
        *getWalletAccountList({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(walletAccountList, parse(params));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'updateState',
                    payload : {
                        dataSource : ret.results,
                        total : ret.data.resultCount,
                        pageIndex : ret.data.pageIndex,
                        pageSize : ret.data.pageSize,
                        searchContent
                    }
                });
            } else {
            ret && message.error(ret.errorMessage || '查询出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
        },
        *getWalletDetailList({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let { ret } = yield call(walletDetailList, parse(payload));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type: 'updateState',
                    payload : {
                        isShowDetails : true,
                        dataSource1 : ret.results,
                        pageIndex1 : ret.data.pageIndex,
                        pageSize1 : ret.data.pageSize,
                        total1 : ret.data.resultCount,
                        mchId : payload.mchId
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
