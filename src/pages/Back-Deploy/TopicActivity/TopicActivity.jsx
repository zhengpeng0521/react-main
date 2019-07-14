import React, { PropTypes } from 'react';
import TopicActivitySearch from '../../../components/Back-Deploy/topic-activity/TopicActivitySearch';
import TopicActivityList from '../../../components/Back-Deploy/topic-activity/TopicActivityList';
import TopicActivityAddOrEditModal from '../../../components/Back-Deploy/topic-activity/TopicActivityAddOrEditModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

import styles from './TopicActivity.less';

function TopicActivity({ dispatch, topicActivity }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,transData,                   //form表单数据
        searchData, searchVisible, searchChannelList,              //search查询框数据
    } = topicActivity;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'topicActivity/updateState',
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
    let tablePageChange = function(current, pageSize=topicActivity.pageSize) {
        dispatch({
            type: 'topicActivity/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'topicActivity/query',
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
            type: 'topicActivity/updateState',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : record,       //表单数据
                formVisible:true,
                formType:'update',
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function() {
        dispatch({
            type: 'topicActivity/queryForSearchChannelList',
        });
        dispatch({
            type: 'topicActivity/updateState',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formVisible:true,
                formType:'create',
            }
        });
    };

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'topicActivity/updateState',
            payload:{
                loading:false,
                formLoading:false,
                formVisible:false,
                transData : []
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'topicActivity/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格上下架修改
    let tableOnChangeStatus = function(id,status){
        console.log('tableOnChangeStatus ',id,status);
        let params = {id};
        if('1'==status){
            params.status = '0';
            dispatch({
                type: 'topicActivity/ChangeStatus',
                payload: {
                    ...params,
                }
            });
        }else if('0'==status){
            params.status = '1';
            dispatch({
                type: 'topicActivity/ChangeStatus',
                payload: {
                    ...params,
                }
            })
        }
    }
    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'topicActivity/delete',
            payload: {
                id
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'topicActivity/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'topicActivity/queryTopicList',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'topicActivity/queryTopicList',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //表单提交
    let formSubmit = function(data,type){
        if('update'==type){
            dispatch({
                type: 'topicActivity/formUpdateSubmit',
                payload: {
                    ...data
                },
            });
        }else if('create'==type){
            dispatch({
                type: 'topicActivity/formCreateSubmit',
                payload: {
                    ...data
                },
            });
        }
    }

    //简介是否全部展示
    let tableOnShowAll = function(index){
        let newList=[];
        topicActivity.list[index].shortIntro = topicActivity.list[index].content;
        for(let i=0;i<topicActivity.list.length;i++){
            newList.push(topicActivity.list[i]);
        }
        dispatch({
                type: 'topicActivity/updateState',
                payload: {
                    list : newList,
                },
        });
    }
    //简介是否展示收起
    let tableOnShowClose = function(index){
        let newList=[];
        topicActivity.list[index].shortIntro = topicActivity.list[index].shortIntro.substr(0,30)+'......';
        for(let i=0;i<topicActivity.list.length;i++){
            newList.push(topicActivity.list[i]);
        }
        dispatch({
                type: 'topicActivity/updateState',
                payload: {
                    list : newList,
                },
        });
    }

    let topicActivitySearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let topicActivityListProps = {
        loading, list, total, pageIndex, pageSize,
        tableOnFilter,
        tablePageChange,
        tableOnChange,
        tableOnChangeStatus,
        tableOnEditItem,
        tableOnCreate,
        tableOnDeleteItem,
        tableOnShowAll,
        tableOnShowClose,
    };

    let topicActivityAddOrEditModalProps = {
        formLoading, formData, formVisible,formType,searchChannelList,
        formCancel,
        formSubmit,
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <TopicActivitySearch {...topicActivitySearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <TopicActivityList {...topicActivityListProps} />
            <TopicActivityAddOrEditModal {...topicActivityAddOrEditModalProps} />
        </div>
  );
}

TopicActivity.propTypes = {
  topicActivity: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ topicActivity }) {
  return { topicActivity };
}

export default connect(mapStateToProps)(TopicActivity);
