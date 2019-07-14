import {
    /*模块与菜单管理*/
    GetModularList,         /*获取模块列表*/
    GetMenuList,            /*获取菜单列表数据*/
    AddNewModular,          /*添加模块*/
    EditExistModular,       /*编辑模块更新版本*/
    EditExistModularNotUpdate,      /*编辑模块不更新版本*/

    /*套餐管理*/
    GetPackageList,         /*获取套餐列表数据*/
    AddNewPackage,          /*新增套餐*/
    EditExistPackage,       /*编辑套餐*/
    SaasPackageUpOrDown,    /*套餐改变上下架状态*/

    /*套餐开通管理*/
    GetPackingOpening,      /*获取套餐开通列表数据*/
    SetPackageOpeningType,  /*套餐列表改变状态*/
    GetPackageSelectList,   /*打开表单获取套餐列表作为下拉列表数据*/
    GetOrgDetail,           /*通过机构名称或者手机号获取机构信息*/
    GetTenantDetail,        /*通过租户信息搜索租户*/
    GetOrgByTenantId,       /*通过租户搜索机构*/
    OpeningPackage          /*开通套餐*/
} from '../../services/SaasPackageManage/SaasPackageManage';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';

//实例管理
export default {

    namespace: 'saasPackageManage',

    state: {
        /*Saas模块管理*/
            /*模块列表*/
            modularResType  : '1',                              //模块类型(1机构/2总部)
            modularListLoading : false,                         //模块列表加载状态
            allModularList : [],                                //模块列表数据
            wetherSelectModularItem : '',                       //选中模块的索引项
            modularSelectedProps : {},                          //选中的模块所拥有的属性

            /*新增编辑模块modal*/
            addOrEditSaasModularModalType : '',                 //模块管理新增修改类型('add'/'edit')
            addOrEditSaasModularModalVisible : false,           //模块管理modal是否显示
            addOrEditSaasModularModalData : {},                 //模块管理编辑时回填数据
            addOrEditSaasModularButtonLoading : false,          //模块管理按钮是否加载状态

            /*菜单列表*/
            menuListLoading : false,                            //菜单加载状态
            allMenuList : [],                                   //菜单列表内容
            menuCheckedArray : [],                              //选中的菜单
            secondListArray : [],                               //打开的树结构(默认是二级菜单)

        /*Saas套餐管理*/
            /*套餐管理搜索栏*/
            saasPackageManageSearchVisible : true,              //搜索栏是否展示
            saasPackageManageSearchData : {},                   //搜索栏搜索数据

            /*套餐管理列表*/
            saasPackageManagePageIndex : 0,                     //套餐页码
            saasPackageManagePageSize : 10,                     //套餐每页条数
            saasPackageManageTableData : [],                    //套餐管理列表数据
            saasPackageManagetotal : undefined,                 //套餐管理列表条数
            saasPackageManageLoading : false,                   //套餐管理列表加载状态

            /*查看套餐包含模块*/
            saasPackageCheckVisible : false,                    //查看包含模块modal显示
            saasPackageCheckIncludeData : [],                   //查看包含模块数据

            /*套餐管理新增编辑套餐*/
            addOrEditSaasPackageModalType : '',                 //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasPackageModalVisible : false,           //套餐管理modal是否显示
            addOrEditSaasPackageModalData : {},                 //套餐管理编辑时回填数据
            addOrEditSaasPackageButtonLoading : false,          //套餐管理按钮是否加载状态
            addOrEditSaasPackageransferAllContent : [],         //穿梭框内所有模板的值
            addOrEditSaasPackageTransferTargetContent : [],     //穿梭框所选中的模板

        /*Saas套餐开通*/
            /*套餐开通搜索栏*/
            saasPackageOpeningSearchVisible : true,             //搜索栏是否展示
            saasPackageOpeningSearchData : {},                  //搜索栏搜索数据

            /*套餐开通列表*/
            saasPackageOpeningPageIndex : 0,                    //套餐页码
            saasPackageOpeningPageSize : 10,                    //套餐每页条数
            saasPackageOpeningTableData : [],                   //套餐管理列表数据
            saasPackageOpeningTotal : undefined,                //套餐管理列表条数
            saasPackageOpeningLoading : false,                  //套餐管理列表加载状态

            /*套餐开通表单*/
            saasPackageOpeningModalVisible : false,              //modal是否显示
            saasPackageOpeningModalButtonLoading : false,        //modal按钮是否在加载状态
            saasPackageOpeningModalSearchType : '1',             //机构搜索方式(0按机构和机构手机号/1按租户查询)
            saasPackageOpeningModalTenantSelectVisible : false,  //租户下拉列表是否显示(搜素租户之后才显示)
            saasPackageOpeningModalTenantSelectContent : [],     //租户下拉列表数据
            saasPackageOpeningModalSelectContent : [],           //套餐列表数据
            saasPackageOpeningModalOrgArray : [],                //接口获取的机构原始数据
            saasPackageOpeningModalTransferAllcontent : [],      //机构穿梭框左边数据
            saasPackageOpeningModalTransferTargetContent : [],   //机构穿梭框右边数据
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/saas_package_mgr') {
                    /*获取模块列表*/
                    dispatch({
                        type:'GetModularList',
                        payload:{
                            resType : '1'
                        }
                    });

                    /*获取套餐列表数据*/
                    dispatch({
                        type:'GetPackageList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 10
                        }
                    });

                    /*获取套餐开通列表*/
                    dispatch({
                        type:'GetPackingOpening',
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
        /*套餐管理*/
            /*获取套餐列表数据*/
            *'GetPackageList'({ payload },{ put , call , select }){
                yield put({type:'showTableLoading'});
                let { ret } = yield call(GetPackageList,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    delete payload.pageIndex;
                    delete payload.pageSize;
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageManageTableData : ret.results,
                            saasPackageManagetotal : ret.data.resultCount,
                            saasPackageManagePageIndex : ret.data.pageIndex || 0,                    //套餐页码
                            saasPackageManagePageSize : ret.data.pageSize || 10,                      //套餐每页条数
                            saasPackageManageSearchData : payload
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeTableLoading'});
            },

            /*获取套餐列表数据(用于表单查询，无分页)*/
            *'ModalGetPackageList'({ payload },{ put , call , select }){
                yield put({type:'showTableLoading'});
                let { ret } = yield call(GetPackageList,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    let includeArray = [];
                    for(let i in ret.results){
                        if(payload.passId == ret.results[i].id){
                            includeArray = ret.results[i].moduleInfo;
                            break;
                        }
                    }
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageCheckVisible : true,
                            saasPackageCheckIncludeData : includeArray,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeTableLoading'});
            },

            /*操作之后进行套餐列表查询*/
            *'AfterOperationQuery'({ payload } , { put , call , select }){
                let saasPackageManage = yield select(state => state.saasPackageManage);
                let saasPackageManageSearchData = saasPackageManage.saasPackageManageSearchData || {};
                let pageIndex = saasPackageManage.saasPackageManagePageIndex;
                let pageSize = saasPackageManage.saasPackageManagePageSize;
                let params = { ...saasPackageManageSearchData , pageIndex , pageSize }
                let { ret } = yield call(GetPackageList,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    //若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
                    if((ret.results).length == 0 && pageIndex > 0){
                        params.pageIndex = pageIndex-1;
                        let { ret } = yield call(GetPackageList,parse(params));
                        if(ret && ret.errorCode === 9000){
                            delete params.pageIndex;
                            delete params.pageSize;
                            yield put({
                                type:'updateState',
                                payload:{
                                    saasPackageManageTableData : ret.results,
                                    saasPackageManagetotal : ret.data.resultCount,
                                    saasPackageManagePageIndex : ret.data.pageIndex || 0,                    //套餐页码
                                    saasPackageManagePageSize : ret.data.pageSize || 10,                      //套餐每页条数
                                    saasPackageManageSearchData : params
                                }
                            });
                        }else if(ret && ret.errorMessage){
                            message.error(ret.errorMessage);
                        }else{
                            message.error('您的网络状况不佳，请检查网络情况');
                        }
                    }else{
                        delete params.pageIndex;
                        delete params.pageSize;
                        yield put({
                            type:'updateState',
                            payload:{
                                saasPackageManageTableData : ret.results,
                                saasPackageManagetotal : ret.data.resultCount,
                                saasPackageManagePageIndex : ret.data.pageIndex || 0,                    //套餐页码
                                saasPackageManagePageSize : ret.data.pageSize || 10,                      //套餐每页条数
                                saasPackageManageSearchData : params
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*新增套餐*/
            *'AddNewPackage'({ payload } , { put , call , select }){
                yield put({type:'showTableLoading',payload:{addOrEditSaasPackageButtonLoading : true}});
                let { ret } = yield call(AddNewPackage,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage);
                    yield put({
                        type:'updateState',
                        payload:{
                            addOrEditSaasPackageModalVisible : false
                        }
                    });
                    yield put({
                        type:'AfterOperationQuery',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeTableLoading',payload:{addOrEditSaasPackageButtonLoading : false}});
            },

            /*编辑套餐*/
            *'EditExistPackage'({ payload } , { put , call , select }){
                yield put({type:'showTableLoading',payload:{addOrEditSaasPackageButtonLoading : true}});
                let { ret } = yield call(EditExistPackage,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'updateState',
                        payload:{
                            addOrEditSaasPackageModalVisible : false
                        }
                    });
                    yield put({
                        type:'AfterOperationQuery',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({
                    type:'closeTableLoading',payload:{addOrEditSaasPackageButtonLoading : false}});
            },

            /*套餐改变上下架状态*/
            *'SaasPackageUpOrDown'({ payload } , { put , call , select }){
                yield put({type:'showTableLoading'});
                let { ret } = yield call(SaasPackageUpOrDown,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'AfterOperationQuery',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeTableLoading'});
            },

        /*模板与菜单管理*/
            /*获取模块列表*/
            *'GetModularList'({ payload } , { put , call , select }){
                yield put({type:'showModularLoading'});
                let saasPackageManage = yield select(state => state.saasPackageManage);
                let modularResType = !!payload && !!payload.resType ? payload.resType : saasPackageManage.modularResType;
                let params = { ...payload , resType : modularResType };
                let { ret } = yield call(GetModularList,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    let results = ret.results;
                    if(results.length > 0){
                        let transferArray = [];
                        for(let j in results){
                            transferArray.push({
                                key : results[j].id,
                                title : results[j].name,
                            })
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                addOrEditSaasPackageransferAllContent : transferArray,  //穿梭框中左边所有的值
                                allModularList : results,
                                wetherSelectModularItem : 0,          //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
                                modularSelectedProps : results[0],    //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
                                modularResType
                            }
                        });
                        yield put({
                            type:'GetMenuList',
                            payload:{
                                id : results[0].id,
                                resType : payload && payload.resType || undefined
                            }
                        });
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                addOrEditSaasPackageransferAllContent : [], //穿梭框中左边所有的值
                                allModularList : results,                   //results是空数组
                                wetherSelectModularItem : '',               //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
                                modularSelectedProps : {},                  //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
                                modularResType
                            }
                        });
                        yield put({
                            type:'GetMenuList',
                            payload:{
                                id : '',
                                resType : payload && payload.resType || undefined
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeModularLoading'});
            },
            /*获取菜单树*/
            *'GetMenuList'({ payload } , { put , call , select }){
                yield put({type:'showMenuLoading'});
                let { ret } = yield call(GetMenuList,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    let array = [];
                    for(let i in (ret.results)){
                        array.push(((ret.results)[i].id)+'');
                    }
                    yield put({
                        type:'updateState',
                        payload:{
                            allMenuList : ret.results,
                            secondListArray : array,
                            //menuCheckedArray : payload.array,
                            addOrEditSaasModularButtonLoading : false,
                            addOrEditSaasModularModalVisible : false

                        }
                    });
                    yield put({
                        type: 'showRoleFuncs',
                        payload: {
                            id: payload.id,
                            index : 0,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeMenuLoading'});
            },

            /*添加模块*/
            *'AddNewModular'({ payload } , { put , call , select }){
                yield put({type:'updateState',payload:{addOrEditSaasModularButtonLoading : true}});
                let { ret } = yield call(AddNewModular,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'GetModularList',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'updateState',payload:{addOrEditSaasModularButtonLoading : false}});
            },

            /*编辑模块更新版本*/
            *'EditExistModular'({ payload } , { put , call , select }){
                yield put({type:'updateState',payload:{addOrEditSaasModularButtonLoading : true}});

                let saasPackageManage = yield select(state => state.saasPackageManage);

                let {allMenuList,menuCheckedArray} = saasPackageManage;
                let dataFuncList = [];//往后台传递的菜单项

                function isCheck(item) {
                    let resultFlg = false;
                    //判断当前节点是否选中
                    if(menuCheckedArray.findIndex((x)=> {return x == item.id}) > -1) {
                        resultFlg = true;
                    }

                     //是否有子节点
                   if(item.list && item.list.length > 0) {
                      let children = item.list;
                      let flg_none = true;
                      children && children.map(function(childItem) {
                          if(isCheck(childItem)) {
                              flg_none = false;
                          }
                      });

                      resultFlg = (!flg_none) || resultFlg;
                   }

                    if(resultFlg) {
                        dataFuncList.push(item.id + '');
                    }
                    return resultFlg;
                }

                allMenuList && allMenuList.length > 0 && allMenuList.map(function(allItem) {
                    isCheck(allItem);
                });

                payload.resources = dataFuncList.join(',');


                let { ret } = yield call(EditExistModular,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'GetModularList',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'updateState',payload:{addOrEditSaasModularButtonLoading : false}});
            },

            /*编辑模块不更新版本*/
            *'EditExistModularNotUpdate'({ payload } , { put , call , select }){
                yield put({type:'updateState',payload:{addOrEditSaasModularButtonLoading : true}});

                let saasPackageManage = yield select(state => state.saasPackageManage);

                let {allMenuList,menuCheckedArray} = saasPackageManage;
                let dataFuncList = [];//往后台传递的菜单项

                function isCheck(item) {
                    let resultFlg = false;
                    //判断当前节点是否选中
                    if(menuCheckedArray.findIndex((x)=> {return x == item.id}) > -1) {
                        resultFlg = true;
                    }

                     //是否有子节点
                   if(item.list && item.list.length > 0) {
                      let children = item.list;
                      let flg_none = true;
                      children && children.map(function(childItem) {
                          if(isCheck(childItem)) {
                              flg_none = false;
                          }
                      });

                      resultFlg = (!flg_none) || resultFlg;
                   }

                    if(resultFlg) {
                        dataFuncList.push(item.id + '');
                    }
                    return resultFlg;
                }

                allMenuList && allMenuList.length > 0 && allMenuList.map(function(allItem) {
                    isCheck(allItem);
                });

                payload.resources = dataFuncList.join(',');


                let { ret } = yield call(EditExistModularNotUpdate,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'GetModularList',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'updateState',payload:{addOrEditSaasModularButtonLoading : false}});
            },

        /*套餐开通*/
            /*获取套餐开通列表*/
            *'GetPackingOpening'({ payload },{ put , call , select }){
                yield put({type:'showOpeningLoading'});
                let { ret } = yield call(GetPackingOpening,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageOpeningTableData : ret.results,
                            saasPackageOpeningTotal : ret.data.resultCount,
                            saasPackageOpeningPageIndex : ret.data.pageIndex || 0,
                            saasPackageOpeningPageSize : ret.data.pageSize || 10,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeOpeningLoading'});
            },

            /*列表套餐设置状态*/
            *'SetPackageOpeningType'({ payload },{ put , call , select }){
                yield put({type:'showOpeningLoading'});
                let { ret } = yield call(SetPackageOpeningType,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'AfteOpeningPackagerOperationQuery',
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeOpeningLoading'});
            },

            /*通过机构名称或者手机号获取机构信息*/
            *'GetOrgDetail'({ payload },{ put , call , select }){
                let { ret } = yield call(GetOrgDetail,parse(payload));
                if(ret && ret.errorCode == '9000' ){
                    let oragnArray = [];
                    for(let i in (ret.results)){
                        if((ret.results)[i].tel==''||(ret.results)[i].tel==undefined||(ret.results)[i].tel==null){
                            oragnArray.push({
                                title : (ret.results)[i].organName+'(未填写手机号,'+(ret.results)[i].id+')',
                                key : (ret.results)[i].id,
                            });
                        }else{
                            oragnArray.push({
                                title : (ret.results)[i].organName+'('+(ret.results)[i].tel+','+(ret.results)[i].id+')',
                                key : (ret.results)[i].id,
                            });
                        }
                    }
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageOpeningModalOrgArray : ret.results,
                            saasPackageOpeningModalTransferAllcontent : oragnArray,
                            saasPackageOpeningModalTransferTargetContent : [],
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*通过租户信息搜索租户*/
            *'GetTenantDetail'({ payload },{ put , call , select }){
                let { ret } = yield call(GetTenantDetail,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageOpeningModalTenantSelectVisible : true,
                            saasPackageOpeningModalTenantSelectContent : ret.results,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*操作之后进行套餐列表查询*/
            *'AfteOpeningPackagerOperationQuery'({ payload } , { put , call , select }){
                let saasPackageManage = yield select(state => state.saasPackageManage);
                let saasPackageOpeningSearchData = saasPackageManage.saasPackageOpeningSearchData || {};
                let pageIndex = saasPackageManage.saasPackageOpeningPageIndex;
                let pageSize = saasPackageManage.saasPackageOpeningPageSize;
                let params = { ...saasPackageOpeningSearchData , pageIndex , pageSize , ...payload }
                let { ret } = yield call(GetPackingOpening,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    //若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
                    if((ret.results).length == 0 && pageIndex > 0){
                        params.pageIndex = pageIndex-1;
                        let { ret } = yield call(GetPackingOpening,parse(params));
                        if(ret && ret.errorCode === 9000){
                            yield put({
                                type:'updateState',
                                payload:{
                                    saasPackageOpeningTableData : ret.results,
                                    saasPackageOpeningTotal : ret.data.resultCount,
                                    saasPackageOpeningPageIndex : ret.data.pageIndex || 0,
                                    saasPackageOpeningPageSize : ret.data.pageSize || 10,
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
                                saasPackageOpeningTableData : ret.results,
                                saasPackageOpeningTotal : ret.data.resultCount,
                                saasPackageOpeningPageIndex : ret.data.pageIndex || 0,
                                saasPackageOpeningPageSize : ret.data.pageSize || 10,
                            }
                        });
                    }
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*打开表单获取套餐列表作为下拉列表数据*/
            *'GetPackageSelectList'({ payload },{ put , call , select }){
                let { ret } = yield call(GetPackageSelectList,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageOpeningModalSelectContent : ret.results,
                            saasPackageOpeningModalVisible : true,
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*通过租户搜索机构*/
            *'GetOrgByTenantId'({ payload },{ put , call , select }){
                let { ret } = yield call(GetOrgByTenantId,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    let oragnArray = [];
                    for(let i in (ret.results)){
                        if((ret.results)[i].tel==''||(ret.results)[i].tel==undefined||(ret.results)[i].tel==null){
                            oragnArray.push({
                                title : (ret.results)[i].orgName+'(未填写手机号,'+(ret.results)[i].orgId+')',
                                key : (ret.results)[i].orgId,
                            });
                        }else{
                            oragnArray.push({
                                title : (ret.results)[i].orgName+'('+(ret.results)[i].tel+','+(ret.results)[i].orgId+')',
                                key : (ret.results)[i].orgId,
                            });
                        }
                    }
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageOpeningModalOrgArray : ret.results,
                            saasPackageOpeningModalTransferAllcontent : oragnArray,
                            saasPackageOpeningModalTransferTargetContent : [],
                        }
                    });
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
            },

            /*开通套餐*/
            *'OpeningPackage'({ payload },{ put , call , select }){
                yield put({type:'showOpeningLoading',payload:{saasPackageOpeningModalButtonLoading:true}});
                let { ret } = yield call(OpeningPackage,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    message.success(ret.errorMessage);
                    yield put({
                        type:'updateState',
                        payload:{
                            saasPackageOpeningModalVisible : false,
                            saasPackageOpeningModalTenantSelectVisible : false,
                            saasPackageOpeningModalSearchType : '1',
                            saasPackageOpeningModalTenantSelectContent : [],
                            saasPackageOpeningModalTransferAllcontent : [],      //机构穿梭框左边数据
                            saasPackageOpeningModalTransferTargetContent : [],   //机构穿梭框右边数据
                        }
                    });
                    yield put({type:'AfteOpeningPackagerOperationQuery',});
                }else if( ret && ret.errorMessage ){
                    message.error(ret.errorMessage);
                }else{
                    message.error('您的网络状况不佳，请检查您的网络');
                }
                yield put({type:'closeOpeningLoading',payload:{saasPackageOpeningModalButtonLoading:false,saasPackageOpeningModalSearchType:'1'}});
            },
    },

    reducers: {
        //更新state
        updateState(state , action) {
            return { ...state, ...action.payload };
        },
        /*套餐管理列表加载中*/
        showTableLoading(state , action){
            return { ...state, ...action.payload, saasPackageManageLoading : true };
        },
        /*套餐管理列表取消加载中*/
        closeTableLoading(state , action){
            return { ...state, ...action.payload, saasPackageManageLoading : false };
        },
        /*模块列表加载中*/
        showModularLoading(state , action){
            return { ...state, ...action.payload, modularListLoading : true };
        },
        /*模块列表取消加载*/
        closeModularLoading(state , action){
            return { ...state, ...action.payload, modularListLoading : false };
        },
        /*菜单列表加载中*/
        showMenuLoading(state , action){
            return { ...state, ...action.payload, menuListLoading : true };
        },
        /*菜单列表取消加载*/
        closeMenuLoading(state , action){
            return { ...state, ...action.payload, menuListLoading : false };
        },
        /*套餐开通列表加载中*/
        showOpeningLoading(state , action){
            return { ...state, ...action.payload, saasPackageOpeningLoading : true };
        },
        /*套餐开通列表取消加载*/
        closeOpeningLoading(state , action){
            return { ...state, ...action.payload, saasPackageOpeningLoading : false };
        },

        //根据角色编号渲染角色拥有的菜单项
        showRoleFuncs(state,action) {
            let {allMenuList,allModularList,} = state;
            let {id,index} = action.payload;

            let menuCheckedArray = [];
            let modularSelectedProps = {};

            allModularList && allModularList.length > 0 && allModularList.map(function(roleItem) {
                if(roleItem.id == id) {
                    if(roleItem.resources && roleItem.resources != '' && roleItem.resources != null ){
                        menuCheckedArray = roleItem.resources.split(',');
                    }
                    modularSelectedProps = roleItem;
                }
            });

            let treeFunctionList = [];                              //tree勾选的菜单选项

            let isCheck = function(specialMenu){
                let resultFlg = false;
                //判断当前节点有没有被选中
                if(menuCheckedArray.findIndex(function(x) {
                    return x == specialMenu.id;
                }) > -1) {
                    //判断是否有子节点
                    if(specialMenu.list){
                        let flg_all = true;     //是否所有子节点都被选中
                        let flg_none = true;    //是否子节点一个都没有选中

                        let children = specialMenu.list;

                        children && children.length > 0 && children.map(function(childItem) {
                            if(isCheck(childItem)) {
                                flg_none = false;
                            } else {
                                flg_all = false;
                            }
                        });
                        resultFlg = flg_all;
                    } else {
                        resultFlg = true;
                    }
                }

                if(resultFlg) {
                    treeFunctionList.push(specialMenu.id+'');
                }
                return resultFlg;
            }

            for(let i in allMenuList){
                isCheck(allMenuList[i]);
            }

            return { ...state, menuCheckedArray: treeFunctionList, wetherSelectModularItem: index, modularSelectedProps};
        },
    },
};
