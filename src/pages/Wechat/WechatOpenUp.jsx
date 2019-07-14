import React, { PropTypes } from 'react';
import OpenUpList from '../../components/Wechat/openUp/OpenUpList';
import OpenUpSearch from '../../components/Wechat/openUp/OpenUpSearch';
import OpenUpAddOrEditModal from '../../components/Wechat/openUp/OpenUpAddOrEditModal';
import qs from 'qs';
import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function WechatOpenUp({ dispatch, wechatOpenUpModel }) {
    let {
         /*table*/
        OpenUpPageIndex ,        //页码
        OpenUpPageSize ,         //一页条数
        OpenUpLoading ,          //列表加载状态
        OpenUpTotal ,            //列表内容总条数
        OpenUpTableContent ,     //列表内容

        /*search bar*/
        searchVisible ,       //搜索栏是否显示
        searchContent ,         //搜索栏搜索内容

        /*新增*/
        addOrEditTeanantVisible ,                //新增编辑modal是否显示
        addOrEditSupModalButtonLoading ,         //新增编辑modal按钮是否在加载状态
        myData,                 //新增编辑信息
    } = wechatOpenUpModel;

    /*搜索按钮*/
    let searchSubmit = function(filters){
        console.info('filters', filters);
        dispatch({
            type: 'wechatOpenUpModel/OpenUpList',
            payload: {
                ...searchContent,
                ...filters,
                pageIndex : 0,
            },
        });
    }
    /*筛选*/
    let OpenUpTableOnFilter = function(){
            dispatch({
                type: 'wechatOpenUpModel/updateState',
                payload: {
                    searchVisible : !searchVisible,
                },
            });
        }
    /*table分页等条件改变事件*/
     let OpenUpTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'wechatOpenUpModel/OpenUpList',
                payload: {
                    ...searchContent,
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
       }
        /*点击新增*/
        let OpenUpMessageAdd = function(tenantId){
            dispatch({
                type:'wechatOpenUpModel/updateState',
                payload:{
                    addOrEditTeanantVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddOrEditOpenUpCancel = function(){
            dispatch({
                type:'wechatOpenUpModel/updateState',
                payload:{
                    addOrEditTeanantVisible : false,
                    myData : {}
                }
            });
        }

        /*新增编辑提交*/
        let AddOrEditOpenUpSubmit = function(data){
            dispatch({
                type:'wechatOpenUpModel/OpenUpAdd',
                payload:{
                    ...data
                }
            })
        }
         //列表内点击编辑
        let OpenUpsupTableOnEdit = function(id){
            dispatch({
                type:'wechatOpenUpModel/OpenUpEdit',
                payload:{
                    addOrEditTeanantVisible : true,
                    id,
                }
            });
        }
        /*设置上架*/
        let openPackageDown = function(data){
            dispatch({
                type:'wechatOpenUpModel/OpenUpUpdateState',
                payload:{
                    id:data.id,
                    status:1,
                }
            });
        }
         /*设置下架*/
        let openPackageUp = function(data){
            dispatch({
                type:'wechatOpenUpModel/OpenUpUpdateState',
                payload:{
                    id:data.id,
                    status:2,
                }
            });
        }
        /*删除*/
        let openPackageDel = function(data){
            dispatch({
                type:'wechatOpenUpModel/OpenUpUpdateState',
                payload:{
                    id:data.id,
                    status:0,
                }
            });
        }
         //导出查询结果
	let ExportOrgRegExcel = function(){
		console.log('--openup-导出查询结果')
		window.open(`${BASE_URL}/mini/exportListOpen?${qs.stringify(searchContent)}`);
	}
     /*search属性*/
      let tenantSearchProps = {
        searchSubmit,           //搜索栏点击搜索或者清除条件
        }
     /*table属性*/
     let listProps = {
        OpenUpPageIndex ,        //页码
        OpenUpPageSize ,         //一页条数
        OpenUpLoading ,          //列表加载状态
        OpenUpTotal ,            //列表内容总条数
        OpenUpTableContent ,     //列表内容
        OpenUpsupTableOnEdit,               //点击编辑

        searchSubmit,                 //搜索按钮
        OpenUpTableOnFilter,     //筛选
        OpenUpTableOnChange,     //table分页等条件改变事件
        OpenUpMessageAdd,         //新增
        openPackageDown,           //上架
        openPackageUp,             //下架
        openPackageDel,            //删除
        ExportOrgRegExcel,      //导出查询结果
     }
     /*新增编辑租户*/
    let openUpMesAddOrgModalProps = {
        addOrEditTeanantVisible,             //新增编辑校区modal是否显示
        addOrEditSupModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        myData,                //新增编辑机构信息

        AddOrEditOpenUpSubmit,                //新增编辑校区提交
        AddOrEditOpenUpCancel,                //新增编辑校区modal关闭
    }
    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{searchVisible ? [
                   <OpenUpSearch {...tenantSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <OpenUpList {...listProps}/>
            {addOrEditTeanantVisible == true ? <OpenUpAddOrEditModal {...openUpMesAddOrgModalProps}/> : null}
        </div>
  );
}

function mapStateToProps({ wechatOpenUpModel }) {
  return { wechatOpenUpModel };
}

export default connect(mapStateToProps)(WechatOpenUp);
