import {
    /*banner*/
    GetBanner,                  /*获取banner列表数据*/
    AddNewBanner,               /*新增banner*/
    EditExistBanner,            /*编辑banner*/
    ChangeBannerStatus,         /*banner上下架*/

    /*免费申请试用*/
    GetFreeTrail,               /*获取免费申请试用列表*/
    ChangeFreeTrailStatus,      /*免费申请试用改变处理未处理状态*/

    /*机构成功案例*/
    GetSuccessCase,             /*获取机构成功案例列表*/
    ChangeSuccessCaseStatus,    /*机构成功案例改变上下架状态*/
    AddNewSuccessCase,          /*新增机构成功案例*/
    EditExistSuccessCase,       /*编辑机构成功案例*/

    /*营销咨询*/
    GetYingXiaoZiXun,           /*获取营销咨询列表*/
    ChangeYingXiaoZiXunStatus,  /*改变营销咨询上下架状态*/
    AddNewYingXiaoZiXun,        /*新增营销咨询*/
    EditExistYingXiaoZiXun,     /*编辑营销咨询*/

    /*最新推荐*/
    getRecommend,               /*获取首页最新推荐*/
    removeRecommend,            /*删除最新推荐*/
    addRecommend,               /*新增最新推荐*/
    editRecommend,              /*编辑最新推荐*/
} from '../../services/SaasScrmOverView/SaasScrmOverView';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';

