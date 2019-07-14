import React, { PropTypes } from 'react';
import { connect } from 'dva';
import ActivityModuleBuildComponent from '../../../../components/activity-module/activity-module-build/ActivityModuleBuildComponent';

function ModulePageConfigForm({dispatch, modulePageConfigFormModel,}) {

    let {
        visible, loading, formData,
        moduleConfigData,currentPageKey,currentPageConfig,activeItemKey, mobileBorderColor,
    } = modulePageConfigFormModel;

    function onClose() {
        dispatch({
            type: 'modulePageConfigFormModel/handleClose',
        });
    }

    function onSubmit(values, afterSubmit) {
        dispatch({
            type: 'modulePageConfigFormModel/handleSubmit',
            payload: {
                values,afterSubmit,
            }
        });
    }

    /*在某一页后面增加一页*/
    function onCreatePage(fromIndex) {
        dispatch({
            type: 'modulePageConfigFormModel/onCreatePage',
            payload: {
                fromIndex
            }
        });
    }

    /*删除某页*/
    function onRemovePage(fromIndex) {
        dispatch({
            type: 'modulePageConfigFormModel/onRemovePage',
            payload: {
                fromIndex
            }
        });
    }

    /*切换当前编辑页面*/
    function changeActivePage(pageKey) {
        dispatch({
            type: 'modulePageConfigFormModel/changeActivePage',
            payload: {
                pageKey
            }
        });
    }

    /*编辑页面元素*/
    function updatePageItem(pageKey, itemKey, itemValue) {
        dispatch({
            type: 'modulePageConfigFormModel/updatePageItem',
            payload: {
                pageKey, itemKey, itemValue
            }
        });
    }

    /*更改正在编辑的元素*/
    function changeActiveItem(itemKey) {
        dispatch({
            type: 'modulePageConfigFormModel/changeActiveItem',
            payload: {
                itemKey
            }
        });
    }

    /*改变模板基础属性*/
    function updateModuleProps(props) {
        dispatch({
            type: 'modulePageConfigFormModel/updateModuleProps',
            payload: {
                props
            }
        });
    }

    /*改变模板单页基础属性*/
    function updatePageProps(pageKey, props) {
        dispatch({
            type: 'modulePageConfigFormModel/updatePageProps',
            payload: {
                pageKey, props
            }
        });
    }

    /*删除页内元素*/
    function deletePageItem(pageKey, itemKey) {
        dispatch({
            type: 'modulePageConfigFormModel/deletePageItem',
            payload: {
                pageKey, itemKey
            }
        });
    }
    /*图层往上移*/
    function toPrevPageItem(pageKey, itemKey) {
        dispatch({
            type: 'modulePageConfigFormModel/toPrevPageItem',
            payload: {
                pageKey, itemKey
            }
        });
    }
    /*图层往下移*/
    function toNextPageItem(pageKey, itemKey) {
        dispatch({
            type: 'modulePageConfigFormModel/toNextPageItem',
            payload: {
                pageKey, itemKey
            }
        });
    }
    /*复制图层*/
    function copyPageItem(pageKey, itemKey) {
        dispatch({
            type: 'modulePageConfigFormModel/copyPageItem',
            payload: {
                pageKey, itemKey
            }
        });
    }

    /*复制页面*/
    function onCopyPage(fromIndex) {
        dispatch({
            type: 'modulePageConfigFormModel/onCopyPage',
            payload: {
                fromIndex,
            }
        });
    }

    /*编辑当前激活页面的激活元素*/
    function changeActivityItemProps(itemValue) {
        dispatch({
            type: 'modulePageConfigFormModel/changeActivityItemProps',
            payload: {
                itemValue
            }
        });
    }

    function changeMobileBorderColor(mobileBorderColor) {
        dispatch({
            type: 'modulePageConfigFormModel/updateState',
            payload: {
                mobileBorderColor
            }
        });
    }

    let componProps = {
        visible, loading, formData, onClose, onSubmit, mobileBorderColor,changeMobileBorderColor,
        moduleConfigData,currentPageKey,currentPageConfig,
        onCreatePage,onRemovePage,changeActivePage,updatePageItem,
        activeItemKey,changeActiveItem,
        onCopyPage,changeActivityItemProps,
        updateModuleProps, updatePageProps,deletePageItem,toPrevPageItem,toNextPageItem,copyPageItem,
    };
	
    return (
        <ActivityModuleBuildComponent {...componProps} />
    );

}

ModulePageConfigForm.propTypes = {
  dispatch: PropTypes.func,
  modulePageConfigFormModel: PropTypes.object,
};

function mapStateToProps({modulePageConfigFormModel}) {
  return {modulePageConfigFormModel};
}

export default connect(mapStateToProps)(ModulePageConfigForm);
