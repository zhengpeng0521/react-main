import {
    weiXinActivityCaseList,                 /*微信活动列表加载*/
    weiXinActivityCaseSelectModalName,      /*微信活动模板名称下拉列表内容*/
    weiXinAdminiCaseList,                   /*微信活动列表加载----------------------------------------*/
    weiXinAppointCaseList,                   /*预约试听列表加载----------------------------------------*/
    weiXinGameCaseList,                     /*微信游戏列表加载*/
    weiXinGameCaseSelectModalName,          /*微信游戏模板名称下拉列表内容*/
	weiXinMarketCaseList,                 	/*微信市场列表加载*/
    weiXinMarketCaseSelectModalName,        /*微信市场模板名称下拉列表内容*/
	weiXinOfflineLeafletsCaseList,            /*微信市场列表加载*/
    weiXinOfflineLeafletsCaseSelectModalName, /*微信市场模板名称下拉列表内容*/
    getWeiXinGamePreviewUrl,                /*微信游戏请求模板预览url*/
    getWeiXinAdminiPreviewUrl,                /*微信游戏请求模板预览url-------------------------------------*/
    getWeiXinAppointPreviewUrl,                /*微信游戏请求模板预览url-------------------------------------*/
    getWeiXinMarketInit,					/*微信市场二维码域名*/
    orgSchoolTypeSelectModal,                /* 机构类型加载 */
} from '../../services/SaasWeixinMarketing/SaasWeiXinCaseManage';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';

