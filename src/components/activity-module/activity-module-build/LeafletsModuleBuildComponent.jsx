import React, {PropTypes} from 'react';
import styles from './ActivityModuleBuildComponent.less';
import PageModal from '../../common/page-modal/PageModal';
import ModuleCenterContent from '../offline-leaflets-module/RenderCenter';
import ModuleLayerContent from '../offline-leaflets-module/RenderLayer';
import ModuleElementContent from '../offline-leaflets-module/RenderElement';

import {Button} from 'antd';
import ModuleLayerContent123 from '../offline-leaflets-module/RenderLayer123';
function LeafletsModuleBuildComponent({
	
    attrVisible, 
	arrtLoading,
	attrDeafaultValue,
	attrDraggableAxis,
	attrAllConfig,
	attrAligntext,
	attrAlreadyAdd,
	attrElementLocation,
	attrSelectActivityKey,
	attrSelectElement,
	attrEditElementText,
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
	
}) {
	
	function funcChangeDraggableAxis(status) {
		funcUpdateDraggableAxis(status);
	}
	
	function funcChangeMode(value) {
		funcUpdateMode(value);
	}
	
	function funcChangeBorderColor(value) {
		funcUpdateBorderColor(value);
	}
	
	function funcChangeGridLine(value) {
		funcUpdateGridLine(value);
	}
	
	function funcChangeBleedingLine(value) {
		funcUpdateBleedingLine(value);
	}
	
	//更新界面配置属性
	function funcChangeParma(value) {
		funcUpdateAllConfig(value);
	}

	//字体元素添加
	function funcAddTextItem(value) {
		funcUpdateAllConfig(value);
	}
	
	//图片元素添加
	function funcChangeImageItem(value) {
		funcUpdateAllConfig(value);
	}
	
	function funcChangeElement(value) {
		funcUpdateElement(value);
	}
	
	//更新配置属性
	function funcChangeConfig(value) {
		funcUpdateConfig(value);
	}
	
	function funcChangeSelectElement(value) {
		funcUpdateConfig(value);
	}
	
	function funcChangeElementVisibility(value, selectElement) {
		funcUpdateConfig(value);
		funcUpdateElement(selectElement);
	}
	
	function funcChangeElementCopy(value, selectElement) {		
		funcUpdateConfig(value);
		funcUpdateElement(selectElement);
	}
	
	function funcChangeElementDelect(value) {
		funcUpdateConfig(value);
		funcUpdateElement(undefined);
	}
	
	function funcChangeActivityKey(e) {
		funcUpdateActivityKey(e);
	}
	
	function funcChangeAligntext(value) {
		funcUpdateAligntext(value);
	}
	
	function funcChangeElementLocation(value) {
		funcUpdateElementLocation(value);
	}
	
	function funcChangeElementSort(value) {
		funcUpdateAllConfig(value);
	}
	
	function funcChangeEditElementText(value) {
		funcUpdateEditElementText(value);
	}

	function funcChangeAttrQrAlreadyAdd(value) {
		funcUpdateAttrQrAlreadyAdd(value);
	}

	//拖拽属性
	let centerProps = {
		funcChangeDraggableAxis,
		funcChangeBorderColor,
		funcChangeConfig,
		funcChangeMode,
		funcChangeElement,
		funcChangeEditElementText,
		funcChangeBleedingLine,		
		attrDraggableAxis,		
		attrDeafaultValue,
		attrAllConfig,
		attrSelectElement,
		attrEditElementText,
	}
	
	//图层属性
	let layerProps = {
		attrAllConfig,
		attrAlreadyAdd,
		attrSelectElement,
		attrEditElementText,
		funcChangeElementCopy,
		funcChangeElementDelect,
		funcChangeBorderColor,
		funcChangeGridLine,
		funcChangeBleedingLine,
		funcChangeElementVisibility,
		funcChangeElementSort,
		funcChangeParma,
		funcChangeAttrQrAlreadyAdd,
	}
	
	//元素属性
	let elementProps = {
		attrAlreadyAdd,
		attrAligntext,
		attrAllConfig,
		attrElementLocation,
		attrSelectElement,
		attrEditElementText,
		attrSelectActivityKey,
		funcChangeParma,
		funcAddTextItem,
		funcChangeImageItem,
		funcUploadImage,
		funcChangeElement,
		funcChangeSelectElement,
		funcChangeElementLocation,
		funcChangeAligntext,
		funcChangeActivityKey, 
		funcChangeEditElementText,
		funcChangeAttrQrAlreadyAdd,
	}
     
	let behindOrFront = attrAllConfig.mainConfig.attrFrontAndBehind;

	let itemConfig = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.itemConfig : attrAllConfig.behindPageConfig.itemConfig;	
	
	function funcNewElementLocation(value) {
				
		let tempArr = [];
		let newElementIndex = undefined;
		let newElement = undefined;
				
		itemConfig&&itemConfig.map((item, index) => {

			if(value.text == item.key) {
			   //提取拖动的元素
				newElementIndex = index;
				newElement		= item;
			}
		})
		
		itemConfig.splice(newElementIndex, 1);
		itemConfig.splice(value.index, 0, newElement);

		if(behindOrFront === 'front') {
		   	attrAllConfig.frontPageConfig.itemConfig;
		} else {
			attrAllConfig.behindPageConfig.itemConfig;	
		}
		funcUpdateConfig(attrAllConfig);
	}
	
	function funcChangeElementVisbisilety(value, index) {

		let newItem = itemConfig[index];
		
		newItem.item.visibility = !value;
		
		newItem.item.display = value ? 'none' : 'inline-block';
		
		newItem.item.select = false;
				
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig[index] = newItem;
		} else {
			attrAllConfig.behindPageConfig.itemConfig[index] = newItem;
		}		

		funcUpdateConfig(attrAllConfig);
	}
	
    return (
        <PageModal
           visible={attrVisible}
           maskClosable={false}
           title="自定义线下传单"
           width="calc(100vw - 240px)"
           onClose={funcHandleClose}
	       footer={[
				{msg: '确定要提交吗?', handle: funcHandSubmit, component: (<Button type="primary" loading={arrtLoading}>提交</Button>)},
                {msg: '确定要关闭吗?', handle: funcHandleClose, component: (<Button type="ghost">关闭</Button>)},
           ]}
        >
			<div className={styles.activity_module_build_page_cont}>
				<div className={styles.activity_module_build_page_content} style={{width: 'calc(100% - 20px)', height : '100%'}}>
					<ModuleCenterContent {...centerProps} />
					<ModuleLayerContent {...layerProps} />
					<ModuleElementContent {...elementProps} />
				</div>
			</div>
        </PageModal>
    );
}

export default LeafletsModuleBuildComponent;
					
//					{itemConfig&&itemConfig.length > 0 ? 
//						<ModuleLayerContent123 {...layerProps} 
//							cords={itemConfig}
//					 		funcNewElementLocation={funcNewElementLocation} 
//					 		funcChangeElementVisbisilety={funcChangeElementVisbisilety} 
//					 	/> : ''
//					}
