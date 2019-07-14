import React, { PropTypes } from 'react';
import qs from 'qs';
import OrganRegisterSearch from '../../../components/OrganBusiness/organ-register/OrganRegisterSearch';
import OrganRegisterList from '../../../components/OrganBusiness/organ-register/OrganRegisterList';
import OrganRegisterEditH5HrefModal from '../../../components/OrganBusiness/organ-register/OrganRegisterEditH5HrefModal';
import H5PreviewModal from '../../../components/common/H5PreviewModal';

import QueueAnim from 'rc-queue-anim';

import { connect } from 'dva';

function OrganRegister({ dispatch, organRegister }) {

    //只传数据
    let {
        loading,
        list,
        total,
        pageIndex,
        pageSize,
        schoolType,
        formLoading,
        formData,
        formVisible,
        formType,
        searchData,
        searchVisible,
        searchChannelList,
        pricePolicyId,
        htmlDetailId,           //富文本编辑内容id
        previewModalVisible,    //h5模态框展示
        previewUrl,             //h5展示内容
        editHrefVisible,        //h5外链编辑模态框是否展示
        editHrefButtonLoading,  //h5外链提交时按钮可用与否和加载状态
        htmlText,               //h5外链文案
        htmlhref,               //h5外链地址
    } = organRegister;

    /*分页 改变*/
    let tableOnChange = function(pagination, filters, sorter){
        dispatch({
            type: 'organRegister/queryForSearchOrganRegister',
            payload: {
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                ...searchData,
            },
        });
    }

    //表格点击筛选
    let tableOnFilter = function() {
        dispatch({
            type: 'organRegister/changesearchVisible',
            payload: {
                searchVisible : !searchVisible,
            }
        });
    };

    //查询框清除条件
    let searchReset = function() {
        dispatch({
            type: 'organRegister/queryForSearchOrganRegister',
            payload: {
                pageIndex : 0,
                pageSize,
            },
        });
    };

    //查询框点击查询
    let searchSubmit = function(data) {
        dispatch({
            type: 'organRegister/queryForSearchOrganRegister',
            payload: {
                pageIndex : 0,
                pageSize,
                ...data

            },
        });
    };

    //导出查询结果
    let ExportOrgRegExcel = function(){
        window.open(`${BASE_URL}/organRegister/exportRegistRecord?${qs.stringify(searchData)}`);
    }

    //设置为已处理
    let tableOnDeal = function(data){
        dispatch({
            type: 'organRegister/makeDeal',
            payload: {
                id : data.id,
                status : 2
            },
        });
    }

    //已处理设置为已构建
    let tableOnCreateSaas = function(data){
        dispatch({
            type: 'organRegister/CreateSaas',
            payload: {
                id : data.id,
            },
        });
    }

    //打开编辑h5富文本
    let tableOnEditHtmlDetail = function(){
        dispatch({
            type: 'organRegister/updateState',
            payload: {
                previewModalVisible : true,
            },
        });
        dispatch({
            type: 'organRegister/getHtmlDetail',
        });
    }

    //关闭富文本编辑框
    let previewOnOk = function() {
        dispatch({
            type: 'organRegister/updateState',
            payload: {
                previewModalVisible : false,
                previewUrl : '',
            },
        });
    };

    //打开编辑h5外链
    let tableOnEditHref = function(){
        dispatch({
            type: 'organRegister/getHtmlHref',
        });
    }

    //编辑h5外链提交
    let editHrefModalSubmit = function(data){
        dispatch({
            type:'organRegister/updateState',
            payload:{
                editHrefButtonLoading : true,
            }
        });
        dispatch({
            type: 'organRegister/editHrefModalSubmit',
            payload:{
                ...data,
            }
        });
    }

    //关闭编辑h5模态框
    let editHrefModalCancel = function(){
        dispatch({
            type: 'organRegister/updateState',
            payload:{
                editHrefVisible : false,
            }
        });
    }

    //组件附加属性，包括方法 参数
    let organRegisterSearchProps = {
        searchData,
        searchVisible,
        searchChannelList,
        schoolType,
        searchReset,
        searchSubmit,
    };

    let h5PreviewModalProps = {
        previewUrl,
        previewOnOk,
        previewModalVisible,
    };

    let organRegisterListProps = {
        pageIndex,
        pageSize,
        loading,
        list,
        total,
        tableOnChange,
        tableOnFilter,
        tableOnCreateSaas,
        tableOnDeal,
        tableOnEditHtmlDetail,
        tableOnEditHref,
        ExportOrgRegExcel,      //导出查询结果
    };

    let organRegisterEditH5HrefModalProps = {
        htmlDetailId,
        htmlText,
        htmlhref,
        editHrefVisible,
        editHrefButtonLoading,
        editHrefModalSubmit,
        editHrefModalCancel,
    }

    return (
        <div>
           <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >

				{searchVisible ? [
                   <OrganRegisterSearch {...organRegisterSearchProps} key="search_queue"/>
                ]:null}
            </QueueAnim>
            <OrganRegisterList {...organRegisterListProps} />
            <H5PreviewModal {...h5PreviewModalProps} />
            <OrganRegisterEditH5HrefModal {...organRegisterEditH5HrefModalProps} />
        </div>
  );
}

OrganRegister.propTypes = {
  organRegister: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ organRegister }) {
  return { organRegister };
}

export default connect(mapStateToProps)(OrganRegister);
