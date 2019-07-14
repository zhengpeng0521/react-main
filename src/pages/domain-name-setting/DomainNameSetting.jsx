import React from 'react';
import DomainNameSettingSearch from '../../components/domain-name-setting/DomainNameSettingSearch';
import DomainNameSettingTable from '../../components/domain-name-setting/DomainNameSettingTable';
import DomainNameExamineModal from '../../components/domain-name-setting/DomainNameExamineModal';
import DomainNameOpenModal from '../../components/domain-name-setting/DomainNameOpenModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function DomainNameSetting({ dispatch, domainNameSetting }) {

    let {
        //列表
        pageIndex,                  //列表页码
        pageSize,                   //列表每页条数
        total,                      //表格总条数
        dataSource,                 //列表数据
        loading,                    //列表加载状态

        //搜索栏
        searchVisible,              //搜索栏是否显示
        searchContent,              //查询条件

        //域名审核modal
        domainNameExamineModalVisible,              //表单是否显示
        domainNameExamineModalLoading,              //表单加载状态
        domainNameExamineModalButtonLoading,        //表单按钮加载状态
        domainNameExamineModalTenantId,             //域名审核表单租户id
        domainNameExamineModalHostName,             //域名审核域名名称

        //域名开通modal
        domainNameOpenModalVisible,                 //表单是否显示
        domainNameOpenModalLoading,                 //表单加载状态
        domainNameOpenModalButtonLoading,           //表单按钮加载状态
        domainNameOpenModalTenantId,                //域名开通表单租户id
        domainNameOpenModalHostName,                //域名开通域名名称

    } = domainNameSetting;

    function dp(path,obj){
        dispatch({
            type : path,
            payload : {
                ...obj
            }
        })
    }

    //table分页改变
    function TablePageChange(pagination, filters, sorter) {
        dp('domainNameSetting/QueryApplyUserList',{
            pageIndex : pagination.current-1,
            pageSize : pagination.pageSize,
            searchContent,
        })
    };

    //table点击筛选
    function TableOnFilter(){
        dp('domainNameSetting/updateState',{
            searchVisible : !searchVisible
        })
    }

    //搜索栏清空或者提交
    function SearchSubmit(data){
        dp('domainNameSetting/QueryApplyUserList',{
            pageIndex : 0,
            pageSize,
            searchContent : data,
        })
    }

    //租户点击审核
    function TableOnExamine(tenantId,hostName){
        dp('domainNameSetting/updateState',{
            domainNameExamineModalVisible : true,
            domainNameExamineModalTenantId : tenantId,
            domainNameExamineModalHostName : hostName
        })
    }

    //域名审核表单提交
    function DomainNameExamineModalSubmit(data){
        dp('domainNameSetting/DomainNameExamineModalSubmit',{
            ...data
        })
    }

    //域名审核表单关闭
    function DomainNameExamineModalCancel(){
        dp('domainNameSetting/clearExamineModal')
    }

    //租户点击开通
    function TableOnOpen(tenantId,hostName){
        dp('domainNameSetting/updateState',{
            domainNameOpenModalVisible : true,
            domainNameOpenModalTenantId : tenantId,
            domainNameOpenModalHostName : hostName
        })
    }

    //域名开通表单提交
    function DomainNameOpenModalSubmit(data){
        dp('domainNameSetting/DomainNameOpenModalSubmit',{
            ...data
        })
    }

    //域名开通表单关闭
    function DomainNameOpenModalCancel(){
        dp('domainNameSetting/clearOpenModal')
    }


    //搜索栏属性
    let DomainNameSettingSearchProps = {
        SearchSubmit,           //搜索栏清空或者提交
    };

    //列表属性
    let DomainNameSettingTableProps = {
        total,                      //表格总条数
        dataSource,                 //列表数据
        loading,                    //列表加载状态
        TableOnFilter,              //table点击筛选
        TablePageChange,            //table分页改变
        TableOnExamine,             //租户点击审核
        TableOnOpen,                //租户点击开通
    }

    //域名审核modal属性
    let DomainNameExamineModalProps = {
        domainNameExamineModalVisible,              //表单是否显示
        domainNameExamineModalLoading,              //表单加载状态
        domainNameExamineModalButtonLoading,        //表单按钮加载状态
        domainNameExamineModalTenantId,             //域名审核表单租户id
        domainNameExamineModalHostName,             //域名审核域名名称

        DomainNameExamineModalSubmit,               //域名审核表单提交
        DomainNameExamineModalCancel,               //域名审核表单关闭
    }

    //域名开通modal属性
    let DomainNameOpenModalProps = {
        domainNameOpenModalVisible,                 //表单是否显示
        domainNameOpenModalLoading,                 //表单加载状态
        domainNameOpenModalButtonLoading,           //表单按钮加载状态
        domainNameOpenModalTenantId,                //域名开通表单租户id
        domainNameOpenModalHostName,                //域名开通域名名称

        DomainNameOpenModalSubmit,                  //域名开通表单提交
        DomainNameOpenModalCancel,                  //域名开通表单关闭
    }

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{ searchVisible ? <DomainNameSettingSearch {...DomainNameSettingSearchProps} key="search_queue"/> : null }
            </QueueAnim>
            <DomainNameSettingTable {...DomainNameSettingTableProps}/>
            { domainNameExamineModalVisible ? <DomainNameExamineModal {...DomainNameExamineModalProps}/> : null }
            { domainNameOpenModalVisible ? <DomainNameOpenModal {...DomainNameOpenModalProps}/> : null }
        </div>
  );
}


function mapStateToProps({ domainNameSetting }) {
  return { domainNameSetting };
}

export default connect(mapStateToProps)(DomainNameSetting);
