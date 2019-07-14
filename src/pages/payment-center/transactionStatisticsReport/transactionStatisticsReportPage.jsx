import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button, } from 'antd';
import TransactionStatisticsReportCom from '../../../components/payment-center/transactionStatisticsReport/transactionStatisticsReportCom';

function transactionStatisticsReportPage({ dispatch,  transactionStatisticsReportModel }){
    let {
        dataSource,
        isShowSearch,
        total,
        pageSize,
        pageIndex,
        searchContent,
        tableLoading,
    } = transactionStatisticsReportModel;

    function showSearchFun(){
        dispatch({
            type:'transactionStatisticsReportModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'transactionStatisticsReportModel/queryPromoterList',
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
            type: 'transactionStatisticsReportModel/queryPromoterList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };

    //导出
    function exportFun(){
		let url = `${BASE_URL}/wsmchController/exportTradeTotalReport?`;
		for(let i in searchContent){
			if(searchContent[i]){
				url = url + i +'='+searchContent[i]+'&'
			}
		}
        window.open(url, '_blank');
    }

    let TransactionStatisticsReportProps = {
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
            < TransactionStatisticsReportCom { ... TransactionStatisticsReportProps } />
        </div>
    )
};

function mapStateToProps ({  transactionStatisticsReportModel }){
	return {  transactionStatisticsReportModel };
};

export default connect( mapStateToProps )(  transactionStatisticsReportPage );
