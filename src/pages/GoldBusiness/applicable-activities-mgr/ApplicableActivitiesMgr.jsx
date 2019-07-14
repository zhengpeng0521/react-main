import React, { PropTypes } from 'react';
import ApplicableActivitiesMgrSearch from '../../../components/GoldBusiness/applicable-activities-mgr/Search';
import ApplicableActivitiesMgrList from '../../../components/GoldBusiness/applicable-activities-mgr/List';
import CreateModal from '../../../components/GoldBusiness/applicable-activities-mgr/CreateModal';
import UpdateModal from '../../../components/GoldBusiness/applicable-activities-mgr/UpdateModal';
import BalanceModal from '../../../components/GoldBusiness/applicable-activities-mgr/BalanceModal';
import OpenImgModal from '../../../components/GoldBusiness/applicable-activities-mgr/openImgModal';
import H5PreviewModal from '../../../components/common/H5PreviewModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function ApplicableActivitiesMgr({ dispatch, applicableActivitiesMgr }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formCreateVisible,formUpdateVisible,formType,                    //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        previewModalVisible,previewUrl,imgUrl,imgVisible,imgContent,
        goodsList,
        balanceTableLoading, balanceBtnLoading, balanceVisible, balanceDataList,balanceTrialActivityId,balanceFilterUserNickname,balanceResultCount,
        balancePageSize,balancePageIndex,
    } = applicableActivitiesMgr;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
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
    let tablePageChange = function(current, pageSize=applicableActivitiesMgr.pageSize) {

        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                pageIndex : current-1,
                pageSize,
                selectedRowKeys : [],
                selectedRows : [],
            },
        });
        dispatch({
            type: 'applicableActivitiesMgr/query',
            payload: {
                ...searchData,
                pageIndex : current-1,
                pageSize
            },
        });
    };

    let tableBalancePageChange = function(current, balancePageSize = applicableActivitiesMgr.balancePageSize) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                balancePageIndex : current-1,
                balancePageSize
            },
        });
        dispatch({
            type: 'applicableActivitiesMgr/queryTrialActivityDetails',
            payload: {
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
        console.log('pages edit');
        dispatch({
            type: 'applicableActivitiesMgr/openUpdate',
            payload : {
                id
            }
        });
    };

    let tableOnBalanceItem = function(trialActivityId) {
        dispatch({
            type: 'applicableActivitiesMgr/openBalance',
            payload : {
                trialActivityId
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function() {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
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
            type: 'applicableActivitiesMgr/changesearchVisible'
        });
    };

    //表格点击预览
    let tableOnPreviewItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                previewModalVisible : true,
                previewUrl : applicableActivitiesMgr.imgUrl + id,
            },
        });
    };

    let tableOnEditExplainHtmlDetailItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                previewModalVisible : true,
                previewUrl : `${BASE_URL}/trial/getExplainHtmlDetail?id=${id}`
            },
        });
    };

    let tableOnEditFlowHtmlDetailItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                previewModalVisible : true,
                previewUrl : `${BASE_URL}/trial/getFlowHtmlDetail?id=${id}`
            },
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    let tableOnCancleEssenceItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/addEssence',
            payload: {
                id,
                essence : '0'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/doUp',
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
                type: 'applicableActivitiesMgr/batchAddEssence',
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
                type: 'applicableActivitiesMgr/batchAddEssence',
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
                type: 'applicableActivitiesMgr/batchRecommend',
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
                type: 'applicableActivitiesMgr/batchDoUp',
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
                type: 'applicableActivitiesMgr/batchClearCache',
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
                type: 'applicableActivitiesMgr/batchDelete',
                payload: {
                    id,
                },
            });
        }
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'applicableActivitiesMgr/query',
            payload: {
                searchData : {}
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'applicableActivitiesMgr/query',
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
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formCreateVisible : false,    //表单窗口是否显示
                formUpdateVisible : false,    //表单窗口是否显示
                imgVisible : false,    //表单窗口是否显示
            },
        });
    };

    //表单窗口提交
    let formSubmit = function(data,type) {
        console.log('formsubmit');
        if('create' == type){
            console.log('create');
            dispatch({
                type: 'applicableActivitiesMgr/createFormSubmit',
                payload: {
                    ...data
                },
            });
        }else if('update' == type){
            console.log('update');
            dispatch({
                type: 'applicableActivitiesMgr/updateFormSubmit',
                payload: {
                    ...data
                },
            });
        }

    };


    let previewOnOk = function() {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                previewModalVisible : false,
                previewUrl : '',
            },
        });
    };

    let balanceCancle = function() {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                balanceTableLoading : false,
                balanceBtnLoading : false,
                balanceVisible : false,
                balanceDataList : [],
                balanceTrialActivityId : undefined,
            },
        });
    };

    let balanceSubmit = function() {
        dispatch({
            type: 'applicableActivitiesMgr/balanceSubmit',
            payload: {
                trialActivityId : balanceTrialActivityId,
            },
        });
    };

    let balanceAccessItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/balanceAccess',
            payload: {
                id,
            },
        });
    };

    let balanceRejectItem = function(id) {
        dispatch({
            type: 'applicableActivitiesMgr/balanceReject',
            payload: {
                id,
            },
        });
    };

    let balanceNicknameFilter = function(value, option) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                balanceFilterUserNickname : [value],
            },
        });
    };

    let nicknameFilterChange = function(event) {
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                balanceFilterUserNickname : [event.target.value],
            },
        });
    };

    //点击图片看大图
    let tableOpenImg = function(record){
        dispatch({
            type: 'applicableActivitiesMgr/updateState',
            payload: {
                imgVisible:true,
                imgContent:record.imgurl,
            },
        });
    }


    let searchProps = {
        searchData, searchVisible,searchChannelList,goodsList,
        searchReset,
        searchSubmit,
    };


    let listProps = {
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
        tableOnEditExplainHtmlDetailItem,
        tableOnEditFlowHtmlDetailItem,
        tableOnBalanceItem,
        tableOpenImg,
    };

    let createModalProps = {
        formLoading, formData, formCreateVisible,formType,searchChannelList,goodsList,
        formCancle,
        formSubmit,
    };

    let updateModalProps = {
        formLoading, formData, formUpdateVisible,formType,searchChannelList,goodsList,
        formCancle,
        formSubmit,
    };

    let balanceModalProps = {
        balanceTableLoading, balanceBtnLoading, balanceVisible, balanceDataList,balanceTrialActivityId,balanceFilterUserNickname,
        tableOnChange,
        tableBalancePageChange,
        balanceResultCount,
        balanceCancle,
        balanceSubmit,
        balanceAccessItem,
        balanceRejectItem,
        balanceNicknameFilter,
        nicknameFilterChange,
    };

    let h5PreviewModalProps = {
        previewUrl,previewModalVisible,
        previewOnOk,
    };

    let openImgModalProps = {
        imgVisible,imgContent,
        formCancle,
    }

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <ApplicableActivitiesMgrSearch {...searchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <ApplicableActivitiesMgrList {...listProps} />
            <CreateModal {...createModalProps} />
            <UpdateModal {...updateModalProps} />
            <BalanceModal {...balanceModalProps} />
            <OpenImgModal {...openImgModalProps} />
            <H5PreviewModal {...h5PreviewModalProps} />
        </div>
  );
}

ApplicableActivitiesMgr.propTypes = {
  applicableActivitiesMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ applicableActivitiesMgr }) {
  return { applicableActivitiesMgr };
}

export default connect(mapStateToProps)(ApplicableActivitiesMgr);
