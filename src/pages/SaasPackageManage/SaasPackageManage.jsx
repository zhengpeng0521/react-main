import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import qs from 'qs';

/*Saas模块管理*/
import SaasModularManageList from '../../components/SaasPackageManage/saas-modular-manage/SaasModularManage';
import SaasModularManageAddOrEditModular from '../../components/SaasPackageManage/saas-modular-manage/SaasModularManageAddOrEditModular';

/*Saas套餐管理*/
import SaasPackageManageSearch from '../../components/SaasPackageManage/saas-package-manage/SaasPackageManageSearch';
import SaasPackageManageTable from '../../components/SaasPackageManage/saas-package-manage/SaasPackageManageTable';
import SaasPackageCheckIncludeModularModal from '../../components/SaasPackageManage/saas-package-manage/SaasPackageCheckIncludeModularModal';
import SaasPackageManageAddOrEditModal from '../../components/SaasPackageManage/saas-package-manage/SaasPackageManageAddOrEditModal';

/*Saas套餐开通*/
import SaasPackageOpeningSearch from '../../components/SaasPackageManage/saas-package-opening/SaasPackageOpeningSearch';
import SaasPackageOpeningTable from '../../components/SaasPackageManage/saas-package-opening/SaasPackageOpeningTable';
import SaasPackageOpeningModal from '../../components/SaasPackageManage/saas-package-opening/SaasPackageOpeningModal';

const TabPane = Tabs.TabPane;

