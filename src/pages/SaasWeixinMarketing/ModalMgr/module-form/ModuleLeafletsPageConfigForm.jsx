import React, { PropTypes } from 'react';
import { connect } from 'dva';
import LeafletsModuleBuildComponent from '../../../../components/activity-module/activity-module-build/LeafletsModuleBuildComponent';

function ModulePageConfigForm({dispatch, moduleLeafletsConfigFormModel}) {

    let {
		
        attrVisible,
		arrtLoading,
		attrDeafaultValue,
		attrDraggableAxis,
		attrAllConfig,
		attrSelectElement,
		attrSelectActivityKey,
		attrDefaultConfig,
		attrAligntext,
		attrElementLocation,
		attrEditElementText,
		attrAlreadyAdd,
		
    } = moduleLeafletsConfigFormModel;
	
	function dp(name, param) {
		dispatch({
			type : `moduleLeafletsConfigFormModel/${name}`,
			payload : {
				...param
			}
		})	
	}
	
	function funcHandleClose() {
		dp('updateState', {attrVisible : !attrVisible, attrSelectActivityKey : '1', attrSelectElement : undefined});
	}
	
	function funcHandSubmit () {
		//保存后修改为正面
		attrAllConfig.mainConfig.attrFrontAndBehind = 'front';
		dp('subitEditData', {attrAllConfig : attrAllConfig, attrVisible : !attrVisible, attrSelectElement : undefined});
	}

	function funcUpdateDraggableAxis(status) {
		dp('updateState', {attrDraggableAxis : status});
	}
	
	//更新选中的元素
	function funcUpdateElement(value) {
		dp('updateState', {attrSelectElement : value});
	}
	
	function funcUpdateMode(value) {
		dp('updateState', {attrAllConfig : value, attrSelectElement : undefined});
	}
	
	function funcUpdateBorderColor(value) {
		dp('updateState', {attrAllConfig : value});
	}
	
	function funcUpdateGridLine(value) {
		dp('updateState', {attrAllConfig : value});
	}
	
	function funcUpdateBleedingLine(value) {
		dp('updateState', {attrAllConfig : value});
	}
	
	function funcUpdateAllConfig(value) {
		dp('updateState', {attrAllConfig : value});
	}
	
	//更新配置属性
	function funcUpdateConfig(value) {
		dp('updateState', {attrAllConfig : value});
	}
	
	//自定义上传方法
	function funcUploadImage(value) {
		dp('uploadImage', {value : value});
	}
	
	function funcUpdateActivityKey(value) {
		dp('updateState', {attrSelectActivityKey : value});
	}
	
	//更新字体样式以及位置属性
	function funcUpdateAligntext(value) {
		dp('updateState', {attrAligntext : value});
	}
	
	//更新元素位置属性
	function funcUpdateElementLocation(value) {
		dp('updateState', {attrElementLocation : value});
	}
	
	function funcUpdateEditElementText(value) {
		dp('updateState', {...value});
	}

	function funcUpdateAttrQrAlreadyAdd(value) {
		dp('updateState', {...value});
	}
	
    let componProps = {
		funcHandSubmit,
		funcHandleClose,
		funcUpdateMode,
		funcUpdateDraggableAxis,
		funcUpdateBorderColor,
		funcUpdateBleedingLine,
		funcUpdateGridLine,
		funcUpdateAllConfig,
		funcUpdateElement,
		funcUpdateConfig,
		funcUploadImage,
		funcUpdateActivityKey,
		funcUpdateAligntext,
		funcUpdateElementLocation,
		funcUpdateEditElementText,
		funcUpdateAttrQrAlreadyAdd,
		arrtLoading,		
        attrVisible, 
		attrDeafaultValue,
		attrDraggableAxis,
		attrAllConfig,
		attrSelectElement,
		attrSelectActivityKey,
		attrAligntext,
		attrElementLocation,
		attrEditElementText,
		attrAlreadyAdd,
    };
	
    return (
         <LeafletsModuleBuildComponent {...componProps} />
    );

}

ModulePageConfigForm.propTypes = {
  	dispatch: PropTypes.func,
  	moduleLeafletsConfigFormModel: PropTypes.object,
};

function mapStateToProps({moduleLeafletsConfigFormModel}) {
  	return {moduleLeafletsConfigFormModel};
}

export default connect(mapStateToProps)(ModulePageConfigForm);
