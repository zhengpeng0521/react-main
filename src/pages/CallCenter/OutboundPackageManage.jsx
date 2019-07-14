import React, { PropTypes } from 'react';
import OutboundPackageManageTable from '../../components/CallCenter/outbound_package_manage/OutboundPackageManageTable';
import OutboundPackageManageSearch from '../../components/CallCenter/outbound_package_manage/OutboundPackageManageSearch';
import OutboundPackageManageNewModel from '../../components/CallCenter/outbound_package_manage/OutboundPackageManageNewModel';
import OutboundOpenPackageModel from '../../components/CallCenter/outbound_package_manage/OutboundOpenPackageModel';
import OutboundOpenPackageCheckModel from '../../components/CallCenter/outbound_package_manage/OutboundOpenPackageCheckModel';

import QueueAnim from 'rc-queue-anim';
import { message ,Tabs } from 'antd';
import { connect } from 'dva';
const TabPane = Tabs.TabPane;
function OutboundPackageManage({ dispatch, outboundPackageManage }) {

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
        tabKey,

        SalesProductSetupDetail,                            //销售产品设置编辑详情信息

        //新增产品属性
        OutboundPackageNewModalVisible,                     //模态框显示状态
        OutboundPackageNewModalButtonLoading,               //提交禁止状态
        OutboundPackageType,                                //产品类型标志

        //开通套餐
        OutboundOpenPackageModelVisible ,
        outboundModalButtonLoading,

        OutboundOpenPackageModalAllcontent,                 //搜索出来的总机构
        OutboundOpenPackageModalTransferTargetContent,      //选中的机构
        OutboundOpenPackageModalOrgId,                      //选中的机构id

        OutboundOpenPackageSelectTableIdArr,                //坐席套餐下拉列表
        OutboundOpenPackageGradientAllData,                 //坐席总数据
        OutboundSelectTableEmployeeArr,                     //坐席人员列表
        OutboundSelectedRowKeys,                            //选中的坐席人员
        OutboundSelectTable_num_index,                      //选择人员的下标

        OutboundOpenPackageGradientTimeData,                //时长包梯度总数据

        totalPrice ,                                        //总价格
        realPrice  ,                                        //实收价格
        //选择坐席内部弹窗
        OutboundSelectTableInnerModalVisible,

        //审核
        OutboundOpenPackageCheckModelVisible ,

        OutboundOpenPackageModelDetail ,                     //套餐详情

        OutboundOpenPackageModelType,                        //模态框类型
        //坐席人员数据
        OutboundCheckInnerModalVisible,
        OutboundCheckInnerEmployeeArr,                       //坐席人员数据

        wetherEditOrgId,                                     //编辑时获取的机构orgId

    } = outboundPackageManage;

    //tab切换
    function tabsChange(value){
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                tabKey     : value,
                pageIndex  : 0,
                pageSize   : 10,
                searchData : {},
                list: [],
                total: 0,
            },
        });
        if(value =='1'){
            dispatch({
                type: 'outboundPackageManage/cusPackageList',
                payload: {
                    pageIndex  : 0,
                    pageSize   : 10,
                },
            });
        }else{
            dispatch({
                type: 'outboundPackageManage/cusPackageOpenList',
                payload: {
                    pageIndex  : 0,
                    pageSize   : 10,
                },
            });
        }
    }
    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'outboundPackageManage/updateState',
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
    let tablePageChange = function(current, pageSize=outboundPackageManage.pageSize) {
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        if(tabKey=='1'){
            dispatch({
                type: 'outboundPackageManage/cusPackageList',
                payload: {
                    searchData,
                    pageIndex : current-1,
                    pageSize
                },
            });
        }else{
            dispatch({
                type: 'outboundPackageManage/cusPackageOpenList',
                payload: {
                    searchData,
                    pageIndex : current-1,
                    pageSize
                },
            });
        }

    };

    //表格分页、排序、筛选变化时触发
    let tableOnChange = function(pagination, filters, sorter) {

    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                searchData : {}
            },
        });
        if(tabKey=='1'){
            dispatch({
                type: 'outboundPackageManage/cusPackageList',
                payload: {
                    pageIndex : 0,
                    pageSize  : 10,
                },
            });
        }else{
            dispatch({
                type: 'outboundPackageManage/cusPackageOpenList',
                payload: {
                    pageIndex : 0,
                    pageSize  : 10,
                },
            });
        }

    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                searchData
            },
        });
        if(tabKey=='1'){
            dispatch({
                type: 'outboundPackageManage/cusPackageList',
                payload: {
                    searchData,
                    pageIndex : 0,
                    pageSize,
                },
            });
        }else{
             searchData.status = searchData.statusCheck;
             delete searchData.statusCheck;
             dispatch({
                type: 'outboundPackageManage/cusPackageOpenList',
                payload: {
                    searchData,
                    pageIndex :0,
                    pageSize,
                },
            });
        }

    };
    //搜索框是否显示
    function tableOnFilter(){
       dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                searchVisible : !searchVisible,
            },
        });
    }
    //上下架及删除操作
    function upDownOperation(id,status){

        dispatch({
            type: 'outboundPackageManage/cusPackageEdit',
            payload: {
               status : status,
               id     : id,
            },
        });
    }
    //销售产品设置编辑
    function OutboundPackageManageEdit(id){
        dispatch({
            type: 'outboundPackageManage/cusPackageQuery',
            payload: {
               id     : id,
            },
        });

    }
   /*--------------------新增产品属性-------------------------*/
    //新增
    function tableOnCreate(){
       dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundPackageNewModalVisible : true,
            },
        });
    }
    //关闭
    function OutboundPackageNewModalCancel(){
       dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundPackageNewModalVisible : false,
                OutboundPackageType : '0',
                SalesProductSetupDetail : {},
            },
        });
    }
    //产品类型选择属性
    function ChooseQueryType(value){
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundPackageType : value,
            },
        });
    }
    //保存
    function OutboundPackageNewModalSave(value){
        if(value.id){  //编辑时
            dispatch({
                type: 'outboundPackageManage/cusPackageEditor',
                payload: {
                   ...value,
                },
            });
        }else{         //新增时
            dispatch({
                type: 'outboundPackageManage/cusPackageAdd',
                payload: {
                   ...value,
                },
            });
        }
    }
   /*--------------------------套餐开通-------------------------*/
    //开通套餐
    function tableOpenPackages(){
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundOpenPackageModelVisible : true,
            },
        });
        dispatch({
            type: 'outboundPackageManage/cusPackageOpenPro',
            payload: {
                proType     : '0',
                type        : 'newAdd',
            },
        });
        dispatch({
            type: 'outboundPackageManage/cusPackageOpenPro',
            payload: {
                proType    : '1',
                type       : 'newAdd',
            },
        });
    }
   //套餐关闭
   function OutboundOpenPackageModelCancel(){
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundOpenPackageModelVisible     : false,
                OutboundOpenPackageGradientAllData  : [],
                OutboundOpenPackageGradientTimeData : [],
                OutboundOpenPackageModalAllcontent  : [],
                OutboundOpenPackageModalOrgId       : undefined,
                OutboundSelectedRowKeys             : [],
                OutboundSelectTable_num_index       : undefined,
                totalPrice                          : 0,
                realPrice                           : 0,
                OutboundOpenPackageModelDetail      : {},
            },
        });

    }
    //机构搜索
    function OutboundOpenPackageModalSearchOrgName(value){
        if( value==''|| !value ){ //  /\s+/
            message.warning('搜索内容不能为空');
        }else{
            dispatch({
                type:'outboundPackageManage/updateState',
                payload:{
                    OutboundOpenPackageModalTransferTargetContent : [],
                }
            });
            dispatch({
                type:'outboundPackageManage/cusManageTenantOrg',
                payload:{
                    orgName : value,
                    flag    : '1',
                }
            });
        }

    }
    //机构选中事件穿梭框状态改变
    function OutboundOpenPackageModalTransferhandleChange(targetKeys, direction, moveKeys){
       if(moveKeys.length>1){
           message.error('只能选择一个机构');
           return false;
       }else{
           if(direction == 'left'){  //移除
               dispatch({
                    type:'outboundPackageManage/updateState',
                    payload:{
                        OutboundOpenPackageModalTransferTargetContent : targetKeys,
                        OutboundOpenPackageModalOrgId : undefined,
                    }
                });
           }else{                     //添加
               dispatch({
                    type:'outboundPackageManage/updateState',
                    payload:{
                        OutboundOpenPackageModalTransferTargetContent : moveKeys,
                        OutboundOpenPackageModalOrgId : moveKeys[0],
                    }
                });

               if(wetherEditOrgId){
                   if(wetherEditOrgId != moveKeys[0] ){
                       dispatch({
                            type:'outboundPackageManage/updateState',
                            payload : {
                                OutboundOpenPackageGradientAllData   : [{
                                                                            item_index   : '0',             //下标
                                                                            packId      : undefined,       //坐席下拉表默认选中第一个
                                                                            salePrice   : '',              //售卖价格
                                                                            saleUnit    : '',              //售卖单位
                                                                            pesonNum    : '',              //人数
                                                                            seatIds     : undefined,              //已选人数Id
                                                                            cycleNum    : '',              //周期数量
                                                                            totalPrice  : '',              //合计价格
                                                                            actualPrice : '',              //实收价格
                                                                            type        : '1',             //用于区分坐席还是时长包
                                                                        }],
                                OutboundOpenPackageGradientTimeData : [{
                                                                            item_index  : '0',
                                                                            duration    : '',              //蜂豆数
                                                                            costPrice   : '',              //成本价
                                                                            salePrice   : '',              //售卖价格
                                                                            actualPrice : '',              //实收价格
                                                                        }],
                            }
                        });

                   }
               }

           }
       }
    }
    //模态框modal中坐席新增
    function OutboundOpenPackageTableAdd(item_index){
        if(item_index=='null'){ //如果之前数组为空时
            dispatch({
                type:'outboundPackageManage/updateState',
                payload:{
                    OutboundOpenPackageGradientAllData   : [{
                                                            item_index   : '0',             //下标
                                                            packId      : undefined,       //坐席下拉表默认选中第一个
                                                            salePrice   : '',              //售卖价格
                                                            saleUnit    : '',              //售卖单位
                                                            pesonNum    : '',              //人数
                                                            seatIds     : undefined,                //已选人数Id
                                                            cycleNum    : '',              //周期数量
                                                            totalPrice  : '',              //合计价格
                                                            actualPrice : '',              //实收价格
                                                            type        : '1',             //用于区分坐席还是时长包
                                                        }],
                }
            });
        }else{
            dispatch({
                type: 'outboundPackageManage/outboundOpenPackageTableChange',
                payload: {
                    type : 'add',
                    item_index,
                },
            });
        }
        dispatch({   //每次新增时清空之前选中的人员
            type: 'outboundPackageManage/updateState',
            payload: {
               OutboundSelectedRowKeys : [],
            },
        });

    }
    //模态框modal中坐席删除
    function OutboundOpenPackageTableDelete(item_index,packId){

        let allList = [];
        if(OutboundOpenPackageGradientAllData && OutboundOpenPackageGradientAllData.length>0){
            for(var i in OutboundOpenPackageGradientAllData){
                let ListObj = {};
                ListObj =OutboundOpenPackageGradientAllData[i];
                allList.push(ListObj);
            }
        }
        if(OutboundOpenPackageGradientTimeData && OutboundOpenPackageGradientTimeData.length>0){
            for(var i in OutboundOpenPackageGradientTimeData){
                let ListObj = {};
                ListObj =OutboundOpenPackageGradientTimeData[i];
                allList.push(ListObj);
            }
        }
        if(allList.length==1){
           message.warning('坐席和蜂豆至少要选中其中一个');
        }else if(allList.length>1){
           dispatch({
                type: 'outboundPackageManage/outboundOpenPackageTableChange',
                payload: {
                    type : 'delete',
                    item_index,
                },
            });
            dispatch({
                type: 'outboundPackageManage/outboundPackageTableIdOperationArr',
                payload: {
                    tableId : packId,
                    display : true,
                },
            });
        }

    }
    //坐席选择套餐
    function ChooseOrgType(currentId,beforeId,item_index){
        //使坐席下拉表可选择
        dispatch({
            type: 'outboundPackageManage/outboundPackageTableIdOperationArr',
            payload: {
                tableId : beforeId,
                display : true,
            },
        });
        //使坐席下拉表项置灰不可选
        dispatch({
            type: 'outboundPackageManage/outboundPackageTableIdOperationArr',
            payload: {
                tableId : currentId,
                display : false,
            },
        });
        //在数组中将选中项的tableId替换
        dispatch({
            type: 'outboundPackageManage/outboundPackageTableId',
            payload: {
                tableId : currentId,
                item_index,
            },
        });
    }
    //坐席周期失去焦点事件
    function OutboundTableInnerModalCycleNum(value,item_index){
        dispatch({
            type: 'outboundPackageManage/outboundOpenPackageTableChange',
            payload: {
                cycleNum : value,
                type : 'cycleNum',
                item_index,
            },
        });
    }
    //实收价格失去焦点事件
    function OutboundTableInnerModalActualPrice(value,item_index){
        dispatch({
            type: 'outboundPackageManage/outboundOpenPackageTableChange',
            payload: {
                actualPrice : value,
                type : 'actualPrice',
                item_index,
            },
        });
    }
    /*----------座席选择内部弹窗---------*/
    //座席选择人数
    function OutboundSelectTableNum(item_index){
        if(OutboundOpenPackageModalOrgId){
            dispatch({
                type: 'outboundPackageManage/seatUserBindQuery',
                payload: {
                    orgId : OutboundOpenPackageModalOrgId,
                },
            });
            dispatch({
                type: 'outboundPackageManage/updateState',
                payload: {
                    OutboundSelectTable_num_index : item_index,
                },
            });
            dispatch({
                type: 'outboundPackageManage/outboundOpenPackageTableChange',
                payload: {
                    item_index,
                    type : 'selectSeatIds',
                },
            });

        }else{
            message.warning('请先选择机构');
        }

    }
    //内部弹窗关闭
    function OutboundSelectTableInnerModalCancel(){
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundSelectTableInnerModalVisible    : false,
                OutboundSelectTable_num_index           : undefined,
                OutboundSelectedRowKeys                 : [],
            },
        });
    }
    //内部弹窗确定
    function OutboundSelectTableInnerModalEnsure(){
        dispatch({
            type: 'outboundPackageManage/outboundOpenPackageTableChange',
            payload: {
                pesonNum    : OutboundSelectedRowKeys.length,
                type        : 'pesonNum',
                item_index  : OutboundSelectTable_num_index,
                seatIds     : OutboundSelectedRowKeys,
            },
        });
        dispatch({
            type: 'outboundPackageManage/updateState',
            payload: {
                OutboundSelectTableInnerModalVisible : false,
            },
        });
    }
    //选择坐席人员
    function OutboundRowSelectChangeAction( selectedRowKeys, selectedRows ){
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundSelectedRowKeys :selectedRowKeys ,
            }
        })
	};
    //时长包删除
    function OutboundOpenPackageTableTimeDelete(){
        if(OutboundOpenPackageGradientAllData.length==0){
             message.warning('坐席和蜂豆至少要选中其中一个');
        }else{
            dispatch({
                type : 'outboundPackageManage/updateState',
                payload : {
                    OutboundOpenPackageGradientTimeData :[] ,
                }
            })
        }

    }
    //时长包新增
    function OutboundOpenPackageTableTimeAdd(){
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundOpenPackageGradientTimeData : [{
                                                        item_index  : '0',
                                                        duration    : '',              //蜂豆数
                                                        costPrice   : '',              //成本价
                                                        salePrice   : '',              //售卖价格
                                                        actualPrice : '',              //实收价格
                                                    }],
            }
        })
    }


    //时长包数量失去焦点事件
    function OutboundTableModalTimeCycleNum(value,type){
        dispatch({
            type: 'outboundPackageManage/outboundOpenPackageTableTimeChange',
            payload: {
                type : type,
                value : value,
            },
        });
    }
    //开通套餐保存事件
    function OutboundOpenPackageModelSave(value){
        let openList = [];
        if(OutboundOpenPackageGradientAllData && OutboundOpenPackageGradientAllData.length>0){
            for(var i in OutboundOpenPackageGradientAllData){
                let openListObj = {};
                openListObj =OutboundOpenPackageGradientAllData[i];
                openList.push(openListObj);
            }
        }
        let openListObj = {};
        if(OutboundOpenPackageGradientTimeData && OutboundOpenPackageGradientTimeData.length>0){

            openListObj =OutboundOpenPackageGradientTimeData[0];

        }
        if( OutboundOpenPackageGradientAllData.length==0 && OutboundOpenPackageGradientTimeData.length==0 ){
           message.warning('坐席和时长包必须选择一个');
        }else{
            if(value.id){ //编辑
                dispatch({
                    type: 'outboundPackageManage/cusPackageOpenEditor',
                    payload: {
                        contractRemark : value.contractRemark && value.contractRemark,
                        openList : JSON.stringify(openList),
                        totalPrice : value.totalPrice,
                        realPrice : value.realPrice,
                        openInfoId : value.id,
                        orgId : OutboundOpenPackageModalOrgId,
                        ...openListObj,
                    },
                });
            }else{
                dispatch({  //新增
                    type: 'outboundPackageManage/cusPackageOpenAdd',
                    payload: {
                        orgId : OutboundOpenPackageModalOrgId,
                        contractRemark : value.contractRemark && value.contractRemark,
                        openList : JSON.stringify(openList),
                        totalPrice : value.totalPrice,
                        realPrice : value.realPrice,
                        ...openListObj,
                    },
                });
            }
            dispatch({
                type : 'outboundPackageManage/updateState',
                payload : {
                    outboundModalButtonLoading : true,
                }
            })

        }


    }
    /*--------套餐编辑---------*/
    function OutboundOpenPackageEdit(id){
        dispatch({
            type: 'outboundPackageManage/cusPackageOpenPro', //坐席下拉列表
            payload: {
                proType     : '0',

            },
        });

        dispatch({
            type : 'outboundPackageManage/cusPackageOpenEdit',
            payload : {
                id   : id,
                type : 'edit',
            }
        })
    }
    /*--------------------------------审核--------------------------------------------*/
    //审核页面打开
    function OutboundOpenPackageCheck(id){
        dispatch({
            type : 'outboundPackageManage/cusPackageOpenEdit',
            payload : {
                id   : id,
                type : 'check',
            }
        })
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundOpenPackageModelType : 'check',
            }
        })
    }
    //审核页面关闭
    function OutboundOpenPackageCheckModelCancel(){
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundOpenPackageCheckModelVisible : false,
            }
        })
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundOpenPackageModelType   : undefined,
                OutboundOpenPackageModelDetail : {},
            }
        })
    }
    //审核保存
    function OutboundOpenPackageCheckModelSave(value){
        dispatch({
            type : 'outboundPackageManage/cusPackageOpenAudit',
            payload : {
                openInfoId : value.openInfoId,
                auditRemark : value.auditRemark,
            }
        })
    }

    //查看
    function OutboundOpenPackageView(id){
        dispatch({
            type : 'outboundPackageManage/cusPackageOpenEdit',
            payload : {
                id   : id,
                type : 'view',
            }
        })
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundOpenPackageModelType : 'view',
            }
        })
    }

    //坐席人员查看
    function OutboundCheckPersonInnerView(id){
        dispatch({
            type : 'outboundPackageManage/cusPackageOpenSeatQuery',
            payload : {
                openGoodsId : id,
            }
        })
    }
    //坐席人员关闭
    function OutboundCheckInnerModalCancel(){
        dispatch({
            type : 'outboundPackageManage/updateState',
            payload : {
                OutboundCheckInnerModalVisible : false,
                OutboundCheckInnerEmployeeArr  : [],
            }
        })
    }



    //开通套餐
    let OutboundOpenPackageModelProps = {
        outboundModalButtonLoading,
        OutboundOpenPackageModelVisible,
        OutboundOpenPackageModelCancel,
        OutboundOpenPackageModelSave,

        OutboundOpenPackageModalAllcontent,                 //搜索出来的总机构
        OutboundOpenPackageModalTransferTargetContent,      //选中的机构
        OutboundOpenPackageModalSearchOrgName,              //机构搜索事件
        OutboundOpenPackageModalTransferhandleChange,       //机构选中事件


        OutboundOpenPackageGradientAllData,                 //坐席总数据
        OutboundOpenPackageSelectTableIdArr,                //坐席套餐下拉总数据
        OutboundSelectTableEmployeeArr,                     //坐席人员列表
        OutboundSelectedRowKeys,                            //选中的坐席人员
        OutboundRowSelectChangeAction,                      //选中事件
        OutboundTableInnerModalCycleNum,                    //坐席周期失去焦点事件
        OutboundTableInnerModalActualPrice,                 //实收价格失去焦点事件

        OutboundOpenPackageTableAdd,                        //坐席新增
        OutboundOpenPackageTableDelete,                     //坐席删除
        ChooseOrgType,                                      //坐席选择套餐

        //选择坐席内部弹窗
        OutboundSelectTableNum,                             //选择坐席人数
        OutboundSelectTableInnerModalVisible,
        OutboundSelectTableInnerModalCancel,                //内部弹窗关闭
        OutboundSelectTableInnerModalEnsure,                //内部弹窗保存确定

        OutboundOpenPackageGradientTimeData,                //时长包梯度总数据

        OutboundOpenPackageTableTimeDelete,                 //时长包删除
        OutboundOpenPackageTableTimeAdd,                    //时长包新增


        OutboundTableModalTimeCycleNum,                     //时长包数量失去焦点事件

        totalPrice ,                                        //总价格
        realPrice  ,                                        //实收价格

        OutboundOpenPackageModelDetail,                     //套餐详情
    }
    //搜索框属性
    let OutboundPackageManageSearchProps = {
        searchData,
        searchVisible,
        searchReset,
        searchSubmit,     //搜索
        tabKey,                 //Tab标志
    };
    //table属性
    let OutboundPackageManageTableProps = {
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

        upDownOperation,                //上下架、删除
        OutboundPackageManageEdit,      //销售产品设置编辑
        tableOnFilter,                  //筛选
        tableOnCreate,                  //新增
        tabKey,                         //Tab标志
        tableOpenPackages,              //开通套餐
        OutboundOpenPackageCheck,       //套餐审核
        OutboundOpenPackageEdit,        //套餐编辑
        OutboundOpenPackageView,        //查看

    };
    //新增产品属性
    let OutboundPackageManageNewModelProps = {
        OutboundPackageNewModalVisible,                     //模态框显示状态
        OutboundPackageNewModalButtonLoading,               //提交禁止状态
        OutboundPackageNewModalCancel,                      //关闭模态框
        OutboundPackageNewModalSave,                        //保存
        ChooseQueryType,                                    //产品类型选择事件
        OutboundPackageType,                                //产品选择类型标志
        SalesProductSetupDetail,                            //编辑时详情数据
    }
    let OutboundOpenPackageCheckModelProps = {
        OutboundOpenPackageCheckModelVisible,                //模态框显示状态
        OutboundOpenPackageCheckModelCancel ,                //关闭
        OutboundOpenPackageCheckModelSave,                   //保存
        OutboundOpenPackageModelDetail,
        OutboundOpenPackageGradientAllData,                  //坐席总数据
        OutboundOpenPackageGradientTimeData,                 //时长包梯度总数据
        totalPrice,
        realPrice,

        OutboundOpenPackageModelType,                        //模态框类型

        OutboundCheckPersonInnerView,    //打开
        OutboundCheckInnerModalCancel,   //关闭
        OutboundCheckInnerModalVisible,
        OutboundCheckInnerEmployeeArr,   //坐席人员数据


    }
    return (
        <div>
           <div className='tab'>
                <Tabs defaultActiveKey="1" onChange={tabsChange}>
                    <TabPane tab={<span>销售产品设置</span>} key="1">
                        <QueueAnim
                            type={['top', 'top']}
                            ease={['easeOutQuart', 'easeInOutQuart']}
                            className="common-search-queue" >

                            {searchVisible ? [
                               <OutboundPackageManageSearch {...OutboundPackageManageSearchProps} key="search_queue"/>
                            ]:null}
                        </QueueAnim>
                        <OutboundPackageManageTable {...OutboundPackageManageTableProps} />
                    </TabPane>
                    <TabPane tab={<span>套餐开通</span>} key="2">
                        <QueueAnim
                            type={['top', 'top']}
                            ease={['easeOutQuart', 'easeInOutQuart']}
                            className="common-search-queue" >

                            {searchVisible ? [
                               <OutboundPackageManageSearch {...OutboundPackageManageSearchProps} key="search_queue"/>
                            ]:null}
                        </QueueAnim>
                        <OutboundPackageManageTable {...OutboundPackageManageTableProps} />
                    </TabPane>
                </Tabs>
            </div>
            {OutboundPackageNewModalVisible ?
                <OutboundPackageManageNewModel {...OutboundPackageManageNewModelProps}/>
                : null
            }
            {OutboundOpenPackageModelVisible ?
                <OutboundOpenPackageModel {...OutboundOpenPackageModelProps}/>
                :null
            }
            {OutboundOpenPackageCheckModelVisible ?
                <OutboundOpenPackageCheckModel {...OutboundOpenPackageCheckModelProps }/>
                :null
            }

        </div>
  );
}

OutboundPackageManage.propTypes = {
  outboundPackageManage: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ outboundPackageManage }) {
  return { outboundPackageManage };
}

export default connect(mapStateToProps)(OutboundPackageManage);
