import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';
import qs from 'qs';

import WeiXinActivityCaseSearch from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-activity-case/WeiXinActivityCaseSearch';
import WeiXinActivityCaseList from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-activity-case/WeiXinActivityCaseList';

//预约试听
import WeiXinAppointCaseSearch from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-appoint-case/WeiXinAppointCaseSearch';
import WeiXinAppointCaseList from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-appoint-case/WeiXinAppointCaseList';

//活动管理
import WeiXinAdminiCaseSearch from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-admini-case/WeiXinAdminiCaseSearch';
import WeiXinAdminiCaseListContent from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-admini-case/WeiXinAdminiCaseList';



import WeiXinGameCaseSearch from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-game-case/WeiXinGameCaseSearch';
import WeiXinGameCaseList from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-game-case/WeiXinGameCaseList';

import WeiXinMarketCaseSearch from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-market-case/WeiXinMarketCaseSearch';
import WeiXinMarketCaseList from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-market-case/WeiXinMarketCaseList';

import WeiXinOfflineLeafletsCaseSearch from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-offline-leaflets-case/WeiXinOfflineLeafletsCaseSearch';
import WeiXinOfflineLeafletsCaseList from '../../../components/SaasWeixinMarketing/saas-case-manage/weixin-offline-leaflets-case/WeiXinOfflineLeafletsCaseList';

import SaasCaseManagePreviewModal from '../../../components/SaasWeixinMarketing/saas-case-manage/SaasCaseManagePreviewModal';

import styles from './CaseManage.less';

const TabPane = Tabs.TabPane;

