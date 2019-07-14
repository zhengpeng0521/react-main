import React, { PropTypes } from 'react';
import UserManageTable from '../../components/CallCenter/customer_manage/CustomerManageTable';
import UserManageSearch from '../../components/CallCenter/customer_manage/CustomerManageSearch';
import UserManageNewModel from '../../components/CallCenter/customer_manage/CustomerManangeNewModel';
import UserManageCheckModel from '../../components/CallCenter/customer_manage/CustomerManageCheckModel';
import UserManageDeatilModel from '../../components/CallCenter/customer_manage/CustomerManageDetailModel';
import QueueAnim from 'rc-queue-anim';
import { message } from 'antd';
import { connect } from 'dva';


function UserMannage({ dispatch, userManage }) {

    let {
        loading,
        list,
        total,
        pageIndex,
        pageSize,
        selectedRowKeys,
        selectedRows,
        searchData,
        searchVisible,
        //新增或者编辑模态框
        userManageNewModalVisible,              //模态框显示状态
        userManageModalButtonLoading,           //提交禁止状态
        userManageModalLoading,                 //页面加载状态
        userManageModelAllcontent,              //模态框穿梭框左边数据
        userManageModelTransferTargetContent,   //模态框穿梭框右边数据

        userManageModelDetail ,                 //详情数据
        orgAddress ,                            //机构地址
        orgId ,                                 //机构id
        //审核模态框
        userManageCheckModalVisible,
        tenantIid ,                             //审核时的主键id


        //查看客户资料
        userManageDetailModalVisible,
    } = userManage;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'userManage/updateState',
            payload: {
                selectedRowKeys, selectRows
            },
        });
    };

    //列表行是否能选中
    let tableRowCheckProps = function(record ) {
        return true;
    };

    //列表分页 变更

     let tablePageChange = function(current, pageSize=userManage.pageSize) {
        dispatch({
            type: 'userManage/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'userManage/cusManageList',
            payload: {
                searchData,
                pageIndex : current-1,
                pageSize
            },
        });
    };
    //表格分页、排序、筛选变化时触发
    let tableOnChange = function(pagination, filters, sorter) {

    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'userManage/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'userManage/cusManageList',
            payload: {
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'userManage/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'userManage/cusManageList',
            payload: {
                searchData,
                pageIndex :0,
                pageSize,
            },
        });
    };
    //列表新增
    function tableOnCreate(){
       dispatch({
            type: 'userManage/updateState',
            payload: {
                userManageNewModalVisible : true,
                userManageModelDetail : {},
                orgAddress : undefined,
                orgId      : undefined,
                tenantIid  : undefined,
            },
        });
    }
    //模态框关闭
    function userManageModalCancel(){
        dispatch({
            type: 'userManage/updateState',
            payload: {
                userManageNewModalVisible : false,
                orgId : undefined,
                orgAddress : undefined,
                userManageModelAllcontent : [],
                userManageModelTransferTargetContent : [],
                userManageModelDetail : {},
                tenantIid : undefined,
            },
        });
    }
    //新增或编辑机构名称搜索
    function userManageModalSearchOrgName(value){
        if( value==''|| !value ){
            message.warning('搜索内容不能为空');
        }else{
            dispatch({
                type:'userManage/searchOrgMessage',
                payload:{
                    orgName : value,
                    flag    : '0',
                }
            });
            dispatch({
                type:'userManage/updateState',
                payload:{
                    userManageModelAllcontent : [],
                }
            });
        }

    }

    //穿梭框状态改变
    function userManageModalTransferhandleChange(targetKeys, direction, moveKeys){

       if(moveKeys.length>1){
           message.error('只能选择一个机构');
           return false;
       }else{
           if(direction == 'left'){ //退出时
               dispatch({
                    type:'userManage/updateState',
                    payload:{
                        userManageModelTransferTargetContent : targetKeys,
                        orgId : undefined,
                        orgAddress : undefined,
                    }
                });
           }else{                   //加入时
               dispatch({
                    type:'userManage/updateState',
                    payload:{
                        userManageModelTransferTargetContent : moveKeys,
                        orgId : moveKeys[0],
                    }
               });
               dispatch({           //调取查询地址接口
                    type:'userManage/getOrgAddrById',
                    payload:{
                        orgId : moveKeys[0],
                    }
                });
           }

       }

    }
    //新增保存
    function userManageModalSave(values){
        if(values.id){ //编辑
            dispatch({
                type:'userManage/updateState',
                payload:{
                    userManageModalButtonLoading : true,
                }
            });
            dispatch({
                type:'userManage/cusManageEdit',
                payload:{
                    ...values
                }
            });

        }else{         //新增
            dispatch({
                type:'userManage/updateState',
                payload:{
                    userManageModalButtonLoading : true,
                }
            });
            dispatch({
                type:'userManage/cusManageAdd',
                payload:{
                    ...values
                }
            });
        }

    }
    //客户列表审核
    function tableOnCheck(id,status){
        dispatch({
            type:'userManage/updateState',
            payload:{
                userManageCheckModalVisible : true,
                tenantIid :id,

            }
        });
    }
    //审核模态框关闭
    function userManageCheckModalCancel(){
        dispatch({
            type:'userManage/updateState',
            payload:{
                userManageCheckModalVisible : false,
                tenantIid : undefined,
            }
        });
    }

    //审核保存
    function userManageCheckModalSave(values){
        dispatch({
            type:'userManage/cusManageAudit',
            payload:{
                id : tenantIid,
                status : '2',
                remark : values.remark,
            }
        });
    }
    //编辑
    function tableOnEdit(id){
        dispatch({
            type:'userManage/cusManageQuery',
            payload:{
                id : id,
            }
        });

        dispatch({
            type:'userManage/updateState',
            payload:{
                tenantIid : id,
                userManageModalLoading : true,
            }
        });
    }
    //查看客户资料
    function tableOnLook(id){
        dispatch({
            type:'userManage/cusManageQuery2',
            payload:{
                id : id,
            }
        });
        dispatch({
            type:'userManage/updateState',
            payload:{
                userManageDetailModalVisible :true,
            }
        });
    }
    //客户查看框关闭
    function userManageModalDeatilCancel(){
        dispatch({
            type:'userManage/updateState',
            payload:{
                userManageDetailModalVisible :false,
                userManageModelDetail : {},
            }
        });
    }
    //审核模态框
    let UserManageCheckModelProps = {
        userManageCheckModalVisible, //显示状态
        userManageCheckModalCancel,  //关闭
        userManageCheckModalSave,    //保存
    }
    //查看客户资料
    let UserManageDeatilModelProps = {
        userManageDetailModalVisible,    //模态框显示状态
        userManageModalDeatilCancel,        //模态框关闭
        userManageModelDetail,        //编辑详情数据
    }
    //新增或编辑模态框属性
    let UserManageNewModelProps = {
        userManageNewModalVisible,    //模态框显示状态
        userManageModalButtonLoading, //提交禁止状态
        userManageModalLoading,       //页面加载状态
        userManageModalSearchOrgName, //搜索机构名称
        userManageModalCancel,        //模态框关闭
        userManageModalSave,          //保存
        userManageModelDetail,        //编辑详情数据
        orgAddress,                   //机构地址
        orgId,                        //机构id
        userManageModelAllcontent,
        userManageModelTransferTargetContent,
        userManageModalTransferhandleChange,
        tenantIid,                    //编辑主键id
    }
    //搜索框属性
    let UserManageSearchProps = {
        searchData,
        searchVisible,
        searchReset,
        searchSubmit,
    };
    //table属性
    let UserManageTableProps = {
        loading,
        list,
        total,
        pageIndex,
        pageSize,
        selectedRowKeys,
        selectedRows,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,

        tableOnCreate,  //新增
        tableOnCheck,   //审核
        tableOnEdit ,   //编辑
        tableOnLook,    //查看
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <UserManageSearch {...UserManageSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <UserManageTable {...UserManageTableProps} />
            <UserManageNewModel {...UserManageNewModelProps}/>
            <UserManageCheckModel {...UserManageCheckModelProps}/>
            <UserManageDeatilModel {...UserManageDeatilModelProps}/>
        </div>
  );
}

UserMannage.propTypes = {
  userManage: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ userManage }) {
  return { userManage };
}

export default connect(mapStateToProps)(UserMannage);
