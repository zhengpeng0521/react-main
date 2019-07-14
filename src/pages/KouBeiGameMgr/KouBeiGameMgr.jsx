import React, { PropTypes } from 'react';
import { Tabs, Icon } from 'antd';
import KouBeiGameMgrSearch from '../../components/KouBeiGameMgr/KouBeiGameMgrSearch';
import KouBeiGameMgrList from '../../components/KouBeiGameMgr/KouBeiGameMgrList';
import KouBeiGameMgrAddOrEditModal from '../../components/KouBeiGameMgr/KouBeiGameMgrAddOrEditModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

import styles from './KouBeiGameMgr.less';

const TabPane = Tabs.TabPane;

function KouBeiGameMgr({ dispatch, kouBeiGameMgr }) {

    let {
        kouBeiGameLoading,        //口碑游戏列表加载状态
        kouBeiGameList,           //口碑游戏列表数据
        kouBeiGameTotal,          //口碑游戏列表总条数
        kouBeiGamePageIndex,      //口碑游戏列表当前页码
        kouBeiGamePageSize,       //口碑游戏列表每页显示数量
        kouBeiGameFormLoading,    //口碑游戏是否加载中
        kouBeiGameFormData,       //口碑游戏表单数据
        kouBeiGameFormVisible,    //口碑游戏表单窗口是否显示
        kouBeiGameFormType,       //口碑游戏表单类型 'create' / 'update'
        kouBeiGameSearchData,     //口碑游戏模糊查询数据
        kouBeiGameSearchVisible,  //口碑游戏模糊查询是否显示
    } = kouBeiGameMgr;

    /*口碑游戏*/
        /*口碑游戏列表分页 变更*/
        let changeKouBeiGamePageSize = function(current, size){

        }

        let changeKouBeiGamePageIndex = function(page, pageSize){

        }

        let tablePageChangeKouBeiGame = function(pagination, filters, sorter) {
            dispatch({
                type: 'kouBeiGameMgr/updateState',
                payload: {
                    kouBeiGamePageIndex : pagination.current-1,
                    kouBeiGamePageSize : pagination.pageSize,
                },
            });
            dispatch({
                type: 'kouBeiGameMgr/queryForKouBeiGameList',
                payload: {
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                    ...kouBeiGameSearchData,
                },
            });
        };

        /*口碑游戏条件查询数据清空*/
        let kouBeiGameSearchReset = function(){
            dispatch({
                type: 'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGamePageIndex:0,
                    kouBeiGameSearchData:{},
                }
            });
            dispatch({
                type: 'kouBeiGameMgr/queryForKouBeiGameList',
                payload:{
                    pageIndex:0,
                    pageSize:kouBeiGamePageSize,
                }
            });
        }

        /*口碑游戏条件查询*/
        let kouBeiGameSearchSubmit = function(searchData){
            dispatch({
                type: 'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGameSearchData:searchData,
                    kouBeiGamePageIndex:0,
                }
            });
            dispatch({
                type: 'kouBeiGameMgr/queryForKouBeiGameList',
                payload:{
                    pageIndex:0,
                    pageSize:kouBeiGamePageSize,
                    ...searchData,
                }
            });
        }

        /*口碑游戏打开新增modal*/
        let tableOnKouBeiGameCreate = function(){
            dispatch({
                type: 'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGameFormVisible:true,
                    kouBeiGameFormType:'create',
                    kouBeiGameFormData:{},
                }
            });
        }
        /*口碑游戏打开编辑modal*/
        let tableOnKouBeiGameUpdate = function(data){
            dispatch({
                type: 'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGameFormVisible:true,
                    kouBeiGameFormType:'update',
                    kouBeiGameFormData:data,
                }
            });
        }

        /*口碑游戏新增编辑表单提交*/
        let kouBeiGameFormSubmit = function(data,type){
            dispatch({
                type:'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGameFormLoading:true,
                }
            });
            if('update'==type){
                dispatch({
                    type:'kouBeiGameMgr/kouBeiGameUpdate',
                    payload:{
                        ...data,
                    }
                });
            }else if('create'==type){

            }
        }

        /*口碑游戏新增编辑表单关闭*/
        let kouBeiGameFormCancel = function(){
            dispatch({
                type: 'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGameFormVisible:false,
                    kouBeiGameFormLoading:false,
                    kouBeiGameFormData:{},
                }
            });
        }

        /*口碑游戏上架*/
        let tableKouBeiGameUp = function(id){
            let status = 1;
            dispatch({
                type: 'kouBeiGameMgr/kouBeiGameChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*口碑游戏下架*/
        let tableKouBeiGameDown = function(id){
            let status = 0;
            dispatch({
                type: 'kouBeiGameMgr/kouBeiGameChangeStatus',
                payload:{
                    id,
                    status,
                }
            });
        }

        /*口碑游戏筛选框的显示与否*/
        let tableOnKouBeiGameFilter = function(){
            dispatch({
                type:'kouBeiGameMgr/updateState',
                payload:{
                    kouBeiGameSearchVisible:!kouBeiGameSearchVisible,
                }
            });
        }

    /*口碑游戏*/
    let kouBeiGameMgrSearchProps = {
        kouBeiGameSearchReset,
        kouBeiGameSearchSubmit,
    };
    let kouBeiGameMgrListProps = {
        kouBeiGameLoading,
        kouBeiGameList,
        kouBeiGameTotal,

        tableOnKouBeiGameFilter,
        changeKouBeiGamePageSize,
        changeKouBeiGamePageIndex,
        tablePageChangeKouBeiGame,
        tableOnKouBeiGameCreate,
        tableOnKouBeiGameUpdate,
        tableKouBeiGameUp,
        tableKouBeiGameDown,
    };
    let kouBeiGameMgrAddOrEditModalProps = {
        kouBeiGameFormLoading,
        kouBeiGameFormData,
        kouBeiGameFormVisible,
        kouBeiGameFormType,
        kouBeiGameFormSubmit,
        kouBeiGameFormCancel,
    };

    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {kouBeiGameSearchVisible ? [
                   <KouBeiGameMgrSearch {...kouBeiGameMgrSearchProps} key="search_queue_koubei_game_mgr"/>
                ]:null}
            </QueueAnim>
            <KouBeiGameMgrList {...kouBeiGameMgrListProps} />
            <KouBeiGameMgrAddOrEditModal {...kouBeiGameMgrAddOrEditModalProps} />
        </div>
  );
}

KouBeiGameMgr.propTypes = {
  kouBeiGameMgr: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ kouBeiGameMgr }) {
  return { kouBeiGameMgr };
}

export default connect(mapStateToProps)(KouBeiGameMgr);
