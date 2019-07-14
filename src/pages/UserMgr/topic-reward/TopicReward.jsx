import React, { PropTypes } from 'react';
import TopicRewardSearch from '../../../components/UserMgr/topic-reward/TopicRewardSearch';
import TopicRewardList from '../../../components/UserMgr/topic-reward/TopicRewardList';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './TopicReward.less';

function TopicReward({ dispatch, topicReward }) {

    //只传数据
    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible, formType,                 //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = topicReward;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'topicReward/updateState',
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
    let tablePageChange = function(current, pageSize=topicReward.pageSize) {
        dispatch({
            type: 'topicReward/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'topicReward/query',
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
            type:'topicReward/addModal',
            payload:{
                formVisible:true
            }
        });
    };


    //表格点击新增
    let tableOnCreate = function(record) {
        dispatch({
            type:'topicReward/addModal',
            payload:{
                formVisible:true
            }
        });
    };

    //新增框取消显示
    let formCancel = function(){
        dispatch({
            type:'topicReward/addModal',
            payload:{
                formVisible:false,
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'topicReward/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'topicReward/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'topicReward/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'topicReward/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'topicReward/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'topicReward/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'topicReward/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'topicReward/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'topicReward/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'topicReward/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    let searchExport = function(searchData){
        dispatch({
            type: 'topicReward/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'topicReward/export',
            payload: {
                ...searchData,
            },
        });
    }


    //表单窗口提交
    let formSubmit = function() {

    };

    //组件附加属性，包括方法 参数
    let topicRewardSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
        searchExport,
    };


    let topicRewardListProps = {
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
                   <TopicRewardSearch {...topicRewardSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <TopicRewardList {...topicRewardListProps} />
        </div>
  );
}

TopicReward.propTypes = {
  topicReward: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ topicReward }) {
  return { topicReward };
}

export default connect(mapStateToProps)(TopicReward);
