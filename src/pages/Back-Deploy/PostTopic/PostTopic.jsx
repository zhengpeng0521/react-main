import React, { PropTypes } from 'react';
import PostTopicSearch from '../../../components/Back-Deploy/post-topic/PostTopicSearch';
import PostTopicList from '../../../components/Back-Deploy/post-topic/PostTopicList';
import PostTopicModal from '../../../components/Back-Deploy/post-topic/PostTopicModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './PostTopic.less';

function PostTopic({ dispatch, postTopic }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,transData,                   //form表单数据
        searchData, searchVisible, searchChannelList,              //search查询框数据
    } = postTopic;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'postTopic/updateState',
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
    let tablePageChange = function(current, pageSize=postTopic.pageSize) {
        dispatch({
            type: 'postTopic/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'postTopic/query',
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
            type: 'postTopic/updateState',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : record,       //表单数据
                formVisible:true,
                formType:'update',
                transData: record.relatedTopic,
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function() {
        dispatch({
            type: 'postTopic/addModal',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formVisible:true,
                formType:'create',
                transData:[],
            }
        });
    };

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'postTopic/addModal',
            payload:{
                formLoading:false,
                formVisible:false,
                transData : []
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'postTopic/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'postTopic/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'postTopic/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'postTopic/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'postTopic/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'postTopic/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'postTopic/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'postTopic/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'postTopic/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'postTopic/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //表单提交
    let formSubmit = function(data,type){
        dispatch({
            type: 'postTopic/updateState',
            payload: {
                formVisible:false,
                formLoading:false,
                transData : [],
            },
        });
        if(type=='update'){
            dispatch({
                type: 'postTopic/formUpdateSubmit',
                payload: {
                    ...data
                },
            });
        }else if(type=='create'){
            dispatch({
                type: 'postTopic/formCreateSubmit',
                payload: {
                    ...data
                },
            });
        }
    }

    //简介是否全部展示
    let tableOnShowAll = function(index){
        let newList=[];
        postTopic.list[index].shortIntro = postTopic.list[index].intro;
        for(let i=0;i<postTopic.list.length;i++){
            newList.push(postTopic.list[i]);
        }
        dispatch({
                type: 'postTopic/updateState',
                payload: {
                    list : newList,
                },
        });
    }
    //简介是否展示收起
    let tableOnShowClose = function(index){
        let newList=[];
        postTopic.list[index].shortIntro = postTopic.list[index].shortIntro.substr(0,30)+'......';
        for(let i=0;i<postTopic.list.length;i++){
            newList.push(postTopic.list[i]);
        }
        dispatch({
                type: 'postTopic/updateState',
                payload: {
                    list : newList,
                },
        });
    }

    let postTopicSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let postTopicListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnClearCacheItem,
        tableOnAddEssenceItem,
        tableOnRecommendItem,
        tableOnDoUpItem,
        tableOnCreate,
        tableOnFilter,
        tableOnDeleteItem,
        tableOnShowAll,
        tableOnShowClose,
    };

    let postTopicModalProps = {
        formLoading, formData, formVisible,formType,transData,
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
                   <PostTopicSearch {...postTopicSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <PostTopicList {...postTopicListProps} />
            <PostTopicModal {...postTopicModalProps} />
        </div>
  );
}

PostTopic.propTypes = {
  postTopic: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ postTopic }) {
  return { postTopic };
}

export default connect(mapStateToProps)(PostTopic);
