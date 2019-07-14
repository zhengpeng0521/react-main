import React, { PropTypes } from 'react';
import SignMgrSearch from '../../../components/GoldBusiness/sign-list/SignMgrSearch';
import SignMgrList from '../../../components/GoldBusiness/sign-list/SignMgrList';
import SignMgrModal from '../../../components/GoldBusiness/sign-list/SignMgrModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './SignList.less';

function SignList({ dispatch, signList }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = signList;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'signList/updateState',
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
    let tablePageChange = function(current, pageSize=signList.pageSize) {

        dispatch({
            type: 'signList/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'signList/query',
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
    let tableOnCreate = function(record) {
        dispatch({
            type: 'signList/addModal',
            payload:{
                formVisible:true,
            }
        });
    };

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'signList/addModal',
            payload:{
                formVisible:false,
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'signList/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'signList/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'signList/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'signList/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'signList/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'signList/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'signList/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'signList/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'signList/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'signList/query',
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

    let signMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let signMgrListProps = {
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

    let signMgrModalProps = {
        formLoading, formData, formVisible,formType,
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
                   <SignMgrSearch {...signMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <SignMgrList {...signMgrListProps} />
            <SignMgrModal {...signMgrModalProps} />
        </div>
  );
}

SignList.propTypes = {
  signList: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ signList }) {
  return { signList };
}

export default connect(mapStateToProps)(SignList);
