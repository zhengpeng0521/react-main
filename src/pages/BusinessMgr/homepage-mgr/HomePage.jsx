import React, { PropTypes } from 'react';
import HomePageSearch from '../../../components/BusinessMgr/homepage-mgr/HomePageSearch';
import HomePageList from '../../../components/BusinessMgr/homepage-mgr/HomePageList';
import HomePageModal from '../../../components/BusinessMgr/homepage-mgr/HomePageModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './HomePage.less';

function HomePage({ dispatch, homePage }) {

    //只传数据
    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible, formType,                 //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = homePage;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'secondSale/updateState',
            payload: {
                selectedRowKeys, selectRows
            },
        });
    };

    //列表行是否能选中
    let tableRowCheckProps = function(record ) {
        return true;
    };

    //列表分页 变更
    let tablePageChange = function(current, pageSize=homePage.pageSize) {
        dispatch({
            type: 'homePage/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'homePage/queryForlList',
            payload: {
                ...searchData,
                pageIndex : current-1,
                pageSize
            },
        });
    };

    //表格分页、排序、筛选变化时触发
    let tableOnChange = function(pagination, filters, sorter) {
        //TODO
    };

    //表格列标题点击事件
    let tableColumnHeadClick = function(columnKey) {
        //TODO
    };

    //表格点击编辑
    let tableOnEditItem = function(record) {
        dispatch({
            type:'homePage/addModal',
            payload:{
                formVisible:true,
                formType:'update',
                formData:record,
            }
        });
    };


    //表格点击新增
    let tableOnCreate = function(record) {
        dispatch({
            type:'homePage/addModal',
            payload:{
               formVisible:true,
               formType:'create',
               formData:{},
            }
        });
    };

    //新增框取消显示
    let formCancel = function(){
        dispatch({
            type:'homePage/addModal',
            payload:{
                formVisible:false,
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'homePage/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'homePage/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'homePage/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'homePage/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'homePage/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'homePage/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'homePage/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'homePage/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'homePage/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'homePage/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };


    //新增表单窗口提交
    let createFormSubmit = function(data) {
        dispatch({
            type: 'homePage/updateState',
            payload: {
                formVisible : false,
                formLoading :false,
            },
        });
        dispatch({
            type: 'homePage/createFormSubmit',
            payload: {
                ...data
            },
        });
    };

    //修改表单窗口提交
    let updateFormSubmit = function(data){
        dispatch({
            type: 'homePage/updateState',
            payload: {
                formVisible : false,
                formLoading :false,
            },
        });
        dispatch({
            type: 'homePage/updateFormSubmit',
            payload: {
                ...data
            },
        });
    }

    //组件附加属性，包括方法 参数
    let homePageSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let homePageListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnDeleteItem,
        tableOnClearCacheItem,
        tableOnAddEssenceItem,
        tableOnRecommendItem,
        tableOnDoUpItem,
        tableOnCreate,
        tableOnFilter,
    };

    let homePageModalProps = {
        formLoading, formData, formVisible,formType,
        updateFormSubmit,createFormSubmit,formCancel,
    };


    return (
        <div>
            <HomePageList {...homePageListProps} />
            <HomePageModal {...homePageModalProps} />
        </div>
  );
}

HomePage.propTypes = {
  homePage: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ homePage }) {
  return { homePage };
}

export default connect(mapStateToProps)(HomePage);