//实例管理
export default {

    namespace: 'saasCaseManage',

    state: {

        /*微信活动*/
        weiXinActivityCasePageSize : 10,            //微信活动页面数据数量
        weiXinActivityCasePageIndex : 0,            //微信活动页码

        weiXinActivityCaseSearchVisible : true,     //微信活动搜索框是否显示
        weiXinActivityCaseSearchSelectContent : '', //微信活动模板名称下拉列表
        weiXinActivityCaseSearchData : {},          //微信活动搜索内容

        weiXinActivityCaseLoading : false,          //微信活动列表是否加载状态
        weiXinActivityCaseList : [],                //微信活动列表数据
        weiXinActivityCaseTotal : '',               //微信活动列表数据总数

        weiXinActivitySortType : '',                //微信活动排序类型(ASC： 正序，DESC：降序)
        weiXinActivitySortKey : '',                 //微信活动排序项目key


         /*活动管理--------------------------------------------------------------------------------*/
        weiXinAdminiCasePageSize : 10,            //活动管理页面数据数量
        weiXinAdminiCasePageIndex : 0,            //活动管理页码

        weiXinAdminiCaseSearchVisible : true,     //活动管理搜索框是否显示
//        weiXinAdminiCaseSearchSelectContent : '', //活动管理模板名称下拉列表
        weiXinAdminiCaseSearchData : {},          //活动管理搜索内容

        weiXinAdminiCaseLoading : false,          //活动管理列表是否加载状态
        weiXinAdminiCaseList : [],                //活动管理列表数据
        weiXinAdminiCaseTotal : '',               //活动管理列表数据总数

        weiXinAdminiSortType : '',                //活动管理排序类型(ASC： 正序，DESC：降序)
        weiXinAdminiSortKey : '',                 //活动管理排序项目key

         /*预约试听--------------------------------------------------------------------------------*/
        weiXinAppointCasePageSize : 10,            //预约试听页面数据数量
        weiXinAppointCasePageIndex : 0,            //预约试听页码

        weiXinAppointCaseSearchVisible : true,     //预约试听搜索框是否显示
//        weiXinAdminiCaseSearchSelectContent : '', //预约试听模板名称下拉列表
        weiXinAppointCaseSearchData : {},          //预约试听搜索内容

        weiXinAppointCaseLoading : false,          //预约试听列表是否加载状态
        weiXinAppointCaseList : [],                //预约试听列表数据
        weiXinAppointCaseTotal : '',               //预约试听列表数据总数

        weiXinAppointSortType : '',                //预约试听排序类型(ASC： 正序，DESC：降序)
        weiXinAppointSortKey : '',


        /*微信游戏*/
        weiXinGameCasePageSize : 10,                //微信游戏页面数据数量
        weiXinGameCasePageIndex : 0,                //微信游戏页码

        weiXinGameCaseSearchVisible : true,         //微信游戏搜索框是否显示
        weiXinGameCaseSearchSelectContent : '',     //微信游戏模板名称下拉列表
        weiXinGameCaseSearchData : {},              //微信游戏搜索内容

        weiXinGameCaseLoading : false,              //微信游戏列表是否加载状态
        weiXinGameCaseList : [],                    //微信游戏列表数据
        weiXinGameCaseTotal : '',                   //微信游戏列表数据总数

        weiXinGameSortType : '',                    //微信游戏排序类型(ASC： 正序，DESC：降序)
        weiXinGameSortKey : '',                     //微信游戏排序项目key

		/*微信市场*/
        weiXinMarketCasePageSize : 10,                //微市场页面数据数量
        weiXinMarketCasePageIndex : 0,                //微市场页码

        weiXinMarketCaseSearchVisible : true,         //微市场搜索框是否显示
        weiXinMarketCaseSearchSelectContent : '',     //微市场模板名称下拉列表
        weiXinMarketCaseSearchData : {},              //微市场搜索内容

        weiXinMarketCaseLoading : false,              //微市场列表是否加载状态
        weiXinMarketCaseList : [],                    //微市场列表数据
        weiXinMarketCaseTotal : '',                   //微市场列表数据总数

        weiXinMarketSortType : '',                    //微市场排序类型(ASC： 正序，DESC：降序)
        weiXinMarketSortKey : '',                     //微市场排序项目key
		
        /*线下传单*/
        weiXinOfflineLeafletsCasePageSize : 10,            //微信线下活动页面数据数量
        weiXinOfflineLeafletsCasePageIndex : 0,            //微信线下活动页码

        weiXinOfflineLeafletsCaseSearchVisible : true,     //微信线下活动搜索框是否显示
        weiXinOfflineLeafletsCaseSearchSelectContent : '', //微信线下活动模板名称下拉列表
        weiXinOfflineLeafletsCaseSearchData : {},          //微信线下活动搜索内容

        weiXinOfflineLeafletsCaseLoading : false,          //微信线下活动列表是否加载状态
        weiXinOfflineLeafletsCaseList : [],                //微信线下活动列表数据
        weiXinOfflineLeafletsCaseTotal : '',               //微信线下活动列表数据总数

        weiXinOfflineLeafletsSortType : '',                //微信线下活动排序类型(ASC： 正序，DESC：降序)
        weiXinOfflineLeafletsSortKey : '',                 //微信线下活动排序项目key
		
        /*预览模态框*/
        PreviewModalVisible : false,                //微信活动预览模态框是否展示
        PreviewModalSpin : false,                   //微信游戏预览内容是否加载中
        PreviewUrl : '',                            //微信活动预览URL
		
		/*momain*/
        domainName	: '',							//市场活动二维码域名拼接
        
        /* 机构类型 */
        schoolTypeList : [],                         //机构类型
	},

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/saas_weixin_market_case_mgr') {
                    dispatch({
                        type:'weiXinActivityCaseList',
                        payload:{
                            pageSize : 10,
                            pageIndex : 0,
                        }
                    });
                    dispatch({
                        type:'weiXinActivityCaseSelectModalName',
                    });
					dispatch({
                        type:'weiXinMarketInit',
                    });
                    dispatch({
                        type: 'orgSchoolTypeSelectModal',
                    });
					
                }

            });
        },
    },

    effects: {
		
        /*微信活动*/
            /*微信活动列表加载*/
            *'weiXinActivityCaseList'( { payload } , { put , call , select } ){
                yield put({ type : 'weiXinActivityCaseListShowLoading' });
                let params = { categoryId : 1 , ...payload };
                let { ret } = yield call(weiXinActivityCaseList,parse(params));
                if( ret && ret.errorCode === 9000){
                    let sortKey = payload.sortKey;
                    let sortType = payload.sortType;
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    delete payload.categoryId;
                    delete payload.sortKey;
                    delete payload.sortType;
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinActivityCaseList : ret.results,
                            weiXinActivityCaseTotal : ret.data.resultCount,
                            weiXinActivityCasePageSize : ret.data.pageSize || 10,
                            weiXinActivityCasePageIndex : ret.data.pageIndex || 0,
                            weiXinActivitySortKey : sortKey,
                            weiXinActivitySortType : sortType,
                            weiXinActivityCaseSearchData : payload
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinActivityCaseListCloseLoading' });
            },
            /*微信活动模板名称下拉列表内容*/
            *'weiXinActivityCaseSelectModalName'({ payload } , { put , call , select }){
                yield put({ type : 'weiXinActivityCaseListShowLoading' });
                let params = { categoryId : 1 , pageSize : 1000 , status : 1 , ...payload };
                const { ret } = yield call(weiXinActivityCaseSelectModalName,parse(params));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinActivityCaseSearchSelectContent : ret.results,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinActivityCaseListCloseLoading' });
            },

            *'orgSchoolTypeSelectModal'({ payload } , { put , call , select }){
                let params = {  };
                const { ret } = yield call(orgSchoolTypeSelectModal,parse(params));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            schoolTypeList : ret.results,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
            },



            /*活动管理---------------------------------------------------------------------------------------------*/
            /*活动管理列表加载*/
            *'weiXinAdminiCaseList'( { payload } , { put , call , select } ){
                yield put({ type : 'weiXinAdminiCaseListShowLoading' });
                let params = { categoryId : 1 , ...payload };
                let { ret } = yield call(weiXinAdminiCaseList,parse(params));
                if( ret && ret.errorCode === 9000){
                    let sortKey = payload.sortKey;
                    let sortType = payload.sortType;
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    delete payload.categoryId;
                    delete payload.sortKey;
                    delete payload.sortType;
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinAdminiCaseList : ret.results,
                            weiXinAdminiCaseTotal : ret.data.resultCount,
                            weiXinAdminiCasePageSize : ret.data.pageSize || 10,
                            weiXinAdminiCasePageIndex : ret.data.pageIndex || 0,
                            weiXinAdminiSortKey : sortKey,
                            weiXinAdminiSortType : sortType,
                            weiXinAdminiCaseSearchData : payload
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinAdminiCaseListCloseLoading' });
            },

           /*预约试听---------------------------------------------------------------------------------------------*/
            /*预约试听列表加载*/
            *'weiXinAppointCaseList'( { payload } , { put , call , select } ){
                yield put({ type : 'weiXinAppointCaseListShowLoading' });
                let params = { categoryId : 1 , ...payload };
                let { ret } = yield call(weiXinAppointCaseList,parse(params));
                if( ret && ret.errorCode === 9000){
                    let sortKey = payload.sortKey;
                    let sortType = payload.sortType;
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    delete payload.categoryId;
                    delete payload.sortKey;
                    delete payload.sortType;
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinAppointCaseList : ret.results,
                            weiXinAppointCaseTotal : ret.data.resultCount,
                            weiXinAppointCasePageSize : ret.data.pageSize || 10,
                            weiXinAppointCasePageIndex : ret.data.pageIndex || 0,
                            weiXinAppointSortKey : sortKey,
                            weiXinAppointSortType : sortType,
                            weiXinAppointCaseSearchData : payload
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinAppointCaseListCloseLoading' });
            },


				
        /*微信游戏*/
            /*微信游戏列表加载*/
            *'weiXinGameCaseList'( { payload } , { put , call , select } ){
                yield put({ type : 'weiXinGameCaseListShowLoading' });
                let params = { categoryId : 3 , ...payload };
                const { ret } = yield call(weiXinGameCaseList,parse(params));
                if( ret && ret.errorCode === 9000){
                    let sortKey = payload.sortKey;
                    let sortType = payload.sortType;
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    delete payload.categoryId;
                    delete payload.sortKey;
                    delete payload.sortType;
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinGameCaseList : ret.results,
                            weiXinGameCaseTotal : ret.data.resultCount,
                            weiXinGameCasePageSize : ret.data.pageSize || 10,
                            weiXinGameCasePageIndex : ret.data.pageIndex || 0,
                            weiXinGameSortKey : sortKey,
                            weiXinGameSortType : sortType,
                            weiXinGameCaseSearchData : payload
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinGameCaseListCloseLoading' });
            },
            /*微信游戏模板名称下拉列表内容*/
            *'weiXinGameCaseSelectModalName'({ payload } , { put , call , select }){
                yield put({ type : 'weiXinGameCaseListShowLoading' });
                let params = { pmType : 1 , pageSize : 1000 , status : 1 , ...payload };
                const { ret } = yield call(weiXinGameCaseSelectModalName,parse(params));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinGameCaseSearchSelectContent : ret.results,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinGameCaseListCloseLoading' });
            },

		/*微信市场*/
            /*微信市场列表加载*/
            *'weiXinMarketCaseList'( { payload } , { put , call , select } ){
                yield put({ type : 'weiXinMarketCaseListShowLoading' });
                let params = { categoryId : 3 , ...payload };
                const { ret } = yield call(weiXinMarketCaseList,parse(params));
                if( ret && ret.errorCode === 9000){
                    let sortKey = payload.sortKey;
                    let sortType = payload.sortType;
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    delete payload.categoryId;
                    delete payload.sortKey;
                    delete payload.sortType;
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinMarketCaseList : ret.results,
                            weiXinMarketCaseTotal : ret.data.resultCount,
                            weiXinMarketCasePageSize : ret.data.pageSize || 10,
                            weiXinMarketCasePageIndex : ret.data.pageIndex || 0,
                            weiXinMarketSortKey : sortKey,
                            weiXinMarketSortType : sortType,
                            weiXinMarketCaseSearchData : payload
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinMarketCaseListCloseLoading' });
            },
			*'weiXinMarketInit'( { payload } , { put , call , select } ) {
				const { ret } = yield call(getWeiXinMarketInit);
				if( ret && ret.errorCode === 9000){
					yield put({
						type : 'updateState',
						payload:  {
							domainName : ret.data.h5Url,
						}
					})
 				}else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
			},

		/*线下传单*/
            /*微信线下传单列表加载*/
            *'weiXinOfflineLeafletsCaseList'( { payload } , { put , call , select } ){
                yield put({ type : 'weiXinOfflineLeafletsCaseListShowLoading' });
                let params = { categoryId : 1 , ...payload };
                const { ret } = yield call(weiXinOfflineLeafletsCaseList,parse(params));
                if( ret && ret.errorCode === 9000){
                    let sortKey = payload.sortKey;
                    let sortType = payload.sortType;
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    delete payload.categoryId;
                    delete payload.sortKey;
                    delete payload.sortType;
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinOfflineLeafletsCaseList : ret.results,
                            weiXinOfflineLeafletsCaseTotal : ret.data.resultCount,
                            weiXinOfflineLeafletsCasePageSize : ret.data.pageSize || 10,
                            weiXinOfflineLeafletsCasePageIndex : ret.data.pageIndex || 0,
                            weiXinOfflineLeafletsSortKey : sortKey,
                            weiXinOfflineLeafletsSortType : sortType,
                            weiXinOfflineLeafletsCaseSearchData : payload
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinOfflineLeafletsCaseListCloseLoading' });
            },
            /*微信线下传单模板名称下拉列表内容*/
            *'weiXinOfflineLeafletsCaseSelectModalName'({ payload } , { put , call , select }){
                yield put({ type : 'weiXinOfflineLeafletsCaseListShowLoading' });
                let params = { categoryId : 1 , pageSize : 1000 , status : 1 , ...payload };
                const { ret } = yield call(weiXinOfflineLeafletsCaseSelectModalName,parse(params));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            weiXinOfflineLeafletsCaseSearchSelectContent : ret.results,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinOfflineLeafletsCaseListCloseLoading' });
            },

				
		/*微信游戏请求模板预览url*/
            *'getWeiXinGamePreviewUrl'({ payload } , { put , call , select }){
                yield put({ type : 'weiXinGameCaseListShowLoading' });
                const { ret } = yield call(getWeiXinGamePreviewUrl,parse(payload));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            PreviewUrl : (ret.data).url,
                            PreviewModalSpin : false,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinGameCaseListCloseLoading' });
            },

            *'getWeiXinAdminiPreviewUrl'({ payload } , { put , call , select }){
                yield put({ type : 'weiXinAdminiCaseListShowLoading' });
                const { ret } = yield call(getWeiXinAdminiPreviewUrl,parse(payload));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            PreviewUrl : (ret.data).url,
                            PreviewModalSpin : false,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinAdminiCaseListCloseLoading' });
            },

             *'getWeiXinAppointPreviewUrl'({ payload } , { put , call , select }){
                yield put({ type : 'weiXinAppointCaseListShowLoading' });
                const { ret } = yield call(getWeiXinAppointPreviewUrl,parse(payload));
                if( ret && ret.errorCode === 9000){
                    yield put({
                        type:'updateState',
                        payload:{
                            PreviewUrl : (ret.data).url,
                            PreviewModalSpin : false,
                        }
                    });
                }else{
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }
                yield put({ type : 'weiXinAppointCaseListCloseLoading' });
            },
        },



    reducers: {
        //更新state
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        /*微信活动*/
            /*微信活动实例管理列表加载中*/
            weiXinActivityCaseListShowLoading(state, action) {
                return { ...state, ...action.payload,weiXinActivityCaseLoading : true };
            },
            /*微信活动实例管理列表取消加载*/
            weiXinActivityCaseListCloseLoading(state, action) {
                return { ...state, ...action.payload,weiXinActivityCaseLoading : false };
            },

        /*活动管理----------------------------------------------------------------------------*/
            /*活动管理实例管理列表加载中*/
            weiXinAdminiCaseListShowLoading(state, action) {
                return { ...state, ...action.payload,weiXinAdminiCaseLoading : true };
            },
            /*活动管理实例管理列表取消加载*/
            weiXinAdminiCaseListCloseLoading(state, action) {
                return { ...state, ...action.payload,weiXinAdminiCaseLoading : false };
            },

        /*预约试听----------------------------------------------------------------------------*/
            /*预约试听实例管理列表加载中*/
            weiXinAppointCaseListShowLoading(state, action) {
                return { ...state, ...action.payload,weiXinAppointCaseLoading : true };
            },
            /*预约试听实例管理列表取消加载*/
            weiXinAppointCaseListCloseLoading(state, action) {
                return { ...state, ...action.payload,weiXinAppointCaseLoading : false };
            },

        /*微信游戏*/
            /*微信游戏实例管理列表加载中*/
            weiXinGameCaseListShowLoading(state, action) {
                return { ...state, ...action.payload,weiXinGameCaseLoading : true };
            },
            /*微信游戏实例管理列表取消加载*/
            weiXinGameCaseListCloseLoading(state, action) {
                return { ...state, ...action.payload,weiXinGameCaseLoading : false };
            },
        /*微信市场*/
            /*微信市场实例管理列表加载中*/
            weiXinMarketCaseListShowLoading(state, action) {
                return { ...state, ...action.payload,weiXinMarketCaseLoading : true };
            },
            /*微信市场实例管理列表取消加载*/
            weiXinMarketCaseListCloseLoading(state, action) {
                return { ...state, ...action.payload,weiXinMarketCaseLoading : false };
            },
		/*线下传单*/
            /*微信线下传单实例管理列表加载中*/
            weiXinOfflineLeafLetsCaseListShowLoading(state, action) {
                return { ...state, ...action.payload,weiXinOfflineLeafLetsCaseLoading : true };
            },
            /*微信线下传单实例管理列表取消加载*/
            weiXinOfflineLeafLetsCaseListCloseLoading(state, action) {
                return { ...state, ...action.payload,weiXinOfflineLeafLetsCaseLoading : false };
            },
    },
};
