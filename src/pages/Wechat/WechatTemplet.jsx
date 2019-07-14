import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button, } from 'antd';
import NewsTempletCom from '../../components/Wechat/templet/NewsTempletCom';
import NewsTempletAdd from '../../components/Wechat/templet/NewsTempletAdd';
import TempletInfo from '../../components/Wechat/templet/TempletInfo';

function WechatTemplet({ dispatch,  wechatTempletModel }){
    let {
        dataSource,
        tableLoading,
        addModelVisible,
        fromData,
        addType,
        pageSize,
        pageIndex,
        total,
        infoModelVisible,
        infoData,
        draftListData,
    	tplListData,
		currentKye,
    } = wechatTempletModel;

    //打开新增弹框
    function openAddModel(){
        dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                addModelVisible : !addModelVisible,
                addType : 'add'
            }
        })
    }

    //关闭新增弹框
    function closeAddModel(){
        dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                addModelVisible : !addModelVisible
            }
        })
    }

    //新增提交
    function addModelSubmit(values){
        dispatch({
            type : 'wechatTempletModel/viewpagerCreate',
            payload : {
                name : values.name,
                cover : values.cover || '',
                demoAppId : values.demoAppId,
                seqNo : values.seqNo,
                demoUrl : values.demoUrl
            }
        })
    }

    //编辑
    function editModel(id){
        dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                addModelVisible : !addModelVisible,
                addType : 'edit'
            }
        })
        dispatch({
            type : 'wechatTempletModel/viewpagerDetail',
            payload : {
                id : id
            }
        })
    }
    //查看
    function infoFun(id){
		let key = window._init_data.tabkey || 'draftList'
        dispatch({
            type : 'wechatTempletModel/viewpagerDetail',
            payload : {
                id : id,
				tabKye:key
            }
        })
       dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                infoModelVisible : true,
            }
        })

    }

    //分页
    function tableOnChange(pagination){
        dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
            }
        })
        dispatch({
            type : 'wechatTempletModel/viewpagerQuery',
            payload : {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
            }
        })
    }
 	//关闭查看详情弹窗
    function closeTempletInfo(){
        dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                infoModelVisible : false,
                infoData :{},
                draftListData : [],
    			tplListData : [],
            }
        })
    }
    function temInfoComplete(){
    	 dispatch({
            type : 'wechatTempletModel/updateState',
            payload : {
                infoModelVisible : false,
            }
        })
    }
	/*草稿箱和模板列表切换*/
	function tabChange(key){
		let appId = infoData && infoData.demoAppId || '';
		if(appId == '')
		{
			return;
		}
		if(key == 'draftList') //草稿箱
		{
			window._init_data.tabkey = "draftList";
			dispatch({
                type : "wechatTempletModel/draftList",
                payload : {
					demoAppId:appId
                }
            })
		}else if(key == 'tplList')//模板
		{
			window._init_data.tabkey = "tplList";
			dispatch({
                type : "wechatTempletModel/tplList",
                payload : {
					demoAppId:appId
                }
            })
		}
	}
	//设为模板
	function setTpFun(obj){
		dispatch({
            type : "wechatTempletModel/draftToTpl",
            payload : {
				draft_id:obj.draft_id || '',
            }
        })
	}
	//将该模版设为默认的模版
	function setDefaltFun(obj){
		dispatch({
            type : "wechatTempletModel/updateVersion",
            payload : {
				demoAppId:obj.source_miniprogram_appid || '',
				template_id:obj.template_id || '',
            }
        })
	}
	//删除某个模版
	function deleteFun(obj){
		dispatch({
            type : "wechatTempletModel/delTpl",
            payload : {
            	demoAppId:obj.source_miniprogram_appid || '',
				template_id:obj.template_id || '',
            }
        })
	}
    let NewComProps = {
        dataSource,
        tableLoading,
        openAddModel,
        editModel,
        infoFun,
        pageSize,
        pageIndex,
        total,
        tableOnChange,
    };

    let NewsAddProps = {
        addModelVisible,
        closeAddModel,
        addModelSubmit,
        fromData,
        addType,
    }
    let TempletInfoProps = {
    	infoModelVisible,
    	infoData,
    	closeTempletInfo,
    	temInfoComplete,
    	draftListData,
    	tplListData,
    	tabChange,
    	setTpFun,
    	setDefaltFun,
    	deleteFun,
    }
    return (
        <div>
            <NewsTempletCom { ...NewComProps } />
            <NewsTempletAdd { ...NewsAddProps }/>
            <TempletInfo { ...TempletInfoProps }/>
        </div>
    )
};

function mapStateToProps ({  wechatTempletModel }){
	return {  wechatTempletModel };
};

export default connect( mapStateToProps )(  WechatTemplet );
