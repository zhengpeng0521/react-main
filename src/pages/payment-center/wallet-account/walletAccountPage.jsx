import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import WalletComponent from '../../../components/payment-center/wallet-account/walletAccountCom';

function WalletPage({ dispatch, walletModel }){
    let {
        dataSource,
        isShowDetails,
        dataSource1,
        isShowSearch,
        tenantName,
        mchId,
        tableLoading,
        pageSize,
        pageIndex,
        pageSize1,
        pageIndex1,
        searchContent,
        total,
        total1

    } = walletModel;

    //查看详情列表
    function showDetails(mchId){
        dispatch({
            type:'walletModel/getWalletDetailList',
            payload:{
                mchId : mchId,
                pageIndex : 0 ,
                pageSize : pageSize1
            }
        });
    }
    //关闭详情列表
    function cancelDetails(){
        dispatch({
            type:'walletModel/updateState',
            payload:{
                isShowDetails : false,
            }
        });
    }
    //显示搜索
    function showSearchFun(){
        dispatch({
            type:'walletModel/updateState',
            payload:{
                isShowSearch : !isShowSearch,
            }
        });
    }

    //搜索
    function SearchSubmit(searchContent){
        dispatch({
            type:'walletModel/getWalletAccountList',
            payload:{
                pageSize,
                pageIndex : 0,
                searchContent
            }
        });
    }

    //钱包列表分页
    let tableOnChange = function(pagination, filters, sorter) {
        dispatch({
            type: 'walletModel/getWalletAccountList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                searchContent
            },
        });
    };

    //详情分页
    let tableOnChange1 = function(pagination, filters, sorter) {
        console.info(pagination)
        dispatch({
            type: 'walletModel/getWalletDetailList',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                mchId,
            },
        });
    };

    //导出
    function exportFun(){
        if ( searchContent.tenantName == undefined && searchContent.mchId != undefined){
            window.open(`${BASE_URL}/PayAccountController/exportAccountList?mchId=${searchContent.mchId}`, '_blank');
        }else if( searchContent.tenantName != undefined && searchContent.mchId == undefined ){
            window.open(`${BASE_URL}/PayAccountController/exportAccountList?tenantName=${searchContent.tenantName}`, '_blank');
        }else if( searchContent.tenantName != undefined && searchContent.mchId != undefined ){
            window.open(`${BASE_URL}/PayAccountController/exportAccountList?tenantName=${searchContent.tenantName}&mchId=${searchContent.mchId}`, '_blank');
        }else{
            window.open(`${BASE_URL}/PayAccountController/exportAccountList`, '_blank');
        }
    }
    let walletProps = {
        dataSource,
        isShowDetails,
        showDetails,
        cancelDetails,
        dataSource1,
        showSearchFun,
        isShowSearch,
        SearchSubmit,
        exportFun,
        tableLoading,
        total,
        total1,
        pageSize,
        pageIndex,
        pageSize1,
        pageIndex1,
        tableOnChange,
        tableOnChange1
    };


    return (
        <div>
            <WalletComponent { ...walletProps } />
        </div>
    )
};

function mapStateToProps ({ walletModel }){
	return { walletModel };
};

export default connect( mapStateToProps )( WalletPage );
