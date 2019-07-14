import React, { PropTypes } from 'react';
import SupervisionList from '../../components/Advertisement/Supervision-advertising/SupervisionList';
import SupervisionSearch from '../../components/Advertisement/Supervision-advertising/SupervisionSearch';
import SupervisionAddOrEditModal from '../../components/Advertisement/Supervision-advertising/SupervisionAddOrEditModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function Supervision({ dispatch, supervisionMessage }) {
    let {
         /*table*/
        supervisionPageIndex ,        //页码
        supervisionPageSize ,         //一页条数
        supervisionLoading ,          //列表加载状态
        supervisionTotal ,            //列表内容总条数
        supervisionTableContent ,     //列表内容

        /*search bar*/
        searchVisible ,       //搜索栏是否显示
        searchContent ,         //搜索栏搜索内容

        /*新增广告*/
        addOrEditSupervisionVisible ,            //新增编辑广告modal是否显示
        addOrEditSupModalButtonLoading ,         //新增编辑广告modal按钮是否在加载状态
        checkOrEditSupDetailMsg,                 //新增编辑广告信息
    } = supervisionMessage;

    /*搜索按钮*/
    let searchSubmit = function(filters){
        console.info('filters', filters);
        dispatch({
            type: 'supervisionMessage/SupervisionList',
            payload: {
                ...searchContent,
                ...filters,
            },
        });
    }
    /*筛选*/
    let supervisionTableOnFilter = function(){
            dispatch({
                type: 'supervisionMessage/updateState',
                payload: {
                    searchVisible : !searchVisible,
                },
            });
        }
    /*广告table分页等条件改变事件*/
     let supervisionTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'supervisionMessage/SupervisionList',
                payload: {
                    ...searchContent,
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
        }
     /*新增编辑广告*/
        /*点击新增广告*/
        let supervisionMessageAdd = function(tenantId){
            dispatch({
                type:'supervisionMessage/updateState',
                payload:{
                    addOrEditSupervisionVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddOrEditSupModalCancel = function(){
            dispatch({
                type:'supervisionMessage/updateState',
                payload:{
                    addOrEditSupervisionVisible : false,
                    checkOrEditSupDetailMsg : {}
                }
            });
        }

        /*新增编辑提交*/
        let AddOrEditSupModalSubmit = function(data){
            dispatch({
                type:'supervisionMessage/SupervisionAdd',
                payload:{
                    ...data
                }
            })
        }
         //列表内点击编辑
        let supTableOnEdit = function(id){
            dispatch({
                type:'supervisionMessage/SupervisionEdit',
                payload:{
                    addOrEditSupervisionVisible : true,
                    id,
                }
            });
        }
        /*设置广告状态上架*/
        let tableSupPackageDown = function(data){
            dispatch({
                type:'supervisionMessage/SupervisionUpdateState',
                payload:{
                    id:data.id,
                    status:1,
                }
            });
        }
         /*设置广告状态下架*/
        let tableSupPackageUp = function(data){
            dispatch({
                type:'supervisionMessage/SupervisionUpdateState',
                payload:{
                    id:data.id,
                    status:2,
                }
            });
        }
        /*删除广告*/
        let tableSupPackageDel = function(data){
            dispatch({
                type:'supervisionMessage/SupervisionUpdateState',
                payload:{
                    id:data.id,
                    status:0,
                }
            });
        }
     /*search属性*/
      let supervisionMessageSearchProps = {
        searchSubmit,           //搜索栏点击搜索或者清除条件
        }
     /*table属性*/
     let supMessageListProps = {
        supervisionPageIndex ,        //页码
        supervisionPageSize ,         //一页条数
        supervisionLoading ,          //列表加载状态
        supervisionTotal ,            //列表内容总条数
        supervisionTableContent ,     //列表内容
        supTableOnEdit,               //点击编辑

        searchSubmit,                 //搜索按钮
        supervisionTableOnFilter,     //筛选
        supervisionTableOnChange,     //table分页等条件改变事件
        supervisionMessageAdd,         //新增广告
        tableSupPackageDown,           //上架
        tableSupPackageUp,             //下架
        tableSupPackageDel,            //广告删除
     }
     /*新增编辑广告*/
    let supervisionMessageAddOrgModalProps = {
        addOrEditSupervisionVisible,               //新增编辑校区modal是否显示
        addOrEditSupModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkOrEditSupDetailMsg,                //新增编辑机构信息

        AddOrEditSupModalSubmit,                //新增编辑校区提交
        AddOrEditSupModalCancel,                //新增编辑校区modal关闭
    }
    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{searchVisible ? [
                   <SupervisionSearch {...supervisionMessageSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <SupervisionList {...supMessageListProps}/>
            {addOrEditSupervisionVisible == true ? <SupervisionAddOrEditModal {...supervisionMessageAddOrgModalProps}/> : null}
        </div>
  );
}

function mapStateToProps({ supervisionMessage }) {
  return { supervisionMessage };
}

export default connect(mapStateToProps)(Supervision);
