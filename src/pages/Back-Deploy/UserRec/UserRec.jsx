import React, { PropTypes } from 'react';
import UserRecSearch from '../../../components/Back-Deploy/user-rec/UserRecSearch';
import UserRecList from '../../../components/Back-Deploy/user-rec/UserRecList';
import UserRecSetModal from '../../../components/Back-Deploy/user-rec/UserRecSetModal';
import UserRecAddOrEditModal from '../../../components/Back-Deploy/user-rec/UserRecAddOrEditModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './UserRec.less';

function UserRec({ dispatch, userRec }) {

    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData,formSetData, formVisible,formSetVisible,formType,                   //form表单数据
        searchData, searchVisible, searchChannelList,                   //search查询框数据
    } = userRec;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'userRec/updateState',
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
    let tablePageChange = function(current, pageSize=userRec.pageSize) {
        dispatch({
            type: 'userRec/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'userRec/query',
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
            type: 'userRec/addModal',
            payload:{
                formLoading : false,    //表单按钮是否加载中
                formData : record,       //表单数据
                formVisible:true,
                formType:'edit',
            }
        });
    };

    //表格点击新增
    let tableOnCreate = function(){
        dispatch({
           type: 'userRec/updateState',
            payload: {
                formLoading : false,    //表单按钮是否加载中
                formVisible:true,
                formType:'create',
                formData:{},
            },
        });
    }

    //表单窗口关闭
    let formCancel = function() {
        dispatch({
            type: 'userRec/addModal',
            payload:{
                formVisible:false,
            }
        });
    };

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'userRec/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'userRec/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'userRec/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'userRec/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'userRec/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'userRec/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'userRec/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'userRec/query',
            payload: {
                pageIndex,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        dispatch({
            type: 'userRec/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'userRec/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //点击设置
    let tableOnSet = function(){
        dispatch({
           type: 'userRec/updateState',
            payload: {
                formLoading : false,
                formSetVisible : true,
            },
        });
    };
    //点击关闭设置弹框
    let formSetCancel = function(){
        dispatch({
           type: 'userRec/updateState',
            payload: {
                formLoading : false,
                formSetVisible : false,
            },
        });
    }
    //设置表单提交
    let formSetSubmit = function(){
        dispatch({
           type: 'userRec/updateState',
            payload: {
                formLoading : false,
                formSetVisible : false,
            },
        });
    }

    //设置提交
    let formSubmit = function(data,type) {
        dispatch({
           type: 'userRec/updateState',
            payload: {
                formLoading : false,
                formVisible : false,
            },
        });
        if(type=='edit'){
            dispatch({
                type: 'userRec/formEditSubmit',
                payload: {
                    ...data
                },
            });
        }else if(type=='create'){
            dispatch({
                type: 'userRec/formCreateSubmit',
                payload: {
                    ...data
                },
            });
        }

    };

    //简介是否全部展示
    let tableOnShowAll = function(index){
        let newList=[];
        userRec.list[index].shortIntro = userRec.list[index].intro;
        for(let i=0;i<userRec.list.length;i++){
            newList.push(userRec.list[i]);
        }
        dispatch({
            type: 'userRec/updateState',
            payload: {
                list : newList,
            },
        });
    }
    //简介是否展示收起
    let tableOnShowClose = function(index){
        let newList=[];
        userRec.list[index].shortIntro = userRec.list[index].shortIntro.substr(0,30)+'......';
        for(let i=0;i<userRec.list.length;i++){
            newList.push(userRec.list[i]);
        }
        dispatch({
            type: 'userRec/updateState',
            payload: {
                list : newList,
            },
        });
    }

    let userRecSearchProps = {
        searchData, searchVisible,searchChannelList,
        searchReset,
        searchSubmit,
    };


    let userRecListProps = {
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
        tableOnShowAll,
        tableOnShowClose,
        tableOnSet,
    };

    let userRecSetModalProps = {
        formLoading, formSetData, formSetVisible,
        formSetCancel,
        formSetSubmit,
    };

    let userRecAddOrEditModalProps = {
        formLoading, formData, formVisible,formType,
        formCancel,
        formSubmit,
    };

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <UserRecSearch {...userRecSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>

            <UserRecList {...userRecListProps} />
            <UserRecSetModal {...userRecSetModalProps} />
            <UserRecAddOrEditModal {...userRecAddOrEditModalProps} />
        </div>
  );
}

UserRec.propTypes = {
  channelMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ userRec }) {
  return { userRec };
}

export default connect(mapStateToProps)(UserRec);
