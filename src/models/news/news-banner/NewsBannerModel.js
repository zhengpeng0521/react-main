import { parse } from 'qs';
import { message } from 'antd';
import {
    viewpagerQuery ,   //列表
    viewpagerCreate,   //新增
    viewpagerDetail,   //详情
    viewpagerDelete,   //删除，上下架
} from '../../../services/news/NewsBannerService.js'
export default {

    namespace: 'NewsBannerModel',

    state: {
        dataSource      : [],
        pageSize        : 20,
        pageIndex       : 0,
        total           : '0',
        tableLoading    : false,
        addModelVisible : false,
        fromData        : {},
        addType         : 'add',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/news_banner') {
                    dispatch({
                       type : 'viewpagerQuery',
                       payload : {
                            pageIndex : 0,
                            pageSize : 20
                        }
                   });
                }
            });
        },
    },

    effects: {
        //列表
        *'viewpagerQuery'({ payload },{ put , call , select }){
            yield put({ type:'tableShowLoading' });
            const { ret } = yield call(viewpagerQuery,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        dataSource:ret.results,
                        total:ret.data.resultCount,
                        pageIndex : ret.data.pageIndex || 0,      //列表当前页码
                        pageSize : ret.data.pageSize || 20,       //列表每页显示数量
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'tableCloseLoading' });
        },
        //新增
        *'viewpagerCreate'({ payload },{ put , call , select }){
            let state = yield select(state => state.NewsBannerModel);
            payload.addType = state.addType;
            if(state.addType == 'edit'){
                payload.id = state.fromData.id
            }
            const { ret } = yield call(viewpagerCreate,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        addModelVisible : false,
                        fromData : {}
                    }
                })
                yield put({
                    type : "viewpagerQuery",
                    payload : {

                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //回显
        *'viewpagerDetail'({ payload },{ put , call , select }){
            const { ret } = yield call(viewpagerDetail,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : 'updateState',
                    payload : {
                        fromData : {
                            id : ret.id,
                            imgUrl : ret.imgUrl,
                            seq : ret.seq,
                            apply : ret.apply,
                            url : ret.url
                        }
                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },
        //删除，上下架
        *'viewpagerDelete'({ payload },{ put , call , select }){
            const { ret } = yield call(viewpagerDelete,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type : "viewpagerQuery",
                    payload : {

                    }
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
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
