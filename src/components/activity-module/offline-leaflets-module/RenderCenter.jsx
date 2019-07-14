import React, {PropTypes} from 'react';
import Draggable from 'react-draggable';
import DraggableComponent from '../common-module/ResizeComponent';
import styles from './RenderCenter.less';

import { Radio } from 'antd';

function ContentComponent({

	funcChangeDraggableAxis,
	funcChangeConfig,
	funcChangeElement,
	funcChangeMode,			//更新正反
	attrDraggableAxis,		
	attrDeafaultValue,
	attrSelectElement,
	attrAllConfig,
	attrEditElementText,
	funcChangeEditElementText,

}) {
			
	//界面基础㤚（背景图片和背景颜色）
	let config = attrAllConfig&&attrAllConfig.mainConfig;
	
	//获取正反面
	let behindOrFront = attrAllConfig&&attrAllConfig.mainConfig.attrFrontAndBehind;

	//获取主界面配置
	let mainStyle = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.pageConfig : attrAllConfig.behindPageConfig.pageConfig;

	//处理横竖排班样式
	let pageLaoyoutStyle = config.attrDirection === 'vertical' ? { minWidth : '595px', minHeight : '798px', maxWidth : '595px', maxHeight : '798px' } : { minWidth : '798px', minHeight : '595px', maxWidth : '798px', maxHeight : '595px' };
	
	//处理横竖顶部距离
	let topStyle = config.attrDirection === 'vertical' ? { marginTop : '10px' } : { marginTop : '140px' }

	//改变正反面
	function changeMode(e) {	
		attrAllConfig.mainConfig.attrFrontAndBehind = e.target.value;
		funcChangeMode(attrAllConfig);
	}
		
	//拖拽属性
	let dragableProps = {
		funcChangeDraggableAxis,
		funcChangeConfig,
		funcChangeElement,
		attrDraggableAxis,		
		attrDeafaultValue,
		attrSelectElement,
		attrAllConfig,
		behindOrFront,
		attrEditElementText,
		funcChangeEditElementText,
	}
	
	return (
		<div style={pageLaoyoutStyle} className="contentArea">
			<div className={styles.tabsBase}>
				<Radio.Group onChange={changeMode} checked={true} defaultChecked={true} value={config.attrFrontAndBehind} defaultValue={config.attrFrontAndBehind} style={{ marginBottom: 8 }}>
					<Radio.Button value="front">正面</Radio.Button>
					<Radio.Button value="Behind">反面</Radio.Button>
				</Radio.Group>
			</div>

			<div id="content_box"
			 	 className={styles.contentBox} 
				 style={{
					...topStyle,
					...mainStyle,
					...pageLaoyoutStyle,
					backgroundImage : `url(${mainStyle.backgroundImage})`
				}}
			>
				<DraggableComponent {...dragableProps} />
			</div>
		</div>
    );
}

export default ContentComponent;
