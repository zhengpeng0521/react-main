import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import WsSendMaterialCom from '../../../components/payment-center/ws-sendMaterialReport/WsSendMaterialCom';

function WsSendMaterialPage({ dispatch, WsSendMaterialModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        tableLoading,
        subject ,           //备注
        sendTime ,          //邮寄时间
        expressNum,       //快递单号
        mchName ,          //机构名称
        id,                //编号
        subjectVisible,    //备注框显示
        sendTimeVisible,    //邮寄时间框显示
        expressNumVisible,   //快递单号框显示
        selectedRowKeys ,
        selectedRows ,

    } = WsSendMaterialModel;

    function showSearchFun(){
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'WsSendMaterialModel/queryWSMaterialApplyList',
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
            type: 'WsSendMaterialModel/queryWSMaterialApplyList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };

    //导出
    function exportFun(){
        if (searchContent.startTime == undefined && searchContent.mchName != undefined && searchContent.mchId !=undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?mchName=${searchContent.mchName}&mchId=${searchContent.mchId}`, '_blank');
        }else if(searchContent.startTime != undefined && searchContent.status == undefined && searchContent.mchId !=undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&mchId=${searchContent.mchId}`, '_blank');
        }else if(searchContent.startTime != undefined && searchContent.mchName != undefined && searchContent.mchId !=undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&mchName=${searchContent.mchName}&mchId=${searchContent.mchId}`, '_blank');
        }else if(searchContent.startTime != undefined && searchContent.mchName != undefined && searchContent.mchId ==undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&mchName=${searchContent.mchName}`, '_blank');
        }else if(searchContent.startTime != undefined && searchContent.mchName == undefined && searchContent.mchId == undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}`, '_blank');
        }else if(searchContent.startTime == undefined && searchContent.mchName != undefined && searchContent.mchId == undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?mchName=${searchContent.mchName}`, '_blank');
        }else if(searchContent.startTime == undefined && searchContent.mchName == undefined && searchContent.mchId != undefined){
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList?mchId=${searchContent.mchId}`, '_blank');
        }else{
            window.open(`${BASE_URL}/wsmchController/exportWSMaterialApplyList`, '_blank');
        }

    }

    /*备注编辑*/
    function subjectEdit(value,subject){
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
               id :value,
               subjectVisible :true,
            }
        });
    }

    //备注保存
    function subjectSave(value,id){
         dispatch({
            type:'WsSendMaterialModel/editWSMaterialApply',
            payload:{
               subject : value,
               id : id,
            }
        });
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
               subjectVisible : false,
//               subject : value,
            }
        });
    }

    //邮寄时间编辑
    function sendTimeEdit(value){
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
               id :value,
               sendTimeVisible :true,
            }
        });
    }

    //邮寄时间保存
    function sendTimeSave(value,id){
        dispatch({
            type:'WsSendMaterialModel/editWSMaterialApply',
            payload:{
               sendTime : value,
               id : id,
            }
        });
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
               sendTimeVisible : false,
//               sendTime : value,
            }
        });
    }

    //快递单号编辑
    function expressNumEdit(value){
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
               id :value,
               expressNumVisible :true,
            }
        });
    }

    //快递单号保存
    function expressNumSave(value,id){
        dispatch({
            type:'WsSendMaterialModel/editWSMaterialApply',
            payload:{
               expressNum : value,
               id : id,
            }
        });
        dispatch({
            type:'WsSendMaterialModel/updateState',
            payload:{
               expressNumVisible : false,
//               expressNum : value,
            }
        });
    }
    /*复选框处理事件*/
    function rowSelectChangeAction(selectedRowKeys,selectedRows){
        dispatch({
            type : 'WsSendMaterialModel/updateState',
           	payload : {
                selectedRowKeys,
                selectedRows
                }
        	})
    }

    /*发送短信*/
    function sendInfoFun(){
        let ids = [];
        for(let i in selectedRows){
            ids.push(selectedRows[i].id)
        }
        let userid = ids.join(',');
        dispatch({
            type : 'WsSendMaterialModel/materialExpressMessage',
            payload : {
               ids : userid,
            }
        })
    }

    let WsSendMaterialProps = {
        dataSource,
        isShowSearch,
        showSearchFun,
        SearchSubmit,
        total,
        pageSize,
        pageIndex,
        tableOnChange,
        exportFun,
        tableLoading,
        subjectEdit,
        subjectSave,
        subject ,           //备注
        sendTime ,          //邮寄时间
        expressNum,       //快递单号
        mchName ,          //机构名称
        id,                //编号
        subjectVisible,    //备注框显示
        sendTimeSave,       //邮寄时间保存
        sendTimeEdit,       //邮寄时间编辑
        sendTimeVisible,    //邮寄时间框显示
        expressNumSave,     //快递单号保存
        expressNumEdit,     //快递单号编辑
        expressNumVisible,   //快递单号框显示
        selectedRowKeys ,
        selectedRows ,
        rowSelectChangeAction,
        sendInfoFun,       //短信发送
    };


    return (
        <WsSendMaterialCom { ...WsSendMaterialProps } />
    )
};

function mapStateToProps ({ WsSendMaterialModel }){
	return { WsSendMaterialModel };
};

export default connect( mapStateToProps )( WsSendMaterialPage );
