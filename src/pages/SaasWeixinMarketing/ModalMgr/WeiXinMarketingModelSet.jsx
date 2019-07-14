import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';
import WeiXinActivitySearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-activity/WeiXinActivitySearch';
import WeiXinActivityList from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-activity/WeiXinActivityList';
import WeiXinActivityAddOrEditModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-activity/WeiXinActivityAddOrEditModal';

import WeiXinAdminiSearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-admini/WeiXinAdminiSearch';
import WeiXinAdminiList from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-admini/WeiXinAdminiList';
import WeiXinAdminiAddOrEditModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-admini/WeiXinAdminiAddOrEditModal';

import WeiXinAppointSearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-appoint/WeiXinAppointSearch';
import WeiXinAppointList from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-appoint/WeiXinAppointList';
import WeiXinAppointAddOrEditModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-appoint/WeiXinAppointAddOrEditModal';

import WeiXinGameSearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-game/WeiXinGameSearch';
import WeiXinGameList from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-game/WeiXinGameList';
import WeiXinGameAddOrEditModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-game/WeiXinGameAddOrEditModal';

import WeiXinOfflineLeafletsSearch from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-offline-leaflets/WeiXinOfflineLeafletsSearch';
import WeiXinOfflineLeafletsList from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-offline-leaflets/WeiXinOfflineLeafletsList';
import WeiXinOfflineLeafletsAddOrEditModal from '../../../components/SaasWeixinMarketing/saas-weixin-market-model-set/weixin-offline-leaflets/WeiXinOfflineLeafletsAddOrEditModal';

import QueueAnim from 'rc-queue-anim';

import ModuleBasePropsForm from './module-form/ModuleBasePropsForm';
import ModulePageConfigForm from './module-form/ModulePageConfigForm';
import ModuleLeafletsPageConfigForm from './module-form/ModuleLeafletsPageConfigForm';

import { connect } from 'dva';

import styles from './WeiXinMarketingModelSet.less';

const TabPane = Tabs.TabPane;

