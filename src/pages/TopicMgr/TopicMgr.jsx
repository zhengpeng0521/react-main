import React, { PropTypes } from 'react';
import TopicMgrSearch from '../../components/TopicMgr/topic-mgr/TopicMgrSarch';
import TopicMgrList from '../../components/TopicMgr/topic-mgr/TopicMgrList';
import TopicMgrAddModal from '../../components/TopicMgr/topic-mgr/TopicMgrAddModal';
import TopicMgrUpdateModal from '../../components/TopicMgr/topic-mgr/TopicMgrUpdateModal';
import H5PreviewModal from '../../components/common/H5PreviewModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function TopicMgr({ dispatch, topicMgr }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, addFormVisible,updateFormVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        previewModalVisible,previewUrl,imgUrl,imgContents,
    } = topicMgr;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                selectedRowKeys, selectedRows
            },
        });
    };

    //列表行是否能选中
    let tableRowCheckProps = function(record ) {
        return true;
    };

    //列表分页 变更
    let tablePageChange = function(current, pageSize=topicMgr.pageSize) {

        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                pageIndex : current-1,
                pageSize,
                selectedRowKeys : [],
                selectedRows : [],
            },
        });
        dispatch({
            type: 'topicMgr/query',
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
            type: 'topicMgr/updateState',
            payload: {
                formLoading : false,    //表单按钮是否加载中
                updateFormVisible : true,    //表单窗口是否显示
                formData:record,
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function(topicType) {
        dispatch({
            type: 'topicMgr/updateState',
            payload : {
                formLoading : false,    //表单按钮是否加载中
                addFormVisible : true,    //表单窗口是否显示
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'topicMgr/changesearchVisible'
        });
    };


    //表格点击预览
    let tableOnPreviewItem = function(id) {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                previewModalVisible : true,
                previewUrl : topicMgr.imgUrl + id
            },
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'topicMgr/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'topicMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    let tableOnCancleEssenceItem = function(id) {
        dispatch({
            type: 'topicMgr/addEssence',
            payload: {
                id,
                essence : '0'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'topicMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'topicMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'topicMgr/doUp',
            payload: {
                id,
            },
        });
    };

    //批量加精
    let tableOnAddEssenceBatch = function() {
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'topicMgr/batchAddEssence',
                payload: {
                    id,
                    essence : '1'
                },
            });
        }
    };

    //批量取消精华
    let tableOnCancleEssenceBatch = function() {
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'topicMgr/batchAddEssence',
                payload: {
                    id,
                    essence : '0'
                },
            });
        }
    };

    //批量推荐
    let tableOnRecommendBatch = function() {
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'topicMgr/batchRecommend',
                payload: {
                    id,
                    recommend : '1'
                },
            });
        }
    };

    //批量取消推荐
    function tableOnCancleRecommendBatch(){
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'topicMgr/batchRecommend',
                payload: {
                    id,
                    recommend : '0'
                },
            });
        }
    }

    //批量置顶
    function tableOnDoUpBatch() {
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'topicMgr/batchDoUp',
                payload: {
                    id,
                },
            });
        }
    };

    //批量清除缓存
    function tableOnClearCacheBatch() {
        dispatch({
            type: 'topicMgr/batchClearCache',
        });
    };

    function tableOnDeleteBatch() {
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'topicMgr/batchDelete',
                payload: {
                    id,
                },
            });
        }
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'topicMgr/query',
            payload: {
                searchData : {}
            },
        });
    };

    //查询框点击导出
    let searchExport = function(searchData){
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'topicMgr/export',
            payload: {
                ...searchData
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'topicMgr/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                addFormVisible : false,    //表单窗口是否显示
                updateFormVisible : false,    //表单窗口是否显示
                imgContents : [],
            },
        });
    };

    //表单窗口提交
    let formCreateSubmit = function(data) {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                imgContents : [],
                addFormVisible : false,
            },
        });
        dispatch({
            type: 'topicMgr/addImgTextTopic',
            payload: {
                ...data
            }
        });
    };

    let formUpdateSubmit = function(data){
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                imgContents : [],
                updateFormVisible : false,
            },
        });
        dispatch({
            type: 'topicMgr/updateImgTextTopic',
            payload: {
                ...data
            }
        });
    }

    let addCount = function(data){
        let Array = [];
        for(let i=0;i<data;i++){
            Array.push(i);
        }
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                imgContents : Array,
            },
        });
    }

    let topicMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
        searchExport,
    };


    let topicMgrListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,searchChannelList,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnDeleteItem,
        tableOnClearCacheItem,
        tableOnAddEssenceItem,
        tableOnCancleEssenceItem,
        tableOnRecommendItem,
        tableOnDoUpItem,
        tableOnCreate,
        tableOnFilter,
        tableOnPreviewItem,
        tableOnAddEssenceBatch,
        tableOnCancleEssenceBatch,
        tableOnRecommendBatch,
        tableOnDoUpBatch,
        tableOnClearCacheBatch,
        tableOnDeleteBatch,
        tableOnCancleRecommendBatch
    };


    let topicMgrAddModalProps = {
        formLoading, formData, addFormVisible,formType,searchChannelList,imgContents,addCount,formCreateSubmit,
        formCancel,
    };
    let topicMgrUpdateModalProps = {
        formLoading, formData, updateFormVisible,formType,searchChannelList,imgContents,addCount,formUpdateSubmit,
        formCancel,
    };

    let previewOnOk = function() {
        dispatch({
            type: 'topicMgr/updateState',
            payload: {
                previewModalVisible : false,
                previewUrl : '',
            },
        });
    };

    let h5PreviewModalProps = {
        previewUrl,previewModalVisible,
        previewOnOk,
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <TopicMgrSearch {...topicMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <TopicMgrList {...topicMgrListProps} />
            <TopicMgrAddModal {...topicMgrAddModalProps} />
            <TopicMgrUpdateModal {...topicMgrUpdateModalProps}/>
            <H5PreviewModal {...h5PreviewModalProps} />
        </div>
  );
}

TopicMgr.propTypes = {
  topicMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ topicMgr }) {
  return { topicMgr };
}

export default connect(mapStateToProps)(TopicMgr);