function SaasPackageManage({ dispatch, saasPackageManage }) {

    let {
        /*Saas模块管理*/
            /*模块列表*/
            modularResType,                             //模块类型(1机构/2总部)
            modularListLoading,                         //模块列表加载状态
            allModularList,                             //模块列表数据
            wetherSelectModularItem,                    //选中模块的索引项
            modularSelectedProps,                       //选中的模块所拥有的属性

            /*新增编辑模块modal*/
            addOrEditSaasModularModalType,              //模块管理新增修改类型('add'/'edit')
            addOrEditSaasModularModalVisible,           //模块管理modal是否显示
            addOrEditSaasModularModalData,              //模块管理编辑时回填数据
            addOrEditSaasModularButtonLoading,          //模块管理按钮是否加载状态

            /*菜单列表*/
            menuListLoading,                            //菜单加载状态
            allMenuList,                                //菜单列表内容
            menuCheckedArray,                           //选中的菜单
            secondListArray,                            //打开的树结构(默认是二级菜单)

        /*Saas套餐管理*/
            /*套餐管理搜索栏*/
            saasPackageManageSearchVisible,             //搜索栏是否展示
            saasPackageManageSearchData,                //搜索栏搜索数据

            /*套餐管理列表*/
            saasPackageManagePageIndex,                 //套餐页码
            saasPackageManagePageSize,                  //套餐每页条数
            saasPackageManageTableData,                 //套餐管理列表数据
            saasPackageManagetotal,                     //套餐管理列表条数
            saasPackageManageLoading,                   //套餐管理列表加载状态

            /*查看套餐包含模块*/
            saasPackageCheckVisible,                    //查看包含模块modal显示
            saasPackageCheckIncludeData,                //查看包含模块数据

            /*套餐管理新增编辑套餐*/
            addOrEditSaasPackageModalType,              //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasPackageModalVisible,           //套餐管理modal是否显示
            addOrEditSaasPackageModalData,              //套餐管理编辑时回填数据
            addOrEditSaasPackageButtonLoading,          //套餐管理按钮是否加载状态
            addOrEditSaasPackageransferAllContent,      //穿梭框内所有模板的值
            addOrEditSaasPackageTransferTargetContent,  //穿梭框所选中的模板

        /*Saas套餐开通*/
            /*套餐开通搜索栏*/
            saasPackageOpeningSearchVisible,            //搜索栏是否展示
            saasPackageOpeningSearchData,               //搜索栏搜索数据

            /*套餐开通列表*/
            saasPackageOpeningPageIndex,                //套餐页码
            saasPackageOpeningPageSize,                 //套餐每页条数
            saasPackageOpeningTableData,                //套餐管理列表数据
            saasPackageOpeningTotal,                    //套餐管理列表条数
            saasPackageOpeningLoading,                  //套餐管理列表加载状态

            /*套餐开通表单*/
            saasPackageOpeningModalVisible,                 //modal是否显示
            saasPackageOpeningModalButtonLoading,           //modal按钮是否在加载状态
            saasPackageOpeningModalSelectContent,           //套餐列表数据
            saasPackageOpeningModalSearchType,              //机构搜索方式(0按机构和机构手机号/1按租户查询)
            saasPackageOpeningModalTenantSelectVisible,     //租户下拉列表是否显示(搜素租户之后才显示)
            saasPackageOpeningModalTenantSelectContent,     //租户下拉列表数据
            saasPackageOpeningModalOrgArray,                //接口获取的机构原始数据
            saasPackageOpeningModalTransferAllcontent,      //机构穿梭框左边数据
            saasPackageOpeningModalTransferTargetContent,   //机构穿梭框右边数据

    } = saasPackageManage

    /*Saas模块管理*/
        /*模块列表*/
            /*查看模块中包含的菜单*/
            let CheckModular = function(item,index){
                dispatch({
                    type:'saasPackageManage/showRoleFuncs',
                    payload:{
                        id : item.id,
                        index,
                    }
                });
            }
            /*切换系统类型(1机构/2总部)*/
            let ModularResTypeOnChange = function(e){
                dispatch({
                    type : 'saasPackageManage/GetModularList',
                    payload : {
                        resType : e.target.value
                    }
                })
            }

        /*新增编辑模块*/
            /*打开新增编辑表单*/
            let AddOrEditModular = function(type,item){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        addOrEditSaasModularModalVisible : true,
                        addOrEditSaasModularModalData : item,
                        addOrEditSaasModularModalType : type
                    }
                });
            }

            /*模块新增编辑表单提交*/
            let AddOrEditSaasModularModalSubmit = function(data){
                if(addOrEditSaasModularModalType == 'add'){
                    dispatch({
                        type:'saasPackageManage/AddNewModular',
                        payload:{
                            ...data
                        }
                    });
                }else if(addOrEditSaasModularModalType == 'edit'){
                    dispatch({
                        type:'saasPackageManage/EditExistModular',
                        payload:{
                            id : modularSelectedProps.id,
                            ...data
                        }
                    });
                }
            }

            /*关闭modal*/
            let AddOrEditSaasModularModalCancel = function(){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        addOrEditSaasModularModalVisible : false
                    }
                });
            }

        /*菜单列表*/
            /*点击展开菜单*/
            let MenuListOnExpend = function(expandedKeys){
                //console.info('expandedKeys',expandedKeys);
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        secondListArray : expandedKeys,
                    }
                });
            }

            /*选中菜单*/
            let MenuListOnCheck = function(checkedKeys, e){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        menuCheckedArray : checkedKeys,
                    }
                });
            }

            /*对应模块菜单保存并更新版本*/
            let SaveModularMenu = function(){
                dispatch({
                    type:'saasPackageManage/EditExistModular',
                    payload:{
                        id : modularSelectedProps.id,
                        resources : menuCheckedArray.join(','),
                    }
                });
            }

            /*对应模块菜单保存不更新版本*/
            let SaveModularMenuNotUpdate = function(){
                dispatch({
                    type:'saasPackageManage/EditExistModularNotUpdate',
                    payload:{
                        id : modularSelectedProps.id,
                        resources : menuCheckedArray.join(','),
                    }
                });
            }

    /*Saas套餐管理*/
        /*搜索栏*/
            /*搜索栏点击筛选*/
            let ShowPackageSearchTable = function(){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageManageSearchVisible : !saasPackageManageSearchVisible
                    },
                });
            }

            /*搜索栏点击查询*/
            let SaasPackageManageSearchSubmit = function(data){
                dispatch({
                    type:'saasPackageManage/GetPackageList',
                    payload:{
                        pageIndex : 0,
                        pageSize : saasPackageManagePageSize,
                        ...data
                    }
                });
            }

            /*搜索栏点击清除条件*/
            let SaasPackageManageSearchReset = function(){
                dispatch({
                    type:'saasPackageManage/GetPackageList',
                    payload:{
                        pageIndex : 0,
                        pageSize : saasPackageManagePageSize,
                    }
                });
            }

        /*table列表*/
            /*列表分页改变*/
            let SaasPackageManageTableOnChange = function(pagination, filters, sorter){
                dispatch({
                    type: 'saasPackageManage/GetPackageList',
                    payload: {
                        pageIndex : pagination.current-1,
                        pageSize : pagination.pageSize,
                        ...saasPackageManageSearchData
                    },
                });
            }

            /*套餐改变上下架状态*/
            let SaasPackageChangeStatus = function(data,type){
                if(type == 'reUp'){
                    dispatch({
                        type:'saasPackageManage/SaasPackageUpOrDown',
                        payload:{
                            status : 2,
                            id : data.id,
                        }
                    });
                }else if(data.status == '0' || data.status == 0 ){
                    dispatch({
                        type:'saasPackageManage/SaasPackageUpOrDown',
                        payload:{
                            status : 1,
                            id : data.id,
                        }
                    });
                }else if(data.status == '1' || data.status == 1){
                    dispatch({
                        type:'saasPackageManage/SaasPackageUpOrDown',
                        payload:{
                            status : 0,
                            id : data.id,
                        }
                    })
                }
            }

        /*查看套餐包含模块属性*/
            /*打开modal*/
            let CheckIncludeModular = function(passId){
                dispatch({
                    type:'saasPackageManage/ModalGetPackageList',
                    payload:{
                        pageIndex : 0,
                        pageSize : 9999,
                        passId,
                    }
                });
            }

            /*关闭modal*/
            let SaasPackageCheckIncludeModalCancel = function(){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        saasPackageCheckVisible : false,
                    }
                });
            }

        /*新增编辑套餐*/
            /*打开新增编辑套餐modal*/
            let AddOrEditPackage = function(type,data){
                if(type == 'edit'){
                    let array = [];
                    if(data.moduleInfo && data.moduleInfo.length > 0){
                        for(let i in data.moduleInfo){
                            array.push((data.moduleInfo)[i].moduleId);
                        }
                    }
                    dispatch({
                        type:'saasPackageManage/updateState',
                        payload:{
                            addOrEditSaasPackageModalVisible : true,
                            addOrEditSaasPackageModalType : type,
                            addOrEditSaasPackageModalData : data,
                            addOrEditSaasPackageTransferTargetContent : array,
                        }
                    });
                }else if(type == 'add'){
                    dispatch({
                        type:'saasPackageManage/updateState',
                        payload:{
                            addOrEditSaasPackageModalVisible : true,
                            addOrEditSaasPackageModalType : type,
                            addOrEditSaasPackageModalData : {},
                            addOrEditSaasPackageTransferTargetContent : [],
                        }
                    });
                }
            }

            /*关闭新增编辑套餐modal*/
            let AddOrEditSaasPackageModalCancel = function(){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        addOrEditSaasPackageModalVisible : false,
                    }
                });
            }

            /*表单提交*/
            let AddOrEditSaasPackageModalSubmit = function(data){
                if(addOrEditSaasPackageModalType == 'add'){
                    dispatch({
                        type:'saasPackageManage/AddNewPackage',
                        payload:{
                            ...data
                        }
                    });
                }else if(addOrEditSaasPackageModalType == 'edit'){
                    dispatch({
                        type:'saasPackageManage/EditExistPackage',
                        payload:{
                            id : addOrEditSaasPackageModalData.id,
                            ...data
                        }
                    });
                }
            }

            /*穿梭框onChange事件*/
            let AddOrEditFormActivityTransferhandleChange = function(targetKeys, direction, moveKeys){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        addOrEditSaasPackageTransferTargetContent : targetKeys,
                    }
                });
            }

    /*Saas套餐开通*/
        /*Saas套餐开通搜索栏*/
            /*点击筛选*/
            let ShowPackageOpeningSearchBar = function(){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageOpeningSearchVisible : !saasPackageOpeningSearchVisible,
                    },
                });
            }

            /*点击搜索*/
            let SaasPackageOpeningSearchSubmit = function(data){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageOpeningSearchData : data,
                        saasPackageOpeningPageIndex : 0,
                    },
                });
                dispatch({
                    type: 'saasPackageManage/GetPackingOpening',
                    payload: {
                        pageIndex : 0,
                        pageSize : saasPackageOpeningPageSize,
                        ...data
                    },
                });
            }

            /*点击清除条件*/
            let SaasPackageOpeningSearchReset = function(){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageOpeningSearchData : {},
                        saasPackageOpeningPageIndex : 0
                    },
                });
                dispatch({
                    type: 'saasPackageManage/GetPackingOpening',
                    payload: {
                        pageIndex : 0,
                        pageSize : saasPackageOpeningPageSize,
                    },
                });
            }

        /*Saas套餐开通table列表*/
            /*列表分页*/
            let SaasPackageOpeningTableOnChange = function(pagination, filters, sorter){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageOpeningPageIndex : pagination.current-1,
                        saasPackageOpeningPageSize : pagination.pageSize,
                    },
                });
                dispatch({
                    type: 'saasPackageManage/GetPackingOpening',
                    payload: {
                        pageIndex : pagination.current-1,
                        pageSize : pagination.pageSize,
                        ...saasPackageOpeningSearchData
                    },
                });
            }

            /*列表套餐设置状态*/
            let SetSaasPackageStatus = function(data){
                dispatch({
                    type: 'saasPackageManage/SetPackageOpeningType',
                    payload: {
                        orgId : data.orgId,
                        tenantId : data.tenantId,
                        orgAvailableResId : data.id
                    },
                });
            }

            /*按查询结果导出*/
            let ExportTableContent = function (){
                window.open(`${BASE_URL}/meal/exportOpenResPackages?${qs.stringify(saasPackageOpeningSearchData)}`)
            }

        /*Saas套餐开通表单*/
            /*点击套餐开通*/
            let OpeningPackage = function(){
                dispatch({
                    type: 'saasPackageManage/GetPackageSelectList',
                    payload:{
                        pageSize : 99999,
                        pageIndex : 0,
                        status : 1,
                        resType : '1'       //默认查询系统类型为机构的
                    }
                });
            }

            /*根据系统类型查询当前套餐*/
            let MealListResTypeOnChange = function(e){
                dispatch({
                    type: 'saasPackageManage/GetPackageSelectList',
                    payload:{
                        pageSize : 99999,
                        pageIndex : 0,
                        status : 1,
                        resType : e.target.value       //默认查询系统类型为机构的
                    }
                });
                dispatch({
                    type : 'saasPackageManage/updateState',
                    payload : {
                        saasPackageOpeningModalTenantSelectVisible : false,
                        saasPackageOpeningModalTransferAllcontent : []
                    }
                })
            }

            /*选择搜索方式onChange事件*/
            let SaasPackageOpeningModalChooseQueryType = function(value){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageOpeningModalSearchType : value,
                        saasPackageOpeningModalTenantSelectVisible : false,
                        saasPackageOpeningModalTenantSelectContent : [],     //租户下拉列表数据
                        saasPackageOpeningModalTransferAllcontent : [],      //机构穿梭框左边数据
                        saasPackageOpeningModalTransferTargetContent : [],   //机构穿梭框右边数据
                    },
                });
            }

            /*搜索通过机构名称或手机号搜索机构*/
            let SaasPackageOpeningModalSearchOrgNameOrTel = function(data,resType){
                dispatch({
                    type: 'saasPackageManage/GetOrgDetail',
                    payload: {
                        nameOrMobile : data,
                        orgKind : resType
                    },
                });
            }

            /*搜索租户列表*/
            let SaasPackageOpeningModalSearchTenant = function(id,name,tel){
                dispatch({
                    type: 'saasPackageManage/GetTenantDetail',
                    payload: {
                        id,
                        name,
                        tel,
                        pageIndex : 0,
                        pageSize : 99999,
                    },
                });
            }

            /*通过租户搜索机构*/
            let SaasPackageOpeningModalSearchOrgByTenant = function(id,resType){
                dispatch({
                    type: 'saasPackageManage/GetOrgByTenantId',
                    payload: {
                        id,
                        orgKind : resType
                    }
                });
            }

            /*穿梭款onChange事件*/
            let SaasPackageOpeningModalTransferhandleChange = function(targetKeys, direction, moveKeys){
                dispatch({
                    type:'saasPackageManage/updateState',
                    payload:{
                        saasPackageOpeningModalTransferTargetContent : targetKeys,
                    }
                });
            }

            /*查看套餐中的模块*/
            let SaasPackageOpeningModalCheckPackageType = function(value){
                console.info(value);
            }

            /*表单提交*/
            let SaasPackageOpeningModalSubmit = function(data){
                dispatch({
                    type:'saasPackageManage/OpeningPackage',
                    payload:{
                        ...data
                    }
                });
            }

            /*表单关闭*/
            let SaasPackageOpeningModalCancel = function(){
                dispatch({
                    type: 'saasPackageManage/updateState',
                    payload: {
                        saasPackageOpeningModalVisible : false,
                        saasPackageOpeningModalTenantSelectVisible : false,
                        saasPackageOpeningModalSearchType : '1',
                        saasPackageOpeningModalTenantSelectContent : [],
                        saasPackageOpeningModalTransferAllcontent : [],
                        saasPackageOpeningModalTransferTargetContent : [],
                    },
                });
            }

    /*Saas模块管理属性*/
        /*模块与菜单块管理列表属性*/
        let saasModularManageListProps = {
            /*模块列表*/
            modularResType,                     //模块类型(1机构/2总部)
            modularListLoading,                 //模块列表加载状态
            allModularList,                     //模块列表数据
            wetherSelectModularItem,            //选中模块的索引项
            ModularResTypeOnChange,             //切换套餐类型(1机构/2总部)
            CheckModular,                       //查看模块中包含的子模块和菜单
            AddOrEditModular,                   //打开新增编辑模块modal,入参为类型('add'/'edit')
            SaveModularMenu,                    //对应模块菜单保存更新版本
            SaveModularMenuNotUpdate,           //对应模块菜单保存不更新版本

            /*菜单列表*/
            menuListLoading,                    //菜单加载状态
            allMenuList,                        //菜单列表内容
            menuCheckedArray,                   //选中的菜单
            secondListArray,                    //打开的树结构(默认是二级菜单)
            MenuListOnExpend,                   //点击展开菜单
            MenuListOnCheck,                    //选中菜单
        }

        /*新增编辑模块modal属性*/
        let saasModularManageAddOrEditModularProps = {
            modularResType,                             //模块类型(1机构/2总部)
            addOrEditSaasModularModalType,              //模块管理新增修改类型('add'/'edit')
            addOrEditSaasModularModalVisible,           //模块管理modal是否显示
            addOrEditSaasModularModalData,              //模块管理编辑时回填数据
            addOrEditSaasModularButtonLoading,          //模块管理按钮是否加载状态

            AddOrEditSaasModularModalSubmit,            //模块新增编辑表单提交
            AddOrEditSaasModularModalCancel,            //关闭modal
        }

    /*Saas套餐管理属性*/
        /*套餐管理搜索栏属性*/
        let saasPackageManageSearchProps = {
            SaasPackageManageSearchSubmit,              //搜索栏点击查询
            SaasPackageManageSearchReset,               //搜索栏点击清除条件
        }

        /*套餐管理列表属性*/
        let saasPackageManageTableProps = {
            saasPackageManagePageIndex,                 //套餐页码
            saasPackageManagePageSize,                  //套餐每页条数
            saasPackageManageTableData,                 //套餐管理列表数据
            saasPackageManagetotal,                     //套餐管理列表条数
            saasPackageManageLoading,                   //套餐管理列表加载状态

            AddOrEditPackage,                           //新增套餐
            ShowPackageSearchTable,                     //点击筛选
            SaasPackageManageTableOnChange,             //套餐管理列表状态改变(分页等)
            SaasPackageChangeStatus,                    //套餐改变上下架状态
            CheckIncludeModular,                        //查看套餐内包含的模板
        }

        /*查看套餐包含模块属性*/
        let saasPackageCheckIncludeModularModalProps = {
            saasPackageCheckVisible,                    //查看包含模块modal显示
            saasPackageCheckIncludeData,                //查看包含模块数据
            SaasPackageCheckIncludeModalCancel,         //查看包含模块modal关闭
        }

        /*套餐管理新增修改属性*/
        let saasPackageManageAddOrEditProps = {
            modularResType,                             //模块类型(1机构/2总部)
            addOrEditSaasPackageModalType,              //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasPackageModalVisible,           //套餐管理modal是否显示
            addOrEditSaasPackageModalData,              //套餐管理编辑时回填数据
            addOrEditSaasPackageButtonLoading,          //套餐管理按钮是否加载状态

            addOrEditSaasPackageransferAllContent,      //穿梭框内所有模板的值
            addOrEditSaasPackageTransferTargetContent,  //穿梭框所选中的模板

            ModularResTypeOnChange,                     //切换系统类型(1机构/2总部)

            AddOrEditSaasPackageModalSubmit,            //表单提交
            AddOrEditSaasPackageModalCancel,            //关闭modal
            AddOrEditFormActivityTransferhandleChange,  //穿梭框onChange事件
        }

    /*Saas套餐开通属性*/
        /*Saas套餐开通搜索栏属性*/
        let saasPackageOpeningSearchProps = {
            SaasPackageOpeningSearchSubmit,      //搜索栏点击查询
            SaasPackageOpeningSearchReset,       //搜索栏点击清除条件
        }

        /*Saas套餐开通列表属性*/
        let saasPackageOpeningTableProps = {
            saasPackageOpeningPageIndex,        //套餐页码
            saasPackageOpeningPageSize,         //套餐每页条数
            saasPackageOpeningTableData,        //套餐管理列表数据
            saasPackageOpeningTotal,            //套餐管理列表条数
            saasPackageOpeningLoading,          //套餐管理列表加载状态

            OpeningPackage,                     //开通套餐
            ShowPackageOpeningSearchBar,        //点击筛选
            SaasPackageOpeningTableOnChange,    //套餐管理列表状态改变(分页等)
            SetSaasPackageStatus,               //套餐设置状态
            ExportTableContent,                 //按查询结果导出
        }

        /*Saas套餐开通表单属性*/
        let saasPackageOpeningModalProps = {
            saasPackageOpeningModalVisible,                 //modal是否显示
            saasPackageOpeningModalButtonLoading,           //modal按钮是否在加载状态
            saasPackageOpeningModalSelectContent,           //套餐列表数据
            saasPackageOpeningModalSearchType,              //机构搜索方式(0按机构和机构手机号/1按租户查询)
            saasPackageOpeningModalTenantSelectVisible,     //租户下拉列表是否显示(搜素租户之后才显示)
            saasPackageOpeningModalTenantSelectContent,     //租户下拉列表数据
            saasPackageOpeningModalOrgArray,                //接口获取的机构原始数据
            saasPackageOpeningModalTransferAllcontent,      //机构穿梭框左边数据
            saasPackageOpeningModalTransferTargetContent,   //机构穿梭框右边数据

            MealListResTypeOnChange,                        //根据系统类型查询当前套餐
            SaasPackageOpeningModalCancel,                  //模态框关闭
            SaasPackageOpeningModalChooseQueryType,         //选择搜索方式onChange事件
            SaasPackageOpeningModalTransferhandleChange,    //穿梭款onChange事件
            CheckIncludeModular,                            //查看套餐中的模块
            SaasPackageOpeningModalSubmit,                  //表单提交
            SaasPackageOpeningModalSearchOrgNameOrTel,      //机构名称或手机号搜索
            SaasPackageOpeningModalSearchTenant,            //搜索租户列表
            SaasPackageOpeningModalSearchOrgByTenant,       //通过租户搜索机构
        }

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="book" />模块与菜单</span>} key="1">
                    <SaasModularManageList {...saasModularManageListProps} />
                    { addOrEditSaasModularModalVisible == true ? <SaasModularManageAddOrEditModular {...saasModularManageAddOrEditModularProps}/> : null}
                </TabPane>
                <TabPane tab={<span><Icon type="setting" />套餐设置</span>} key="2">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {saasPackageManageSearchVisible ? [
                           <SaasPackageManageSearch {...saasPackageManageSearchProps} key="search_queue_saas_package_mgr"/>
                        ]:null}
                    </QueueAnim>
                    <SaasPackageManageTable {...saasPackageManageTableProps} />
                    { saasPackageCheckVisible == true ? <SaasPackageCheckIncludeModularModal {...saasPackageCheckIncludeModularModalProps}/> : null }
                    { addOrEditSaasPackageModalVisible == true ? <SaasPackageManageAddOrEditModal {...saasPackageManageAddOrEditProps}/> : null}
                </TabPane>
                <TabPane tab={<span><Icon type="unlock" />套餐开通</span>} key="3">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {saasPackageOpeningSearchVisible ? [
                           <SaasPackageOpeningSearch {...saasPackageOpeningSearchProps} key="search_queue_saas_package_opening"/>
                        ]:null}
                    </QueueAnim>
                    <SaasPackageOpeningTable {...saasPackageOpeningTableProps}/>
                    { saasPackageOpeningModalVisible == true ? <SaasPackageOpeningModal {...saasPackageOpeningModalProps}/> : null }
                    { saasPackageCheckVisible == true ? <SaasPackageCheckIncludeModularModal {...saasPackageCheckIncludeModularModalProps}/> : null }
                </TabPane>
            </Tabs>
        </div>
    );
}

function mapStateToProps({ saasPackageManage }) {
    return { saasPackageManage };
}

export default connect(mapStateToProps)(SaasPackageManage);
