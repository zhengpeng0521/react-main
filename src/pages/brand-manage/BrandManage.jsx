import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { message } from 'antd';
import { connect } from 'dva';
import qs from 'qs';
import BrandManageTable from '../../components/brand-manage/BrandManageTable';
import BrandManageSearch from '../../components/brand-manage/BrandManageSearch';
import BrandExamineModal from '../../components/brand-manage/BrandExamineModal';

function BrandManage({ dispatch, brandManage }) {

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
        /*审核modal*/
        examineModalVisible,            //modal是否显示
        examineModalLoading,            //modal加载状态和按钮加载状态
        examineModalData,               //点击审核获取当前选项的信息对象
    } = brandManage

    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    //搜索栏点击查询或清除条件
    function SearchSubmit(data){
        dp('brandManage/GetTableList',{
            pageIndex : 0,
            pageSize : tablePageSize,
            searchContent : data
        })
    }

    //点击筛选
    function ShowSearchBar(){
        dp('brandManage/updateState',{ searchVisible : !searchVisible })
    }

    //套餐管理列表状态改变(分页等)
    function TableOnChange(pagination, filters, sorter){
        dp('brandManage/GetTableList',{
            pageIndex : pagination.current - 1,
            pageSize : pagination.pageSize,
            searchContent
        })
    }

    //点击审核打开审核modal
    function ClickExamine(data){
        dp('brandManage/updateState',{ examineModalVisible : true , examineModalData : data })
    }

    //品牌审核(3通过/4驳回)
    function ExamineModalSubmit(auditStatus){
        dp('brandManage/ExamineModalSubmit', { brandId : examineModalData.brandId , auditStatus })
    }

    //品牌审核驳回或者关闭
    function ExamineModalCancel(){
        dp('brandManage/updateState',{ examineModalVisible : false , examineModalLoading : false })
    }

    //搜索栏属性
    let BrandManageSearchProps = {
        SearchSubmit,                   //搜索栏点击查询或清除条件
    }

    //列表属性
    let BrandManageTableProps = {
        tablePageIndex,                 //页码
        tablePageSize,                  //每页条数
        tableDataSource,                //列表数据
        tableTotal,                     //列表条数
        tableLoading,                   //加载状态

        ShowSearchBar,                  //点击筛选
        TableOnChange,                  //套餐管理列表状态改变(分页等)
        ClickExamine                    //点击审核
    }

    //品牌审核
    let BrandExamineModalProps = {
        examineModalVisible,            //modal是否显示
        examineModalLoading,            //modal加载状态和按钮加载状态
        examineModalData,               //点击审核获取当前选项的信息对象

        ExamineModalSubmit,             //品牌审核通过
        ExamineModalCancel,             //品牌审核驳回或者关闭
    }

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                { searchVisible ? <BrandManageSearch key = 'BrandManageSearch' {...BrandManageSearchProps}/> : null }
            </QueueAnim>
            <BrandManageTable {...BrandManageTableProps}/>
            { !!examineModalVisible ? <BrandExamineModal {...BrandExamineModalProps}/> : null }
        </div>
    );
}

function mapStateToProps({ brandManage }) {
    return { brandManage };
}

export default connect(mapStateToProps)(BrandManage);
