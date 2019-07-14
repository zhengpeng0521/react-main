import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button, } from 'antd';
import NewsBannerCom from '../../../components/news/news-banner/NewsBannerCom';
import NewsBannerAdd from '../../../components/news/news-banner/NewsBannerAdd';

function NewsBannerPage({ dispatch,  NewsBannerModel }){
    let {
        dataSource,
        tableLoading,
        addModelVisible,
        fromData,
        addType,
        pageSize,
        pageIndex,
        total
    } = NewsBannerModel;

    //打开新增弹框
    function openAddModel(){
        dispatch({
            type : 'NewsBannerModel/updateState',
            payload : {
                addModelVisible : !addModelVisible,
                addType : 'add'
            }
        })
    }

    //关闭新增弹框
    function closeAddModel(){
        dispatch({
            type : 'NewsBannerModel/updateState',
            payload : {
                addModelVisible : !addModelVisible
            }
        })
    }

    //新增提交
    function addModelSubmit(values){
        dispatch({
            type : 'NewsBannerModel/viewpagerCreate',
            payload : {
                apply : values.apply,
                seq : values.seq || undefined,
                imgUrl : values.imgUrl,
                url : values.url
            }
        })
    }

    //编辑
    function editModel(id){
        dispatch({
            type : 'NewsBannerModel/updateState',
            payload : {
                addModelVisible : !addModelVisible,
                addType : 'edit'
            }
        })
        dispatch({
            type : 'NewsBannerModel/viewpagerDetail',
            payload : {
                id : id
            }
        })
    }

    //上下架
    function changeApply(record){
        if(record.apply == '1' || record.apply == 1){
                dispatch({
                    type:'NewsBannerModel/viewpagerDelete',
                    payload:{
                        id : record.id,
                        apply : 2
                    }
                });
            }else if(record.apply == '2' || record.apply == 2){
                dispatch({
                    type:'NewsBannerModel/viewpagerDelete',
                    payload:{
                        id : record.id,
                        apply : 1
                    }
                });
            }
    }

    //删除
    function changeDelete(id){
        dispatch({
            type : 'NewsBannerModel/viewpagerDelete',
            payload : {
                status : 2,
                id : id
            }
        })
    }

    //分页
    function tableOnChange(pagination){
        dispatch({
            type : 'NewsBannerModel/updateState',
            payload : {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
            }
        })
        dispatch({
            type : 'NewsBannerModel/viewpagerQuery',
            payload : {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
            }
        })
    }

    let NewsBannerComProps = {
        dataSource,
        tableLoading,
        openAddModel,
        editModel,
        changeApply,
        changeDelete,
        pageSize,
        pageIndex,
        total,
        tableOnChange,
    };

    let NewsBannerAddProps = {
        addModelVisible,
        closeAddModel,
        addModelSubmit,
        fromData,
        addType,
    }
    return (
        <div>
            <NewsBannerCom { ...NewsBannerComProps } />
            <NewsBannerAdd { ...NewsBannerAddProps }/>
        </div>
    )
};

function mapStateToProps ({  NewsBannerModel }){
	return {  NewsBannerModel };
};

export default connect( mapStateToProps )(  NewsBannerPage );
