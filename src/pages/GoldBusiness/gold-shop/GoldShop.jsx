import React, { PropTypes } from 'react';
import GoldShopSearch from '../../../components/GoldBusiness/gold-shop/GoldShopSearch';
import GoldShopList from '../../../components/GoldBusiness/gold-shop/GoldShopList';
import GoldShopModal from '../../../components/GoldBusiness/gold-shop/GoldShopModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';



import styles from './GoldShop.less';

function UserMgr({ dispatch, goldShop }) {

    //只传数据
    let {
        loading, list, total, pageIndex, pageSize, selectedRowKeys, selectedRows,sortColName, sortColType,  //list数据
        formLoading, formData, formVisible, formType,                 //form表单数据
        searchData, searchVisible, searchChannelList, DataNickName, DataUid, autoData                //search查询框数据
    } = goldShop;

    //列表选中项变更时事件
    let tableRowSelectChange = function(selectedRowKeys, selectRows) {
        dispatch({
            type: 'goldShop/updateState',
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
    let tablePageChange = function(current, pageSize=goldShop.pageSize) {
        dispatch({
            type: 'goldShop/updateState',
            payload: {
                pageIndex : current-1,
                pageSize
            },
        });
        dispatch({
            type: 'goldShop/query',
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
            type:'goldShop/updateState',
            payload:{
                formVisible:true,
                formData:record,
            }
        });
    };


    //表格点击新增
    let tableOnCreate = function(record) {
        dispatch({
            type:'goldShop/addModal',
            payload:{
               formVisible:true,
               formType:'create',
               formData:{},
            }
        });
    };

    //新增框取消显示
    let formCancel = function(){
        dispatch({
            type:'goldShop/addModal',
            payload:{
                formVisible:false,
                formLoading:false,
                loading:false,
            }
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'goldShop/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //表格点击删除
    let tableOnDeleteItem = function(id) {
        dispatch({
            type: 'goldShop/delete',
            payload: {
                id
            },
        });
    };

    //表格点击设置为精华
    let tableOnAddEssenceItem = function(id) {
        dispatch({
            type: 'goldShop/addEssence',
            payload: {
                id,
                essence : '1'
            },
        });
    };

    //表格点击更新缓存
    let tableOnClearCacheItem = function(id) {
        dispatch({
            type: 'goldShop/clearCache',
            payload: {
                id,
            },
        });
    };

    //表格点击设置为推荐
    let tableOnRecommendItem = function(id) {
        dispatch({
            type: 'goldShop/recommend',
            payload: {
                id,
                recommend : '1',
            },
        });
    };

    //表格点击设置为置顶
    let tableOnDoUpItem = function(id) {
        dispatch({
            type: 'goldShop/doUp',
            payload: {
                id,
            },
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'goldShop/updateState',
            payload: {
                searchData : {}
            },
        });
        dispatch({
            type: 'goldShop/query',
            payload: {
                pageIndex:0,
                pageSize:goldShop.pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(searchData) {
        console.log('pages ' ,searchData );
        dispatch({
            type: 'goldShop/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'goldShop/query',
            payload: {
                ...searchData,
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //查询框点击导出
    let searchExport = function(searchData){
        dispatch({
            type: 'goldShop/updateState',
            payload: {
                searchData
            },
        });
        dispatch({
            type: 'goldShop/export',
            payload: {
                ...searchData
            },
        });
    };


    //表单窗口提交
    let formSubmit = function(data) {
        dispatch({
            type: 'goldShop/updateState',
            payload: {
                formLoading : true,
                loading:true,
            },
        });
        dispatch({
            type: 'goldShop/GoldShopListEdit',
            payload: {
                ...data,
            },
        });
    };

    //昵称自动完成搜索
    let changeInput = function(data){
        let all = {nickname:data};
        if(data==''||data==null||data==undefined){
            dispatch({
                type: 'goldShop/updateState',
                payload: {
                    autoData:[],
                },
            });
        }else{
            dispatch({
                type: 'goldShop/queryUserByNickName',
                payload: {
                    ...all,
                },
            });
        }
    };
    //交易描述是否全部展示
    let tableOnShowAll = function(index){
        let newList=[];
        goldShop.list[index].shortIntro = goldShop.list[index].orderDesc;    //将对应索引的内容展开为原本长内容
        for(let i=0;i<goldShop.list.length;i++){                    //将列表重新赋值更新，其中对应索引内容改变，其余不变
            newList.push(goldShop.list[i]);
        }
        dispatch({
                type: 'goldShop/updateState',
                payload: {
                    list : newList,
                },
        });
    };
    //简介是否展示收起
    let tableOnShowClose = function(index){
        let newList=[];
        goldShop.list[index].shortIntro = goldShop.list[index].shortIntro.substr(0,20)+'......';    //截取对应索引的长内容
        for(let i=0;i<goldShop.list.length;i++){                    //更新列表，其中对应索引内容改变，其余不变
            newList.push(goldShop.list[i]);
        }
        dispatch({
                type: 'goldShop/updateState',
                payload: {
                    list : newList,
                },
        });
    };

    //组件附加属性，包括方法 参数
    let goldShopSearchProps = {
        searchData, searchVisible,searchChannelList,DataNickName,DataUid,autoData,
        searchReset,
        searchSubmit,
        searchExport,
        changeInput,
    };


    let goldShopListProps = {
        loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
        tableRowSelectChange,
        tableRowCheckProps,
        tablePageChange,
        tableOnChange,
        tableColumnHeadClick,
        tableOnEditItem,
        tableOnDeleteItem,
        tableOnClearCacheItem,
        tableOnAddEssenceItem,
        tableOnRecommendItem,
        tableOnDoUpItem,
        tableOnCreate,
        tableOnFilter,
        tableOnShowAll,
        tableOnShowClose,
    };

    let goldShopModalProps = {
        formLoading, formData, formVisible,formType,
        formSubmit,formCancel,
    };


    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <GoldShopSearch {...goldShopSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <GoldShopList {...goldShopListProps} />
            <GoldShopModal {...goldShopModalProps} />
        </div>
  );
}

UserMgr.propTypes = {
  goldShop: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ goldShop }) {
  return { goldShop };
}

export default connect(mapStateToProps)(UserMgr);
