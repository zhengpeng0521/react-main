import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import HqPackageDispatchSearch from '../../components/hq-package-dispatch/Search';
import HqPackageDispatchTable from '../../components/hq-package-dispatch/Table';
import PackageModal from '../../components/hq-package-dispatch/package-modal/PackageModal';

function HqPackageDispatch({ dispatch , hqPackageDispatch }) {

    let {
        /*搜索栏*/
        searchVisible,                  //搜索栏显隐
        searchContent,                  //搜索内容
        /*列表*/
        tablePageIndex,                 //页码
        tablePageSize,                  //每页条数
        tableDataSource,                //列表数据
        tableTotal,                     //列表条数
        tableLoading,                   //加载状态
        /*套餐modal*/
        baseInformationData,            //基本信息数据(套餐分配提交时需要基本信息中该校区的tenantId和orgId)
        currentUserMsg,                 //选中项当前租户的信息
        packageModalVisible,            //是否显示
        packageModalType,               //表单类型(查看剩余checkLeft/查看记录checkRec/编辑edit)
        packageModalLoading,            //表单加载
        packageModalButtonLoading,      //表单按钮加载
    } = hqPackageDispatch

    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    //搜索栏点击查询或清除条件
    function SearchSubmit(data){
        dp('hqPackageDispatch/GetTableList',{
            pageIndex : 0,
            pageSize : tablePageSize,
            searchContent : data
        })
    }

    //点击筛选
    function ShowSearchBar(){ dp('hqPackageDispatch/updateState',{ searchVisible : !searchVisible }) }

    //套餐管理列表状态改变(分页等)
    function TableOnChange(pagination, filters, sorter){
        dp('hqPackageDispatch/GetTableList',{
            pageIndex : pagination.current - 1,
            pageSize : pagination.pageSize,
            searchContent
        })
    }

    //点击剩余套餐
    function OpenLeftPackageModal(data,type){
        dp('hqPackageDispatch/OpenLeftPackageModal',{ tenantId : data.tenantId , orgId : data.orgId , type })
    }

    //点击分配套餐
    function ClickDispatch(data,type){
        dp('hqPackageDispatch/ClickDispatch',{ tenantId : data.tenantId , orgId : data.orgId , type })
    }

    //点击分配记录
    function CheckRecord(data,type){
        dp('hqPackageDispatch/CheckRecord',{ pageIndex : 0 , pageSize : 99999 , tenantId : data.tenantId , orgId : data.orgId , type })
    }

    //分配套餐提交
    function PackageModalSubmit(data){
        dp('hqPackageDispatch/PackageModalSubmit',data)
    }

    //modal关闭
    function PackageModalClose(){
        dp('hqPackageDispatch/updateState',{
            packageModalType : undefined,
            packageModalVisible : false
        })
    }

    /*搜索栏属性*/
    let HqPackageDispatchSearchProps = {
        SearchSubmit,                   //搜索栏点击查询或清除条件
    }

    /*列表属性*/
    let HqPackageDispatchTableProps = {
        tablePageIndex,                 //页码
        tablePageSize,                  //每页条数
        tableDataSource,                //列表数据
        tableTotal,                     //列表条数
        tableLoading,                   //加载状态

        ShowSearchBar,                  //点击筛选
        TableOnChange,                  //套餐管理列表状态改变(分页等)
        OpenLeftPackageModal,           //点击剩余套餐
        ClickDispatch,                  //点击分配套餐
        CheckRecord                     //点击分配记录
    }

    /*套餐modal属性*/
    let PackageModalProps = {
        baseInformationData,                    //基本信息数据(套餐分配提交时需要基本信息中该校区的tenantId和orgId)
        currentUserMsg,                         //选中项当前租户的信息
        packageModalVisible,                    //是否显示
        packageModalType,                       //表单类型(查看check/编辑edit)
        packageModalLoading,                    //表单加载
        packageModalButtonLoading,              //表单按钮加载

        PackageModalSubmit,                     //分配套餐提交
        PackageModalClose,                      //modal关闭
    }

    return(
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                { searchVisible ? <HqPackageDispatchSearch key = 'HqPackageDispatchSearch' {...HqPackageDispatchSearchProps}/> : null }
            </QueueAnim>
            <HqPackageDispatchTable {...HqPackageDispatchTableProps}/>
            { !!packageModalVisible ? <PackageModal {...PackageModalProps}/> : null }
        </div>
    )
}

function mapStateToProps({ hqPackageDispatch }){
    return { hqPackageDispatch };
}

export default connect(mapStateToProps)(HqPackageDispatch);
