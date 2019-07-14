import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import QRCode from 'qrcode.react';
import { Spin , Row ,Col , Button, } from 'antd';
import NewsinCom from '../../../components/news/news_in/news_inCom';
import NewsAddCom from '../../../components/news/news_in/NewsAddCom';

function news_inPage({ dispatch,  news_inModel }){
    let {
        dataSource,
        total,
        pageIndex,
        pageSize,
        tableLoading,
        newsAddVisible,
        addType,
        attrHTMLValue,
        fromData,
    } = news_inModel;

    //分页
    function tableOnChange(pagination){
        dispatch({
            type : 'news_inModel/updateState',
            payload : {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
            }
        })
        dispatch({
            type : 'news_inModel/newReportQuery',
            payload : {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
            }
        })
    }

    //上下架
    function changeApply(record){
        if(record.apply == '1' || record.apply == 1){
            dispatch({
                type:'news_inModel/newReportDelete',
                payload:{
                    id : record.id,
                    apply : 2
                }
            });
        }else if(record.apply == '2' || record.apply == 2){
            dispatch({
                type:'news_inModel/newReportDelete',
                payload:{
                    id : record.id,
                    apply : 1
                }
            });
        }
    }

    //置顶
    function changeTop(record){
        if(record.top == '1' || record.top == 1){
            dispatch({
                type:'news_inModel/newReportDelete',
                payload:{
                    id : record.id,
                    top : 2
                }
            });
        }else if(record.top == '2' || record.top == 2){
            dispatch({
                type:'news_inModel/newReportDelete',
                payload:{
                    id : record.id,
                    top : 1
                }
            });
        }
    }

    //删除
    function changeDelete(id){
        dispatch({
            type : 'news_inModel/newReportDelete',
            payload : {
                status : 2,
                id : id
            }
        })
    }

    //新增
    function NewsAddBtn(){
        dispatch({
            type : 'news_inModel/updateState',
            payload : {
                newsAddVisible : !newsAddVisible,
                addType : 'add',
            }
        })
    }

    //更新html
    function funcChangeParam(html){
        dispatch({
            type : 'news_inModel/updateState',
            payload : {
                attrHTMLValue : html
            }
        })
    }

    //关闭新增框
    function closeAddModel(){
        dispatch({
            type : 'news_inModel/updateState',
            payload : {
                newsAddVisible : false,
                fromData : {},
                attrHTMLValue : undefined
            }
        })
    }

    //确定新增
    function addModelSubmit(values){
        dispatch({
            type : 'news_inModel/newReportCreate',
            payload : {
                title : values.title,
                context : values.context,
                imgUrl : values.imgUrl,
                summery : values.summery,
                classify : values.classify,
                apply : values.apply,
                addType : addType,
            }
        })
    }

    //编辑
    function editModel(id){
        dispatch({
            type : 'news_inModel/updateState',
            payload : {
                newsAddVisible : !newsAddVisible,
                addType : 'edit',
            }
        })
        dispatch({
            type : 'news_inModel/newReportDetail',
            payload : {
                id : id
            }
        })
    }

    let News_inProps = {
        dataSource,
        total,
        pageIndex,
        pageSize,
        tableLoading,
        tableOnChange,
        changeApply,
        changeDelete,
        NewsAddBtn,
        changeTop,
        editModel,
    };

    let NewsAddComProps = {
        newsAddVisible,
        attrHTMLValue,
        funcChangeParam,
        closeAddModel,
        addModelSubmit,
        fromData,
        addType,
    }

    return (
        <div>
            <NewsinCom { ...News_inProps } />
            {newsAddVisible && <NewsAddCom { ...NewsAddComProps }/>}
        </div>
    )
};

function mapStateToProps ({  news_inModel }){
	return {  news_inModel };
};

export default connect( mapStateToProps )(  news_inPage );
