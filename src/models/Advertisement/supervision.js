import {
    SupervisionList,
    SupervisionAdd,
    SupervisionUpdateState,
    SupervisionEdit,
} from '../../services/Advertisement/Supervision';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//后台配置 帖子专题
export default {

  namespace: 'supervisionMessage',

  state: {
       /*table*/
        supervisionPageIndex : 0,        //页码
        supervisionPageSize : 10,        //一页条数
        supervisionLoading : false,      //列表加载状态
        supervisionTotal : undefined,    //列表内容总条数
        supervisionTableContent : [],    //列表内容

        /*search bar*/
        searchVisible : true,       //搜索栏是否显示
        searchContent : {},         //搜索栏搜索内容
        /*新增广告*/
        addOrEditSupervisionVisible : false,            //新增编辑广告modal是否显示
        addOrEditSupModalButtonLoading : false,         //新增编辑广告modal按钮是否在加载状态
        checkOrEditSupDetailMsg : {}                    //新增编辑广告信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/supervision_advertising') {
            dispatch({
                 type:'SupervisionList',
                 payload:{
                     pageIndex : 0,
                     pageSize : 10,
                    }
            })
        }
      });
    },
  },

  effects: {
      /*广告列表*/
       *'SupervisionList'({ payload },{ put , call , select }){

            yield put({ type:'supervisionTableShowLoading' });
            const { ret,err } = yield call(SupervisionList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        supervisionTableContent:ret.results,
                        supervisionTotal:ret.data.resultCount,
                        supervisionPageIndex : ret.data.pageIndex || 0,
                        supervisionPageSize : ret.data.pageSize || 10,
                        searchContent : payload
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'supervisionTableCloseLoading' });
        },

        /*新增广告*/
        *'SupervisionAdd'({ payload },{ put , call , select }){
            yield put({ type:'supervisionTableShowLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            let supervisionMessage = yield select(state => state.supervisionMessage);
            let pageIndex = supervisionMessage.supervisionPageIndex;
            let pageSize = supervisionMessage.supervisionPageSize;
            let searchContent = supervisionMessage.searchContent;
            let params = { pageIndex , pageSize , ...searchContent };
            let { ret } = yield call(SupervisionAdd,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('新增成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditSupervisionVisible : false,
                        checkOrEditSupDetailMsg : {}
                    }
                });
                yield put({
                    type:'SupervisionList',
                    payload:{
                        ...params
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'supervisionTableCloseLoading' , payload : { addOrEditSupModalButtonLoading : false }});
        },

        /*编辑广告*/
        *'SupervisionEdit'({payload},{put , call , select}){
            yield put({ type:'supervisionTableShowLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            const { ret,err} = yield call(SupervisionEdit,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        checkOrEditSupDetailMsg : ret,
                        addOrEditSupervisionVisible:true,
                    }
                })
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
        },
        /*修改广告状态*/
        *'SupervisionUpdateState'({ payload } , { put , call , select }){
                yield put({type:'supervisionTableShowLoading'});
                let { ret } = yield call(SupervisionUpdateState,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'SupervisionList',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'supervisionTableCloseLoading'});
            },

  },

  reducers: {
       //广告列表加载状态
        supervisionTableShowLoading(state, action) {
            return { ...state, ...action.payload, tenantLoading:true };
        },
        //广告列表取消加载
        supervisionTableCloseLoading(state, action) {
            return { ...state, ...action.payload, tenantLoading:false };
        },

        //更新查询框的频道列表
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
  },
};
