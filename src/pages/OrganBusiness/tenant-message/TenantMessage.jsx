import React, { PropTypes } from 'react';
import TenantMessageSearch from '../../../components/OrganBusiness/tenant-message/TenantMessageSearch';
import TenantMessageList from '../../../components/OrganBusiness/tenant-message/TenantMessageList';
import TenantMessageCheckOrgModal from '../../../components/OrganBusiness/tenant-message/TenantMessageCheckOrgModal';
import TenantMessageAddOrgModal from '../../../components/OrganBusiness/tenant-message/TenantMessageAddOrgModal';
import TenantMessageAddTetModal from '../../../components/OrganBusiness/tenant-message/TenantMessageAddTetModal';
import TenantMessageCheckTetModal from '../../../components/OrganBusiness/tenant-message/TenantMessageCheckTetModal';
import QueueAnim from 'rc-queue-anim';
import qs from 'qs';

import { connect } from 'dva';

function TenantMessage({ dispatch, tenantMessage }) {

    //只传数据
    let {
        /*table*/
        tenantPageIndex,        //租户列表页码
        tenantPageSize,         //租户列表一页条数
        tenantLoading,          //租户列表加载状态
        tenantTotal,            //列表内容总条数
        tenantTableContent,     //列表内容

        /*search bar*/
        searchVisible,          //搜索栏是否显示
        searchContent,          //搜索栏搜索内容

        /*check org modal*/
        tenantId,               //租户ID，用于显示在模态框名称处
        modalVisible,           //查看机构modal是否显示
        orgPageIndex,           //页码
        orgPageSize,            //一页条数
        orgLoading,             //列表加载状态
        orgTotal,               //列表内容总条数
        modalContent,           //模态框中选中租户下的机构数据

        /*新增校区*/
        addOrEditOrgModalType,                  //新增编辑校区modal类型(总部hq/机构org)
        addOrEditOrgModalVisible,               //新增编辑校区modal是否显示
        addOrEditOrgModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkOrEditOrgDetailMsg,                //新增编辑机构信息

        /*新增租户*/
        addOrEditTetModalVisible,               //新增编辑校区modal是否显示
        addOrEditTetModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态

        /*编辑租户名称*/
        checkOrEditTetModalVisible,               //新增编辑校区modal是否显示
        checkOrEditTetModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkOrEditTetDetailMsg,                  //新增编辑租户信息
        checkTenantTypeDetailMsg                  //学校类型
    } = tenantMessage;

    /*search bar*/
    let searchSubmit = function(data){
        dispatch({
            type: 'tenantMessage/QueryTenantList',
            payload: {
                pageIndex :  0,
                pageSize : tenantPageSize,
                searchContent : data
            },
        });
    }

    /*租户table*/
        /*租户table点击筛选*/
        let tenantTableOnFilter = function(){
            dispatch({
                type: 'tenantMessage/updateState',
                payload: {
                    searchVisible : !searchVisible,
                },
            });
        }

        /*租户table分页等条件改变事件*/
        let tenantTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'tenantMessage/QueryTenantList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    searchContent
                },
            });
        }

        /*租户table查看租户下所有的机构*/
        let tenantTableOnCheckOrg = function(data){
            dispatch({
                type: 'tenantMessage/QueryTenantOrg',
                payload: {
                    id : data.id
                },
            });
        }

        //按查询结果导出
        let tenantTableOnExport = function(){
            window.open(`${BASE_URL}/organInfo/exportTenantInfoByCon?${qs.stringify(searchContent)}`)
        }

    /*查看租户下机构的模态框*/
        /*机构分页等条件改变*/
        let orgTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'tenantMessage/updateState',
                payload: {
                    orgPageIndex : pagination.current-1,
                    orgPageSize : pagination.pageSize,
                },
            });
        }

        /*关闭查看租户下机构模态框*/
        let modalCancel = function(){
            dispatch({
                type: 'tenantMessage/updateState',
                payload: {
                    modalVisible : false,
                },
            });
        }

    /*新增机构*/
        /*点击新增机构*/
        let tenantMessageAddOrg = function(type){
            dispatch({
                type:'tenantMessage/updateState',
                payload:{
                    addOrEditOrgModalType : type,
                    addOrEditOrgModalVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddOrEditOrgModalCancel = function(){
            dispatch({
                type:'tenantMessage/updateState',
                payload:{
                    addOrEditOrgModalType : undefined,
                    addOrEditOrgModalVisible : false,
                    checkOrEditOrgDetailMsg : {}
                }
            });
        }

        /*新增编辑提交*/
        let AddOrEditOrgModalSubmit = function(data){
            dispatch({
                type:'tenantMessage/TenantAddOrEditOrg',
                payload:{
                    tenantId,
                    ...data
                }
            })
        }

        //列表内点击编辑
        let orgTableOnEdit = function(data){
            if(data.orgKind == '1'){
                dispatch({
                    type : 'tenantMessage/updateState',
                    payload : { addOrEditOrgModalType : 'org' }
                })
            }else if(data.orgKind == '2'){
                dispatch({
                    type : 'tenantMessage/updateState',
                    payload : { addOrEditOrgModalType : 'hq' }
                })
            }
            dispatch({
                type:'tenantMessage/GetOrgDetail',
                payload:{
                    organId : data.orgId,
                    tenantId : data.tenantId
                }
            });
        }

    /*新增租户*/
         /*点击新增租户*/
        let tenantMessageAddTet = function(){
            dispatch({
                type:'tenantMessage/updateState',
                payload:{
                    addOrEditTetModalVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddOrEditTetModalCancel = function(){
            dispatch({
                type:'tenantMessage/updateState',
                payload:{
                    addOrEditTetModalVisible : false,
                }
            });
        }

        /*新增编辑提交*/
        let AddOrEditTetModalSubmit = function(data){
            dispatch({
                type:'tenantMessage/TenantAddTet',
                payload:data
            })
        }

    /*编辑租户名称模态框*
        /*点击编辑租户名称*/
        let tenantMessageCheckTet = function(id){
            dispatch({
               type:'tenantMessage/openCheckTetModal',
               payload:{
                    id
               }
            });
        }

        /*关闭新增编辑模态框*/
        let CheckOrEditTetModalCancel = function(){
            dispatch({
                type:'tenantMessage/updateState',
                payload:{
                    checkOrEditTetModalVisible : false,
                }
            });
        }

        /*新增编辑提交*/
        let CheckOrEditTetModalSubmit = function(data){
            dispatch({
                type:'tenantMessage/editTenantSubmit',
                payload:{
                    ...data
                }
            })
        }

    /*search bar属性*/
    let tenantMessageSearchProps = {
        searchSubmit,           //搜索栏点击搜索或者清除条件
    }

    /*table属性*/
    let tenantMessageListProps = {
        tenantPageIndex,        //租户列表页码
        tenantPageSize,         //租户列表一页条数
        tenantLoading,          //租户列表加载状态
        tenantTotal,            //列表内容总条数
        tenantTableContent,     //列表内容

        tenantTableOnFilter,    //点击筛选
        tenantTableOnChange,    //table分页等条件改变事件
        tenantTableOnCheckOrg,  //table查看租户下所有的机构
        tenantTableOnExport,    //按查询结果导出
        tenantMessageAddTet,    //新增租户
        tenantMessageCheckTet,  //编辑租户
    }

    /*租户下所有机构模态框属性*/
    let tenantMessageCheckOrgModalProps = {
        tenantId,               //租户ID，用于显示在模态框名称处
        modalVisible,           //查看机构modal是否显示
        orgPageIndex,           //页码
        orgPageSize,            //一页条数
        orgLoading,             //列表加载状态
        orgTotal,               //列表内容总条数
        modalContent,           //模态框中选中租户下的机构数据

        orgTableOnChange,       //机构分页等条件改变
        orgTableOnEdit,         //列表内点击编辑
        modalCancel,            //关闭modal
        tenantMessageAddOrg,    //table点击新增机构
    }

    /*租户下新增机构*/
    let tenantMessageAddOrgModalProps = {
        addOrEditOrgModalType,                  //新增编辑校区modal类型(总部hq/机构org)
        addOrEditOrgModalVisible,               //新增编辑校区modal是否显示
        addOrEditOrgModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkOrEditOrgDetailMsg,                //新增编辑机构信息
        checkTenantTypeDetailMsg,               //机构类型

        AddOrEditOrgModalSubmit,                //新增编辑校区提交
        AddOrEditOrgModalCancel,                //新增编辑校区modal关闭
    }

    /*租户下新增租户*/
    let tenantMessageAddTetModalProps = {
        addOrEditTetModalVisible,               //新增编辑校区modal是否显示
        addOrEditTetModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkTenantTypeDetailMsg,                 //机构类型

        AddOrEditTetModalSubmit,                //新增编辑校区提交
        AddOrEditTetModalCancel,                //新增编辑校区modal关闭
    }

    /*编辑租户*/
    let tenantMessageCheckTetModalProps = {
        checkOrEditTetModalVisible,               //新增编辑校区modal是否显示
        checkOrEditTetModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态

        checkOrEditTetDetailMsg,                   //新增编辑租户的信息
        CheckOrEditTetModalSubmit,                //新增编辑校区提交
        CheckOrEditTetModalCancel,                //新增编辑校区modal关闭
    }

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{searchVisible ? [
                   <TenantMessageSearch {...tenantMessageSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <TenantMessageList {...tenantMessageListProps}/>
            { modalVisible == true ? <TenantMessageCheckOrgModal {...tenantMessageCheckOrgModalProps}/> : null }
            { addOrEditOrgModalVisible == true ? <TenantMessageAddOrgModal {...tenantMessageAddOrgModalProps}/> : null}
            { addOrEditTetModalVisible == true ? <TenantMessageAddTetModal {...tenantMessageAddTetModalProps}/> : null}
            { checkOrEditTetModalVisible == true ? <TenantMessageCheckTetModal {...tenantMessageCheckTetModalProps}/> : null}
        </div>
  );
}

function mapStateToProps({ tenantMessage }) {
    return { tenantMessage };
}

export default connect(mapStateToProps)(TenantMessage);