function CaseManage({ dispatch, saasCaseManage }) {

    let {

        /*微信活动*/
        weiXinActivityCasePageSize,             //微信活动页面数据数量
        weiXinActivityCasePageIndex,            //微信活动页码

        weiXinActivityCaseSearchVisible,        //微信活动搜索框是否显示
        weiXinActivityCaseSearchSelectContent,  //微信活动模板名称下拉列表
        weiXinActivityCaseSearchData,           //微信活动搜索内容

        weiXinActivityCaseLoading,              //微信活动列表是否加载状态
        weiXinActivityCaseList,                 //微信活动列表数据
        weiXinActivityCaseTotal,                //微信活动列表数据总数

        weiXinActivitySortType,                 //微信活动排序类型(ASC： 正序，DESC：降序)
        weiXinActivitySortKey,                  //微信活动排序项目key

        /*微信游戏*/
        weiXinGameCasePageSize,                 //微信游戏页面数据数量
        weiXinGameCasePageIndex,                //微信游戏页码

        weiXinGameCaseSearchVisible,            //微信游戏搜索栏展示与否
        weiXinGameCaseSearchSelectContent,      //微信游戏模板名称下拉列表
        weiXinGameCaseSearchData,               //微信游戏搜索内容

        weiXinGameCaseLoading,                  //微信游戏列表是否加载状态
        weiXinGameCaseList,                     //微信游戏列表数据
        weiXinGameCaseTotal,                    //微信游戏列表数据总数

        weiXinGameSortType,                     //微信游戏排序类型(ASC： 正序，DESC：降序)
        weiXinGameSortKey,                      //微信游戏排序项目key
		
		/*微信市场*/
        weiXinMarketCasePageSize,                //微市场页面数据数量
        weiXinMarketCasePageIndex,                //微市场页码

        weiXinMarketCaseSearchVisible,         	//微市场搜索框是否显示
        weiXinMarketCaseSearchSelectContent,     //微市场模板名称下拉列表
        weiXinMarketCaseSearchData,              //微市场搜索内容

        weiXinMarketCaseLoading,              	//微市场列表是否加载状态
        weiXinMarketCaseList,                    //微市场列表数据
        weiXinMarketCaseTotal,                   //微市场列表数据总数

        weiXinMarketSortType,                    //微市场排序类型(ASC： 正序，DESC：降序)
        weiXinMarketSortKey,                     //微市场排序项目key

		
        /*线下活动*/
        weiXinOfflineLeafletsCasePageSize,             //微信线下传单页面数据数量
        weiXinOfflineLeafletsCasePageIndex,            //微信线下传单页码

        weiXinOfflineLeafletsCaseSearchVisible,        //微信线下传单搜索框是否显示
        weiXinOfflineLeafletsCaseSearchSelectContent,  //微信线下传单模板名称下拉列表
        weiXinOfflineLeafletsCaseSearchData,           //微信线下传单搜索内容

        weiXinOfflineLeafletsCaseLoading,              //微信线下传单列表是否加载状态
        weiXinOfflineLeafletsCaseList,                 //微信线下传单列表数据
        weiXinOfflineLeafletsCaseTotal,                //微信线下传单列表数据总数

        weiXinOfflineLeafletsSortType,                 //微信线下传单排序类型(ASC： 正序，DESC：降序)
        weiXinOfflineLeafletsSortKey,                  //微信线下传单排序项目key


        /*活动管理---------------------------------------------------------------------------------------------*/
        weiXinAdminiCasePageSize,             //活动管理页面数据数量
        weiXinAdminiCasePageIndex,            //活动管理页码

        weiXinAdminiCaseSearchVisible,        //活动管理搜索框是否显示
        weiXinAdminiCaseSearchSelectContent,  //活动管理模板名称下拉列表
        weiXinAdminiCaseSearchData,           //活动管理搜索内容

        weiXinAdminiCaseLoading,              //活动管理列表是否加载状态
        weiXinAdminiCaseList,                 //活动管理列表数据
        weiXinAdminiCaseTotal,                //活动管理列表数据总数

        weiXinAdminiSortType,                 //活动管理排序类型(ASC： 正序，DESC：降序)
        weiXinAdminiSortKey,                  //活动管理排序项目key


        /*预约试听---------------------------------------------------------------------------------------------*/
        weiXinAppointCasePageSize,             //预约试听页面数据数量
        weiXinAppointCasePageIndex,            //预约试听页码

        weiXinAppointCaseSearchVisible,        //预约试听搜索框是否显示
        weiXinAppointCaseSearchSelectContent,  //预约试听模板名称下拉列表
        weiXinAppointCaseSearchData,           //预约试听搜索内容

        weiXinAppointCaseLoading,              //预约试听列表是否加载状态
        weiXinAppointCaseList,                 //预约试听列表数据
        weiXinAppointCaseTotal,                //预约试听列表数据总数

        weiXinAppointSortType,                 //预约试听排序类型(ASC： 正序，DESC：降序)
        weiXinAppointSortKey,                  //预约试听排序项目key


        /*预览模态框*/
        PreviewModalVisible,                    //微信活动预览模态框是否展示
        PreviewModalSpin,                       //微信游戏预览内容是否加载中
        PreviewUrl,                             //微信活动预览URL
		
		/*微信市场活动*/
        domainName,								//微信市场活动二维码拼接
        
        /* 机构类型 */
        schoolTypeList,                         //机构类型
    } = saasCaseManage

    /*微信活动实例管理*/
        /*搜索栏提交*/
        let weiXinActivityCaseSearchSubmit = function(data){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinActivityCaseSearchData : data,
                    weiXinActivityCasePageIndex : 0,
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinActivityCaseList',
                payload:{
                    pageSize : weiXinActivityCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinActivitySortType,
                    sortKey : weiXinActivitySortKey,
                    ...data
                }
            });
        }

        /*搜索栏清空*/
        let weiXinActivityCaseSearchReset = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinActivityCaseSearchData : '',
                    weiXinActivityCasePageIndex : 0
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinActivityCaseList',
                payload:{
                    pageSize : weiXinActivityCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinActivitySortType,
                    sortKey : weiXinActivitySortKey,
                }
            });
        }

        /*页面点击筛选*/
        let WeiXinActivityFilter = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinActivityCaseSearchVisible : !weiXinActivityCaseSearchVisible,
                }
            });
        }

        /*分页筛选分类信息改变*/
        let WeiXinActivityCasePageChange = function(pagination, filters, sorter){
            let type = '';
            if('descend' == sorter.order){
                type = 'DESC';
            }else if('ascend' == sorter.order){
                type = 'ASC';
            }
            dispatch({
                type: 'saasCaseManage/weiXinActivityCaseList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    sortKey : sorter.columnKey || '',
                    sortType : type || '',
                    ...weiXinActivityCaseSearchData
                },
            });
        }

        //按查询结果导出
        let WeiXinActivityExportList = function(){
            let searchData = weiXinActivityCaseSearchData;
            searchData.categoryId = '1';
            window.open(`${BASE_URL}/instance/exportInstance?${qs.stringify(searchData)}`)
        }

         /*活动管理实例管理-----------------------------------------------------------------*/
        /*搜索栏提交*/
        let weiXinAdminiCaseSearchSubmit = function(data){
            dispatch({
                type:'saasCaseManage/weiXinAdminiCaseList',
                payload:{
//                    weiXinAdminiCaseSearchData : data,
                    weiXinAdminiCasePageIndex : 0,
                    pageSize : weiXinAdminiCasePageSize,
                    pageIndex : 0,
                    ...data
                }
            });
        }

        /*搜索栏清空*/
        let weiXinAdminiCaseSearchReset = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinAdminiCaseSearchData : '',
                    weiXinAdminiCasePageIndex : 0
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinAdminiCaseList',
                payload:{
                    pageSize : weiXinAdminiCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinAdminiSortType,
                    sortKey : weiXinAdminiSortKey,
                }
            });
        }

        /*页面点击筛选*/
        let WeiXinAdminiFilter = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinAdminiCaseSearchVisible : !weiXinAdminiCaseSearchVisible,
                }
            });
        }

        /*分页筛选分类信息改变*/
        let WeiXinAdminiCasePageChange = function(pagination, filters, sorter){
            let type = '';
            if('descend' == sorter.order){
                type = 'DESC';
            }else if('ascend' == sorter.order){
                type = 'ASC';
            }
            dispatch({
                type: 'saasCaseManage/weiXinAdminiCaseList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    sortKey : sorter.columnKey || '',
                    sortType : type || '',
                    ...weiXinAdminiCaseSearchData
                },
            });
        }

        //按查询结果导出
        function weiXinAdminiExportList(){
            let searchData = weiXinAdminiCaseSearchData;
            searchData.categoryId = '1';
            window.open(`${BASE_URL}/micNetActivity/exportActivity?${qs.stringify(searchData)}`)
        }

