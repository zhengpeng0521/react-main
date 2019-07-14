import React, {PropTypes} from 'react';
import ImageBarUpdate from '../module-building/module-toolbar/imageComponent/ImageBarUpdate';
import ColorSelect from '../../common/color-select/ColorSelect';
import TextComponent from './common-component/TextComponent';
import ImageComponent from './common-component/ImageComponent';
import EditElementParam from './common-component/EditElementComponent';

import styles from './RenderElement.less';
import { Icon, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

function ElementComponent({

	//本页属性
	attrAligntext,
	attrAllConfig,
	attrAlreadyAdd,
	attrSelectElement,
	attrElementLocation,
	attrSelectActivityKey,
	attrEditElementText,
	funcChangeParma,
	funcChangeElement,
	funcAddTextItem,
	funcChangeImageItem,
	funcChangeActivityKey,
	funcChangeSelectElement,
	funcChangeAligntext,
	funcChangeElementLocation,
	funcUploadImage,
	funcChangeAttrQrAlreadyAdd,
	funcChangeEditElementText,
	
}) {
	
	//获取正反面
	let behindOrFront = attrAllConfig.mainConfig.attrFrontAndBehind;

	//获取元素配置
	let itemConfig = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.itemConfig : attrAllConfig.behindPageConfig.itemConfig;
	
	//获取前后页面配置
	let pageConfig = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.pageConfig : attrAllConfig.behindPageConfig.pageConfig;

	//图片上传
	function handleBgImageChange(value) {		
		
		if(value.length > 0) {
			if(behindOrFront === 'front') {
				attrAllConfig.frontPageConfig.pageConfig.backgroundImage = value;
			} else {
				attrAllConfig.behindPageConfig.pageConfig.backgroundImage = value;
			}
		}  else {
			if(behindOrFront === 'front') {
				attrAllConfig.frontPageConfig.pageConfig.backgroundImage = '';
			} else {
				attrAllConfig.behindPageConfig.pageConfig.backgroundImage = '';
			}
		}
		funcChangeParma(attrAllConfig);
	}
	
	//边框颜色
	function changeBorderColor(value) {
				
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.pageConfig.backgroundColor = value;
		} else {
			attrAllConfig.behindPageConfig.pageConfig.backgroundColor = value;
		}
		funcChangeParma(attrAllConfig);
	}
	
	//改变选中状态
	function changeTabs(e) {
		funcChangeActivityKey(e);
		funcChangeElement(undefined);
	}
	
	let textAndImageProps = {
		attrAllConfig,
		attrSelectElement,
		behindOrFront,
		attrAligntext,
		attrElementLocation,
		attrAlreadyAdd,
		itemConfig,
		funcAddTextItem,
		funcChangeImageItem,
		funcUploadImage,
		funcChangeEditElementText,
		funcChangeAttrQrAlreadyAdd,
	}
	
	let editParam = {
		attrAligntext,
		attrAllConfig,
		attrSelectElement,
		attrElementLocation,
		funcChangeSelectElement,
		funcChangeAligntext,
		funcChangeElementLocation,
		funcChangeEditElementText,
		attrEditElementText,
	}
	
	let dafaultIndex = attrSelectElement&&attrSelectElement.item.type == 'text' ? '2' : attrSelectElement&&attrSelectElement.item.type == 'image' ? '3' : attrSelectElement&&attrSelectElement.item.type == 'qrImage' ? '4' : attrSelectActivityKey;
				
	return (
		<div className="layerComponent">
			<Tabs
			  defaultActiveKey="1"
			  activeKey={dafaultIndex}
			  tabPosition="left"
			  onChange={changeTabs}
			>
				<TabPane tab={<span><Icon type="mobile" /></span>} key="1">
					<div className={styles.boxTitle}>线下传单编辑工具-基础设置</div>
					<div className={styles.baseSetBox}>
						<div className={styles.pageSetLabel}>页面设置</div>
						<div className={styles.contentbox}>
							<div className={styles.textLabel}>背景颜色</div>
							<div className={styles.colorBox}>
								<ColorSelect width='150px' height='20px' value={pageConfig.backgroundColor} onChange={changeBorderColor} />
							</div>
						</div>
						<div className={styles.contentbox}>
							<div className={styles.textLabel}>背景图片</div>
							<div className={styles.imageBox}>
								<ImageBarUpdate  changeImage={handleBgImageChange} imgurl={pageConfig.backgroundImage.length > 0 ? pageConfig.backgroundImage : ''} />
							</div>
						</div>
					</div>
				</TabPane>
				
				<TabPane tab={<span><Icon type="file-text" /></span>} key="2">
					<div className={styles.boxTitle}>线下传单编辑工具-文本设置</div>
					{attrSelectElement != undefined ? <EditElementParam {...editParam} /> : <TextComponent {...textAndImageProps} />}
				</TabPane>
				
				<TabPane tab={<span><Icon type="picture" /></span>} key="3">
					<div className={styles.boxTitle}>线下传单编辑工具-图片设置</div>
					{attrSelectElement != undefined ? <EditElementParam {...editParam} /> : <ImageComponent {...textAndImageProps} attrObjType="image"/>}
				</TabPane>
				
				<TabPane tab={<span><Icon type="erweima" /></span>} key="4">
					<div className={styles.boxTitle}>线下传单编辑工具-二维码设置</div>
					{attrSelectElement != undefined ? <EditElementParam {...editParam} /> : <ImageComponent {...textAndImageProps} attrObjType="qrImage"/>}
				</TabPane>
				
			</Tabs>
		</div>
	)
}

export default ElementComponent;
