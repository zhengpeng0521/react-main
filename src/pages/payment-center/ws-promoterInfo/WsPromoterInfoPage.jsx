import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button, } from 'antd';
import WsPromoterInfoComponent from '../../../components/payment-center/ws-promoterInfo/WsPromoterInfoCom';

function WsPromoterInfoPage({ dispatch,  WsPromoterInfoModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        tableLoading,
    } = WsPromoterInfoModel;

    function showSearchFun(){
        dispatch({
            type:'WsPromoterInfoModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'WsPromoterInfoModel/queryPromoterList',
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
            type: 'WsPromoterInfoModel/queryPromoterList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };

    //导出
    function exportFun(){
       if ( searchContent.startTime != undefined && searchContent.mobile == undefined && searchContent.userName == undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}`, '_blank');
        }else if( searchContent.startTime == undefined && searchContent.mobile != undefined && searchContent.userName == undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?mobile=${searchContent.mobile}`, '_blank');
        }else if( searchContent.startTime == undefined && searchContent.mobile == undefined && searchContent.userName != undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?userName=${searchContent.userName}`, '_blank');
        }else if( searchContent.startTime != undefined && searchContent.mobile != undefined && searchContent.userName == undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&mobile=${searchContent.mobile}`, '_blank');
        }else if( searchContent.startTime != undefined && searchContent.mobile == undefined && searchContent.userName != undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&userName=${searchContent.userName}`, '_blank');
        }else if( searchContent.startTime == undefined && searchContent.mobile != undefined && searchContent.userName != undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?mobile=${searchContent.mobile}&userName=${searchContent.userName}`, '_blank');
        }else if( searchContent.startTime !== undefined && searchContent.mobile != undefined && searchContent.userName != undefined){
            window.open(`${BASE_URL}/wsmchController/exportPromoterList?startTime=${searchContent.startTime}&endTime=${searchContent.endTime}&mobile=${searchContent.mobile}&userName=${searchContent.userName}`, '_blank');
        } else{
            window.open(`${BASE_URL}/wsmchController/exportPromoterList`, '_blank');
        }
    }

    let WsPromoterInfoProps = {
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
    };

    return (
        <div>
            < WsPromoterInfoComponent { ... WsPromoterInfoProps } />
        </div>
    )
};

function mapStateToProps ({  WsPromoterInfoModel }){
	return {  WsPromoterInfoModel };
};

export default connect( mapStateToProps )(  WsPromoterInfoPage );