//实例管理
export default {

    namespace: 'saasScrmOverView',

    state: {
        /*banner属性*/
            /*banner管理table*/
            saasScrmOverViewBannerPageIndex: 0,                             //banner管理页码
            saasScrmOverViewBannerPageSize : 10,                            //banner管理每页条数
            saasScrmOverViewBannerTableData : [],                           //banner管理管理列表数据
            saasScrmOverViewBannerDataTotal : undefined,                    //banner管理管理列表条数
            saasScrmOverViewBannerTableLoading : false,                     //banner管理管理列表加载状态

            /*banner新增编辑*/
            addOrEditSaasScrmOverViweBannerModalType : '',                  //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweBannerModalVisible : false,            //套餐管理modal是否显示
            addOrEditSaasScrmOverViweBannerModalData : {},                  //套餐管理编辑时回填数据
            addOrEditSaasScrmOverViweBannerButtonLoading : false,           //套餐管理按钮是否加载状态
            type : '0',                                                     //营销首页

        /*最新推荐*/
            /*最新推荐管理table*/
            recommendData: [],              // 最新推荐数据
            recommendLoading: false,
            recommendPageIndex: 0,          // 推荐当前页数
            recommendPageSize: 10,          // 当前条数
            recommendTotal: 0,              // 总条数

            /*最新推荐新增编辑*/
            recommendType: 'add',          //新增修改类型('add'/'edit')
            recommendVisible: false,       //modal是否显示
            recommendInfo: {},             //编辑时回填数据
            addRecommendLoading: false,    //按钮是否加载状态

        /*免费申请试用*/
            /*免费申请试用search*/
            saasScrmOverViewFreeTrailSearchVisible : true,                  //banner管理搜索栏是否显示
            saasScrmOverViewFreeTrailSearchContent : {},                    //banner管理搜索栏搜索内容

            /*免费申请试用table*/
            saasScrmOverViewFreeTrailPageIndex : 0,                         //免费申请试用管理页码
            saasScrmOverViewFreeTrailPageSize : 10,                         //免费申请试用管理每页条数
            saasScrmOverViewFreeTrailTableData : {},                        //免费申请试用管理管理列表数据
            saasScrmOverViewFreeTrailDataTotal : undefined,                 //免费申请试用管理管理列表条数
            saasScrmOverViewFreeTrailTableLoading : false,                  //免费申请试用管理管理列表加载状态

        /*机构成功案例*/
            /*机构成功案例table*/
            saasScrmOverviewSuccessCasePageIndex : 0,                       //机构成功案例管理页码
            saasScrmOverviewSuccessCasePageSize : 10,                       //机构成功案例管理每页条数
            saasScrmOverviewSuccessCaseTableData : {},                      //机构成功案例管理管理列表数据
            saasScrmOverviewSuccessCaseDataTotal : undefined,               //机构成功案例管理管理列表条数
            saasScrmOverviewSuccessCaseTableLoading : false,                //机构成功案例管理管理列表加载状态

            /*机构成功案例新增编辑*/
            addOrEditSaasScrmOverViweSuccessCaseModalType : '',             //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweSuccessCaseModalVisible : false,       //套餐管理modal是否显示
            addOrEditSaasScrmOverViweSuccessCaseModalData : {},             //套餐管理编辑时回填数据
            addOrEditSaasScrmOverViweSuccessCaseButtonLoading : false,      //套餐管理按钮是否加载状态

        /*营销咨询*/
            /*营销咨询table*/
            saasScrmOverViewYingXiaoZiXunPageIndex : 0,                     //banner管理页码
            saasScrmOverViewYingXiaoZiXunPageSize : 10,                     //banner管理每页条数
            saasScrmOverViewYingXiaoZiXunTableData : [],                    //banner管理管理列表数据
            saasScrmOverViewYingXiaoZiXunDataTotal : undefined,             //banner管理管理列表条数
            saasScrmOverViewYingXiaoZiXunTableLoading : false,              //banner管理管理列表加载状态

            /*新增编辑营销咨询*/
            addOrEditSaasScrmOverViweYingXiaoZiXunModalType : '',           //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible : false,     //套餐管理modal是否显示
            addOrEditSaasScrmOverViweYingXiaoZiXunModalData : {},           //套餐管理编辑时回填数据
            addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading : false,    //套餐管理按钮是否加载状态
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/saas_scrm_overview') {
                    /*获取banner列表数据*/
                    dispatch({
                        type:'GetBanner',
                        payload:{ pageIndex : 0,pageSize : 10 ,}
                    });
                    /*获取免费申请试用列表*/
                    dispatch({
                        type:'GetFreeTrail',
                        payload:{ pageIndex : 0,pageSize : 10 }
                    });
                    /*获取机构成功案例列表*/
                    dispatch({
                        type:'GetSuccessCase',
                        payload:{ pageIndex : 0,pageSize : 10 }
                    });
                    /*获取营销咨询列表*/
                    dispatch({
                        type:'GetYingXiaoZiXun',
                        payload:{ pageIndex : 0,pageSize : 10 }
                    });
                    /*获取首页最新推荐*/
                    dispatch({
                        type:'getRecommend',
                        payload:{ pageIndex : 0,pageSize : 10, status: '1' }
                    });
                }
            });
        },
    },

    effects: {
        /*banner管理*/
            /*获取banner列表数据*/
            *'GetBanner'({ payload },{ put , call , select }){
                yield put({type:'showBannerTableLoading'});
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let { ret } = yield call(GetBanner,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasScrmOverViewBannerTableData : ret.results,
                            saasScrmOverViewBannerDataTotal : ret.data.resultCount,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeBannerTableLoading'});
            },

            /*banner管理操作过后的查询*/
            *'AfterBannerOperation'({ payload },{ put , call , select }){
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let pageIndex = saasScrmOverView.saasScrmOverViewBannerPageIndex;
                let pageSize = saasScrmOverView.saasScrmOverViewBannerPageSize;
                let params = { pageIndex , pageSize , ...payload }
                let { ret } = yield call(GetBanner,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    //若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
                    if((ret.results).length == 0 && pageIndex > 0){
                        params.pageIndex = pageIndex-1;
                        let { ret } = yield call(GetBanner,parse(params));
                        if(ret && ret.errorCode === 9000){
                            yield put({
                                type:'updateState',
                                payload:{
                                    saasScrmOverViewBannerTableData : ret.results,
                                    saasScrmOverViewBannerDataTotal : ret.data.resultCount,
                                }
                            });
                        }else if(ret && ret.errorMessage){
                            message.error(ret.errorMessage);
                        }else{
                            message.error('您的网络状况不佳，请检查网络情况');
                        }
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                saasScrmOverViewBannerTableData : ret.results,
                                saasScrmOverViewBannerDataTotal : ret.data.resultCount,
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*新增banner*/
            *'AddNewBanner'({ payload },{ put , call , select }){
                yield put({type:'showBannerTableLoading',payload:{addOrEditSaasScrmOverViweBannerButtonLoading : true}});
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let type = (payload && payload.type != undefined) ? payload.type :saasScrmOverView.type;
                let params = { ...payload, type }
                let { ret } = yield call(AddNewBanner,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'updateState',payload:{addOrEditSaasScrmOverViweBannerModalVisible : false}});
                    yield put({type:'AfterBannerOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeBannerTableLoading',payload:{addOrEditSaasScrmOverViweBannerButtonLoading : false}});
            },

            /*编辑banner*/
            *'EditExistBanner'({ payload },{ put , call , select }){
                yield put({type:'showBannerTableLoading',payload:{addOrEditSaasScrmOverViweBannerButtonLoading : true}});
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let type = (payload && payload.type != undefined) ? payload.type :saasScrmOverView.type;
                let params = { type, ...payload }
                let { ret } = yield call(EditExistBanner,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'updateState',payload:{addOrEditSaasScrmOverViweBannerModalVisible : false}});
                    yield put({type:'AfterBannerOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeBannerTableLoading',payload:{addOrEditSaasScrmOverViweBannerButtonLoading : false}});
            },

            /*banner上下架*/
            *'ChangeBannerStatus'({ payload },{ put , call , select }){
                yield put({type:'showBannerTableLoading'});
                let { ret } = yield call(ChangeBannerStatus,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'AfterBannerOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeBannerTableLoading'});
            },

        /*免费申请试用*/
            /*获取免费申请试用列表*/
            *'GetFreeTrail'({ payload },{ put , call , select }){
                yield put({type:'showFreeTrailTableLoading'});
                let { ret } = yield call(GetFreeTrail,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasScrmOverViewFreeTrailTableData : ret.results,
                            saasScrmOverViewFreeTrailDataTotal : ret.data.resultCount,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeFreeTrailTableLoading'});
            },

            /*免费申请试用操作过后的查询*/
            *'AfterFreeTrailOperation'({ payload },{ put , call , select }){
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let pageIndex = saasScrmOverView.saasScrmOverViewFreeTrailPageIndex;
                let pageSize = saasScrmOverView.saasScrmOverViewFreeTrailPageSize;
                let searchContent = saasScrmOverView.saasScrmOverViewFreeTrailSearchContent;
                let params = { pageIndex , pageSize , ...searchContent, ...payload }
                let { ret } = yield call(GetFreeTrail,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    //若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
                    if((ret.results).length == 0 && pageIndex > 0){
                        params.pageIndex = pageIndex-1;
                        let { ret } = yield call(GetFreeTrail,parse(params));
                        if(ret && ret.errorCode === 9000){
                            yield put({
                                type:'updateState',
                                payload:{
                                    saasScrmOverViewFreeTrailTableData : ret.results,
                                    saasScrmOverViewFreeTrailDataTotal : ret.data.resultCount,
                                }
                            });
                        }else if(ret && ret.errorMessage){
                            message.error(ret.errorMessage);
                        }else{
                            message.error('您的网络状况不佳，请检查网络情况');
                        }
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                saasScrmOverViewFreeTrailTableData : ret.results,
                                saasScrmOverViewFreeTrailDataTotal : ret.data.resultCount,
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*免费申请试用改变处理未处理状态*/
            *'ChangeFreeTrailStatus'({ payload },{ put , call , select }){
                yield put({type:'showFreeTrailTableLoading'});
                let { ret } = yield call(ChangeFreeTrailStatus,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'AfterFreeTrailOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeFreeTrailTableLoading'});
            },

        /*机构成功案例*/
            /*获取机构成功案例列表*/
            *'GetSuccessCase'({ payload },{ put , call , select }){
                yield put({type:'showSuccessCaseTableLoading'});
                let { ret } = yield call(GetSuccessCase,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasScrmOverviewSuccessCaseTableData : ret.results,
                            saasScrmOverviewSuccessCaseDataTotal : ret.data.resultCount,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeSuccessCaseTableLoading'});
            },

            /*机构成功案例操作过后的查询*/
            *'AfterSuccessCaseOperation'({ payload },{ put , call , select }){
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let pageIndex = saasScrmOverView.saasScrmOverviewSuccessCasePageIndex;
                let pageSize = saasScrmOverView.saasScrmOverviewSuccessCasePageSize;
                let params = { pageIndex , pageSize , ...payload }
                let { ret } = yield call(GetSuccessCase,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    //若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
                    if((ret.results).length == 0 && pageIndex > 0){
                        params.pageIndex = pageIndex-1;
                        let { ret } = yield call(GetSuccessCase,parse(params));
                        if(ret && ret.errorCode === 9000){
                            yield put({
                                type:'updateState',
                                payload:{
                                    saasScrmOverviewSuccessCaseTableData : ret.results,
                                    saasScrmOverviewSuccessCaseDataTotal : ret.data.resultCount,
                                }
                            });
                        }else if(ret && ret.errorMessage){
                            message.error(ret.errorMessage);
                        }else{
                            message.error('您的网络状况不佳，请检查网络情况');
                        }
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                saasScrmOverviewSuccessCaseTableData : ret.results,
                                saasScrmOverviewSuccessCaseDataTotal : ret.data.resultCount,
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*机构成功案例改变上下架*/
            *'ChangeSuccessCaseStatus'({ payload },{ put , call , select }){
                yield put({type:'showSuccessCaseTableLoading'});
                let { ret } = yield call(ChangeSuccessCaseStatus,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'AfterSuccessCaseOperation',});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeSuccessCaseTableLoading'});
            },

            /*新增机构成功案例*/
            *'AddNewSuccessCase'({ payload },{ put , call , select }){
                yield put({type:'showSuccessCaseTableLoading',payload:{addOrEditSaasScrmOverViweSuccessCaseButtonLoading:true}});
                let { ret } = yield call(AddNewSuccessCase,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'updateState',payload:{addOrEditSaasScrmOverViweSuccessCaseModalVisible : false}});
                    yield put({type:'AfterSuccessCaseOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeSuccessCaseTableLoading',payload:{addOrEditSaasScrmOverViweSuccessCaseButtonLoading:false}});
            },

            /*编辑机构成功案例*/
            *'EditExistSuccessCase'({ payload },{ put , call , select }){
                yield put({type:'showSuccessCaseTableLoading',payload:{addOrEditSaasScrmOverViweSuccessCaseButtonLoading:true}});
                let { ret } = yield call(EditExistSuccessCase,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'updateState',payload:{addOrEditSaasScrmOverViweSuccessCaseModalVisible : false}});
                    yield put({type:'AfterSuccessCaseOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeSuccessCaseTableLoading',payload:{addOrEditSaasScrmOverViweSuccessCaseButtonLoading:false}});
            },

        /*营销咨询*/
            /*获取营销咨询列表*/
            *'GetYingXiaoZiXun'({ payload },{ put , call , select }){
                yield put({type:'showYingXiaoZiXunTableLoading'});
                let { ret } = yield call(GetYingXiaoZiXun,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasScrmOverViewYingXiaoZiXunTableData : ret.results,
                            saasScrmOverViewYingXiaoZiXunDataTotal : ret.data.resultCount,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeYingXiaoZiXunTableLoading'});
            },

            /*营销咨询操作过后的查询*/
            *'AfterYingXiaoZiXunOperation'({ payload },{ put , call , select }){
                let saasScrmOverView = yield select(state => state.saasScrmOverView);
                let pageIndex = saasScrmOverView.saasScrmOverViewYingXiaoZiXunPageIndex;
                let pageSize = saasScrmOverView.saasScrmOverViewYingXiaoZiXunPageSize;
                let params = { pageIndex , pageSize , ...payload }
                let { ret } = yield call(GetYingXiaoZiXun,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    //若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
                    if((ret.results).length == 0 && pageIndex > 0){
                        params.pageIndex = pageIndex-1;
                        let { ret } = yield call(GetYingXiaoZiXun,parse(params));
                        if(ret && ret.errorCode === 9000){
                            yield put({
                                type:'updateState',
                                payload:{
                                    saasScrmOverViewYingXiaoZiXunTableData : ret.results,
                                    saasScrmOverViewYingXiaoZiXunDataTotal : ret.data.resultCount,
                                }
                            });
                        }else if(ret && ret.errorMessage){
                            message.error(ret.errorMessage);
                        }else{
                            message.error('您的网络状况不佳，请检查网络情况');
                        }
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                saasScrmOverViewYingXiaoZiXunTableData : ret.results,
                                saasScrmOverViewYingXiaoZiXunDataTotal : ret.data.resultCount,
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*改变营销咨询上下架状态*/
            *'ChangeYingXiaoZiXunStatus'({ payload },{ put , call , select }){
                yield put({type:'showYingXiaoZiXunTableLoading'});
                let { ret } = yield call(ChangeYingXiaoZiXunStatus,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'AfterYingXiaoZiXunOperation',});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeYingXiaoZiXunTableLoading'});
            },

            /*新增营销咨询*/
            *'AddNewYingXiaoZiXun'({ payload },{ put , call , select }){
                yield put({type:'showYingXiaoZiXunTableLoading',payload:{addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading:true}});
                let { ret } = yield call(AddNewYingXiaoZiXun,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'updateState',payload:{addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible : false}});
                    yield put({type:'AfterYingXiaoZiXunOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeYingXiaoZiXunTableLoading',payload:{addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading:false}});
            },

            /*编辑营销咨询*/
            *'EditExistYingXiaoZiXun'({ payload },{ put , call , select }){
                yield put({type:'showYingXiaoZiXunTableLoading',payload:{addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading:true}});
                let { ret } = yield call(EditExistYingXiaoZiXun,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({type:'updateState',payload:{addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible : false}});
                    yield put({type:'AfterYingXiaoZiXunOperation'});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeYingXiaoZiXunTableLoading',payload:{addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading:false}});
            },

        /*最新推荐*/
            /*获取首页最新推荐*/
            *getRecommend({ payload },{ put , call , select }){
                yield put({type:'showRecommendLoading'});
                let { ret } = yield call(getRecommend, parse(payload));
                if( ret && ret.errorCode === 0 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            recommendData: ret.results,
                            recommendTotal: ret.data.resultCount
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeRecommendLoading'});
            },

            /*删除最新推荐*/
            *removeRecommend({ payload },{ put , call , select }){
                let { ret } = yield call(removeRecommend, parse(payload));
                if( ret && ret.errorCode === 0 ){
                    message.success('删除成功');
                    yield put({
                        type:'getRecommend',
                        payload:{
                            pageIndex: 0,
                            pageSize: 10,
                            status: '1'
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*新增最新推荐*/
            *addRecommend({ payload },{ put , call , select }){
                yield put({type:'updateState',payload:{addRecommendLoading : true}});
                let { ret } = yield call(addRecommend, parse(payload));
                if( ret && ret.errorCode === 0 ){
                    message.success('新增成功');
                    yield put({type:'updateState',payload:{recommendVisible : false}});
                    yield put({
                        type:'getRecommend',
                        payload:{
                            pageIndex: 0,
                            pageSize: 10,
                            status: '1'
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'updateState',payload:{addRecommendLoading : false}});
            },

            /*编辑最新推荐*/
            *editRecommend({ payload },{ put , call , select }){
                yield put({type:'updateState',payload:{addRecommendLoading : true}});
                let { ret } = yield call(editRecommend, parse(payload));
                if( ret && ret.errorCode === 0 ){
                    message.success('编辑成功');
                    yield put({type:'updateState',payload:{recommendVisible : false}});
                    yield put({
                        type:'getRecommend',
                        payload:{
                            pageIndex: 0,
                            pageSize: 10,
                            status: '1'
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'updateState',payload:{addRecommendLoading : false}});
            },
    },

    reducers: {
        //更新state
        updateState(state , action) {
            return { ...state, ...action.payload };
        },
        showBannerTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverViewBannerTableLoading : true };
        },
        closeBannerTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverViewBannerTableLoading : false };
        },
        showFreeTrailTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverViewFreeTrailTableLoading : true };
        },
        closeFreeTrailTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverViewFreeTrailTableLoading : false };
        },
        showSuccessCaseTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverviewSuccessCaseTableLoading : true };
        },
        closeSuccessCaseTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverviewSuccessCaseTableLoading : false };
        },
        showYingXiaoZiXunTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverViewYingXiaoZiXunTableLoading : true };
        },
        closeYingXiaoZiXunTableLoading(state , action) {
            return { ...state, ...action.payload, saasScrmOverViewYingXiaoZiXunTableLoading : false };
        },
        showRecommendLoading(state, action){
            return { ...state, ...action.payload, recommendLoading : true };
        },
        closeRecommendLoading(state, action){
            return { ...state, ...action.payload, recommendLoading : false };
        }
    },
};
