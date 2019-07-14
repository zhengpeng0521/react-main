import { showWeiXinActivityList,queryForWeiXinActivityList,
         weiXinActivityChangeStatus,weiXinActivityUpdate,weiXinActivityAfterOperation,

        showWeiXinAdminiList,queryForWeiXinAdminiList,
         weiXinAdminiChangeStatus,weiXinAdminiUpdate,weiXinAdminiAfterOperation,

         showWeiXinAppointList,queryForWeiXinAppointList,
         weiXinAppointChangeStatus,weiXinAppointUpdate,weiXinAppointAfterOperation,

         showWeiXinGameList,queryForWeiXinGameList,
		
		 queryForWeiXinOfflineLeafletsList, weiXinOfflineLeafletsAfterOperation, weiXinOfflineLeafletsChangeStatus, weiXinOfflineLeafletsUpdate,
		
         weiXinGameChangeStatus,weiXinGameUpdate,weiXinGameAfterOperation } from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';

//后台配置 帖子专题
export default {

    namespace: 'weiXinMarketingModelSet',

    state: {
        weiXinActivityLoading : false,      		//微信活动列表加载状态
        weiXinAdminiLoading : false,      		    //微信活动列表加载状态---------------------------------------
        weiXinAppointLoading : false,      		    //微信活动列表加载状态---------------------------------------
        weiXinGameLoading : false,          		//微信游戏列表加载状态
		weiXinOfflineLeafletsLoading : false, 		//微信线下传单列表加载状态

        weiXinActivityList : [],            		//微信活动列表数据
        weiXinAdminiList : [],            		    //微信活动列表数据--------------------------------------------
        weiXinAppointList : [],            		    //微信活动列表数据--------------------------------------------
        weiXinGameList : [],                		//微信游戏列表数据
		weiXinOfflineLeafletsList : [],				//微信线下传单列表数据
		
        weiXinActivityTotal : 0,            		//微信活动列表总条数
        weiXinAdminiTotal : 0,            		    //微信活动列表总条数---------------------------------------------
        weiXinAppointTotal : 0,            		    //微信活动列表总条数---------------------------------------------
        weiXinGameTotal : 0,                		//微信游戏列表总条数
		weiXinOfflineLeafletsTotal : 0,				//微信线下传单列表总条数
		
        weiXinActivityPageIndex : 0,         		//微信活动列表当前页码
        weiXinAdminiPageIndex : 0,          		//微信活动列表当前页码---------------------------------------
        weiXinAppointPageIndex : 0,          		//微信活动列表当前页码---------------------------------------
        weiXinActivityPageSize : 10,         		//微信活动列表每页显示数量
        weiXinAdminiPageSize : 10,         		    //微信活动列表每页显示数量-------------------------------------
        weiXinAppointPageSize : 10,         		    //微信活动列表每页显示数量-------------------------------------
        weiXinGamePageIndex : 0,             		//微信游戏列表当前页码
        weiXinGamePageSize : 10,             		//微信游戏列表每页显示数量
		weiXinOfflineLeafletsPageIndex : 0,         //微信线下传单列表当前页码
        weiXinOfflineLeafletsPageSize : 10,         //微信线下传单列表每页显示数量

        weiXinActivityFormLoading : false,   		//微信活动是否加载中
        weiXinAdminiFormLoading : false,   		    //微信活动是否加载中-------------------------------------------
        weiXinGameFormLoading : false,      		//微信游戏是否加载中
		weiXinOfflineLeafletsFormLoading : false, 	//微信线下传单表单数据
		
        weiXinActivityFormData : {},         		//微信活动表单数据
        weiXinAdminiFormData : {},         		    //微信活动表单数据---------------------------------------------
        weiXinAppointFormData : {},         		    //微信活动表单数据--------------------------------------------
        weiXinGameFormData : {},             		//微信游戏表单数据
		weiXinOfflineLeafletsFormData : {}, 		//微信线下传单表单数据
		
        weiXinActivityFormVisible : false,   		//微信活动表单窗口是否显示
        weiXinAdminiFormVisible : false,   		//微信活动表单窗口是否显示-------------------------------------
        weiXinAppointFormVisible : false,   		//微信活动表单窗口是否显示-------------------------------------
        weiXinGameFormVisible : false,       		//微信游戏是否显示
		weiXinOfflineLeafletsFormVisible : false,	//微信线下传单是否显示
		
        weiXinActivityFormType : 'create',   		//微信活动表单类型 'create' / 'update'
        weiXinAdminiFormType : 'create',   		//微信活动表单类型 'create' / 'update'----------------------------
        weiXinAppointFormType : 'create',   		//微信活动表单类型 'create' / 'update'----------------------------
        weiXinGameFormType : 'create',       		//微信游戏表单类型 'create' / 'update'
		weiXinOfflineLeafletsFormType : 'create', 	//微信线下传单表单类型 'create' / 'update'
		
        weiXinActivitySearchData : {},       		//微信活动模糊查询数据
        weiXinAdminiSearchData : {},       		//微信活动模糊查询数据--------------------------------------------
        weiXinAppointSearchData : {},       		//微信活动模糊查询数据--------------------------------------------
        weiXinGameSearchData : {},           		//微信游戏模糊查询数据
		weiXinOfflineLeafletsSearchData : {},		//微信线下传单模糊查询数据
		
        weiXinActivitySearchVisible : true,  		//微信活动模糊查询是否显示
        weiXinAdminiSearchVisible : true,  		//微信活动模糊查询是否显示------------------------------------------
        weiXinAppointSearchVisible : true,  		//微信活动模糊查询是否显示------------------------------------------
        weiXinGameSearchVisible : true,      		//微信游戏模糊查询是否显示
		weiXinOfflineLeafletsSearchVisible : true, 	//微信线下传单模糊查询是否显示

    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/saas_weixin_market_model_set') {
                    dispatch({
                        type: 'queryForWeiXinActivityList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 10,
                        }
                    });
                }
            });
        },
    },

    effects: {

        //微信活动条件和分页查询
        *'queryForWeiXinActivityList'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinActivityLoading:true,
                }
            });
            let categoryId = 1;
            let params = { ...payload, categoryId };
            const { ret,err } = yield call(queryForWeiXinActivityList,parse(params));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageSize;
                delete payload.pageIndex;
                delete payload.categoryId;
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinActivityList : ret.results,
                        weiXinActivityTotal : ret.data.resultCount,
                        weiXinActivityPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinActivityPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                        weiXinActivitySearchData : payload
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinActivityLoading:false,
                }
            });
        },

        //活动管理条件和分页查询------------------------------------------------------------------
        *'queryForWeiXinAdminiList'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAdminiLoading:true,
                }
            });
            let categoryId = 1;
            let params = { ...payload, categoryId };
            const { ret } = yield call(queryForWeiXinAdminiList,parse(params));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageSize;
                delete payload.pageIndex;
                delete payload.categoryId;
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinAdminiList : ret.results,
                        weiXinAdminiTotal : ret.data.resultCount,
                        weiXinAdminiPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinAdminiPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                        weiXinAdminiSearchData : payload
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAdminiLoading:false,
                }
            });
        },


        //预约试听条件和分页查询------------------------------------------------------------------
        *'queryForWeiXinAppointList'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAppointLoading:true,
                }
            });
            let categoryId = 1;
            let params = { ...payload, categoryId };
            const { ret } = yield call(queryForWeiXinAppointList,parse(params));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageSize;
                delete payload.pageIndex;
                delete payload.categoryId;
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinAppointList : ret.results,
                        weiXinAppointTotal : ret.data.resultCount,
                        weiXinAppointPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinAppointPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                        weiXinAppointSearchData : payload
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAppointLoading:false,
                }
            });
        },



        //微信游戏条件和分页查询
        *'queryForWeiXinGameList'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinGameLoading:true,
                }
            });
            let pmType = 1;
            let params = { ...payload, pmType };
            const { ret,err } = yield call(queryForWeiXinGameList,parse(params));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageSize;
                delete payload.pageIndex;
                delete payload.categoryId;
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinGameList : ret.results,
                        weiXinGameTotal : ret.data.resultCount,
                        weiXinGamePageIndex : ret.data.pageIndex || 0,               //微信游戏列表当前页码
                        weiXinGamePageSize : ret.data.pageSize || 10,                 //微信游戏列表每页显示数量
                        weiXinGameSearchData : payload
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinGameLoading:false,
                }
            });
        },
			
		//微信线下传单条件和分页查询
        *'queryForWeiXinOfflineLeafletsList'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinOfflineLeafletsLoading:true,
                }
            });
             let categoryId = 1;
            let params = { ...payload, categoryId };
            const { ret,err } = yield call(queryForWeiXinOfflineLeafletsList,parse(params));
            if (ret && ret.errorCode === 9000) {
                delete payload.pageSize;
                delete payload.pageIndex;
                delete payload.categoryId;
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinOfflineLeafletsList : ret.results,
                        weiXinOfflineLeafletsTotal : ret.data.resultCount,
                        weiXinOfflineLeafletsPageIndex : ret.data.pageIndex || 0,               //微信游戏列表当前页码
                        weiXinOfflineLeafletsPageSize : ret.data.pageSize || 10,                 //微信游戏列表每页显示数量
                        weiXinOfflineLeafletsSearchData : payload
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinOfflineLeafletsLoading:false,
                }
            });
        },

        //微信活动设置上下架
        *'weiXinActivityChangeStatus'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinActivityLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinActivityChangeStatus,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'weiXinActivityAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinActivityLoading:false,
                }
            });
        },

        //活动管理设置上下架--------------------------------------------------------------------------------
        *'weiXinAdminiChangeStatus'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAdminiLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinAdminiChangeStatus,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'weiXinAdminiAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAdminiLoading:false,
                }
            });
        },


         //预约试听设置上下架--------------------------------------------------------------------------------
        *'weiXinAppointChangeStatus'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAppointLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinAppointChangeStatus,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'weiXinAppointAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAppointLoading:false,
                }
            });
        },
        //微信游戏设置上下架
        *'weiXinGameChangeStatus'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinGameLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinGameChangeStatus,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'weiXinGameAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinGameLoading:false,
                }
            });
        },

		//微信线下传单设置上下架
        *'weiXinOfflineLeafletsChangeStatus'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinOfflineLeafletsLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinOfflineLeafletsChangeStatus,parse(payload));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'weiXinOfflineLeafletsAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinOfflineLeafletsLoading:false,
                }
            });
        },
			
        //微信活动编辑
        *'weiXinActivityUpdate'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinActivityLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinActivityUpdate,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'weiXinActivityAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinActivityLoading:false,
                    weiXinActivityFormLoading:false,
                    weiXinActivityFormVisible:false,
                }
            });
        },

        //活动管理编辑---------------------------------------------------------------------------
        *'weiXinAdminiUpdate'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAdminiLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinAdminiUpdate,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'weiXinAdminiAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAdminiLoading:false,
                    weiXinAdminiFormLoading:false,
                    weiXinAdminiFormVisible:false,
                }
            });
        },


        //预约试听编辑---------------------------------------------------------------------------
        *'weiXinAppointUpdate'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAppointLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinAppointUpdate,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'weiXinAppointAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinAppointLoading:false,
                    weiXinAppointFormLoading:false,
                    weiXinAppointFormVisible:false,
                }
            });
        },

        //微信游戏编辑
        *'weiXinGameUpdate'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinGameLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinGameUpdate,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'weiXinGameAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinGameLoading:false,
                    weiXinGameFormLoading:false,
                    weiXinGameFormVisible:false,
                }
            });
        },
			       
		//微信线下传单编辑
        *'weiXinOfflineLeafletsUpdate'({ payload }, { call, put , select}){
            yield put({
                type: 'updateState',
                payload:{
                    weiXinOfflineLeafletsLoading:true,
                }
            });
            const { ret,err } = yield call(weiXinOfflineLeafletsUpdate,parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage);
                yield put({
                    type: 'weiXinOfflineLeafletsAfterOperation',
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
            yield put({
                type: 'updateState',
                payload:{
                    weiXinOfflineLeafletsLoading:false,
                    weiXinOfflineLeafletsFormLoading:false,
                    weiXinOfflineLeafletsFormVisible:false,
                }
            });
        },

        //微信活动上下架和编辑后页面数据加载
        *'weiXinActivityAfterOperation'({ payload }, { call, put , select}){
            let weiXinMarketingModelSet = yield select(state => state.weiXinMarketingModelSet);
            let categoryId = 1;
            let searchData = weiXinMarketingModelSet.weiXinActivitySearchData || {};
            let pageIndex = weiXinMarketingModelSet.weiXinActivityPageIndex;
            let pageSize = weiXinMarketingModelSet.weiXinActivityPageSize;
            let params = { categoryId,pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(weiXinActivityAfterOperation,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinActivityList : ret.results,
                        weiXinActivityTotal : ret.data.resultCount,
                        weiXinActivityPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinActivityPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        //活动管理上下架和编辑后页面数据加载---------------------------------------------------------------------
        *'weiXinAdminiAfterOperation'({ payload }, { call, put , select}){
            let weiXinMarketingModelSet = yield select(state => state.weiXinMarketingModelSet);
            let categoryId = 1;
            let searchData = weiXinMarketingModelSet.weiXinAdminiSearchData || {};
            let pageIndex = weiXinMarketingModelSet.weiXinAdminiPageIndex;
            let pageSize = weiXinMarketingModelSet.weiXinAdminiPageSize;
            let params = { categoryId,pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(weiXinAdminiAfterOperation,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinAdminiList : ret.results,
                        weiXinAdminiTotal : ret.data.resultCount,
                        weiXinAdminiPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinAdminiPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        //预约试听上下架和编辑后页面数据加载---------------------------------------------------------------------
        *'weiXinAppointAfterOperation'({ payload }, { call, put , select}){
            let weiXinMarketingModelSet = yield select(state => state.weiXinMarketingModelSet);
            let categoryId = 1;
            let searchData = weiXinMarketingModelSet.weiXinAppointSearchData || {};
            let pageIndex = weiXinMarketingModelSet.weiXinAppointPageIndex;
            let pageSize = weiXinMarketingModelSet.weiXinAppointPageSize;
            let params = { categoryId,pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(weiXinAppointAfterOperation,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinAppointList : ret.results,
                        weiXinAppointTotal : ret.data.resultCount,
                        weiXinAppointPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinAppointPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },

        //微信游戏上下架和编辑后页面数据加载
        *'weiXinGameAfterOperation'({ payload }, { call, put , select}){
            let weiXinMarketingModelSet = yield select(state => state.weiXinMarketingModelSet);
            let pmType = 1;
            let searchData = weiXinMarketingModelSet.weiXinGameSearchData || {};
            let pageIndex = weiXinMarketingModelSet.weiXinGamePageIndex;
            let pageSize = weiXinMarketingModelSet.weiXinGamePageSize;
            let params = { pmType,pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(weiXinGameAfterOperation,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinGameList : ret.results,
                        weiXinGameTotal : ret.data.resultCount,
                        weiXinGamePageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinGamePageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },
			
		//微信线下传单上下架和编辑后页面数据加载
        *'weiXinOfflineLeafletsAfterOperation'({ payload }, { call, put , select}){
            let weiXinMarketingModelSet = yield select(state => state.weiXinMarketingModelSet);
            let pmType = 1;
            let searchData = weiXinMarketingModelSet.weiXinOfflineLeafletsSearchData || {};
            let pageIndex = weiXinMarketingModelSet.weiXinOfflineLeafletsPageIndex;
            let pageSize = weiXinMarketingModelSet.weiXinOfflineLeafletsPageSize;
            let params = { pmType,pageIndex,pageSize,...searchData };
            const { ret,err } = yield call(weiXinOfflineLeafletsAfterOperation,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type: 'updateState',
                    payload: {
                        weiXinOfflineLeafletsList : ret.results,
                        weiXinOfflineLeafletsTotal : ret.data.resultCount,
                        weiXinOfflineLeafletsPageIndex : ret.data.pageIndex || 0,               //微信活动列表当前页码
                        weiXinOfflineLeafletsPageSize : ret.data.pageSize || 10,                 //微信活动列表每页显示数量
                    },
                });
            }else {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        },
    },

    reducers: {
        //更新state
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
