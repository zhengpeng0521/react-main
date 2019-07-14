import React, { PropTypes } from 'react';
import TopicReportSearch from '../../../components/UserMgr/topic-report/TopicReportSearch';
import TopicReportList from '../../../components/UserMgr/topic-report/TopicReportList';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './TopicReport.less';

function TopicReport({ dispatch, topicReport }) {

    //只传数据
    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible, formType,                 //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = topicReport;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'topicReport/updateState',
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
    let tablePageChange = function(current, pageSize=topicReport.pageSize) {
        dispatch({
            type: 'topicReport/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'topicReport/query',
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
            type:'topicReport/addModal',
            payload:{
                editFormVisible:true
            }
        });
    };


    //表格点击新增
    let tableOnCreate = function(record) {
        dispatch({
            type:'topicReport/addModal',
            payload:{
                addFormVisible:true
            }
        });
    };

    //新增框取消显示
    let formCancel = function(){
        dispatch({
            type:'topicReport/addModal',
            payload:{
                addFormVisible:false,
                editFormVisible:false,
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'topicReport/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'topicReport/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'topicReport/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'topicReport/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'topicReport/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'topicReport/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'topicReport/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'topicReport/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'topicReport/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'topicReport/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };


    //表单窗口提交
    let formSubmit = function() {

    };

    //组件附加属性，包括方法 参数
    let topicReportSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let topicReportListProps = {
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

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <TopicReportSearch {...topicReportSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <TopicReportList {...topicReportListProps} />
        </div>
  );
}

TopicReport.propTypes = {
  topicReport: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ topicReport }) {
  return { topicReport };
}

export default connect(mapStateToProps)(TopicReport);
