import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ToReviewComponent from '../../../components/payment-center/to-review/toReviewCom';

function ToReviewPage({ dispatch, toReviewModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        operationStatus,
        modalVisible,
        buttonLoading,
        operationMchId,
        operationRecordId,
        operationSta,
        isShowLoseModal,
        tableLoading,

    } = toReviewModel;

    function showSearchFun(){
        dispatch({
            type:'toReviewModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'toReviewModel/getToReviewList',
            payload:{
                pageIndex : 0,
                pageSize,
                searchContent
            }
        });
    }
    //分页
    let tableOnChange = function(pagination, filters, sorter) {
        dispatch({
            type: 'toReviewModel/getToReviewList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };
    //操作 打款 和 审核通过
    let Operation = function(text,record){
        dispatch({
            type:'toReviewModel/updateState',
            payload:{
                operationStatus : record.operateStatus,
                modalVisible : true,
                operationMchId : record.mchId || '',
                operationRecordId : record.id || '',
                operationSta : text == '0' ? '1' : text == '1' ? '2' : '0',
            }
        });
    }
    //关闭操作弹框
    function cancelShenhe(){
        dispatch({
            type:'toReviewModel/updateState',
            payload:{
                modalVisible : false,
                isShowLoseModal : false,
            }
        })
    }
    //提交备注信息
    function okShenheSubmit(remark){
        dispatch({
            type:'toReviewModel/toReviewSubmit',
            payload:{
                mchId : operationMchId,
                recordId : operationRecordId,
                status : operationSta,
                remark,
            }
        })

    }

    //失败
    function canCelOperation(record){
        dispatch({
            type:'toReviewModel/updateState',
            payload:{
                operationStatus : record.operateStatus,
                isShowLoseModal : true,
                operationMchId : record.mchId || '',
                operationRecordId : record.id || '',
                operationSta : '0',
            }
        });
    }

    //导出
    function exportFun(){
        if ( searchContent.startTime == undefined && searchContent.status != undefined){
            window.open(`${BASE_URL}/PayAccountController/exportSettList?status=${searchContent.status}`, '_blank');
        }else if( searchContent.startTime != undefined && searchContent.status == undefined ){
            window.open(`${BASE_URL}/PayAccountController/exportSettList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}`, '_blank');
        }else if( searchContent.startTime != undefined && searchContent.status != undefined ){
            window.open(`${BASE_URL}/PayAccountController/exportSettList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&status=${searchContent.status}`, '_blank');
        }else{
            window.open(`${BASE_URL}/PayAccountController/exportSettList`, '_blank');
        }

    }

    let toReviewProps = {
        dataSource,
        isShowSearch,
        showSearchFun,
        SearchSubmit,
        total,
        pageSize,
        pageIndex,
        operationStatus,
        modalVisible,
        buttonLoading,
        cancelShenhe,
        tableOnChange,
        Operation,
        okShenheSubmit,
        canCelOperation,
        isShowLoseModal,
        exportFun,
        tableLoading,
    };


    return (
        <ToReviewComponent { ...toReviewProps } />
    )
};

function mapStateToProps ({ toReviewModel }){
	return { toReviewModel };
};

export default connect( mapStateToProps )( ToReviewPage );
