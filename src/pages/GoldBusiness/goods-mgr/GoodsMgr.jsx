import React, { PropTypes } from 'react';
import GoodsMgrSearch from '../../../components/GoldBusiness/goods-mgr/GoodsMgrSearch';
import GoodsMgrList from '../../../components/GoldBusiness/goods-mgr/GoodsMgrList';
import GoodsMgrModal from '../../../components/GoldBusiness/goods-mgr/GoodsMgrModal';
import H5PreviewModal from '../../../components/common/H5PreviewModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './GoodsMgr.less';

function GoodsMgr({ dispatch, goodsMgr }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        previewModalVisible,previewUrl,
    } = goodsMgr;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'goodsMgr/updateState',
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
    let tablePageChange = function(current, pageSize=goodsMgr.pageSize) {

        dispatch({
            type: 'goodsMgr/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'goodsMgr/query',
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
            type: 'goodsMgr/addModal',
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
            type: 'goodsMgr/addModal',
            payload:{
                formVisible:true,
                formType:'create',
                formData:{},
            }
        });
    };

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'goodsMgr/addModal',
            payload:{
                formVisible:false,
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'goodsMgr/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'goodsMgr/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'goodsMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'goodsMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'goodsMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'goodsMgr/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'goodsMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'goodsMgr/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'goodsMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'goodsMgr/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };



    //表单窗口提交
    let formSubmit = function(data,type) {
        dispatch({
            type: 'goodsMgr/updateState',
            payload: {
                formVisible : false,
            },
        });
        if(type=='update'){
            dispatch({
                type: 'goodsMgr/GoodsUpdate',
                payload: {
                    ...data,
                },
            });
        }else if(type='create'){
            dispatch({
                type: 'goodsMgr/GoodsCreate',
                payload: {
                    ...data,
                },
            });
        }
    };

    let previewOnOk = function() {
        dispatch({
            type: 'goodsMgr/updateState',
            payload: {
                previewModalVisible : false,
                previewUrl : '',
            },
        });
    };

    let tableOnEditGoodsHtmlDetailItem = function(id) {
        dispatch({
            type: 'goodsMgr/updateState',
            payload: {
                previewModalVisible : true,
                previewUrl : `${BASE_URL}/goldShop/getHtmlDetail?id=${id}`
            },
        });
    };

    let goodsMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let goodsMgrListProps = {
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
        tableOnEditGoodsHtmlDetailItem,
    };

    let goodsMgrModalProps = {
        formLoading, formData, formVisible,formType,
        formCancel,
        formSubmit,
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
                   <GoodsMgrSearch {...goodsMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <GoodsMgrList {...goodsMgrListProps} />
            <GoodsMgrModal {...goodsMgrModalProps} />
            <H5PreviewModal {...h5PreviewModalProps} />
        </div>
  );
}

GoodsMgr.propTypes = {
  goodsMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ goodsMgr }) {
  return { goodsMgr };
}

export default connect(mapStateToProps)(GoodsMgr);
