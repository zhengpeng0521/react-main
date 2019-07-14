import React, { PropTypes } from 'react';
import GoldMgrSearch from '../../../components/GoldBusiness/gold-mgr/GoldMgrSearch';
import GoldMgrList from '../../../components/GoldBusiness/gold-mgr/GoldMgrList';
import GoldMgrModal from '../../../components/GoldBusiness/gold-mgr/GoldMgrModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './GoldMgr.less';

function GoldMgr({ dispatch, goldMgr }) {

    //只传数据
    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible, formType,                 //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = goldMgr;
    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'goldMgr/updateState',
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
    let tablePageChange = function(current, pageSize=goldMgr.pageSize) {
        dispatch({
            type: 'goldMgr/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'goldMgr/query',
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
    /*let tableOnEditItem = function(id) {
        console.log("编辑");
        console.log(id);
        dispatch({
            type:'goldMgr/openUpdate',
            payload : {
                id,
            }
        });
    };*/

    let tableOnEditItem = function(id) {
        console.log("编辑");
        console.log(id);
        dispatch({
            type:'goldMgr/openUpdate',
            payload : {
                id
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function(record) {
        console.log(record);
        dispatch({
            type:'goldMgr/updateState',
            payload : {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formVisible : true,    //表单窗口是否显示
                formType : 'create',
            }
        });
    };

    //新增或编辑框取消显示
    let formCancel = function(){
        dispatch({
            type:'goldMgr/updateState',
            payload:{
                formVisible:false,
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'goldMgr/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'goldMgr/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'goldMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'goldMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'goldMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'goldMgr/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'goldMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'goldMgr/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'goldMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'goldMgr/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //导出
    let searchExport = function(searchData){
        dispatch({
            type: 'goldMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'goldMgr/export',
            payload: {
                ...searchData,
            },
        });
    };


    //表单窗口提交
    let formSubmit = function(handleData) {
        dispatch({
            type: 'goldMgr/updateState',
            payload: {
                formVisible:false,
            },
        });
        dispatch({
            type: 'goldMgr/formSubmit',
            payload: {
                ...handleData
            },
        });
    };

    //组件附加属性，包括方法 参数
    let goldMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
        searchExport,
    };


    let goldMgrListProps = {
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

    let goldMgrModalProps = {
        formLoading, formData, formVisible,formType,
        formSubmit,formCancel
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <GoldMgrSearch {...goldMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <GoldMgrList {...goldMgrListProps} />
            <GoldMgrModal {...goldMgrModalProps} />
        </div>
  );
}

GoldMgr.propTypes = {
  goldMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ goldMgr }) {
  return { goldMgr };
}

export default connect(mapStateToProps)(GoldMgr);
