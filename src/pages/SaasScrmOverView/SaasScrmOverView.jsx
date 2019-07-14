import React, { PropTypes } from 'react';
import { Tabs, Icon, Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import qs from 'qs';

/*banner*/
import SaasScrmViewBannerTable from '../../components/SaasScrmOverView/saas-scrm-overview-banner/SaasScrmViewBannerTable';
import SaasScrmViewBannerAddOrEditBannerModal from '../../components/SaasScrmOverView/saas-scrm-overview-banner/SaasScrmViewBannerAddOrEditBannerModal';

/** 最新推荐 */
import Recommend from '../../components/SaasScrmOverView/recommend/Recommend'
import AddOrEditRecommendModal from '../../components/SaasScrmOverView/recommend/AddOrEditRecommendModal'

/*免费申请试用*/
import SaasScrmOverViewFreeTrailSearch from '../../components/SaasScrmOverView/saas-scrm-overview-freeTrail/SaasScrmOverViewFreeTrailSearch';
import SaasScrmOverViewFreeTrailTable from '../../components/SaasScrmOverView/saas-scrm-overview-freeTrail/SaasScrmOverViewFreeTrailTable';

/*机构成功案例*/
import SaasScrmOverviewSuccessCaseTable from '../../components/SaasScrmOverView/saas-scrm-overview-success-case/SaasScrmOverviewSuccessCaseTable';
import SaasScrmOverviewSuccessCaseAddOrEditModal from '../../components/SaasScrmOverView/saas-scrm-overview-success-case/SaasScrmOverviewSuccessCaseAddOrEditModal';

/*营销咨询*/
import SaasScrmOverViewYingXiaoZiXunTable from '../../components/SaasScrmOverView/saas-scrm-overview-yingxiaozixun/SaasScrmOverViewYingXiaoZiXunTable';
import SaasScrmOverViewYingXiaoZiXunAddOrEditModal from '../../components/SaasScrmOverView/saas-scrm-overview-yingxiaozixun/SaasScrmOverViewYingXiaoZiXunAddOrEditModal';

const TabPane = Tabs.TabPane;

function SaasScrmOverView({ dispatch, saasScrmOverView }) {

    let {
        /*banner*/
            /*banner管理table*/
            saasScrmOverViewBannerPageIndex,                //banner管理页码
            saasScrmOverViewBannerPageSize,                 //banner管理每页条数
            saasScrmOverViewBannerTableData,                //banner管理管理列表数据
            saasScrmOverViewBannerDataTotal,                //banner管理管理列表条数
            saasScrmOverViewBannerTableLoading,             //banner管理管理列表加载状态

            /*banner新增编辑*/
            addOrEditSaasScrmOverViweBannerModalType,       //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweBannerModalVisible,    //套餐管理modal是否显示
            addOrEditSaasScrmOverViweBannerModalData,       //套餐管理编辑时回填数据
            addOrEditSaasScrmOverViweBannerButtonLoading,   //套餐管理按钮是否加载状态

        /*最新推荐*/
            /*最新推荐管理table*/
            recommendData,          // 最新推荐数据
            recommendLoading,
            recommendPageIndex,     // 推荐当前页数
            recommendPageSize,      // 当前条数
            recommendTotal,         // 总条数

            /*最新推荐新增编辑*/
            recommendType,          //新增修改类型('add'/'edit')
            recommendVisible,       //modal是否显示
            recommendInfo,          //编辑时回填数据
            addRecommendLoading,    //按钮是否加载状态

        /*免费申请试用*/
            /*免费申请试用search*/
            saasScrmOverViewFreeTrailSearchVisible,         //免费申请试用搜索栏是否显示
            saasScrmOverViewFreeTrailSearchContent,         //免费申请试用搜索栏搜索内容

            /*免费申请试用table*/
            saasScrmOverViewFreeTrailPageIndex,             //免费申请试用管理页码
            saasScrmOverViewFreeTrailPageSize,              //免费申请试用管理每页条数
            saasScrmOverViewFreeTrailTableData,             //免费申请试用管理管理列表数据
            saasScrmOverViewFreeTrailDataTotal,             //免费申请试用管理管理列表条数
            saasScrmOverViewFreeTrailTableLoading,          //免费申请试用管理管理列表加载状态

        /*机构成功案例*/
            /*机构成功案例table*/
            saasScrmOverviewSuccessCasePageIndex,           //机构成功案例管理页码
            saasScrmOverviewSuccessCasePageSize,            //机构成功案例管理每页条数
            saasScrmOverviewSuccessCaseTableData,           //机构成功案例管理管理列表数据
            saasScrmOverviewSuccessCaseDataTotal,           //机构成功案例管理管理列表条数
            saasScrmOverviewSuccessCaseTableLoading,        //机构成功案例管理管理列表加载状态

            /*机构成功案例新增编辑*/
            addOrEditSaasScrmOverViweSuccessCaseModalType,       //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweSuccessCaseModalVisible,    //套餐管理modal是否显示
            addOrEditSaasScrmOverViweSuccessCaseModalData,       //套餐管理编辑时回填数据
            addOrEditSaasScrmOverViweSuccessCaseButtonLoading,   //套餐管理按钮是否加载状态

        /*营销咨询*/
            /*营销咨询table*/
            saasScrmOverViewYingXiaoZiXunPageIndex,         //banner管理页码
            saasScrmOverViewYingXiaoZiXunPageSize,          //banner管理每页条数
            saasScrmOverViewYingXiaoZiXunTableData,         //banner管理管理列表数据
            saasScrmOverViewYingXiaoZiXunDataTotal,         //banner管理管理列表条数
            saasScrmOverViewYingXiaoZiXunTableLoading,      //banner管理管理列表加载状态

            /*新增编辑营销咨询*/
            addOrEditSaasScrmOverViweYingXiaoZiXunModalType,       //套餐管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible,    //套餐管理modal是否显示
            addOrEditSaasScrmOverViweYingXiaoZiXunModalData,       //套餐管理编辑时回填数据
            addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading,   //套餐管理按钮是否加载状态

            type,                                               //营销首页

    } = saasScrmOverView

    /*banner*/
        /*点击新增banner*/
        let AddOrEditBanner = function(type,data){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    addOrEditSaasScrmOverViweBannerModalVisible : true,
                    addOrEditSaasScrmOverViweBannerModalType : type,
                    addOrEditSaasScrmOverViweBannerModalData : data
                },
            });
        }

        /*新增编辑banner提交*/
        let AddOrEditSaasScrmOverViweBannerModalSubmit = function(data){
            if(addOrEditSaasScrmOverViweBannerModalType == 'add'){
                dispatch({
                    type:'saasScrmOverView/AddNewBanner',
                    payload:{
                        ...data
                    }
                });
            }else if(addOrEditSaasScrmOverViweBannerModalType == 'edit'){
                dispatch({
                    type:'saasScrmOverView/EditExistBanner',
                    payload:{
                        id : addOrEditSaasScrmOverViweBannerModalData.id,
                        ...data
                    }
                });
            }
        }

        /*新增编辑banner模态框关闭*/
        let AddOrEditSaasScrmOverViweBannerModalCancel = function(){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    addOrEditSaasScrmOverViweBannerModalVisible : false,
                },
            });
        }

        /*banner管理列表状态改变(分页等)*/
        let SaasScrmOverViewBannerTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    saasScrmOverViewBannerPageIndex : pagination.current-1,
                    saasScrmOverViewBannerPageSize : pagination.pageSize,
                },
            });
            dispatch({
                type: 'saasScrmOverView/GetBanner',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
        }

        /*banner改变上下架状态*/
        let SaasScrmOverViewBannerChangeStatus = function(data){
            if(data.status == '0' || data.status == 0){
                dispatch({
                    type:'saasScrmOverView/ChangeBannerStatus',
                    payload:{
                        id : data.id,
                        status : 1
                    }
                });
            }else if(data.status == '1' || data.status == 1){
                dispatch({
                    type:'saasScrmOverView/ChangeBannerStatus',
                    payload:{
                        id : data.id,
                        status : 0
                    }
                });
            }
        }

    /*免费申请试用*/
        /*搜索栏点击查询*/
        let SaasScrmOverViewFreeTrailSearchSubmit = function(data){
            dispatch({
                type:'saasScrmOverView/updateState',
                payload:{
                    saasScrmOverViewFreeTrailSearchContent : data,
                    saasScrmOverViewFreeTrailPageIndex : 0
                }
            });
            dispatch({
                type:'saasScrmOverView/GetFreeTrail',
                payload:{
                    pageIndex : 0,
                    pageSize : saasScrmOverViewFreeTrailPageSize,
                    ...data
                }
            });
        }

        /*搜索栏点击清除*/
        let SaasScrmOverViewFreeTrailSearchReset = function(){
            dispatch({
                type:'saasScrmOverView/updateState',
                payload:{
                    saasScrmOverViewFreeTrailSearchContent : {},
                    saasScrmOverViewFreeTrailPageIndex : 0
                }
            });
            dispatch({
                type:'saasScrmOverView/GetFreeTrail',
                payload:{
                    pageIndex : 0,
                    pageSize : saasScrmOverViewFreeTrailPageSize,
                }
            });
        }

        /*免费申请试用列表点击筛选*/
        let ShowScrmOverViewFreeTrailSearch = function(){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    saasScrmOverViewFreeTrailSearchVisible : !saasScrmOverViewFreeTrailSearchVisible
                },
            });
        }

        /*免费申请试用管理列表状态改变(分页等)*/
        let SaasScrmOverViewFreeTrailTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    saasScrmOverViewFreeTrailPageIndex : pagination.current-1,
                    saasScrmOverViewFreeTrailPageSize : pagination.pageSize,
                },
            });
            dispatch({
                type:'saasScrmOverView/GetFreeTrail',
                payload:{
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...saasScrmOverViewFreeTrailSearchContent
                }
            });
        }

        /*免费申请试用改变处理未处理状态*/
        let SaasScrmOverViewFreeTrailChangeStatus = function(data){
            dispatch({
                type:'saasScrmOverView/ChangeFreeTrailStatus',
                payload:{
                    status : 1,
                    id : data.id
                }
            });
        }

        /*免费申请试用列表导出*/
        let ShowScrmOverViewFreeTrailExport = function(){
            window.open(`${BASE_URL}/marketingHomeApply/exportApplyList?${qs.stringify(saasScrmOverViewFreeTrailSearchContent)}`)
        }

    /*机构成功案例*/
        /*新增编辑机构成功案例*/
        let AddOrEditSuccessCase = function(type,data){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    addOrEditSaasScrmOverViweSuccessCaseModalVisible : true,
                    addOrEditSaasScrmOverViweSuccessCaseModalType : type,
                    addOrEditSaasScrmOverViweSuccessCaseModalData : data
                },
            });
        }

        /*机构成功案例管理列表状态改变(分页等)*/
        let SaasScrmOverviewSuccessCaseTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    saasScrmOverviewSuccessCasePageIndex : pagination.current-1,
                    saasScrmOverviewSuccessCasePageSize : pagination.pageSize,
                },
            });
            dispatch({
                type: 'saasScrmOverView/GetSuccessCase',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
        }

        /*新增编辑机构成功案例表单提交*/
        let AddOrEditSaasScrmOverViweSuccessCaseModalSubmit = function(data){
            if(addOrEditSaasScrmOverViweSuccessCaseModalType == 'add'){
                dispatch({
                    type:'saasScrmOverView/AddNewSuccessCase',
                    payload:{
                        ...data
                    }
                });
            }else if(addOrEditSaasScrmOverViweSuccessCaseModalType == 'edit'){
                dispatch({
                    type:'saasScrmOverView/EditExistSuccessCase',
                    payload:{
                        id : addOrEditSaasScrmOverViweSuccessCaseModalData.id,
                        ...data
                    }
                });
            }
        }

        /*新增编辑机构成功案例表单关闭*/
        let AddOrEditSaasScrmOverViweSuccessCaseModalCancel = function(){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    addOrEditSaasScrmOverViweSuccessCaseModalVisible : false,
                },
            });
        }

        /*机构成功案例改变上下架*/
        let SaasScrmOverviewSuccessCaseChangeStatus = function(data){
            if(data.status == '0' || data.status == 0){
                dispatch({
                    type:'saasScrmOverView/ChangeSuccessCaseStatus',
                    payload:{
                        id : data.id,
                        status : 1
                    }
                });
            }else if(data.status == '1' || data.status == 1){
                dispatch({
                    type:'saasScrmOverView/ChangeSuccessCaseStatus',
                    payload:{
                        id : data.id,
                        status : 0
                    }
                });
            }
        }

    /*营销咨询*/
        /*新增编辑营销咨询*/
        let AddOrEditYingXiaoZiXun = function(type,data){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible : true,
                    addOrEditSaasScrmOverViweYingXiaoZiXunModalType : type,
                    addOrEditSaasScrmOverViweYingXiaoZiXunModalData : data
                },
            });
        }

        /*营销咨询状态改变(分页等)*/
        let SaasScrmOverViewYingXiaoZiXunTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    saasScrmOverViewYingXiaoZiXunPageIndex : pagination.current-1,
                    saasScrmOverViewYingXiaoZiXunPageSize : pagination.pageSize,
                },
            });
            dispatch({
                type: 'saasScrmOverView/GetYingXiaoZiXun',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
        }

        /*新增编辑营销咨询表单提交*/
        let AddOrEditSaasScrmOverViweYingXiaoZiXunModalSubmit = function(data){
            if(addOrEditSaasScrmOverViweYingXiaoZiXunModalType == 'add'){
                dispatch({
                    type:'saasScrmOverView/AddNewYingXiaoZiXun',
                    payload:{
                        ...data
                    }
                })
            }else if(addOrEditSaasScrmOverViweYingXiaoZiXunModalType == 'edit'){
                dispatch({
                    type:'saasScrmOverView/EditExistYingXiaoZiXun',
                    payload:{
                        id : addOrEditSaasScrmOverViweYingXiaoZiXunModalData.id,
                        ...data
                    }
                })
            }
        }

        /*新增编辑营销咨询表单关闭*/
        let AddOrEditSaasScrmOverViweYingXiaoZiXunModalCancel = function(){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible : false,
                },
            });
        }

        /*营销咨询改变上下架状态*/
        let SaasScrmOverViewYingXiaoZiXunChangeStatus = function(data){
            if(data.status == '0' || data.status == 0){
                dispatch({
                    type:'saasScrmOverView/ChangeYingXiaoZiXunStatus',
                    payload:{
                        id : data.id,
                        status : 1
                    }
                });
            }else if(data.status == '1' || data.status == 1){
                dispatch({
                    type:'saasScrmOverView/ChangeYingXiaoZiXunStatus',
                    payload:{
                        id : data.id,
                        status : 0
                    }
                });
            }
        }

        let radioChangeFunc = function(value){
            dispatch({
                type:'saasScrmOverView/updateState',
                payload:{
                   type : value,
                }
            });
        }

    /*最新推荐*/
        /*新增编辑最新推荐*/
        function AddOrEditRecommend(type, data){
            if(type == 'add' && recommendData.length >= 5){
                Modal.warning({
                    title: '提示',
                    content: '最新推荐内容已达到5项，无法再添加',
                });
                return
            }
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    recommendVisible : true,
                    recommendType : type,
                    recommendInfo : data
                },
            });
        }

        /*删除最新推荐*/
        function removeRecommend(row){
            dispatch({
                type: 'saasScrmOverView/removeRecommend',
                payload: {
                    id: row.id,
                    status: '0'
                },
            })
        }

        /*最新推荐管理列表状态改变*/
        function recommendTableChange(pagination){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    recommendPageIndex : pagination.current-1,
                    recommendPageSize : pagination.pageSize,
                },
            });
            dispatch({
                type: 'saasScrmOverView/getRecommend',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
        }

        /*最新推荐表单提交*/
        function recommendSubmit(values){
            if(recommendType == 'add'){
                dispatch({
                    type: 'saasScrmOverView/addRecommend',
                    payload: {
                        ...values
                    },
                });
            } else if(recommendType == 'edit') {
                dispatch({
                    type: 'saasScrmOverView/editRecommend',
                    payload: {
                        ...values,
                        id: recommendInfo.id
                    },
                });
            }
        }

        /*最新推荐取消*/
        function recommendCancel(){
            dispatch({
                type: 'saasScrmOverView/updateState',
                payload: {
                    recommendVisible : false,
                },
            });
        }

    /*banner属性*/

        /*banner管理table属性*/
        let saasScrmViewBannerTableProps = {
            saasScrmOverViewBannerPageIndex,                //banner管理页码
            saasScrmOverViewBannerPageSize,                 //banner管理每页条数
            saasScrmOverViewBannerTableData,                //banner管理管理列表数据
            saasScrmOverViewBannerDataTotal,                //banner管理管理列表条数
            saasScrmOverViewBannerTableLoading,             //banner管理管理列表加载状态

            AddOrEditBanner,                                //新增banner
            SaasScrmOverViewBannerTableOnChange,            //banner管理列表状态改变(分页等)
            SaasScrmOverViewBannerChangeStatus,             //banner改变上下架状态
        }

        /*banner新增编辑属性*/
        let saasScrmViewBannerAddOrEditBannerModalProps = {
            addOrEditSaasScrmOverViweBannerModalType,       //banner管理新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweBannerModalVisible,    //banner管理modal是否显示
            addOrEditSaasScrmOverViweBannerModalData,       //banner管理编辑时回填数据
            addOrEditSaasScrmOverViweBannerButtonLoading,   //banner管理按钮是否加载状态

            AddOrEditSaasScrmOverViweBannerModalSubmit,     //banner管理表单提交
            AddOrEditSaasScrmOverViweBannerModalCancel,     //banner管理关闭modal

            type,                                           //营销首页
            radioChangeFunc,                                //类型选择函数
        }

    /*免费申请试用属性*/
        /*免费申请试用search*/
        let saasScrmOverViewFreeTrailSearchProps = {
            SaasScrmOverViewFreeTrailSearchSubmit,      //搜索栏点击查询
            SaasScrmOverViewFreeTrailSearchReset,       //搜索栏点击清除条件
        }

        /*免费申请试用table属性*/
        let saasScrmOverViewFreeTrailTableProps = {
            saasScrmOverViewFreeTrailPageIndex,             //免费申请试用管理页码
            saasScrmOverViewFreeTrailPageSize,              //免费申请试用管理每页条数
            saasScrmOverViewFreeTrailTableData,             //免费申请试用管理管理列表数据
            saasScrmOverViewFreeTrailDataTotal,             //免费申请试用管理管理列表条数
            saasScrmOverViewFreeTrailTableLoading,          //免费申请试用管理管理列表加载状态

            ShowScrmOverViewFreeTrailSearch,                //免费申请试用列表点击筛选
            SaasScrmOverViewFreeTrailTableOnChange,         //免费申请试用管理列表状态改变(分页等)
            SaasScrmOverViewFreeTrailChangeStatus,          //免费申请试用改变处理未处理状态
            ShowScrmOverViewFreeTrailExport,                //免费申请试用列表导出
        }

    /*机构成功案例属性*/
        /*机构成功案例table属性*/
        let saasScrmOverviewSuccessCaseTableProps = {
            saasScrmOverviewSuccessCasePageIndex,           //机构成功案例管理页码
            saasScrmOverviewSuccessCasePageSize,            //机构成功案例管理每页条数
            saasScrmOverviewSuccessCaseTableData,           //机构成功案例管理管理列表数据
            saasScrmOverviewSuccessCaseDataTotal,           //机构成功案例管理管理列表条数
            saasScrmOverviewSuccessCaseTableLoading,        //机构成功案例管理管理列表加载状态

            AddOrEditSuccessCase,                           //新增编辑机构成功案例
            SaasScrmOverviewSuccessCaseTableOnChange,       //机构成功案例管理列表状态改变(分页等)
            SaasScrmOverviewSuccessCaseChangeStatus,        //机构成功案例改变处理未处理状态
        }

        /*机构成功案例新增编辑modal属性*/
        let saasScrmOverviewSuccessCaseAddOrEditModalProps = {
            addOrEditSaasScrmOverViweSuccessCaseModalType,       //机构成功案例新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweSuccessCaseModalVisible,    //机构成功案例modal是否显示
            addOrEditSaasScrmOverViweSuccessCaseModalData,       //机构成功案例编辑时回填数据
            addOrEditSaasScrmOverViweSuccessCaseButtonLoading,   //机构成功案例按钮是否加载状态

            AddOrEditSaasScrmOverViweSuccessCaseModalSubmit,     //机构成功案例表单提交
            AddOrEditSaasScrmOverViweSuccessCaseModalCancel,     //机构成功案例关闭modal
        }

    /*营销咨询属性*/
        /*营销咨询table属性*/
        let saasScrmOverViewYingXiaoZiXunTableProps = {
            saasScrmOverViewYingXiaoZiXunPageIndex,         //营销咨询页码
            saasScrmOverViewYingXiaoZiXunPageSize,          //营销咨询每页条数
            saasScrmOverViewYingXiaoZiXunTableData,         //营销咨询列表数据
            saasScrmOverViewYingXiaoZiXunDataTotal,         //营销咨询列表条数
            saasScrmOverViewYingXiaoZiXunTableLoading,      //营销咨询列表加载状态

            AddOrEditYingXiaoZiXun,                         //新增编辑营销咨询
            SaasScrmOverViewYingXiaoZiXunTableOnChange,     //营销咨询状态改变(分页等)
            SaasScrmOverViewYingXiaoZiXunChangeStatus,      //营销咨询改变上下架状态
        }

        /*新增编辑营销咨询属性*/
        let saasScrmOverViewYingXiaoZiXunAddOrEditModalProps = {
            addOrEditSaasScrmOverViweYingXiaoZiXunModalType,       //营销咨询新增修改类型('add'/'edit')
            addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible,    //营销咨询modal是否显示
            addOrEditSaasScrmOverViweYingXiaoZiXunModalData,       //营销咨询编辑时回填数据
            addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading,   //营销咨询按钮是否加载状态

            AddOrEditSaasScrmOverViweYingXiaoZiXunModalSubmit,     //营销咨询表单提交
            AddOrEditSaasScrmOverViweYingXiaoZiXunModalCancel,     //营销咨询关闭modal
        }

    /** 最新推荐属性 */
        // table属性
        const recommendProps = {
            recommendData,          // 最新推荐数据
            recommendLoading,
            recommendPageIndex,     // 推荐当前页数
            recommendPageSize,      // 当前条数
            recommendTotal,         // 总条数

            /** 方法 */
            AddOrEditRecommend,     // 新增编辑推荐
            removeRecommend,        // 删除推荐
            recommendTableChange,   // 管理列表状态改变(分页等)
        }
        // 新增编辑属性
        const recommendAaddProps = {
            recommendType,          //新增修改类型('add'/'edit')
            recommendVisible,       //modal是否显示
            recommendInfo,          //编辑时回填数据
            addRecommendLoading,    //按钮是否加载状态

            recommendSubmit,        //表单提交
            recommendCancel,        //关闭modal
        }

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="bars" />Banner</span>} key="1">
                    <SaasScrmViewBannerTable {...saasScrmViewBannerTableProps}/>
                    {addOrEditSaasScrmOverViweBannerModalVisible == true ? <SaasScrmViewBannerAddOrEditBannerModal {...saasScrmViewBannerAddOrEditBannerModalProps}/> : null}
                </TabPane>
                <TabPane tab={<span><Icon type="star-o" />最新推荐</span>} key="5">
                    <Recommend {...recommendProps} />
                    {recommendVisible && <AddOrEditRecommendModal {...recommendAaddProps} />}
                </TabPane>
                <TabPane tab={<span><Icon type="book" />申请试用招生方案</span>} key="2">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {saasScrmOverViewFreeTrailSearchVisible ? [
                           <SaasScrmOverViewFreeTrailSearch {...saasScrmOverViewFreeTrailSearchProps} key="search_queue_saas_scrm_overview_freetrail"/>
                        ]:null}
                    </QueueAnim>
                    <SaasScrmOverViewFreeTrailTable {...saasScrmOverViewFreeTrailTableProps}/>
                </TabPane>
                <TabPane tab={<span><Icon type="edit" />机构成功案例</span>} key="3">
                    <SaasScrmOverviewSuccessCaseTable {...saasScrmOverviewSuccessCaseTableProps}/>
                    { addOrEditSaasScrmOverViweSuccessCaseModalVisible == true ? <SaasScrmOverviewSuccessCaseAddOrEditModal {...saasScrmOverviewSuccessCaseAddOrEditModalProps}/> : null }
                </TabPane>
                <TabPane tab={<span><Icon type="search" />营销咨询</span>} key="4">
                    <SaasScrmOverViewYingXiaoZiXunTable {...saasScrmOverViewYingXiaoZiXunTableProps}/>
                    { addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible == true ? <SaasScrmOverViewYingXiaoZiXunAddOrEditModal {...saasScrmOverViewYingXiaoZiXunAddOrEditModalProps}/> : null }
                </TabPane>
            </Tabs>
        </div>
    );
}

function mapStateToProps({ saasScrmOverView }) {
    return { saasScrmOverView };
}

export default connect(mapStateToProps)(SaasScrmOverView);
