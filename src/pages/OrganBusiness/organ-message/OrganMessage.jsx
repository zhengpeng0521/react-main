import React, { PropTypes } from 'react';
import { Table, Modal } from 'antd';
import OrganMessageSearch from '../../../components/OrganBusiness/organ-message/OrganMessageSearch';
import OrganMessageList from '../../../components/OrganBusiness/organ-message/OrganMessageList';
import OrganMessageModal from '../../../components/OrganBusiness/organ-message/OrganMessageModal';
import OrganMessageDetail from '../../../components/OrganBusiness/organ-message/OrganMessageDetail';
import qs from 'qs';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function OrganMessage({ dispatch, organMessage }) {

    //只传数据
    let {
        loading,
        list,
        total,
        pageIndex,
        pageSize,
        searchData,
        searchVisible,
        checkModalVisible,          //点击'包含模版'下内容是弹窗是否显示
        checkModalContent,                  //点击'包含模版'获取到的值
        checkModalNoDefaultExpandedKeys,        //查看模板数量默认树状展示

        OrganMessageDetailVisible,
        OrganMessageDetailDateSource,
        type,
    } = organMessage;

    let tableOnChange = function(pagination, filters, sorter) {
        dispatch({
            type: 'organMessage/queryForOrganMessage',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                ...searchData,
            },
        });
    };

    //搜索数据清空
    let searchReset = function(){
        dispatch({
            type: 'organMessage/queryForOrganMessage',
            payload: {
                pageIndex:0,
                pageSize,
            },
        });
    }

    //点击搜索
    let searchSubmit = function(value){
        dispatch({
            type: 'organMessage/queryForOrganMessage',
            payload: {
                pageIndex : 0,
                pageSize,
                ...value,
            },
        });
    }


    //点击筛选
    let tableOnFilter = function(){
        dispatch({
            type:'organMessage/updateState',
            payload:{
                searchVisible : !searchVisible,
            }
        });
    }

    //按查询结果导出
    let tableOnExport = function(){
//        let exStartTime = window.exStartTime;
//        let exEndTime = window.exEndTime;
        window.open(`${BASE_URL}/organInfo/exportOrganList?${qs.stringify(searchData)}`)
    }

    let organMessageSearchProps = {
        searchReset,
        searchSubmit,
    };

    /*查看套餐包含模块*/
//    let tableOnCheckModal = function(id){
//        dispatch({
//            type:'organMessage/AfterOperationQuery',
//            payload:{
//                id,
//            }
//        });
//    }
    /*关闭查看模板模态框*/
    let checkModalNoModalCancel = function(){
        dispatch({
            type:'organMessage/updateState',
            payload:{
                checkModalVisible : false,
            }
        });
    }
   /*设置冻结*/
    let tableOrganPackageFreeze = function(data){
        dispatch({
            type:'organMessage/OrganMangeFreeze',
            payload:{
                code:3,
                orgId:data.id,
                tenantId:data.tenantId
            }
        });
    }

    /*设置解冻*/
    let tableOrganPackageNoFreeze = function(data){
        dispatch({
            type:'organMessage/OrganMangeFreeze',
            payload:{
                code:1,
                orgId:data.id,
                tenantId:data.tenantId
            }
        });
    }

    function showDetilFun(tenantId,id,type){
        dispatch({
            type:'organMessage/updateState',
            payload:{
                OrganMessageDetailVisible : !OrganMessageDetailVisible,
                type : type,
            }
        });
        dispatch({
            type : 'organMessage/getAllSaasPayment',
            payload : {
                tenantId,id,
                type : type,
            }
        })
    }
    function TableCancel(){
        dispatch({
            type:'organMessage/updateState',
            payload:{
                OrganMessageDetailVisible : !OrganMessageDetailVisible,
            }
        })
    }

    let organMessageListProps = {
        pageIndex,
        pageSize,
        loading,
        list,
        total,
        tableOnChange,
        tableOnFilter,
        tableOnExport,  //按查询结果导出
//        tableOnCheckModal,  //查看套餐包含模块
        tableOrganPackageFreeze, //冻结机构
        tableOrganPackageNoFreeze, //解冻机构
        showDetilFun,
    };
    /*查看模板弹窗属性*/
    let openingMgrCheckModalNoModalProps = {
        checkModalVisible,
        checkModalContent,
        checkModalNoDefaultExpandedKeys,
        checkModalNoModalCancel,
    }

    let OrganMessageDetailProps = {
        OrganMessageDetailVisible,
        showDetilFun,
        OrganMessageDetailDateSource,
        type,
        TableCancel,
    }

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <OrganMessageSearch {...organMessageSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <OrganMessageList {...organMessageListProps} />
            {checkModalVisible == true ? <OrganMessageModal {...openingMgrCheckModalNoModalProps}/> : null}
            <OrganMessageDetail {...OrganMessageDetailProps}/>
        </div>
  );
}

function mapStateToProps({ organMessage }) {
  return { organMessage };
}

export default connect(mapStateToProps)(OrganMessage);
