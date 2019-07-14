import React, { PropTypes } from 'react';
import MechanismList from '../../components/Wechat/mechanism/MechanismList';
import MechanismSearch from '../../components/Wechat/mechanism/MechanismSearch';
import MechanismAddOrEditModal from '../../components/Wechat/mechanism/MechanismAddOrEditModal';
import qs from 'qs';
import QueueAnim from 'rc-queue-anim';
import { message } from 'antd';

import { connect } from 'dva';

function WechatMechanism({ dispatch, wechatMechanismModel }) {
    let {
         /*table*/
        mechPageIndex ,        //页码
        mechPageSize ,         //一页条数
        mechLoading ,          //列表加载状态
        mechTotal ,            //列表内容总条数
        mechTableContent ,     //列表内容

        /*search bar*/
        searchVisible ,       	//搜索栏是否显示
        searchContent ,         //搜索栏搜索内容

        /*新增*/
        addOrEditMechVisible ,            	 //新增编辑modal是否显示
        addOrEditSupModalButtonLoading ,         //新增编辑modal按钮是否在加载状态
        checkOrEditMsg,                 //新增编辑信息
    } = wechatMechanismModel;

    /*搜索按钮*/
    let searchSubmit = function(filters){
        dispatch({
            type: 'wechatMechanismModel/MechanismList',
            payload: {
                ...searchContent,
                ...filters,
                pageIndex : 0,
            },
        });
    }
    /*筛选*/
    let mechTableOnFilter = function(){
            dispatch({
                type: 'wechatMechanismModel/updateState',
                payload: {
                    searchVisible : !searchVisible,
                },
            });
        }
    /*table分页等条件改变事件*/
     let mechTableOnChange = function(pagination, filters, sorter){
            dispatch({
                type: 'wechatMechanismModel/MechanismList',
                payload: {
                    ...searchContent,
                    pageIndex : pagination.current-1,
                    pageSize : pagination.pageSize,
                },
            });
       }
        /*点击新增*/
        let mechMessageAdd = function(tenantId){
            dispatch({
                type:'wechatMechanismModel/updateState',
                payload:{
                    addOrEditMechVisible : true,
                }
            });
        }

        /*关闭新增编辑模态框*/
        let AddOrEditMechCancel = function(){
            dispatch({
                type:'wechatMechanismModel/updateState',
                payload:{
                    addOrEditMechVisible : false,
                    checkOrEditMsg : {}
                }
            });
        }

        /*新增编辑提交*/
        let AddOrEditMechSubmit = function(data){
        	if(data.isEdit){
        		dispatch({
        		    type:'wechatMechanismModel/MechanismUpdate',
        		    payload:{
        		        ...data
        		    }
        		})
        	}else{
        		dispatch({
        		    type:'wechatMechanismModel/MechanismAdd',
        		    payload:{
        		        ...data
        		    }
        		})
        	}
        }
         //列表内点击编辑
        let mechSupTableOnEdit = function(obj){
			if(obj.status == '0'){
				message.error('无效机构不能被编辑');
				return;
			}
            dispatch({
                type:'wechatMechanismModel/MechanismEdit',
                payload:{
                    addOrEditMechVisible : true,
                    orgId:obj.orgId,
                    tenantId:obj.tenantId,
                }
            });
        }
        /*设置上架*/
        let mechPackageDown = function(data){
            dispatch({
                type:'wechatMechanismModel/MechanismUpdateState',
                payload:{
                    id:data.id,
                    status:1,
                }
            });
        }
         /*设置下架*/
        let mechPackageUp = function(data){
            dispatch({
                type:'wechatMechanismModel/MechanismUpdateState',
                payload:{
                    id:data.id,
                    status:2,
                }
            });
        }
        /*删除*/
        let mechPackageDel = function(data){
			if(data.status == '0'){
				message.error('当前机构已经被删除');
				return;
			}
            dispatch({
                type:'wechatMechanismModel/MechanismUpdateState',
                payload:{
                	orgId:data.orgId,
                    tenantId:data.tenantId,
                    status:0,
                }
            });
        }
         //导出查询结果
		let ExportOrgRegExcel = function(){
			console.log('--mechanism-导出查询结果')
			window.open(`${BASE_URL}/mini/exportOrgList?${qs.stringify(searchContent)}`);
		}
     /*search属性*/
      let mechSearchProps = {
        searchSubmit,           //搜索栏点击搜索或者清除条件
        }
     /*table属性*/
     let listProps = {
        mechPageIndex ,        //页码
        mechPageSize ,         //一页条数
        mechLoading ,          //列表加载状态
        mechTotal ,            //列表内容总条数
        mechTableContent ,     //列表内容
        mechSupTableOnEdit,               //点击编辑

        searchSubmit,                 //搜索按钮
        mechTableOnFilter,     //筛选
        mechTableOnChange,     //table分页等条件改变事件
        mechMessageAdd,         //新增
        mechPackageDown,           //上架
        mechPackageUp,             //下架
        mechPackageDel,            //删除
        ExportOrgRegExcel,      //导出查询结果
     }
     /*新增编辑租户*/
    let mechanMesAddOrgModalProps = {
        addOrEditMechVisible,                //新增编辑校区modal是否显示
        addOrEditSupModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
        checkOrEditMsg,                //新增编辑机构信息

        AddOrEditMechSubmit,                //新增编辑校区提交
        AddOrEditMechCancel,                //新增编辑校区modal关闭
    }
    return (
        <div>
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
				{searchVisible ? [
                   <MechanismSearch {...mechSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <MechanismList {...listProps}/>
            {addOrEditMechVisible == true ? <MechanismAddOrEditModal {...mechanMesAddOrgModalProps}/> : null}
        </div>
  );
}

function mapStateToProps({ wechatMechanismModel }) {
  return { wechatMechanismModel };
}

export default connect(mapStateToProps)(WechatMechanism);
