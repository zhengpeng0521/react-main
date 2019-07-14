import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import WsSettlementReportCom from '../../../components/payment-center/ws-settlementReport/WsSettlementReportCom';

function WsSettlementReportPage({ dispatch, WsSettlementReportModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        tableLoading,
		appNameList,        //服务商信息下拉列表
		appId,            //服务商信息

    } = WsSettlementReportModel;

    function showSearchFun(){
        dispatch({
            type:'WsSettlementReportModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'WsSettlementReportModel/settOperateQueryList',
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
            type: 'WsSettlementReportModel/settOperateQueryList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };
	/*服务商信息更新*/
	function appNameChange(value){
		dispatch({
			type : 'WsSettlementReportModel/updateState',
			payload : {
				appId : value,
			}
		})
	}

    //导出
    function exportFun(){
		let url = `${BASE_URL}/wsmchController/exportSettOperateList?`;
		for(let i in searchContent){
			if(searchContent[i]){
				url = url + i +'='+searchContent[i]+'&'
			}
		}
        window.open(url, '_blank');
    }

    let WsSettlementReportProps = {
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
		appNameList,        //服务商信息下拉列表
		appId,            //服务商信息
		appNameChange,      //服务商信息更新
    };


    return (
        <WsSettlementReportCom { ...WsSettlementReportProps } />
    )
};

function mapStateToProps ({ WsSettlementReportModel }){
	return { WsSettlementReportModel };
};

export default connect( mapStateToProps )( WsSettlementReportPage );
