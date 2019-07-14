import React, { PropTypes } from 'react';
import ShanShanShareList from '../../../components/BusinessMgr/shanshan-share/ShanShanShareList';
import ShanShanShareModal from '../../../components/BusinessMgr/shanshan-share/ShanShanShareModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function ShanShanShare({ dispatch, shanshanShare }) {

    //只传数据
    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,schoolType,  //list数据
        formLoading, formData, newTopicData, formVisible, formType,justify, //form表单数据
        searchData, searchVisible, searchChannelList,       //search查询框数据
        pricePolicyId,
    } = shanshanShare;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'shanshanShare/updateState',
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
    let tablePageChange = function(current, pageSize=organRegister.pageSize) {
        dispatch({
            type: 'shanshanShare/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'shanshanShare/query',
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

    let tableOnEditItem = function(data){
        dispatch({
            type: 'shanshanShare/updateState',
            payload: {
                formVisible:true,
                formData:data,
            },
        });
    }

    //表单窗口提交
    let formSubmit = function(data) {
        dispatch({
            type: 'shanshanShare/updateState',
            payload: {
                justify:'null',
            },
        });
        dispatch({
            type: 'shanshanShare/formSubmit',
            payload: {
                ...data,
            },
        });
    };

    //表单关闭
    let formCancel = function(){
        dispatch({
            type: 'shanshanShare/updateState',
            payload: {
                formVisible:false,
                newTopicData:{},
                justify:'null',
            },
        });
    }

    //表单内帖子ID查询
    let SearchTopic = function(sourceId){
        dispatch({
            type: 'shanshanShare/SearchTopic',
            payload: {
                sourceId
            },
        });
    }

    let shanshanShareListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableOnEditItem,
    };

    let shanshanShareModalProps = {
        formLoading, formData, newTopicData, formVisible,justify,
        formType,searchChannelList,
        formCancel,
        formSubmit,
        SearchTopic,
    };


    return (
        <div>
            <ShanShanShareList {...shanshanShareListProps} />
            <ShanShanShareModal {...shanshanShareModalProps} />
        </div>
  );
}

ShanShanShare.propTypes = {
  shanshanShare: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ shanshanShare }) {
  return { shanshanShare };
}

export default connect(mapStateToProps)(ShanShanShare);
