import React, { PropTypes } from 'react';
import BannerMgrSearch from '../../../components/BusinessMgr/banner-mgr/BannerMgrSarch';
import BannerMgrList from '../../../components/BusinessMgr/banner-mgr/BannerMgrList';
import BannerMgrUpdateModal from '../../../components/BusinessMgr/banner-mgr/BannerMgrUpdateModal';
import BannerMgrCreateModal from '../../../components/BusinessMgr/banner-mgr/BannerMgrCreateModal';
import H5PreviewModal from '../../../components/common/H5PreviewModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function BannerMgr({ dispatch, bannerMgr }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formCreateVisible,formUpdateVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        previewModalVisible,previewUrl,
        areasList, targetList,
    } = bannerMgr;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'bannerMgr/updateState',
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
    let tablePageChange = function(current, pageSize=bannerMgr.pageSize) {

        dispatch({
            type: 'bannerMgr/updateState',
            payload: {
                pageIndex : current-1,
                pageSize,
                selectedRowKeys : [],
                selectedRows : [],
            },
        });
        dispatch({
            type: 'bannerMgr/query',
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
    let tableOnEditItem = function(id) {
        dispatch({
            type: 'bannerMgr/openUpdate',
            payload : {
                id
            }
        });
    };

    //表格点击编辑富文本
    let tableOnUpdateHtmldetailItem = function(id) {
        dispatch({
            type: 'bannerMgr/openHtmldetail',
            payload : {
                id
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function() {
        dispatch({
            type: 'bannerMgr/updateState',
            payload : {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formCreateVisible : true,    //表单窗口是否显示
                formType : 'create',
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'bannerMgr/changesearchVisible'
        });
    };

    //表格点击预览
    let tableOnPreviewItem = function(shareUrl) {
        if(shareUrl) {
            dispatch({
                type: 'bannerMgr/updateState',
                payload: {
                    previewModalVisible : true,
                    previewUrl : shareUrl
                },
            });
        } else {
            message.warn('没有配置地址');
        }
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'bannerMgr/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'bannerMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    let tableOnCancleEssenceItem = function(id) {
        dispatch({
            type: 'bannerMgr/addEssence',
            payload: {
                id,
                essence : '0'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'bannerMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'bannerMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'bannerMgr/doUp',
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
                type: 'bannerMgr/batchAddEssence',
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
                type: 'bannerMgr/batchAddEssence',
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
                type: 'bannerMgr/batchRecommend',
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
                type: 'bannerMgr/batchDoUp',
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
                type: 'bannerMgr/batchClearCache',
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
                type: 'bannerMgr/batchDelete',
                payload: {
                    id,
                },
            });
        }
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'bannerMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'bannerMgr/query',
            payload: {
                searchData : {}
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'bannerMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'bannerMgr/query',
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
            type: 'bannerMgr/updateState',
            payload: {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formUpdateVisible : false,    //表单窗口是否显示
                formCreateVisible : false,    //表单窗口是否显示
            },
        });
    };

    //表单窗口提交
    let formSubmit = function(data) {
        dispatch({
            type: 'bannerMgr/updateState',
            payload: {
                formLoading : true,
            },
        });
        dispatch({
            type: 'bannerMgr/formSubmit',
            payload: {
                ...data
            },
        });
    };

    let bannerMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let bannerMgrListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnUpdateHtmldetailItem,
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

    let bannerMgrUpdateModalProps = {
        formLoading, formData, formUpdateVisible,formType,searchChannelList,areasList, targetList,
        formCancle,
        formSubmit,
    };
    let bannerMgrCreateModalProps = {
        formLoading, formData, formCreateVisible,formType,searchChannelList,areasList, targetList,
        formCancle,
        formSubmit,
    };

    let previewOnOk = function() {
        dispatch({
            type: 'bannerMgr/updateState',
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
                   <BannerMgrSearch {...bannerMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <BannerMgrList {...bannerMgrListProps} />
            <BannerMgrUpdateModal {...bannerMgrUpdateModalProps} />
            <BannerMgrCreateModal {...bannerMgrCreateModalProps} />
            <H5PreviewModal {...h5PreviewModalProps} />
        </div>
  );
}

BannerMgr.propTypes = {
  bannerMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ bannerMgr }) {
  return { bannerMgr };
}

export default connect(mapStateToProps)(BannerMgr);
