import { parse } from 'qs';
import { message } from 'antd';
import {
    newReportQuery,     //列表
    newReportDelete,    //上下架删除
    newReportCreate,    //新增
    newReportDetail,    //回显
} from '../../../services/news/NewsService'
export default {

    namespace: 'news_inModel',

    state: {
        dataSource : [],
        total : '',
        pageIndex : 0,
        pageSize : 20,
        tableLoading : false,
        newsAddVisible : false,
        addType : 'add',
        attrHTMLValue : undefined,
        fromData : {},
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/news_in') {
                    dispatch({
                       type : 'newReportQuery',
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
        //列表
        *'newReportQuery'({ payload },{ put , call , select }){
            yield put({ type:'tableShowLoading' });
            const { ret } = yield call(newReportQuery,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        dataSource:ret.results,
                        total:ret.data.resultCount,
                        pageIndex : ret.data.pageIndex || 0,      //列表当前页码
                        pageSize : ret.data.pageSize || 10,       //列表每页显示数量
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'tableCloseLoading' });
        },
        //删除，上下架
        *'newReportDelete'({ payload },{ put , call , select }){
            const { ret } = yield call(newReportDelete,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : "newReportQuery",
                    payload : {
                        pageIndex : 0,
                        pageSize : 10
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //新增
        *'newReportCreate'({ payload },{ put , call , select }){
            let state = yield select(state => state.news_inModel);
            payload.addType = state.addType;
            if(state.addType == 'edit'){
                payload.id = state.fromData.id
            }
            const { ret } = yield call(newReportCreate,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        newsAddVisible : false,
                        fromData : {},
                        attrHTMLValue : undefined
                    }
                })
                yield put({
                    type : "newReportQuery",
                    payload : {
                        pageIndex : 0,
                        pageSize : 10
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //回显
        *'newReportDetail'({ payload },{ put , call , select }){
            const { ret } = yield call(newReportDetail,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        fromData : {
                            title : ret.title,
                            context : ret.context,
                            imgUrl : ret.imgUrl,
                            summery : ret.summery,
                            classify : ret.classify,
                            apply : ret.apply,
                            id : ret.id
                        }
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        }

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
