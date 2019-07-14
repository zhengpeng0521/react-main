import React, { PropTypes } from 'react';
import SignGameSearch from '../../../components/GoldBusiness/sign-game/SignGameSearch';
import SignGameList from '../../../components/GoldBusiness/sign-game/SignGameList';
import SignGameModal from '../../../components/GoldBusiness/sign-game/SignGameModal';
import SignGameGiftModal from '../../../components/GoldBusiness/sign-game/SignGameGiftModal';
import SignGameGiftInnerModal from '../../../components/GoldBusiness/sign-game/SignGameGiftInnerModal';
import SignGameOrderModal from '../../../components/GoldBusiness/sign-game/SignGameOrderModal';
import SignGameOrderInnerModal from '../../../components/GoldBusiness/sign-game/SignGameOrderInnerModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './SignGame.less';

function SignGame({ dispatch, signGame }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisibleEdit,formVisibleAdd,formVisibleGift,formVisibleGiftInner,formVisibleOrder,formVisibleOrderInner,formType,//form表单数据
        searchData, searchVisible, searchChannelList,     //search查询框数据
    } = signGame;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'channelMgr/updateState',
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
    let tablePageChange = function(current, pageSize=signGame.pageSize) {
        dispatch({
            type: 'signGame/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'signGame/query',
            payload: {
                ...searchData,
                pageIndex : current-1,
                pageSize
            },
        });
    };

    //表格分页、排序、筛选变化时触发
    let tableOnChange = function(pagination, filters, sorter) {
        //TODO
    };

    //表格列标题点击事件
    let tableColumnHeadClick = function(columnKey) {
        //TODO
    };

    //表格点击编辑
    let tableOnEditItem = function(record) {
        dispatch({
            type: 'signGame/updateState',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : record,       //表单数据
                formVisibleEdit:true,
                formType:'edit',
            }
        });
    };

    //打开奖品模态框
    let tableOnGift = function(){
        dispatch({
            type: 'signGame/updateState',
            payload: {
                formVisibleGift:true,
            },
        });
    };

    //打开订单模态框
    let tableOnOrder = function(){
        dispatch({
            type: 'signGame/updateState',
            payload: {
                formVisibleOrder:true,
            },
        });
    };

    //打开奖品内模态框
    let tableOnGiftEditItem = function(record){
        dispatch({
            type: 'signGame/updateState',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : record,       //表单数据
                formVisibleGiftInner:true,
                formType:'edit',
            }
        });
    }
    let tableOnOrderEditItem = function(record){
        dispatch({
            type: 'signGame/updateState',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : record,       //表单数据
                formVisibleOrderInner:true,
                formType:'edit',
            }
        });
    }

    //表格点击新增
    let tableOnCreate = function() {
        dispatch({
            type: 'signGame/addModal',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : {},       //表单数据
                formVisibleAdd:true,
                formType:'create',
            }
        });
    };

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'signGame/updateState',
            payload:{
                formVisibleEdit:false,
                formVisibleAdd:false,
                formVisibleGift:false,
                formVisibleOrder:false,
            }
        });
    };
    let innerFormCancel = function(){
         dispatch({
            type: 'signGame/updateState',
            payload:{
                formVisibleGiftInner:false,
                formVisibleOrderInner:false,
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'signGame/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'signGame/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'signGame/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'signGame/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'signGame/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'signGame/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'signGame/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'signGame/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'signGame/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //新增提交
    let formSubmit = function(data,detail) {
        switch(detail){
            case 'Gift':
                console.log('pages gift');
                console.log(data);
                dispatch({
                    type: 'signGame/updateState',
                    payload: {
                        formVisibleGiftInner : false,
                        formLoading : false,
                        ...data
                    },
                });break;
            case 'Order':
                console.log('pages order');
                console.log(data);
                dispatch({
                    type: 'signGame/updateState',
                    payload: {
                        formVisibleOrderInner : false,
                        formLoading : false,
                        ...data
                    },
                });break;
            case 'Edit':
                console.log('pages EditOrAdd');
                console.log(data);
                dispatch({
                    type: 'signGame/updateState',
                    payload: {
                        formVisibleEdit : false,
                        formVisibleAdd : false,
                        formLoading : false,
                        ...data
                    },
                });
        }
    };

    //主表格点击删除
    let tableOnDeleteItem = function(id) {
        console.log('pages delete',id);
        dispatch({
            type: 'signGame/delete',
            payload: {
                id
            },
        });
    };

    //奖品模态框删除
    let tableOnGiftDeleteItem = function(id){
        console.log('pages 奖品模态框删除',id);
    }

    let signGameSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let signGameListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnClearCacheItem,
        tableOnAddEssenceItem,
        tableOnRecommendItem,
        tableOnDoUpItem,
        tableOnCreate,
        tableOnFilter,
        tableOnDeleteItem,
        tableOnGift,
        tableOnOrder,
    };

    let signGameModalProps = {
        formLoading, formData, formVisibleEdit,formVisibleAdd,formType,
        formCancel,
        formSubmit,
    }

    let signGameGiftModalProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableOnChange,tablePageChange,formVisibleGift,formLoading,formCancel,tableOnGiftEditItem,tableOnGiftDeleteItem,
    };

    let signGameGiftInnerModalProps = {
        formLoading, formData, formVisibleGiftInner,formType,
        innerFormCancel,
        formSubmit,
    };

    let signGameOrderModalProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableOnChange,tablePageChange,tableOnOrderEditItem,formVisibleOrder,formLoading,formCancel
    };

    let signGameOrderInnerModalProps = {
        formLoading, formData, formVisibleOrderInner,formType,
        formSubmit,
        innerFormCancel,
    };

    return (
        <div>
            <SignGameList {...signGameListProps} />
            <SignGameModal {...signGameModalProps} />
            <SignGameGiftModal {...signGameGiftModalProps} />
            <SignGameGiftInnerModal {...signGameGiftInnerModalProps}/>
            <SignGameOrderModal {...signGameOrderModalProps} />
            <SignGameOrderInnerModal {...signGameOrderInnerModalProps} />
        </div>
  );
}

SignGame.propTypes = {
  signGame: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ signGame }) {
  return { signGame };
}

export default connect(mapStateToProps)(SignGame);
