import React, { PropTypes } from 'react';
import ChannelMgrSearch from '../../../components/ChannelMgr/channel-mgr/ChannelMgrSearch';
import ChannelMgrList from '../../../components/ChannelMgr/channel-mgr/ChannelMgrList';
import ChannelMgrModal from '../../../components/ChannelMgr/channel-mgr/ChannelMgrModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './ChannelMgr.less';

function ChannelMgr({ dispatch, channelMgr }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = channelMgr;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'channelMgr/updateState',
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
    let tablePageChange = function(current, pageSize=channelMgr.pageSize) {
        dispatch({
            type: 'channelMgr/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'channelMgr/query',
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
            type: 'channelMgr/addModal',
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
            type: 'channelMgr/addModal',
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
            type: 'channelMgr/addModal',
            payload:{
                formVisible:false,
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'channelMgr/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'channelMgr/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'channelMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'channelMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'channelMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'channelMgr/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'channelMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'channelMgr/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'channelMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'channelMgr/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };



    //编辑提交
    let formUpdateSubmit = function(data) {
        dispatch({
            type: 'channelMgr/updateState',
            payload: {
                formVisible : false,
                formLoading : false,
            },
        });
        dispatch({
            type: 'channelMgr/formUpdateSubmit',
            payload: {
                ...data
            },
        });
    };

    //新增提交
    let formCreateSubmit = function(data) {
        dispatch({
            type: 'channelMgr/updateState',
            payload: {
                formVisible : false,
                formLoading : false,
            },
        });
        dispatch({
            type: 'channelMgr/formCreateSubmit',
            payload: {
                ...data
            },
        });
    };

    let channelMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let channelMgrListProps = {
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
    };

    let channelMgrModalProps = {
        formLoading, formData, formVisible,formType,
        formCancel,
        formUpdateSubmit,formCreateSubmit
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <ChannelMgrSearch {...channelMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <ChannelMgrList {...channelMgrListProps} />
            <ChannelMgrModal {...channelMgrModalProps} />
        </div>
  );
}

ChannelMgr.propTypes = {
  channelMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ channelMgr }) {
  return { channelMgr };
}

export default connect(mapStateToProps)(ChannelMgr);