function WeiXinMarketingModelSet({ dispatch, weiXinMarketingModelSet }) {

    let {
        weiXinActivityLoading,        		//微信活动列表加载状态
        weiXinAdminiLoading,        		//活动管理列表加载状态---------------------------------------------
        weiXinAppointLoading,        		//预约试听列表加载状态---------------------------------------------
        weiXinGameLoading,            		//微信游戏列表加载状态
		weiXinOfflineLeafletsLoading, 		//微信线下传单列表加载状态

        weiXinActivityList,           		//微信活动列表数据
        weiXinAdminiList,           		//活动管理列表数据----------------------------------------------------
        weiXinAppointList,           		//微信活动列表数据----------------------------------------------------
        weiXinGameList,               		//微信游戏列表数据
		weiXinOfflineLeafletsList,	  		//微信线下传单列表数据

        weiXinActivityTotal,          		//微信活动列表总条数
        weiXinAdminiTotal,          		//活动管理列表总条数----------------------------------------------------
        weiXinAppointTotal,          		//微信活动列表总条数----------------------------------------------------
        weiXinGameTotal,              		//微信游戏列表总条数
		weiXinOfflineLeafletsTotal,	  		//微信线下传单列表总条数

        weiXinActivityPageIndex,      		//微信活动列表当前页码
        weiXinActivityPageSize,       		//活动管理列表每页显示数量
        weiXinAdminiPageIndex,      		//活动管理列表当前页码----------------------------------------------------
        weiXinAdminiPageSize,       		//微信活动列表每页显示数量-------------------------------------------------
        weiXinAppointPageIndex,      		//微信活动列表当前页码----------------------------------------------------
        weiXinAppointPageSize,       		//微信活动列表每页显示数量-------------------------------------------------
        weiXinGamePageIndex,          		//微信游戏列表当前页码
        weiXinGamePageSize,           		//微信游戏列表每页显示数量
		weiXinOfflineLeafletsPageIndex,		//微信线下传单列表每页显示数量
		weiXinOfflineLeafletsPageSize,		//微信线下传单列表每页显示数量

        weiXinActivityFormLoading,    		//微信活动是否加载中
        weiXinAdminiFormLoading,    		//微信活动是否加载中----------------------------------------------------
        weiXinAppointFormLoading,    		//微信活动是否加载中----------------------------------------------------
        weiXinGameFormLoading,        		//微信游戏是否加载中
		weiXinOfflineLeafletsFormLoading,   //微信线下传单是否加载中

        weiXinActivityFormData,       		//微信活动表单数据
        weiXinAdminiFormData,       		//微信活动表单数据-------------------------------------------------------
        weiXinAppointFormData,       		//微信活动表单数据-------------------------------------------------------
        weiXinGameFormData,           		//微信游戏表单数据
		weiXinOfflineLeafletsFormData,      //微信线下传单表单数据

        weiXinActivityFormVisible,    		//微信活动表单窗口是否显示
        weiXinAdminiFormVisible,    		//微信活动表单窗口是否显示----------------------------------------------
        weiXinAppointFormVisible,    		//微信活动表单窗口是否显示----------------------------------------------
        weiXinGameFormVisible,        		//微信游戏是否显示
		weiXinOfflineLeafletsFormVisible,   //微信线下传单是否显示

        weiXinActivityFormType,       		//微信活动表单类型 'create' / 'update'
        weiXinAdminiFormType,       		//微信活动表单类型 'create' / 'update'=---------------------------------
        weiXinAppointFormType,       		//微信活动表单类型 'create' / 'update'=---------------------------------
        weiXinGameFormType,           		//微信游戏表单类型 'create' / 'update'
		weiXinOfflineLeafletsFormType,      //微信线下传单表单类型 'create' / 'update'

        weiXinActivitySearchData,     		//微信活动模糊查询数据
        weiXinAdminiSearchData,     		//微信活动模糊查询数据---------------------------------------------------
        weiXinAppointSearchData,     		//微信活动模糊查询数据---------------------------------------------------
        weiXinGameSearchData,         		//微信游戏模糊查询数据
		weiXinOfflineLeafletsSearchData,    //微信线下传单模糊查询数据

        weiXinActivitySearchVisible,  		//微信活动模糊查询是否显示
        weiXinAdminiSearchVisible,  		//微信活动模糊查询是否显示------------------------------------------------
        weiXinAppointSearchVisible,  		//微信活动模糊查询是否显示------------------------------------------------
        weiXinGameSearchVisible,      		//微信游戏模糊查询是否显示
		weiXinOfflineLeafletsSearchVisible, //微信线下传单模糊查询是否显示
    } = weiXinMarketingModelSet;

    /*微信活动*/
        /*微信活动列表分页 变更*/
        let changeWeiXinActivityPageSize = function(current, size){

        }

        let changeWeiXinActivityPageIndex = function(page, pageSize){

        }

        let tablePageChangeWeiXinActivity = function(pagination, filters, sorter) {
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinActivityList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...weiXinActivitySearchData,
                },
            });
        };

        /*微信活动条件查询数据清空*/
        let weiXinActivitySearchReset = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinActivityList',
                payload:{
                    pageSize:weiXinActivityPageSize,
                    pageIndex:0,
                }
            });
        }

        /*微信活动条件查询*/
        let weiXinActivitySearchSubmit = function(searchData){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinActivityList',
                payload:{
                    pageIndex:0,
                    pageSize:weiXinActivityPageSize,
                    ...searchData,
                }
            });
        }

        /*微信活动打开新增modal*/
        let tableOnWeiXinActivityCreate = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinActivityFormVisible:true,
                    weiXinActivityFormType:'create',
                    weiXinActivityFormData:{},
                }
            });
        }
			
        /*微信活动打开编辑modal*/
        let tableOnWeiXinActivityUpdate = function(data){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinActivityFormVisible:true,
                    weiXinActivityFormType:'update',
                    weiXinActivityFormData:data,
                }
            });
        }

        /*微信活动新增编辑表单提交*/
        let weiXinActivityFormSubmit = function(data,type){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinActivityFormLoading:true,
                }
            });
            if('update'==type){
                dispatch({
                    type:'weiXinMarketingModelSet/weiXinActivityUpdate',
                    payload:{
                        ...data,
                    }
                });
            }else if('create'==type){

            }
        }

        /*微信活动新增编辑表单关闭*/
        let weiXinActivityFormCancel = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinActivityFormVisible:false,
                    weiXinActivityFormLoading:false,
                    weiXinActivityFormData:{},
                }
            });
        }

        /*微信活动上架*/
        let tableWeiXinActivityUp = function(id){
            let status = 1;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinActivityChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*微信活动下架*/
        let tableWeiXinActivityDown = function(id){
            let status = 2;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinActivityChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*微信活动筛选框的显示与否*/
        let tableOnWeiXinActivityFilter = function(){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinActivitySearchVisible:!weiXinActivitySearchVisible,
                }
            });
        }

    /*活动管理---------------------------------------------------------------------------------------*/
        /*活动管理列表分页 变更*/
        let changeWeiXinAdminiPageSize = function(current, size){

        }

        let changeWeiXinAdminiPageIndex = function(page, pageSize){

        }

        let tablePageChangeWeiXinAdmini = function(pagination, filters, sorter) {
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinAdminiList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...weiXinActivitySearchData,
                },
            });
        };

        /*活动管理条件查询数据清空*/
        let weiXinAdminiSearchReset = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinAdminiList',
                payload:{
                    pageSize:weiXinAdminiPageSize,
                    pageIndex:0,
                }
            });
        }

        /*活动管理条件查询*/
        let weiXinAdminiSearchSubmit = function(searchData){
            dispatch({
                type: 'micNetActivity/micActivityList',
                payload:{
                    pageIndex:0,
                    pageSize:weiXinAdminiPageSize,
                    ...searchData,
                }
            });
        }

        /*活动管理打开新增modal*/
        let tableOnWeiXinAdminiCreate = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAdminiFormVisible:true,
                    weiXinAdminiFormType:'create',
                    weiXinAdminiFormData:{},
                }
            });
        }

        /*活动管理打开编辑modal*/
        let tableOnWeiXinAdminiUpdate = function(data){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAdminiFormVisible:true,
                    weiXinAdminiFormType:'update',
                    weiXinAdminiFormData:data,
                }
            });
        }

        /*活动管理新增编辑表单提交*/
        let weiXinAdminiFormSubmit = function(data,type){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAdminiFormLoading:true,
                }
            });
            if('update'==type){
                dispatch({
                    type:'weiXinMarketingModelSet/weiXinAdminiUpdate',
                    payload:{
                        ...data,
                    }
                });
            }else if('create'==type){

            }
        }

        /*活动管理新增编辑表单关闭*/
        let weiXinAdminiFormCancel = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAdminiFormVisible:false,
                    weiXinAdminiFormLoading:false,
                    weiXinAdminiFormData:{},
                }
            });
        }

        /*活动管理上架*/
        let tableWeiXinAdminiUp = function(id){
            let status = 1;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinAdminiChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*活动管理下架*/
        let tableWeiXinAdminiDown = function(id){
            let status = 2;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinAdminiChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*活动管理筛选框的显示与否*/
        let tableOnWeiXinAdminiFilter = function(){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAdminiSearchVisible:!weiXinAdminiSearchVisible,
                }
            });
        }


    /*预约试听---------------------------------------------------------------------------------------*/
        /*预约试听列表分页 变更*/
        let changeWeiXinAppointPageSize = function(current, size){

        }

        let changeWeiXinAppointPageIndex = function(page, pageSize){

        }

        let tablePageChangeWeiXinAppoint = function(pagination, filters, sorter) {
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinAppointList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...weiXinActivitySearchData,
                },
            });
        };

        /*预约试听条件查询数据清空*/
        let weiXinAppointSearchReset = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinAppointList',
                payload:{
                    pageSize:weiXinAppointPageSize,
                    pageIndex:0,
                }
            });
        }

        /*预约试听条件查询*/
        let weiXinAppointSearchSubmit = function(searchData){
            dispatch({
                type: 'micNetActivity/micActivityList',
                payload:{
                    pageIndex:0,
                    pageSize:weiXinAppointPageSize,
                    ...searchData,
                }
            });
        }

        /*预约试听打开新增modal*/
        let tableOnWeiXinAppointCreate = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAppointFormVisible:true,
                    weiXinAppointFormType:'create',
                    weiXinAppointFormData:{},
                }
            });
        }

        /*预约试听打开编辑modal*/
        let tableOnWeiXinAppointUpdate = function(data){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAppointFormVisible:true,
                    weiXinAppointFormType:'update',
                    weiXinAppointFormData:data,
                }
            });
        }

        /*预约试听新增编辑表单提交*/
        let weiXinAppointFormSubmit = function(data,type){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAppointFormLoading:true,
                }
            });
            if('update'==type){
                dispatch({
                    type:'weiXinMarketingModelSet/weiXinAppointUpdate',
                    payload:{
                        ...data,
                    }
                });
            }else if('create'==type){

            }
        }

        /*预约试听新增编辑表单关闭*/
        let weiXinAppointFormCancel = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAppointFormVisible:false,
                    weiXinAppointFormLoading:false,
                    weiXinAppointFormData:{},
                }
            });
        }

        /*预约试听上架*/
        let tableWeiXinAppointUp = function(id){
            let status = 1;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinAppointChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*预约试听下架*/
        let tableWeiXinAppointDown = function(id){
            let status = 2;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinAppointChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*预约试听筛选框的显示与否*/
        let tableOnWeiXinAppointFilter = function(){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinAppointSearchVisible:!weiXinAppointSearchVisible,
                }
            });
        }


	/*微信线下传单*/
		let changeWeiXinOfflineLeafletsPageSize = function(current, size){

        }

        let changeWeiXinOfflineLeafletsPageIndex = function(page, pageSize){

        }

        let tablePageChangeWeiXinOfflineLeaflets = function(pagination, filters, sorter) {
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinOfflineLeafletsList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...weiXinOfflineLeafletsSearchData,
                },
            });
        }
			
        let weiXinOfflineLeafletsSearchReset = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinOfflineLeafletsList',
                payload:{
                    pageSize:weiXinOfflineLeafletsPageSize,
                    pageIndex:0,
                }
            });
        }

        let weiXinOfflineLeafletsSearchSubmit = function(searchData){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinOfflineLeafletsList',
                payload:{
                    pageIndex:0,
                    pageSize:weiXinOfflineLeafletsPageSize,
                    ...searchData,
                }
            });
        }		 
					 					 
        let tableOnWeiXinOfflineLeafletsCreate = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinOfflineLeafletsFormVisible:true,
                    weiXinOfflineLeafletsFormType:'create',
                    weiXinOfflineLeafletsFormData:{},
                }
            });
        }
        
        let tableOnWeiXinOfflineLeafletsUpdate = function(data){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinOfflineLeafletsFormVisible:true,
                    weiXinOfflineLeafletsFormType:'update',
                    weiXinOfflineLeafletsFormData:data,
                }
            });
        }

        let weiXinOfflineLeafletsFormSubmit = function(data,type){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinOfflineLeafletsFormLoading:true,
                }
            });
            if('update'==type){
                dispatch({
                    type:'weiXinMarketingModelSet/weiXinOfflineLeafletsUpdate',
                    payload:{
                        ...data,
                    }
                });
            }else if('create'==type){

            }
        }

        let weiXinOfflineLeafletsFormCancel = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinOfflineLeafletsFormVisible:false,
                    weiXinOfflineLeafletsFormLoading:false,
                    weiXinOfflineLeafletsFormData:{},
                }
            });
        }

        let tableWeiXinOfflineLeafletsUp = function(id){
            let status = 1;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinOfflineLeafletsChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        let tableWeiXinOfflineLeafletsDown = function(id){
            let status = 2;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinOfflineLeafletsChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        let tableOnWeiXinOfflineLeafletsFilter = function(){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinOfflineLeafletsSearchVisible:!weiXinOfflineLeafletsSearchVisible,
                }
            });
        }
		
    /*微信游戏*/
        /*微信游戏列表分页 变更*/
        let changeWeiXinGamePageSize = function(current, size){

        }

        let changeWeiXinGamePageIndex = function(page, pageSize){

        }

        let tablePageChangeWeiXinGame = function(pagination, filters, sorter) {
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload: {
                    weiXinGamePageIndex : pagination.current-1,
                    weiXinGamePageSize : pagination.pageSize,
                },
            });
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinGameList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...weiXinGameSearchData,
                },
            });
        };

        /*微信游戏条件查询数据清空*/
        let weiXinGameSearchReset = function(){
            dispatch({
                type: 'gameMgr/updateState',
                payload:{
                    weiXinGameSearchData:{},
                    weiXinGamePageIndex:0,
                }
            });
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinGameList',
                payload:{
                    pageSize:weiXinGamePageSize,
                    pageIndex:0,
                }
            });
        }

        /*微信游戏条件查询*/
        let weiXinGameSearchSubmit = function(searchData){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinGameSearchData:searchData,
                    weiXinGamePageIndex:0,
                }
            });
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinGameList',
                payload:{
                    pageIndex:0,
                    pageSize:weiXinGamePageSize,
                    ...searchData,
                }
            });
        }

        /*微信游戏打开新增modal*/
        let tableOnWeiXinGameCreate = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinGameFormVisible:true,
                    weiXinGameFormType:'create',
                    weiXinGameFormData:{},
                }
            });
        }

        /*微信游戏打开编辑modal*/
        let tableOnWeiXinGameUpdate = function(data){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinGameFormVisible:true,
                    weiXinGameFormType:'update',
                    weiXinGameFormData:data,
                }
            });
        }

        /*微信游戏新增编辑表单提交*/
        let weiXinGameFormSubmit = function(data,type){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinGameFormLoading:true,
                }
            });
            if('update'==type){
                dispatch({
                    type:'weiXinMarketingModelSet/weiXinGameUpdate',
                    payload:{
                        ...data,
                    }
                });
            }else if('create'==type){

            }
        }

        /*微信游戏新增编辑表单关闭*/
        let weiXinGameFormCancel = function(){
            dispatch({
                type: 'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinGameFormVisible:false,
                    weiXinGameFormLoading:false,
                    weiXinGameFormData:{},
                }
            });
        }

        /*微信游戏上架*/
        let tableWeiXinGameUp = function(id){
            let status = 1;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinGameChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*微信游戏下架*/
        let tableWeiXinGameDown = function(id){
            let status = 0;
            dispatch({
                type: 'weiXinMarketingModelSet/weiXinGameChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*微信游戏筛选框的显示与否*/
        let tableOnWeiXinGameFilter = function(){
            dispatch({
                type:'weiXinMarketingModelSet/updateState',
                payload:{
                    weiXinGameSearchVisible:!weiXinGameSearchVisible,
                }
            });
        }

    /*
     * 自定义微模板
     * 点击新增
     */
    function handleOnAdd(formDataId, type) {

        dispatch({
            type: 'moduleBasePropsFormModel/handleShow',
            payload: {
                formDataId,
				type,
                afterFormSubmit: ()=>{
                    weiXinActivitySearchSubmit && weiXinActivitySearchSubmit();
					weiXinOfflineLeafletsSearchSubmit && weiXinOfflineLeafletsSearchSubmit();
                }
            }
        });
    }
/*
     * 自定义微模板
     * 点击页面配置
     */
    function handleOnPagesConfig(formDataId, type="") {
		switch(type){
			case 'offlineLeaflets':
				dispatch({
					type: 'moduleLeafletsConfigFormModel/handleShow',
					payload: {
						formDataId,
					}
				});
		  	break;
			default:
				dispatch({
					type: 'modulePageConfigFormModel/handleShow',
					payload: {
						formDataId,
					}
				});
		}
    }
	
    /*微信活动*/
    let weiXinActivitySearchProps = {
        weiXinActivitySearchReset,
        weiXinActivitySearchSubmit,
    };
    let weiXinActivityListProps = {
        weiXinActivityPageIndex,      //微信活动列表当前页码
        weiXinActivityPageSize,       //微信活动列表每页显示数量
        weiXinActivityLoading,
        weiXinActivityList,
        weiXinActivityTotal,
        tableOnWeiXinActivityCreate,
        tableOnWeiXinActivityFilter,
        changeWeiXinActivityPageSize,
        changeWeiXinActivityPageIndex,
        tablePageChangeWeiXinActivity,
        tableOnWeiXinActivityUpdate,
        tableWeiXinActivityUp,
        tableWeiXinActivityDown,

        handleOnAdd,handleOnPagesConfig,
    };
    let weiXinActivityAddOrEditModalProps = {
        weiXinActivityFormLoading,
        weiXinActivityFormData,
        weiXinActivityFormVisible,
        weiXinActivityFormType,
        weiXinActivityFormSubmit,
        weiXinActivityFormCancel,
    };


    /*活动管理--------------------------------------------------------------------------------------*/
    let weiXinAdminiSearchProps = {
        weiXinAdminiSearchReset,
        weiXinAdminiSearchSubmit,
    };
    let weiXinAdminiListProps = {
        weiXinAdminiPageIndex,      //活动管理列表当前页码
        weiXinAdminiPageSize,       //活动管理列表每页显示数量
        weiXinAdminiLoading,
        weiXinAdminiList,
        weiXinAdminiTotal,
        tableOnWeiXinAdminiCreate,
        tableOnWeiXinAdminiFilter,
        changeWeiXinAdminiPageSize,
        changeWeiXinAdminiPageIndex,
        tablePageChangeWeiXinAdmini,
        tableOnWeiXinAdminiUpdate,
        tableWeiXinAdminiUp,
        tableWeiXinAdminiDown,

        handleOnAdd,handleOnPagesConfig,
    };
    let weiXinAdminiAddOrEditModalProps = {
        weiXinAdminiFormLoading,
        weiXinAdminiFormData,
        weiXinAdminiFormVisible,
        weiXinAdminiFormType,
        weiXinAdminiFormSubmit,
        weiXinAdminiFormCancel,
    };



    /*预约试听--------------------------------------------------------------------------------------*/
    let weiXinAppointSearchProps = {
        weiXinAppointSearchReset,
        weiXinAppointSearchSubmit,
    };
    let weiXinAppointListProps = {
        weiXinAppointPageIndex,      //预约试听列表当前页码
        weiXinAppointPageSize,       //预约试听列表每页显示数量
        weiXinAppointLoading,
        weiXinAppointList,
        weiXinAppointTotal,
        tableOnWeiXinAppointCreate,
        tableOnWeiXinAppointFilter,
        changeWeiXinAppointPageSize,
        changeWeiXinAppointPageIndex,
        tablePageChangeWeiXinAppoint,
        tableOnWeiXinAppointUpdate,
        tableWeiXinAppointUp,
        tableWeiXinAppointDown,

        handleOnAdd,handleOnPagesConfig,
    };
    let weiXinAppointAddOrEditModalProps = {
        weiXinAppointFormLoading,
        weiXinAppointFormData,
        weiXinAppointFormVisible,
        weiXinAppointFormType,
        weiXinAppointFormSubmit,
        weiXinAppointFormCancel,
    };


	/*线下传单*/		
    let weiXinOfflineLeafletsSearchProps = {
        weiXinOfflineLeafletsSearchReset,
        weiXinOfflineLeafletsSearchSubmit,
    };	
	let weiXinOfflineLeafletsListProps = {
        weiXinOfflineLeafletsPageIndex,      //微信活动列表当前页码
        weiXinOfflineLeafletsPageSize,       //微信活动列表每页显示数量
        weiXinOfflineLeafletsLoading,
        weiXinOfflineLeafletsList,
        weiXinOfflineLeafletsTotal,
        tableOnWeiXinOfflineLeafletsCreate,
        tableOnWeiXinOfflineLeafletsFilter,
        changeWeiXinOfflineLeafletsPageSize,
        changeWeiXinOfflineLeafletsPageIndex,
        tablePageChangeWeiXinOfflineLeaflets,
        tableOnWeiXinOfflineLeafletsUpdate,
        tableWeiXinOfflineLeafletsUp,
        tableWeiXinOfflineLeafletsDown,

        handleOnAdd,handleOnPagesConfig,
    };
	let weiXinOfflineLeafletsAddOrEditModalProps = {
        weiXinOfflineLeafletsFormLoading,
        weiXinOfflineLeafletsFormData,
        weiXinOfflineLeafletsFormVisible,
        weiXinOfflineLeafletsFormType,
        weiXinOfflineLeafletsFormSubmit,
        weiXinOfflineLeafletsFormCancel,
    };
		
    //微信游戏
    let weiXinGameSearchProps = {
        weiXinGameSearchReset,
        weiXinGameSearchSubmit,
    };
    let weiXinGameListProps = {
        weiXinGamePageIndex,          //微信游戏列表当前页码
        weiXinGamePageSize,           //微信游戏列表每页显示数量
        weiXinGameLoading,
        weiXinGameList,
        weiXinGameTotal,
        tableOnWeiXinGameCreate,
        tableOnWeiXinGameFilter,
        changeWeiXinGamePageSize,
        changeWeiXinGamePageIndex,
        tablePageChangeWeiXinGame,
        tableWeiXinGameUp,
        tableWeiXinGameDown,
        tableOnWeiXinGameUpdate,
    };
    let weiXinGameAddOrEditModalProps = {
        weiXinGameFormLoading,
        weiXinGameFormData,
        weiXinGameFormVisible,
        weiXinGameFormType,
        weiXinGameFormSubmit,
        weiXinGameFormCancel,
    };

    let changeTabs = function(activeKey){
        //关闭新增界面
        dispatch({
            type: 'moduleBasePropsFormModel/updateState',
            payload: {
                visible : false,    //隐藏添加界面
                labelAll : [],      //清空标签数组
            }
        });

        if('1'==activeKey){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinActivityList',
                payload:{
                    pageIndex:weiXinActivityPageIndex,
                    pageSize:weiXinActivityPageSize,
                },
            });
        }else if('3'==activeKey){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinOfflineLeafletsList',
                payload:{
                    pageIndex:weiXinOfflineLeafletsPageIndex,
                    pageSize:weiXinOfflineLeafletsPageSize,
                },
            });
        }else if('4'==activeKey){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinGameList',
                payload:{
                    pageIndex:weiXinGamePageIndex,
                    pageSize:weiXinGamePageSize,
                },
            });
        }else if('6'==activeKey){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinAdminiList',
                payload:{
                    pageIndex:weiXinAdminiPageIndex,
                    pageSize:weiXinAdminiPageSize,
                },
            });
        }else if('7'==activeKey){
            dispatch({
                type: 'weiXinMarketingModelSet/queryForWeiXinAppointList',
                payload:{
                    pageIndex:weiXinAppointPageIndex,
                    pageSize:weiXinAppointPageSize,
                },
            });
        }
    }

    let panels = [
        <TabPane tab={<span><Icon type="home" />微信活动</span>} key="1">
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {weiXinActivitySearchVisible ? [
                    <WeiXinActivitySearch {...weiXinActivitySearchProps} key="search_queue_weixinActivity"/>
                ]:null}
            </QueueAnim>
            <WeiXinActivityList {...weiXinActivityListProps} />
            <WeiXinActivityAddOrEditModal {...weiXinActivityAddOrEditModalProps} />
            <ModuleBasePropsForm />
            <ModulePageConfigForm />	
			<ModuleLeafletsPageConfigForm />
        </TabPane>,
    ];

    panels.push(
			<TabPane tab={<span><Icon type="home" />线下传单</span>} key="3">
				<QueueAnim
					type={['top', 'top']}
					ease={['easeOutQuart', 'easeInOutQuart']}
					className="common-search-queue" >
					{weiXinOfflineLeafletsSearchVisible ? [
					   <WeiXinOfflineLeafletsSearch {...weiXinOfflineLeafletsSearchProps} key="search_queue_weixinGame"/>
					]:null}
				</QueueAnim>
				<WeiXinOfflineLeafletsList {...weiXinOfflineLeafletsListProps} />
				<WeiXinOfflineLeafletsAddOrEditModal {...weiXinOfflineLeafletsAddOrEditModalProps} />
				<ModuleBasePropsForm />
            	<ModulePageConfigForm />	
				<ModuleLeafletsPageConfigForm />
			</TabPane>
		)
    panels.push(
        <TabPane tab={<span><Icon type="home" />活动管理</span>} key="6">
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {weiXinAdminiSearchVisible ? [
                    <WeiXinAdminiSearch {...weiXinAdminiSearchProps} key="search_queue_weixinAdmini"/>
                ]:null}
            </QueueAnim>
            <WeiXinAdminiList {...weiXinAdminiListProps} />
            <WeiXinAdminiAddOrEditModal {...weiXinAdminiAddOrEditModalProps} />
            <ModuleBasePropsForm />
            <ModulePageConfigForm />
			<ModuleLeafletsPageConfigForm />
        </TabPane>
    )
     panels.push(
        <TabPane tab={<span><Icon type="home" />预约试听</span>} key="7">
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {weiXinAppointSearchVisible ? [
                    <WeiXinAppointSearch {...weiXinAppointSearchProps} key="search_queue_weixinAppoint"/>
                ]:null}
            </QueueAnim>
            <WeiXinAppointList {...weiXinAppointListProps} />
            <WeiXinAppointAddOrEditModal {...weiXinAppointAddOrEditModalProps} />
            <ModuleBasePropsForm />
            <ModulePageConfigForm />
			<ModuleLeafletsPageConfigForm />
        </TabPane>
    )

    if(window.manager_platform != 'thinknode') {

        panels.push(
            <TabPane tab={<span><Icon type="home" />微信游戏</span>} key="4">
                <QueueAnim
                    type={['top', 'top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}
                    className="common-search-queue">
                    {weiXinGameSearchVisible ? [
                        <WeiXinGameSearch {...weiXinGameSearchProps} key="search_queue_weixinGame"/>
                    ] : null}
                </QueueAnim>
                <WeiXinGameList {...weiXinGameListProps} />
                <WeiXinGameAddOrEditModal {...weiXinGameAddOrEditModalProps} />
            </TabPane>
        );
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={changeTabs}>
                {panels}
            </Tabs>
        </div>
  );
}

WeiXinMarketingModelSet.propTypes = {
  weiXinMarketingModelSet: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ weiXinMarketingModelSet }) {
  return { weiXinMarketingModelSet };
}

export default connect(mapStateToProps)(WeiXinMarketingModelSet);
