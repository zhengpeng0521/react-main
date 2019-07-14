import {
    QueryApplyUserList,                 //查询申请域名用户列表
    DomainNameExamineModalSubmit,       //域名审核表单提交
    DomainNameOpenModalSubmit           //域名开通表单提交
} from '../../services/domain-name-setting/DomainNameSetting';
import { parse } from 'qs';
import { message } from 'antd';

//域名设置
export default {

    namespace: 'domainNameSetting',

    state: {
        //列表
        pageIndex : 0,              //列表页码
        pageSize : 10,              //列表每页条数
        total : 0,                  //表格总条数
        dataSource : [],            //列表数据
        loading : false,            //列表加载状态

        //搜索栏
        searchVisible : true,       //搜索栏是否显示
        searchContent : {},         //查询条件

        //域名审核modal
        domainNameExamineModalVisible : false,          //表单是否显示
        domainNameExamineModalLoading : false,          //表单加载状态
        domainNameExamineModalButtonLoading : false,    //表单按钮加载状态
        domainNameExamineModalTenantId : undefined,     //表单审核的租户id
        domainNameExamineModalHostName : undefined,     //域名审核域名名称

        //域名开通modal
        domainNameOpenModalVisible : false,             //表单是否显示
        domainNameOpenModalLoading : false,             //表单加载状态
        domainNameOpenModalButtonLoading : false,       //表单按钮加载状态
        domainNameOpenModalTenantId : undefined,        //表单审核的租户id
        domainNameOpenModalHostName : undefined,        //域名开通域名名称
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/domain_name_setting') {
                    //查询申请域名用户列表
                    dispatch({
                        type: 'QueryApplyUserList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 10
                        }
                    });
                }
            });
        },
    },

    effects: {
        //查询申请域名用户列表
        *'QueryApplyUserList'({ payload }, { call, put, select }){
            yield put({ type: 'showTableLoading' });
            let searchContent = {};
            if(payload && payload.searchContent){
                searchContent = payload.searchContent;
                delete payload.searchContent;
            }
            let params = { ...payload , ...searchContent };
            let { ret } = yield call(QueryApplyUserList,parse(params));
            if (ret && ret.errorCode === 9000) {
               yield put({
                    type: 'updateState',
                    payload: {
                        pageIndex : ret.data.pageIndex,
                        pageSize : ret.data.pageSize,
                        total : ret.data.resultCount,
                        dataSource : ret.results,
                        searchContent,
                    },
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('查询申请域名用户列表失败');
            }
            yield put({ type : 'closeTableLoading' })
        },

        //域名审核表单提交
        *'DomainNameExamineModalSubmit'({ payload }, { call, put, select }){
            yield put({ type: 'showExamineModalAndButtonLoading' });
            let { ret } = yield call(DomainNameExamineModalSubmit,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success('域名审核成功')
                yield put({
                    type : 'updateState',
                    payload : {
                        domainNameExamineModalVisible : false,
                        domainNameExamineModalTenantId : undefined,     //表单审核的租户id
                        domainNameExamineModalHostName : undefined,     //域名审核域名名称
                    }
                })
                let domainNameSetting = yield select(state => state.domainNameSetting);
                let pageIndex = domainNameSetting.pageIndex;
                let pageSize = domainNameSetting.pageSize;
                let searchContent = domainNameSetting.searchContent;
                yield put({
                    type: 'QueryApplyUserList',
                    payload: {
                        pageIndex,
                        pageSize,
                        searchContent,
                    },
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('域名审核失败');
            }
            yield put({ type: 'closeExamineModalAndButtonLoading' });
        },

        //域名开通表单提交
        *'DomainNameOpenModalSubmit'({ payload }, { call, put, select }){
            yield put({ type: 'showOpenModalAndButtonLoading' });
            let { ret } = yield call(DomainNameOpenModalSubmit,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success('域名开通成功')
                yield put({
                    type : 'updateState',
                    payload : {
                        domainNameOpenModalVisible : false,             //表单是否显示
                        domainNameOpenModalTenantId : undefined,        //表单审核的租户id
                        domainNameOpenModalHostName : undefined,        //域名开通域名名称
                    }
                })
                let domainNameSetting = yield select(state => state.domainNameSetting);
                let pageIndex = domainNameSetting.pageIndex;
                let pageSize = domainNameSetting.pageSize;
                let searchContent = domainNameSetting.searchContent;
                yield put({
                    type: 'QueryApplyUserList',
                    payload: {
                        pageIndex,
                        pageSize,
                        searchContent,
                    },
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('域名开通失败');
            }
            yield put({ type: 'closeOpenModalAndButtonLoading' });
        },
    },

    reducers: {
        //表格加载中
        updateState(state,action) {
            return { ...state, ...action.payload };
        },
        showTableLoading(state,action) {
            return { ...state, loading : true };
        },
        closeTableLoading(state,action) {
            return { ...state, loading : false };
        },
        showExamineModalAndButtonLoading(state,action) {
            return { ...state, domainNameExamineModalLoading : true , domainNameExamineModalButtonLoading : true };
        },
        closeExamineModalAndButtonLoading(state,action) {
            return { ...state, domainNameExamineModalLoading : false , domainNameExamineModalButtonLoading : false };
        },
        showOpenModalAndButtonLoading(state,action) {
            return { ...state, domainNameOpenModalLoading : true , domainNameOpenModalButtonLoading : true };
        },
        closeOpenModalAndButtonLoading(state,action) {
            return { ...state, domainNameOpenModalLoading : false , domainNameOpenModalButtonLoading : false };
        },
        clearExamineModal(state,action){
            let obj = {
                domainNameExamineModalVisible : false,          //表单是否显示
                domainNameExamineModalLoading : false,          //表单加载状态
                domainNameExamineModalButtonLoading : false,    //表单按钮加载状态
                domainNameExamineModalTenantId : undefined,     //域名审核表单租户id
                domainNameExamineModalHostName :undefined,      //域名审核域名名称
            }
            return { ...state, ...obj };
        },
        clearOpenModal(state,action){
            let obj = {
                domainNameOpenModalVisible : false,             //表单是否显示
                domainNameOpenModalLoading : false,             //表单加载状态
                domainNameOpenModalButtonLoading : false,       //表单按钮加载状态
                domainNameOpenModalTenantId : undefined,        //表单审核的租户id
                domainNameOpenModalHostName : undefined,        //域名开通域名名称
            }
            return { ...state, ...obj };
        },
    },
};
