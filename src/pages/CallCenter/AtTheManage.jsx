import React, { PropTypes } from 'react';
import AtTheManageTable from '../../components/CallCenter/at_the_manage/AtTheManageTable';
import AtTheManageSearch from '../../components/CallCenter/at_the_manage/AtTheManageSearch';
import AtTheManageNewModel from '../../components/CallCenter/at_the_manage/AtTheManageNewModel';
import AtTheManageToBindModel from '../../components/CallCenter/at_the_manage/AtTheManageToBindModel';

import QueueAnim from 'rc-queue-anim';
import { message } from 'antd';
import { connect } from 'dva';

function AtTheMannage({ dispatch, atTheManage }) {

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
        //新增
        atTheManageNewLoading,
        atTheManageNewDisabled,
        atTheManageNewModalVisible,              //模态框显示状态

        atTheManageModelAllcontent,              //机构模态框穿梭框左边数据
        atTheManageModelTransferTargetContent,   //机构模态框穿梭框右边数据
        atTheManageModelOrgId,                   //选中的机构ID
        atTheManageModelAccountAllcontent,              //账号模态框穿梭框左边数据
        atTheManageModelAccountTransferTargetContent,   //账号模态框穿梭框右边数据
        atTheManageModelOrgUserId,                      //选中账号id
        //改绑
        atTheManageToBindModalVisible,
        tenantUserName,  //原员工
        accCallOut,      //外呼账号
        employeeArr,     //新员工列表
        seatUserBindId,  //改绑主键id



    } = atTheManage;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'atTheManage/updateState',
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
    let tablePageChange = function(pageIndex) {

        dispatch({
            type: 'atTheManage/cusSeatList',
            payload: {
                searchData,
                pageIndex : pageIndex-1,
                pageSize
            },
        });
    };
    function tablePageSizeChange(pageIndex,pageSize){
        dispatch({
            type: 'atTheManage/cusSeatList',
            payload: {
                searchData,
                pageIndex,
                pageSize,
            },
        });
    }

    //表格分页、排序、筛选变化时触发
    let tableOnChange = function(pagination, filters, sorter) {

    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'atTheManage/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'atTheManage/cusSeatList',
            payload: {
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'atTheManage/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'atTheManage/cusSeatList',
            payload: {
                searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };
    //搜索框是否显示
    function tableOnFilter(){
       dispatch({
            type: 'atTheManage/updateState',
            payload: {
                searchVisible : !searchVisible,
            },
        });
    }

    //列表新增
    function tableOnCreate(){
       dispatch({
            type: 'atTheManage/updateState',
            payload: {
                atTheManageNewModalVisible : true,
            },
        });
    }
    //新增模态框关闭
    function atTheManageModalCancel(){
        dispatch({
            type: 'atTheManage/updateState',
            payload: {
                atTheManageNewModalVisible : false,
                atTheManageModelAllcontent : [],
                atTheManageModelTransferTargetContent : [],
                atTheManageModelAccountAllcontent : [],
                atTheManageModelAccountTransferTargetContent : [],
                atTheManageModelOrgId : undefined,
                atTheManageModelOrgUserId : undefined,
                atTheManageNewLoading : false,
                atTheManageNewDisabled : false,
            },
        });
    }

    //搜索机构
    function atTheManageModalSearchOrgName(value){
        if( value==''|| !value ){
            message.warning('搜索内容不能为空');
        }else{
            dispatch({
                type:'atTheManage/cusManageTenantOrg',
                payload:{
                    orgName : value,
                    flag    : '1',
                }
            });
        }

    }
    //账号搜索
    function atTheManageModalSearchAccount(value){
        if(!atTheManageModelOrgId){
            message.error('请先选择机构');
        }else{
            dispatch({
                type:'atTheManage/seatUserSearch',
                payload:{
                    search : value,
                    orgId  : atTheManageModelOrgId,
                }
            });
        }

    }
    //穿梭框状态改变
    function atTheManageModalTransferhandleChange(targetKeys, direction, moveKeys){

       if(moveKeys.length>1){
           message.error('只能选择一个机构');
           return false;
       }else{
           if(direction == 'left'){
               dispatch({
                    type:'atTheManage/updateState',
                    payload:{
                        atTheManageModelTransferTargetContent : targetKeys,
                        atTheManageModelOrgId : undefined,
                    }
                });
                dispatch({
                    type:'atTheManage/updateState',
                    payload:{
                        oragnArray : [],

                    }
                });
           }else{
               dispatch({
                    type:'atTheManage/updateState',
                    payload:{
                        atTheManageModelTransferTargetContent : moveKeys,
                        atTheManageModelOrgId : moveKeys[0],
                    }
                });
               dispatch({  //选完机构后立刻搜索该机构下的所有账号
                    type:'atTheManage/seatUserSearch',
                    payload:{
                        search : '',
                        orgId  : moveKeys[0],
                    }
                });

           }
       }
    }
    //账号穿梭框状态改变
    function atTheManageModalAccountTransferhandleChange(targetKeys, direction, moveKeys){

            dispatch({
                type:'atTheManage/updateState',
                payload:{
                    atTheManageModelAccountTransferTargetContent : targetKeys,
                    atTheManageModelOrgUserId : targetKeys+'',
                }
            });

    }
    //新增保存
    function atTheManageNewModalSave(){
        if(atTheManageModelOrgId =='' || atTheManageModelOrgUserId ==''){
            message.warning('机构或者账号不能为空');

        }else{
            dispatch({
                type: 'atTheManage/seatUserAdd',
                payload: {
                    orgId : atTheManageModelOrgId,
                    orgUserId : atTheManageModelOrgUserId,
                },
            });
            dispatch({
                type:'atTheManage/updateState',
                payload:{
                    atTheManageNewLoading : true,
                    atTheManageNewDisabled : true,
                }
            });
        }

    }
    //改绑
    function tableToBind(orgId,tenantUserName,accCallOut,id ,tenantId){
        dispatch({
            type: 'atTheManage/seatUserBindQuery',
            payload: {
                orgId    : orgId,
                tenantId : tenantId,
            },
        });
         dispatch({
            type: 'atTheManage/updateState',
            payload: {
                tenantUserName : tenantUserName,      //原员工
                accCallOut     : accCallOut,          //外呼账号
                seatUserBindId : id,
            },
        });


    }
    //改绑框关闭
    function atTheManageToBindModalCancel(){
        dispatch({
            type: 'atTheManage/updateState',
            payload: {
                atTheManageToBindModalVisible : false,
                employeeArr : [],
                tenantUserName : undefined,
                accCallOut : undefined,
                seatUserBindId : undefined,
            },
        });
    }
    //改绑保存
    function atTheManageToBindModalSave(value){
        dispatch({
            type: 'atTheManage/seatUserBind',
            payload: {
                tenantUser : value.c,
                accCallOut : seatUserBindId,
            },
        });
    }
    //改绑属性
    let AtTheManageToBindModelProps = {
        atTheManageToBindModalVisible,
        atTheManageToBindModalCancel,
        atTheManageToBindModalSave,
        tenantUserName,  //原员工
        accCallOut,      //外呼账号
        employeeArr,     //新员工列表
    }
    //新增属性
    let AtTheManageNewModelProps = {
        atTheManageNewModalVisible,    //模态框显示状态
        atTheManageNewLoading,
        atTheManageNewDisabled,
        atTheManageModalSearchOrgName, //搜索机构名称
        atTheManageModalSearchAccount, //账号搜索
        atTheManageModalCancel,        //关闭模态框
        atTheManageNewModalSave,       //保存

        atTheManageModelAllcontent,             //左边全部数据
        atTheManageModelTransferTargetContent,  //右边已选中数据
        atTheManageModalTransferhandleChange,   //选项在两栏之间转移时的回调函数

        atTheManageModelAccountAllcontent,              //账号模态框穿梭框左边数据
        atTheManageModelAccountTransferTargetContent,   //账号模态框穿梭框右边数据
        atTheManageModalAccountTransferhandleChange,
    }
    //搜索框属性
    let AtTheManageSearchProps = {
        searchData,
        searchVisible,
        searchReset,
        searchSubmit,
    };
    //table属性
    let AtTheManageTableProps = {
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
        tablePageSizeChange,
        tableOnChange,
        tableOnFilter,  //筛选
        tableOnCreate,  //新增
        tableToBind,    //改绑
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <AtTheManageSearch {...AtTheManageSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <AtTheManageTable {...AtTheManageTableProps} />
            { atTheManageNewModalVisible ? <AtTheManageNewModel {...AtTheManageNewModelProps}/> : null }
            { atTheManageToBindModalVisible ? <AtTheManageToBindModel {...AtTheManageToBindModelProps}/> :null}

        </div>
  );
}

AtTheMannage.propTypes = {
  atTheManage: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ atTheManage }) {
  return { atTheManage };
}

export default connect(mapStateToProps)(AtTheMannage);
