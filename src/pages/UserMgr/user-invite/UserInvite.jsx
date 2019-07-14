import React, { PropTypes } from 'react';

import UserInviteList from '../../../components/UserMgr/user-invite/UserInviteList';
import UserInviteSearch from '../../../components/UserMgr/user-invite/UserInviteSearch';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function UserInvite({ dispatch, userInvite }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        previewModalVisible,previewUrl,
    } = userInvite;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'userInvite/updateState',
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
    let tablePageChange = function(current, pageSize=userInvite.pageSize) {

        dispatch({
            type: 'userInvite/updateState',
            payload: {
                pageIndex : current-1,
                pageSize,
                selectedRowKeys : [],
                selectedRows : [],
            },
        });
        dispatch({
            type: 'userInvite/query',
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

    };

    //表格点击新增
    let tableOnCreate = function(topicType) {
        dispatch({
            type: 'userInvite/updateState',
            payload : {
                formLoading : false,    //表单按钮是否加载中
                formData : {topicType},       //表单数据
                formVisible : true,    //表单窗口是否显示
                formType : 'create',
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'userInvite/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击预览
    let tableOnPreviewItem = function(id) {
        dispatch({
            type: 'userInvite/updateState',
            payload: {
                previewModalVisible : true,
                previewUrl : IMAGE_URL + '/community/html/community_share.html?topicId=' + id
            },
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'userInvite/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'userInvite/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    let tableOnCancleEssenceItem = function(id) {
        dispatch({
            type: 'userInvite/addEssence',
            payload: {
                id,
                essence : '0'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'userInvite/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'userInvite/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'userInvite/doUp',
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
                type: 'userInvite/batchAddEssence',
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
                type: 'userInvite/batchAddEssence',
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
                type: 'userInvite/batchRecommend',
                payload: {
                    id,
                    recommend : '1'
                },
            });
        }
    };

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
                type: 'userInvite/batchDoUp',
                payload: {
                    id,
                },
            });
        }
    };

    //批量清除缓存
    function tableOnClearCacheBatch() {
        let id = '';
        if(selectedRows && selectedRows.length > 0) {
            selectedRows.map(function(item) {
                id += item.id + ',';
            });
            id = id.substring(0,id.length-1)
        }
        if(id != '') {
            dispatch({
                type: 'userInvite/batchClearCache',
                payload: {
                    id,
                },
            });
        }
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
                type: 'userInvite/batchDelete',
                payload: {
                    id,
                },
            });
        }
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'userInvite/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'userInvite/query',
            payload: {
                searchData : {}
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'userInvite/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'userInvite/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //表单窗口关闭
    let formCancle = function() {
        dispatch({
            type: 'userInvite/updateState',
            payload: {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formVisible : false,    //表单窗口是否显示
            },
        });
    };

    //表单窗口提交
    let formSubmit = function() {

    };


    let userInviteSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };

    let userInviteListProps = {
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
    };

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <UserInviteSearch {...userInviteSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <UserInviteList {...userInviteListProps} />
        </div>
    );
}

UserInvite.propTypes = {
  userInvite: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ userInvite }) {
  return { userInvite };
}

export default connect(mapStateToProps)(UserInvite);
