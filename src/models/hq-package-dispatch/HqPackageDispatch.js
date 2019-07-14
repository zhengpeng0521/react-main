import {
    GetTableList,
    OpenLeftPackageModal,       //点击剩余套餐
    CheckRecord,                //查看分配记录
    ClickDispatch,              //点击分配套餐查看套餐列表
    PackageModalSubmit          //套餐点击分配
} from '../../services/hq-package-dispatch/HqPackageDispatch';
import { parse } from 'qs';
import { message } from 'antd';
import qs from 'qs';

//金币管理
export default {

    namespace: 'hqPackageDispatch',

    state: {
        /*搜索栏*/
        searchVisible : true,               //搜索栏显隐
        searchContent : {},                 //搜索内容
        /*列表*/
        tablePageIndex : 0,                 //页码
        tablePageSize : 10,                 //每页条数
        tableDataSource : [],               //列表数据
        tableTotal : 0,                     //列表条数
        tableLoading : false,               //加载状态
        /*套餐modal*/
        baseInformationData : {},           //基本信息数据(套餐分配提交时需要基本信息中该校区的tenantId和orgId)
        currentUserMsg : {},                //选中项当前租户的信息
        packageModalVisible : false,        //是否显示
        packageModalType : undefined,       //表单类型(查看剩余checkLeft/查看记录checkRec/编辑edit)
        packageModalLoading : false,        //表单加载
        packageModalButtonLoading : false,  //表单按钮加载
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/hq_package_dispatch') {
                    dispatch({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : 0,
                            pageSize : 10,
                            init : true
                        }
                    })
                }
            });
        },
    },

    effects: {
        //查询列表数据
        *'GetTableList'({ payload } , { call , select , put }){
            yield put({ type : 'updateState' , payload : { tableLoading : true } });
            let hqPackageDispatch = yield select(state => state.hqPackageDispatch);
            //如果参数中有搜索内容则使用；如果是初始进入，则初始化搜索内容；如果没有搜索内容也不是第一次进入，则使用state中的搜索内容
            let searchContent = payload && payload.searchContent ? payload.searchContent : payload && !!payload.init ? {} : hqPackageDispatch.searchContent;
            let commonSearchContent = {
                pageIndex : payload && !isNaN(payload.pageIndex + '') ? payload.pageIndex : payload && !!payload.init ? 0 : hqPackageDispatch.tablePageIndex,
                pageSize : payload && !isNaN(payload.pageSize + '') ? payload.pageSize : payload && !!payload.init ? 10 : hqPackageDispatch.tablePageSize
            }
            if(payload && payload.searchContent){ delete payload.searchContent; }
            if(payload && payload.init){ delete payload.init; } /*payload中的init只会在刚进入页面时附加并且只能为true,所以再次不需要判断init为false的情况*/
            let params = { ...payload , ...commonSearchContent , ...searchContent };
            let res = yield call(GetTableList,parse(params));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        tablePageIndex : ret.data && ret.data.pageIndex || 0,
                        tablePageSize : ret.data && ret.data.pageSize || 10,
                        tableDataSource : ret.results || [],
                        tableTotal : ret.data && ret.data.resultCount || 0,
                        searchContent
                    }
                })
            }else{
                message.error('获取总部套餐列表失败')
            }
            yield put({ type : 'updateState' , payload : { tableLoading : false } })
        },

        //点击剩余套餐
        *'OpenLeftPackageModal'({ payload } , { call , select , put }){
            yield put({ type : 'updateState' , payload : { packageModalLoading : true , packageModalVisible : true } });
            let type = payload && payload.type || undefined;
            if(payload && payload.type){ delete payload.type; }
            let res = yield call(OpenLeftPackageModal,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        packageModalType : type,
                        baseInformationData : ret.results || []
                    }
                })
            }else{
                message.error('获取剩余套餐失败');
                yield put({ type : 'updateState' , payload : { packageModalVisible : false } })
            }
            yield put({ type : 'updateState' , payload : { packageModalLoading : false } });
        },

        //查看分配记录
        *'CheckRecord'({ payload } , { call , select , put }){
            yield put({ type : 'updateState' , payload : { packageModalLoading : true , packageModalVisible : true } });
            let type = payload && payload.type || undefined;
            if(payload && payload.type){ delete payload.type; }
            let res = yield call(CheckRecord,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        packageModalType : type,
                        baseInformationData : ret.results || []
                    }
                })
            }else{
                message.error('获取分配记录失败');
                yield put({ type : 'updateState' , payload : { packageModalVisible : false } })
            }
            yield put({ type : 'updateState' , payload : { packageModalLoading : false } });
        },

        //点击分配套餐
        *'ClickDispatch'({ payload } , { call , select , put }){
            yield put({ type : 'updateState' , payload : { packageModalLoading : true , packageModalVisible : true } });
            let type = payload && payload.type || undefined;
            if(payload && payload.type){ delete payload.type; }
            let res = yield call(ClickDispatch,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        packageModalType : type,
                        baseInformationData : ret.results || [],
                        currentUserMsg : { orgId : payload.orgId , tenantId : payload.tenantId }
                    }
                })
            }else{
                message.error('获取套餐失败');
                yield put({ type : 'updateState' , payload : { packageModalVisible : false } })
            }
            yield put({ type : 'updateState' , payload : { packageModalLoading : false } });
        },

        //分配套餐提交
        *'PackageModalSubmit'({ payload } , { call , select , put }){
            yield put({ type : 'updateState' , payload : { packageModalLoading : true , packageModalButtonLoading : true } });
            let res = yield call(PackageModalSubmit,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        baseInformationData : {},           //基本信息数据(套餐分配提交时需要基本信息中该校区的tenantId和orgId)
                        currentUserMsg : {},                //选中项当前租户的信息
                        packageModalVisible : false,        //是否显示
                        packageModalType : undefined,       //表单类型(查看剩余checkLeft/查看记录checkRec/编辑edit)
                    }
                });
                yield put({
                    type : 'GetTableList'
                })
            }else{
                message.error('分配套餐失败');
            }
            yield put({ type : 'updateState' , payload : { packageModalLoading : false , packageModalButtonLoading : false } });
        },
    },

    reducers: {
        //更新状态
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