//        console.log(weiXinAdminiExportList,"aaaaa")


      /*预约试听实例管理-----------------------------------------------------------------------------------*/
        /*搜索栏提交*/
        let weiXinAppointCaseSearchSubmit = function(data){
            dispatch({
                type:'saasCaseManage/weiXinAppointCaseList',
                payload:{
//                    weiXinAdminiCaseSearchData : data,
                    weiXinAppointCasePageIndex : 0,
                    pageSize : weiXinAppointCasePageSize,
                    pageIndex : 0,
                    ...data
                }
            });
        }

        /*搜索栏清空*/
        let weiXinAppointCaseSearchReset = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinAppointCaseSearchData : '',
                    weiXinAppointCasePageIndex : 0
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinAppointCaseList',
                payload:{
                    pageSize : weiXinAppointCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinAppointSortType,
                    sortKey : weiXinAppointSortKey,
                }
            });
        }

        /*页面点击筛选*/
        let WeiXinAppointFilter = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinAppointCaseSearchVisible : !weiXinAppointCaseSearchVisible,
                }
            });
        }

        /*分页筛选分类信息改变*/
        let WeiXinAppointCasePageChange = function(pagination, filters, sorter){
            let type = '';
            if('descend' == sorter.order){
                type = 'DESC';
            }else if('ascend' == sorter.order){
                type = 'ASC';
            }
            dispatch({
                type: 'saasCaseManage/weiXinAppointCaseList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    sortKey : sorter.columnKey || '',
                    sortType : type || '',
                    ...weiXinAppointCaseSearchData
                },
            });
        }

        //按查询结果导出
        let weiXinAppointExportList = function(){
            let searchData = weiXinAppointCaseSearchData;
            searchData.categoryId = '1';
            window.open(`${BASE_URL}/reservationManage/exportReservation?${qs.stringify(searchData)}`)
        }





    /*微信游戏实例管理*/
        /*搜索栏提交*/
        let weiXinGameCaseSearchSubmit = function(data){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinGameCaseSearchData : data,
                    weiXinGameCasePageIndex : 0,
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinGameCaseList',
                payload:{
                    pageSize : weiXinGameCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinGameSortType,
                    sortKey : weiXinGameSortKey,
                    ...data
                }
            });
        }

        /*搜索栏清空*/
        let weiXinGameCaseSearchReset = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinGameCaseSearchData : '',
                    weiXinGameCasePageIndex : 0
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinGameCaseList',
                payload:{
                    pageSize : weiXinGameCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinGameSortType,
                    sortKey : weiXinGameSortKey,
                }
            });
        }

        /*页面点击筛选*/
        let WeiXinGameFilter = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinGameCaseSearchVisible : !weiXinGameCaseSearchVisible,
                }
            });
        }

        /*分页筛选分类信息改变*/
        let WeiXinGameCasePageChange = function(pagination, filters, sorter){
            let type = '';
            if('descend' == sorter.order){
                type = 'DESC';
            }else if('ascend' == sorter.order){
                type = 'ASC';
            }
            dispatch({
                type: 'saasCaseManage/weiXinGameCaseList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    sortKey : sorter.columnKey || '',
                    sortType : type|| '',
                    ...weiXinGameCaseSearchData
                },
            });
        }

        //按查询结果导出
        let WeiXinGameExportList = function(){
            let searchData = weiXinGameCaseSearchData;
            searchData.categoryId = '3';
            window.open(`${BASE_URL}/instance/exportInstance?${qs.stringify(searchData)}`)
        }
		
	/*微信市场实例管理*/
        /*搜索栏提交*/
        let weiXinMarketCaseSearchSubmit = function(data){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinMarketCaseSearchData : data,
                    weiXinMarketCasePageIndex : 0,
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinMarketCaseList',
                payload:{
                    pageSize : weiXinMarketCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinMarketSortType,
                    sortKey : weiXinMarketSortKey,
                    ...data
                }
            });
        }

        /*搜索栏清空*/
        let weiXinMarketCaseSearchReset = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinMarketCaseSearchData : '',
                    weiXinMarketCasePageIndex : 0
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinMarketCaseList',
                payload:{
                    pageSize : weiXinMarketCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinMarketSortType,
                    sortKey : weiXinMarketSortKey,
                }
            });
        }

        /*页面点击筛选*/
        let WeiXinMarketFilter = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinMarketCaseSearchVisible : !weiXinMarketCaseSearchVisible,
                }
            });
        }

        /*分页筛选分类信息改变*/
        let WeiXinMarketCasePageChange = function(pagination, filters, sorter){
            let type = '';
            if('descend' == sorter.order){
                type = 'DESC';
            }else if('ascend' == sorter.order){
                type = 'ASC';
            }
            dispatch({
                type: 'saasCaseManage/weiXinMarketCaseList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    sortKey : sorter.columnKey || '',
                    sortType : type|| '',
                    ...weiXinMarketCaseSearchData
                },
            });
        }

        //按查询结果导出
        let WeiXinMarketExportList = function(){
            let searchData = weiXinMarketCaseSearchData;
            //searchData.categoryId = '4';
            window.open(`${BASE_URL}/zsb/market/instance/exportExcel?${qs.stringify(searchData)}`)
        }
		
    /*微信线下传单实例管理*/
        /*搜索栏提交*/
        let weiXinOfflineLeafletsCaseSearchSubmit = function(data){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinOfflineLeafletsCaseSearchData : data,
                    weiXinOfflineLeafletsCasePageIndex : 0,
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinOfflineLeafletsCaseList',
                payload:{
                    pageSize : weiXinOfflineLeafletsCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinOfflineLeafletsSortType,
                    sortKey : weiXinOfflineLeafletsSortKey,
                    ...data
                }
            });
        }

        /*搜索栏清空*/
        let weiXinOfflineLeafletsCaseSearchReset = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinOfflineLeafletsCaseSearchData : '',
                    weiXinOfflineLeafletsCasePageIndex : 0
                }
            });
            dispatch({
                type:'saasCaseManage/weiXinOfflineLeafletsCaseList',
                payload:{
                    pageSize : weiXinOfflineLeafletsCasePageSize,
                    pageIndex : 0,
                    sortType : weiXinOfflineLeafletsSortType,
                    sortKey : weiXinOfflineLeafletsSortKey,
                }
            });
        }

        /*页面点击筛选*/
        let WeiXinOfflineLeafletsFilter = function(){
            dispatch({
                type:'saasCaseManage/updateState',
                payload:{
                    weiXinOfflineLeafletsCaseSearchVisible : !weiXinOfflineLeafletsCaseSearchVisible,
                }
            });
        }

        /*分页筛选分类信息改变*/
        let WeiXinOfflineLeafletsCasePageChange = function(pagination, filters, sorter){
            let type = '';
            if('descend' == sorter.order){
                type = 'DESC';
            }else if('ascend' == sorter.order){
                type = 'ASC';
            }
            dispatch({
                type: 'saasCaseManage/weiXinOfflineLeafletsCaseList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    sortKey : sorter.columnKey || '',
                    sortType : type || '',
                    ...weiXinOfflineLeafletsCaseSearchData
                },
            });
        }

        //按查询结果导出
        let WeiXinOfflineLeafletsExportList = function(){
            let searchData = weiXinOfflineLeafletsCaseSearchData;
            searchData.categoryId = '1';
            window.open(`${BASE_URL}/instance/exportInstance?${qs.stringify(searchData)}`)
        }
		
		
        /*预览模态框*/
            /*打开模态框*/
            /*列表点击预览*/
		let OpenPreviewModal = function(record,type){
//            console.info(record,"2222222")
                if('game' == type){
                    let data = {};
                    data.service = record.provider+'/action';
                    data.m = 'h5';
                    data.dataId = record.id;
                    data.tenantId = record.tenantId;
                    data.orgId = record.orgId;
                    data.gameId = record.modelId;
                    data.gameCode = record.gameCode;

                    dispatch({
                        type:'saasCaseManage/updateState',
                        payload:{
                            PreviewModalVisible : true,
                            PreviewModalSpin : true,
                        }
                    });
                    dispatch({
                        type:'saasCaseManage/getWeiXinGamePreviewUrl',
                        payload:{
                            ...data
                        }
                    });
                } else if('market' == type) {
					dispatch({
                        type:'saasCaseManage/updateState',
                        payload:{
                            PreviewModalVisible : true,
                            PreviewModalSpin : false,
                            PreviewUrl : record,
                        }
                    });	  
				} else if('admini' == type) {
                    dispatch({
                        type:'saasCaseManage/updateState',
                        payload:{
                            PreviewModalVisible : true,
                            PreviewModalSpin : false,
                            PreviewUrl : record.activityUrl,
                        }

                    });
//                    console.log(record,"record111")
//					let data = {};
//                    console.log(record,"1111111")
//                    data.service = record.activityUrl;
//
//                    dispatch({
//                        type:'saasCaseManage/updateState',
//                        payload:{
//                            PreviewModalVisible : true,
//                            PreviewModalSpin : true,
//                            PreviewUrl : record.activityUrl,
//                        }
//                    });
//                    dispatch({
//                        type:'saasCaseManage/getWeiXinAdminiPreviewUrl',
//                        payload:{
//                            ...data
//                        }
//                    });
				}else if('appoint' == type) {
                    dispatch({
                        type:'saasCaseManage/updateState',
                        payload:{
                            PreviewModalVisible : true,
                            PreviewModalSpin : false,
                            PreviewUrl : record.reservationUrl,
                        }
                    });
//					let data = {};
//                    console.log(record,"1111111")
//                    data.service = record.activityUrl;
//
//                    dispatch({
//                        type:'saasCaseManage/updateState',
//                        payload:{
//                            PreviewModalVisible : true,
//                            PreviewModalSpin : true,
//                            PreviewUrl : record.activityUrl,
//                        }
//                    });
//                    dispatch({
//                        type:'saasCaseManage/getWeiXinAppointPreviewUrl',
//                        payload:{
//                            ...data
//                        }
//                    });
				}else {
					dispatch({
                        type:'saasCaseManage/updateState',
                        payload:{
                            PreviewModalVisible : true,
                            PreviewModalSpin : false,
                            PreviewUrl : record.activityUrl,
                        }
                    });
				}
            }

            /*模态框关闭*/
            let PreviewModalCancel = function(){
                dispatch({
                    type:'saasCaseManage/updateState',
                    payload:{
                        PreviewModalVisible : false,
                        PreviewUrl : '',
                        PreviewModalSpin : false,
                    }
                });
            }

    /*微信活动组件属性*/
    let weiXinActivitySearchProps = {
        weiXinActivityCaseSearchSelectContent,  //微信活动模板名称下拉列表
        weiXinActivityCaseSearchReset,          //清空数据
        weiXinActivityCaseSearchSubmit,         //点击搜索
        schoolTypeList,                         //机构类型
    }

    let weiXinActivityListProps = {
        weiXinActivityCasePageSize,             //微信活动页面数据数量
        weiXinActivityCasePageIndex,            //微信活动页码
        weiXinActivityCaseLoading,              //列表是否加载状态
        weiXinActivityCaseList,                 //列表数据
        weiXinActivityCaseTotal,                //列表数据总数
        WeiXinActivityFilter,                   //点击筛选
        WeiXinActivityCasePageChange,           //分页筛选分类信息改变
        OpenPreviewModal,                       //列表点击预览
        WeiXinActivityExportList,               //按查询结果导出
    }

     /*活动管理组件属性-------------------------------------------------------------------------*/
    let weiXinAdminiSearchProps = {
        weiXinAdminiCaseSearchSelectContent,  //活动管理模板名称下拉列表
        weiXinAdminiCaseSearchReset,          //清空数据
        weiXinAdminiCaseSearchSubmit,         //点击搜索
        schoolTypeList,                         //机构类型
    }

    let weiXinAdminiListProps = {
        weiXinAdminiCasePageSize,             //活动管理页面数据数量
        weiXinAdminiCasePageIndex,            //活动管理页码
        weiXinAdminiCaseLoading,              //列表是否加载状态
        weiXinAdminiCaseList,                 //列表数据
        weiXinAdminiCaseTotal,                //列表数据总数
        WeiXinAdminiFilter,                   //点击筛选
        WeiXinAdminiCasePageChange,           //分页筛选分类信息改变
        OpenPreviewModal,                       //列表点击预览
        weiXinAdminiExportList,               //按查询结果导出
    }


     /*预约试听组件属性-------------------------------------------------------------------------*/
    let weiXinAppointSearchProps = {
        weiXinAppointCaseSearchSelectContent,  //预约试听模板名称下拉列表
        weiXinAppointCaseSearchReset,          //清空数据
        weiXinAppointCaseSearchSubmit,         //点击搜索
        schoolTypeList,                         //机构类型
    }

    let weiXinAppointListProps = {
        weiXinAppointCasePageSize,             //预约试听页面数据数量
        weiXinAppointCasePageIndex,            //微信活动页码
        weiXinAppointCaseLoading,              //列表是否加载状态
        weiXinAppointCaseList,                 //列表数据
        weiXinAppointCaseTotal,                //列表数据总数
        WeiXinAppointFilter,                   //点击筛选
        WeiXinAppointCasePageChange,           //分页筛选分类信息改变
        OpenPreviewModal,                       //列表点击预览
        weiXinAppointExportList,               //按查询结果导出
    }


    /*微信游戏组件属性*/
    let weiXinGameSearchProps = {
        weiXinGameCaseSearchSelectContent,      //微信游戏模板名称下拉列表
        weiXinGameCaseSearchReset,              //清空数据
        weiXinGameCaseSearchSubmit,             //点击搜索
        schoolTypeList,                         //机构类型
    }

    let weiXinGameListProps = {
        weiXinGameCasePageSize,                 //微信游戏页面数据数量
        weiXinGameCasePageIndex,                //微信游戏页码
        weiXinGameCaseLoading,                  //列表是否加载状态
        weiXinGameCaseList,                     //列表数据
        weiXinGameCaseTotal,                    //列表数据总数
        WeiXinGameFilter,                       //点击筛选
        WeiXinGameCasePageChange,               //分页筛选分类信息改变
        OpenPreviewModal,                       //列表点击预览
        WeiXinGameExportList,                   //按查询结果导出
    }
	
	/*微信市场组件属性*/
    let weiXinMarketSearchProps = {
        weiXinMarketCaseSearchSelectContent,      //微信游戏模板名称下拉列表
        weiXinMarketCaseSearchReset,              //清空数据
        weiXinMarketCaseSearchSubmit,             //点击搜索
        schoolTypeList,                         //机构类型
    }

    let weiXinMarketListProps = {
        weiXinMarketCasePageSize,                 //微信游戏页面数据数量
        weiXinMarketCasePageIndex,                //微信游戏页码
        weiXinMarketCaseLoading,                  //列表是否加载状态
        weiXinMarketCaseList,                     //列表数据
        weiXinMarketCaseTotal,                    //列表数据总数
        WeiXinMarketFilter,                       //点击筛选
        WeiXinMarketCasePageChange,               //分页筛选分类信息改变
        OpenPreviewModal,                         //列表点击预览
        WeiXinMarketExportList,                   //按查询结果导出
		domainName,
    }
	
    /*微信线下传单组件属性*/
    let weiXinOfflineLeafletsSearchProps = {
        weiXinOfflineLeafletsCaseSearchSelectContent,  //微信市场活动模板名称下拉列表
        weiXinOfflineLeafletsCaseSearchReset,          //清空数据
        weiXinOfflineLeafletsCaseSearchSubmit,         //点击搜索
        schoolTypeList,                         //机构类型
    }

    let weiXinOfflineLeafletsListProps = {
        weiXinOfflineLeafletsCasePageSize,             //微信市场活动页面数据数量
        weiXinOfflineLeafletsCasePageIndex,            //微信市场活动页码
        weiXinOfflineLeafletsCaseLoading,              //列表是否加载状态
        weiXinOfflineLeafletsCaseList,                 //列表数据
        weiXinOfflineLeafletsCaseTotal,                //列表数据总数
        WeiXinOfflineLeafletsFilter,                   //点击筛选
        WeiXinOfflineLeafletsCasePageChange,           //分页筛选分类信息改变
        OpenPreviewModal,                      		   //列表点击预览
        WeiXinOfflineLeafletsExportList,               //按查询结果导出
    }

    /*预览模态框属性(通用)*/
    let saasCaseManagePreviewModalProps = {
        PreviewModalVisible,      //微信活动预览模态框是否展示
        PreviewModalSpin,         //微信游戏预览内容是否加载中
        PreviewUrl,               //微信活动预览URL
        PreviewModalCancel,       //微信活动关闭预览模态框
    }

    let changeTabs = function(activeKey){
        if('1'==activeKey){
            dispatch({
                type: 'saasCaseManage/weiXinActivityCaseSelectModalName',
            });
            dispatch({
                type: 'saasCaseManage/weiXinActivityCaseList',
                payload:{
                    pageIndex : weiXinActivityCasePageIndex,
                    pageSize : weiXinActivityCasePageSize,
                    sortKey : weiXinActivitySortKey,
                    sortType : weiXinActivitySortType,
                },
            });
        }else if('3'==activeKey){
            dispatch({
                type: 'saasCaseManage/weiXinGameCaseSelectModalName',
            });
            dispatch({
                type: 'saasCaseManage/weiXinGameCaseList',
                payload:{
                    pageIndex : weiXinGameCasePageIndex,
                    pageSize : weiXinGameCasePageSize,
                    sortKey : weiXinGameSortKey,
                    sortType : weiXinGameSortType,
                },
            });
        }else if('4'==activeKey){
            dispatch({
                type: 'saasCaseManage/weiXinMarketCaseSelectModalName',
            });
            dispatch({
                type: 'saasCaseManage/weiXinMarketCaseList',
                payload:{
                    pageIndex : weiXinMarketCasePageIndex,
                    pageSize : weiXinMarketCasePageSize,
                    sortKey : weiXinMarketSortKey,
                    sortType : weiXinMarketSortType,
                },
            });
        }else if('5'==activeKey){
            dispatch({
                type: 'saasCaseManage/weiXinOfflineLeafletsCaseSelectModalName',
            });
            dispatch({
                type: 'saasCaseManage/weiXinOfflineLeafletsCaseList',
                payload:{
                    pageIndex : weiXinOfflineLeafletsCasePageIndex,
                    pageSize : weiXinOfflineLeafletsCasePageSize,
                    sortKey : weiXinOfflineLeafletsSortKey,
                    sortType : weiXinOfflineLeafletsSortType,
                },
            });
        }else if('6'==activeKey){
            dispatch({
                type: 'saasCaseManage/weiXinAdminiCaseList',
                payload:{
                    pageIndex : weiXinAdminiCasePageIndex,
                    pageSize : weiXinAdminiCasePageSize,
                    sortKey : weiXinAdminiSortKey,
                    sortType : weiXinAdminiSortType,
                },
            });
        }else if('7'==activeKey){
            dispatch({
                type: 'saasCaseManage/weiXinAppointCaseList',
                payload:{
                    pageIndex : weiXinAppointCasePageIndex,
                    pageSize : weiXinAppointCasePageSize,
                    sortKey : weiXinAppointSortKey,
                    sortType : weiXinAppointSortType,
                },
            });
        }
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={changeTabs}>
                <TabPane tab={<span><Icon type="home" />微信活动</span>} key="1">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {weiXinActivityCaseSearchVisible ? [
                           <WeiXinActivityCaseSearch {...weiXinActivitySearchProps} key="search_queue_weixinActivity"/>
                        ]:null}
                    </QueueAnim>
                    <WeiXinActivityCaseList {...weiXinActivityListProps} />
                </TabPane>
                <TabPane tab={<span><Icon type="home" />微信游戏</span>} key="3">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {weiXinGameCaseSearchVisible ? [
                           <WeiXinGameCaseSearch {...weiXinGameSearchProps} key="search_queue_weixinGame"/>
                        ]:null}
                    </QueueAnim>
                    <WeiXinGameCaseList {...weiXinGameListProps} />
                </TabPane>
		     	<TabPane tab={<span><Icon type="home" />市场活动</span>} key="4">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {weiXinMarketCaseSearchVisible ? [
                           <WeiXinMarketCaseSearch {...weiXinMarketSearchProps} key="search_queue_weixinMarket"/>
                        ]:null}
                    </QueueAnim>
                    <WeiXinMarketCaseList {...weiXinMarketListProps} />
                </TabPane>
                <TabPane tab={<span><Icon type="home" />线下传单</span>} key="5">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {weiXinOfflineLeafletsCaseSearchVisible ? [
                           <WeiXinOfflineLeafletsCaseSearch {...weiXinOfflineLeafletsSearchProps} key="search_queue_weixinOfflineLeaflets"/>
                        ]:null}
                    </QueueAnim>
                    <WeiXinOfflineLeafletsCaseList {...weiXinOfflineLeafletsListProps} />
                </TabPane>


                <TabPane tab={<span><Icon type="home" />活动管理</span>} key="6">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {weiXinAdminiCaseSearchVisible ? [
                           <WeiXinAdminiCaseSearch {...weiXinAdminiSearchProps} key="search_queue_weixinAdmini"/>
                        ]:null}
                    </QueueAnim>
                    <WeiXinAdminiCaseListContent {...weiXinAdminiListProps}/>
                </TabPane>

                <TabPane tab={<span><Icon type="home" />预约试听</span>} key="7">
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}
                        className="common-search-queue" >
                        {weiXinAppointCaseSearchVisible ? [
                           <WeiXinAppointCaseSearch {...weiXinAppointSearchProps} key="search_queue_weixinAppoint"/>
                        ]:null}
                    </QueueAnim>
                    <WeiXinAppointCaseList {...weiXinAppointListProps} />
                </TabPane>
            </Tabs>
            <SaasCaseManagePreviewModal {...saasCaseManagePreviewModalProps} />
        </div>
    );
}

function mapStateToProps({ saasCaseManage }) {
  return { saasCaseManage };
}

export default connect(mapStateToProps)(CaseManage);
