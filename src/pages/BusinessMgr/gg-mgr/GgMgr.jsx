import React, { PropTypes } from 'react';
import GgMgrList from '../../../components/BusinessMgr/gg-mgr/GgMgrList';
import GgMgrSearch from '../../../components/BusinessMgr/gg-mgr/GgMgrSearch';
import GgMgrAdOrModifyModal from '../../../components/BusinessMgr/gg-mgr/GgMgrAdOrModifyModal';
import H5PreviewModal from '../../../components/common/H5PreviewModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';


function GgMgr({ dispatch, ggMgr }) {

    //只传数据
    let {
        loading, List, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible, addFormVisible,innerFormVisible,formType,                 //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
        previewModalVisible,previewUrl,                      //富文本编辑器
    } = ggMgr;
    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'ggMgr/updateState',
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
    let tablePageChange = function(current, pageSize=ggMgr.pageSize) {
        dispatch({
            type: 'ggMgr/query',
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

    let tableOnEditItem = function(id) {
        dispatch({
            type:'ggMgr/openUpdate',
            payload : {
                id
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function() {
        dispatch({
            type:'ggMgr/updateState',
            payload : {
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                addFormVisible : true,    //表单窗口是否显示
                formType : 'create',
            }
        });
    };

    //设置框取消显示
    let formCancel = function(){
        dispatch({
            type:'ggMgr/updateState',
            payload:{
                formVisible:false,
            }
        });
    }

    //新增和里层modal关闭
    let modifyFormCancel = function(){
        dispatch({
            type:'ggMgr/updateState',
            payload:{
                addFormVisible:false,
                innerFormVisible:false,
                formData : {},
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'ggMgr/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击设置
    let tableOnSetItem = function(data) {
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                addFormVisible:true,
                formType:'update',
                formData:data,
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'ggMgr/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'ggMgr/clearCache',
            payload: {
                id,
            },
        });
    };

    let tableOnChangeStatus = function(data){
        if('0'==data.status){
            dispatch({
                type:'ggMgr/ChangeStatus',
                payload:{
                    id:data.id,
                    status:'1',
                }
            });
        }else if('1'==data.status){
            dispatch({
                type:'ggMgr/ChangeStatus',
                payload:{
                    id:data.id,
                    status:'0',
                }
            });
        }
    }
    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'ggMgr/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'ggMgr/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'ggMgr/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(data) {
        console.log('pages',data);
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                searchData:data,
            },
        });
        dispatch({
            type: 'ggMgr/searchQuery',
            payload: {
                ...data,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //导出
    let searchExport = function(searchData){
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'ggMgr/export',
            payload: {
                ...searchData,
            },
        });
    };


    //表单窗口提交
    let formUpdateSubmit = function(handleData) {
        dispatch({
            type: 'ggMgr/updateState',
            payload : {
                formLoading : false,
                innerFormVisible : false,
                addFormVisible : false,
            }
        });
        dispatch({
            type: 'ggMgr/formUpdateSubmit',
            payload: {
                ...handleData
            },
        });
    }

    let formCreateSubmit = function(handleData){
        dispatch({
            type: 'ggMgr/updateState',
            payload : {
                formLoading : true,
            }
        });
        dispatch({
            type: 'ggMgr/formCreateSubmit',
            payload: {
                ...handleData
            },
        });
    }

    //打开里层Modal修改
    let tableOnModify = function(record){
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                formLoading : false,
                addFormVisible : false,
                innerFormVisible : true,
                formType : 'update',
                formData : record,
            },
        });
    }

    //编辑富文本
    let tableOnUpdateHtmldetailItem = function(record){
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                previewModalVisible : true,
                //previewUrl : `${BASE_URL}/trial/getExplainHtmlDetail?id=${record.id}`,
                previewUrl:'',
            },
        });
    }
    //关闭富文本
    let previewOnOk = function() {
        dispatch({
            type: 'ggMgr/updateState',
            payload: {
                previewModalVisible : false,
                previewUrl : '',
            },
        });
    };

    //组件附加属性，包括方法 参数
    let ggMgrListProps = {
        loading, List, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnSetItem,
        tableOnClearCacheItem,
        tableOnAddEssenceItem,
        tableOnRecommendItem,
        tableOnDoUpItem,
        tableOnCreate,
        tableOnFilter,
        tableOnChangeStatus,
    };

    let ggMgrSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };

    let ggMgrAdOrModifyModalProps = {
        formLoading, formData, addFormVisible,innerFormVisible,formType,searchChannelList,
        modifyFormCancel,
        formUpdateSubmit,formCreateSubmit
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
                   <GgMgrSearch {...ggMgrSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <GgMgrList {...ggMgrListProps} />
            <GgMgrAdOrModifyModal {...ggMgrAdOrModifyModalProps} />
            <H5PreviewModal {...h5PreviewModalProps} />
        </div>
  );
}

GgMgr.propTypes = {
  ggMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ ggMgr }) {
  return { ggMgr };
}

export default connect(mapStateToProps)(GgMgr);
