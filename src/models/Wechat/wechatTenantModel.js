import {
    TenantList,
    TenantAdd,
    TenantUpdateState,
    TenantEdit,
    TenantUpdate,
} from '../../services/Wechat/WechatTenant';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';


export default {

  namespace: 'wechatTenantModel',

  state: {
       /*table*/
        tenantPageIndex : 0,        //页码
        tenantPageSize : 10,        //一页条数
        tenantLoading : false,      //列表加载状态
        tenantTotal : undefined,    //列表内容总条数
        tenantTableContent : [],    //列表内容

        /*search bar*/
        searchVisible : true,       //搜索栏是否显示
        searchContent : {},         //搜索栏搜索内容
        /*新增*/
        addOrEditTeanantVisible : false,            //新增编辑modal是否显示
        addOrEditSupModalButtonLoading : false,         //新增编辑modal按钮是否在加载状态
        checkOrEditSupDetailMsg : {}                    //新增编辑信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sys_wechat_tenant') {
            dispatch({
                 type:'TenantList',
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
      /*租户列表*/
       *'TenantList'({ payload },{ put , call , select }){
            yield put({ type:'tenantShowLoading' });
            const { ret,err } = yield call(TenantList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        tenantTableContent:ret.results,
                        tenantTotal:ret.data.resultCount,
                        tenantPageIndex : ret.data.pageIndex || 0,
                        tenantPageSize : ret.data.pageSize || 10,
                        searchContent : payload
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'tenantCloseLoading' });
        },

        /*新增*/
        *'TenantAdd'({ payload },{ put , call , select }){
            yield put({ type:'tenantShowLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            let wechatTenantModel = yield select(state => state.wechatTenantModel);
            let pageIndex = wechatTenantModel.tenantPageIndex;
            let pageSize = wechatTenantModel.tenantPageSize;
            let searchContent = wechatTenantModel.searchContent;
            let params = { pageIndex , pageSize , ...searchContent };
            let { ret } = yield call(TenantAdd,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('新增成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditTeanantVisible : false,
                        checkOrEditSupDetailMsg : {}
                    }
                });
                yield put({
                    type:'TenantList',
                    payload:{
                        ...params
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'tenantCloseLoading' , payload : { addOrEditSupModalButtonLoading : false }});
        },

        /*查询单个信息*/
        *'TenantEdit'({payload},{put , call , select}){
            yield put({ type:'tenantShowLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            const { ret,err} = yield call(TenantEdit,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        checkOrEditSupDetailMsg : ret.data,
                        addOrEditTeanantVisible:true,
                    }
                })
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
			yield put({type:'tenantCloseLoading'});
        },
        /*更新编辑*/
        *'TenantUpdate'({payload},{put , call , select}){
            yield put({ type:'tenantShowLoading' });
            const { ret,err} = yield call(TenantUpdate,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        checkOrEditSupDetailMsg : {},
                        addOrEditTeanantVisible:false,
                    }
                })
                yield put({
                    type:'TenantList',
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
			yield put({ type:'tenantCloseLoading' });
        },
        /*修改状态*/
        *'TenantUpdateState'({ payload } , { put , call , select }){
                yield put({type:'tenantShowLoading'});
                let { ret } = yield call(TenantUpdateState,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'TenantList',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'tenantCloseLoading'});
            },

  },

  reducers: {
       //加载状态
        tenantShowLoading(state, action) {
            return { ...state, ...action.payload, tenantLoading:true };
        },
        //广告列表取消加载
        tenantCloseLoading(state, action) {
            return { ...state, ...action.payload, tenantLoading:false };
        },

        //更新查询框的频道列表
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
  },
};
