import React, { PropTypes } from 'react';
import TenantList from '../../components/Wechat/tenant/TenantList';
import TenantSearch from '../../components/Wechat/tenant/TenantSearch';
import TenantAddOrEditModal from '../../components/Wechat/tenant/TenantAddOrEditModal';
import qs from 'qs';
import QueueAnim from 'rc-queue-anim';
import { message } from 'antd';

import { connect } from 'dva';

function WechatTenant({ dispatch, wechatTenantModel }) {
    let {
         /*table*/
        tenantPageIndex ,        //页码
        tenantPageSize ,         //一页条数
        tenantLoading ,          //列表加载状态
        tenantTotal ,            //列表内容总条数
        tenantTableContent ,     //列表内容

        /*search bar*/
        searchVisible ,       //搜索栏是否显示
        searchContent ,         //搜索栏搜索内容

        /*新增*/
        addOrEditTeanantVisible ,            //新增编辑modal是否显示
        addOrEditSupModalButtonLoading ,         //新增编辑modal按钮是否在加载状态
        checkOrEditSupDetailMsg,                 //新增编辑信息新增编辑校区modal关闭
    } = wechatTenantModel;

    /*搜索按钮*/
    let searchSubmit = function(filters){
        dispatch({
            type: 'wechatTenantModel/TenantList',
            payload: {
                ...searchContent,
                ...filters,
                pageIndex : 0,
            },
        });
    }
    /*筛选*/
    let tenantTableOnFilter = function(){
            dispatch({
                type: 'wechatTenantModel/updateState',
                payload: {
                    searchVisible : !searchVisible,
                },
            });
        }
    /*table分页等条件改变事件*/
     let tenantTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'wechatTenantModel/TenantList',
                payload: {
                    ...searchContent,
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
       }
        /*点击新增*/
        let tenantMessageAdd = function(tenantId){
            dispatch({
                type:'wechatTenantModel/updateState',
                payload:{
                    addOrEditTeanantVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddOrEditSupModalCancel = function(){
            dispatch({
                type:'wechatTenantModel/updateState',
                payload:{
                    addOrEditTeanantVisible : false,
                    checkOrEditSupDetailMsg : {}
                }
            });
        }

        /*新增编辑提交*/
        let AddOrEditSupModalSubmit = function(data){
        	if(data.tenantId && data.tenantId != undefined){
        		dispatch({
	                type:'wechatTenantModel/TenantUpdate',
	                payload:{
	                    ...data
	                }
	            })
        	}
        	else{
        		dispatch({
	                type:'wechatTenantModel/TenantAdd',
	                payload:{
	                    ...data
	                }
	            })
        	}

        }
         //列表内点击编辑
        let supTableOnEdit = function(obj){
			if(obj.status == '0'){
				message.error('被删除的租户不能编辑');
				return;
			}
            dispatch({
                type:'wechatTenantModel/TenantEdit',
                payload:{
//                  addOrEditTeanantVisible : true,
                    tenantId:obj.tenantId,
                }
            });
        }
        /*设置上架*/
        let tableSupPackageDown = function(data){
            dispatch({
                type:'wechatTenantModel/TenantUpdateState',
                payload:{
                    id:data.id,
                    status:1,
                }
            });
        }
         /*设置下架*/
        let tableSupPackageUp = function(data){
            dispatch({
                type:'wechatTenantModel/TenantUpdateState',
                payload:{
                    id:data.id,
                    status:2,
                }
            });
        }
        /*删除*/
        let tableSupPackageDel = function(data){
			if(data.status == '0'){
				message.error('当前租户已经被删除');
				return;
			}
            dispatch({
                type:'wechatTenantModel/TenantUpdateState',
                payload:{
                    tenantId:data.tenantId,
                    status:0,
                }
            });
        }

		 //导出查询结果
		let ExportOrgRegExcel = function(){
			console.log('---导出查询结果')
			window.open(`${BASE_URL}/mini/exportTenantList?${qs.stringify(searchContent)}`);
		}
     /*search属性*/
      let tenantSearchProps = {
        searchSubmit,           //搜索栏点击搜索或者清除条件
        }
     /*table属性*/
     let tenantListProps = {
        tenantPageIndex ,        //页码
        tenantPageSize ,         //一页条数
        tenantLoading ,          //列表加载状态
        tenantTotal ,            //列表内容总条数
        tenantTableContent ,     //列表内容
        supTableOnEdit,               //点击编辑

        searchSubmit,                 //搜索按钮
        tenantTableOnFilter,     //筛选
        tenantTableOnChange,     //table分页等条件改变事件
        tenantMessageAdd,         //新增
        tableSupPackageDown,           //上架
        tableSupPackageUp,             //下架
        tableSupPackageDel,            //删除
		ExportOrgRegExcel
     }
     /*新增编辑租户*/
    let tenantMessageAddOrgModalProps = {
        addOrEditTeanantVisible,             //新增编辑校区modal是否显示
        addOrEditSupModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkOrEditSupDetailMsg,                //新增编辑机构信息

        AddOrEditSupModalSubmit,                //新增编辑校区提交
        AddOrEditSupModalCancel,                //
    }
    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{searchVisible ? [
                   <TenantSearch {...tenantSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <TenantList {...tenantListProps}/>
            {addOrEditTeanantVisible == true ? <TenantAddOrEditModal {...tenantMessageAddOrgModalProps}/> : null}
        </div>
  );
}

function mapStateToProps({ wechatTenantModel }) {
  return { wechatTenantModel };
}

export default connect(mapStateToProps)(WechatTenant);
