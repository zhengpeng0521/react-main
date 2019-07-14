import {
    GetTenantType,          /*获取机构类型*/
    QueryTenantList,        /*搜索租户列表数据*/
    QueryTenantOrg,         /*查看租户下所有的机构*/
    TenantAddHq,            /*租户下新增总部机构*/
    TenantAddOrg,           /*租户下新增普通机构*/
    TenantEditHqOrOrg,      /*租户下编辑总部或者普通机构*/
    TenantAddTet,           /*新增租户*/
    EditTenantSubmit,       /*编辑租户*/
    TenantEditTet,          /*编辑租户名称*/
    GetOrgDetail            /*点击编辑机构获取机构详情*/
} from '../../services/OrganBusiness/tenantMessage';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//用户管理
export default {

    namespace: 'tenantMessage',

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

        /*check org modal*/
        tenantId : undefined,       //租户ID，用于显示在模态框名称处
        modalVisible : false,       //查看机构modal是否显示
        orgPageIndex : 0,           //页码
        orgPageSize : 10,           //一页条数
        orgLoading : false,         //列表加载状态
        orgTotal : undefined,       //列表内容总条数
        modalContent : [],          //模态框中选中租户下的机构数据
        addOrEditModal : 'add',      //新增编辑机构 'add'/'edit'
        /*新增校区*/
        addOrEditOrgModalType : undefined,          //新增编辑校区modal类型(总部hq/机构org)
        addOrEditOrgModalVisible : false,           //新增编辑校区modal是否显示
        addOrEditOrgModalButtonLoading : false,     //新增编辑校区modal按钮是否在加载状态
        checkOrEditOrgDetailMsg :{},                      //新增编辑机构信息

        /*新增租户*/
        addOrEditTetModalVisible : false,           //新增编辑租户modal是否显示
        addOrEditTetModalButtonLoading : false,     //新增编辑租户modal按钮是否在加载状态

        /*编辑租户名称*/
        checkOrEditTetModalVisible : false,           //新增编辑租户modal是否显示
        checkOrEditTetModalButtonLoading : false,     //新增编辑租户modal按钮是否在加
        checkOrEditTetDetailMsg :{},                  //新增编辑租户信息
        checkTenantTypeDetailMsg :[]                  //学校类型
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/tenant_message') {
                    /*搜索租户列表数据*/
                    dispatch({
                        type:'QueryTenantList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 10,
                            init : true
                        }
                    });

                    /*获取机构类型*/
                    dispatch({
                        type:'GetTenantType',
                    });
                }
            });
        },
    },

    effects: {
        /*获取机构类型*/
        *'GetTenantType'({ payload },{ put , call , select }){
            const { ret,err } = yield call(GetTenantType,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        checkTenantTypeDetailMsg:ret.results,
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
        },

        /*搜索租户列表数据*/
        *'QueryTenantList'({ payload },{ put , call , select }){
            yield put({ type:'tenantTableShowLoading' });
            let { ret,err } = yield call(QueryTenantList,parse(payload));
            let searchContent = payload && !!payload.init ? {} : payload && payload.searchContent ? payload.searchContent : {};
            if(payload && payload.searchContent){ delete payload.searchContent; };
            let params = { ...payload , ...searchContent };
            let res = yield call(QueryTenantList,parse(params));
            if( !!res && res.ret && res.ret.errorCode === 9000 ){
                let { ret } = res;
                yield put({
                    type:'updateState',
                    payload:{
                        tenantTableContent : ret.results || [],
                        tenantTotal : ret.data && ret.data.resultCount || 0,
                        tenantPageIndex : ret.data && ret.data.pageIndex || 0,
                        tenantPageSize : ret.data && ret.data.pageSize || 10,
                        searchContent
                    }
                });
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'tenantTableCloseLoading' });
        },

        /*查看租户下所有的机构*/
        *'QueryTenantOrg'({ payload },{ put , call , select }){
            yield put({ type:'tenantTableShowLoading' });
            yield put({ type:'orgTableShowLoading' });
            const { ret,err } = yield call(QueryTenantOrg,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        modalVisible : true,
                        tenantId : payload.id,
                        modalContent : ret.results || [],
                        orgTotal : (ret.results).length || 0,
                    }
                });
                yield put({ type:'orgTableCloseLoading' });
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
                yield put({
                    type:'updateState',
                    payload:{
                        modalVisible : false,
                    }
                });
            }
            yield put({ type:'tenantTableCloseLoading' });
        },

        /*新增机构*/
        *'TenantAddOrEditOrg'({ payload },{ put , call , select }){
            yield put({ type:'tenantTableShowLoading' , payload : { addOrEditOrgModalButtonLoading : true }});
            let tenantMessage = yield select(state => state.tenantMessage);
            let pageIndex = tenantMessage.tenantPageIndex;
            let pageSize = tenantMessage.tenantPageSize;
            let searchContent = tenantMessage.searchContent;
            let params = { pageIndex , pageSize , ...searchContent };
            let addOrEditOrgModalType = tenantMessage.addOrEditOrgModalType;
            let res = {};
            if(payload && !isNaN(payload.orgId + '')){      //编辑
                res = yield call(TenantEditHqOrOrg,parse(payload))
            }else{
                if(addOrEditOrgModalType == 'hq'){          //新增总部
                    res = yield call(TenantAddHq,parse(payload));
                }else{                                      //新增普通机构
                    res = yield call(TenantAddOrg,parse(payload));
                }
            }
            if(!!res && res.ret && res.ret.errorCode === 9000 ){
                message.success('操作成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditOrgModalVisible : false,
                        checkOrEditOrgDetailMsg : {}
                    }
                });
                yield put({
                    type:'QueryTenantList',
                    payload:params
                });
                yield put({
                    type:'QueryTenantOrg',
                    payload:{
                        id : payload.tenantId
                    }
                });
            }else{
                message.error(!!res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '操作失败');
            }
            yield put({ type:'tenantTableCloseLoading' , payload : { addOrEditOrgModalButtonLoading : false }});
        },

        /*点击编辑机构获取机构详情*/
        *'GetOrgDetail'({payload},{call, put , select }){
            yield put({ type : 'tenantTableShowLoading' });
            const { ret,err} = yield call(GetOrgDetail,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        checkOrEditOrgDetailMsg:ret,
                        addOrEditOrgModalVisible:true,
                    }
                })
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取机构详情失败')
            }
            yield put({ type : 'tenantTableCloseLoading' });
        },

        /*新增租户*/
        *'TenantAddTet'({ payload },{ put , call , select }){
            yield put({ type:'updateState' , payload : { addOrEditTetModalButtonLoading : true }});
            let tenantMessage = yield select(state => state.tenantMessage);
            let pageIndex = tenantMessage.tenantPageIndex;
            let pageSize = tenantMessage.tenantPageSize;
            let searchContent = tenantMessage.searchContent;
            let params = { pageIndex , pageSize , ...searchContent };
            let { ret } = yield call(TenantAddTet,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('新增成功');
                yield put({
                    type:'updateState',
                    payload:{
                        addOrEditTetModalVisible : false,
                    }
                });
                yield put({
                    type : 'QueryTenantList',
                    payload : params
                })
            }else if( ret && ret.errorMessage ){
                message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查您的网络');
            }
            yield put({ type:'updateState' , payload : { addOrEditTetModalButtonLoading : false }});
        },

        /*编辑租户名称打开编辑表单获取租户名称*/
        *'openCheckTetModal'({payload},{put , call , select}){
            const { ret,err} = yield call(TenantEditTet,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        checkOrEditTetDetailMsg : ret.data,
                        checkOrEditTetModalVisible:true,
                    }
                })
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('失败')
            }
        },

        /*编辑租户名称提交*/
        *'editTenantSubmit'({ payload }, { call, put , select }){
            yield put({ type : 'showLoading' });
            const { ret,err } = yield call(EditTenantSubmit,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                let tenantMessage = yield select(state => state.tenantMessage);
                let pageIndex = tenantMessage.tenantPageIndex;
                let pageSize = tenantMessage.tenantPageSize;
                let searchContent = tenantMessage.searchContent;
                let params = { pageIndex , pageSize , ...searchContent };
                yield put({
                    type : 'updateState',
                    payload:{
                        checkOrEditTetModalVisible : false,
                        checkOrEditTetModalButtonLoading : false,
                    }
                });
                yield put({
                    type : 'QueryTenantList',
                    payload : params
                })
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({ type : 'closeLoading' });
        },
    },
    reducers: {
        //租户列表加载状态
        tenantTableShowLoading(state, action) {
            return { ...state, ...action.payload, tenantLoading:true };
        },
        //租户列表取消加载
        tenantTableCloseLoading(state, action) {
            return { ...state, ...action.payload, tenantLoading:false };
        },
        //机构列表加载状态
        orgTableShowLoading(state, action) {
            return { ...state, ...action.payload, orgLoading:true };
        },
        //机构列表取消加载
        orgTableCloseLoading(state, action) {
            return { ...state, ...action.payload, orgLoading:false };
        },
        //更新查询框的频道列表
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    }

};
