import {
    GetTableList,
    ExamineModalSubmit
} from '../../services/brand-manage/BrandManage';
import { parse } from 'qs';
import { message } from 'antd';

//总部品牌管理
export default {

    namespace: 'brandManage',

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
        /*审核modal*/
        examineModalVisible : false,        //modal是否显示
        examineModalLoading : false,        //modal加载状态和按钮加载状态
        examineModalData : {},              //点击审核获取当前选项的信息duixiang
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/brand_manage') {
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
            let brandManage = yield select(state => state.brandManage);
            //如果参数中有搜索内容则使用；如果是初始进入，则初始化搜索内容；如果没有搜索内容也不是第一次进入，则使用state中的搜索内容
            let searchContent = payload && payload.searchContent ? payload.searchContent : payload && !!payload.init ? {} : brandManage.searchContent;
            let commonSearchContent = {
                pageIndex : payload && !isNaN(payload.pageIndex + '') ? payload.pageIndex : payload && !!payload.init ? 0 : brandManage.tablePageIndex,
                pageSize : payload && !isNaN(payload.pageSize + '') ? payload.pageSize : payload && !!payload.init ? 10 : brandManage.tablePageSize
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
                message.error('获取品牌列表失败')
            }
            yield put({ type : 'updateState' , payload : { tableLoading : false } })
        },

        //品牌审核(3通过/4驳回)
        *'ExamineModalSubmit'({ payload } , { call , select , put }){
            yield put({ type : 'updateState' , payload : { examineModalLoading : true } });
            let res = yield call(ExamineModalSubmit,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                message.success('操作成功');
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        examineModalVisible : false,        //modal是否显示
                        examineModalData : {},              //点击审核获取当前选项的信息duixiang
                    }
                })
                yield put({
                    type : 'GetTableList'
                })
            }else{
                message.error('品牌审核失败')
            }
            yield put({ type : 'updateState' , payload : { examineModalLoading : false } })
        },
    },

    reducers: {
        //更新state
        updateState(state , action) {
            return { ...state, ...action.payload };
        },
    },
};
