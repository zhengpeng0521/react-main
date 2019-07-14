import React, {PropTypes} from 'react';
import ColorSelect from '../../common/color-select/ColorSelect';
import styles from './RenderLayer.less';
import {Icon, message} from 'antd';

function LayerComponent({

	//本页属性
	attrAllConfig,			//所有属性
	attrAlreadyAdd,			//是否已经添加二维码
	funcChangeElementCopy,	//复制元素
	funcChangeElementDelect,//删除元素
	funcChangeBorderColor, 	//颜色选择
	funcChangeBleedingLine, //更新出血线
	funcChangeGridLine,		//更新网格线
	funcChangeElementVisibility, //显示隐藏
	funcChangeElementSort, //改变数组排序
	funcChangeAttrQrAlreadyAdd,  //更新属性
	
}) {

	let behindOrFront = attrAllConfig.mainConfig.attrFrontAndBehind;

	let pageConfig = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.pageConfig : attrAllConfig.behindPageConfig.pageConfig;	

	let itemConfig = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.itemConfig : attrAllConfig.behindPageConfig.itemConfig;	

	let auxiliaryStyle = attrAllConfig.mainConfig.attrDirection === 'vertical' ? { marginLeft: '50px', marginTop: '50px' } : { marginLeft: '50px', marginTop: '100px' }

	//改变边框颜色
	function changeBorderColor(value) {
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.pageConfig.borderColor = value;
		} else {
			attrAllConfig.behindPageConfig.pageConfig.borderColor = value;
		}
		funcChangeBorderColor(attrAllConfig);
	}
	
	//改变出血线显隐
	function changeBleedingLine() {
		attrAllConfig.mainConfig.attrShowBleedingLine = !attrAllConfig.mainConfig.attrShowBleedingLine;
		funcChangeBleedingLine(attrAllConfig);
	}
		
	//改变网格线显隐
	function changeGridLine() {
		attrAllConfig.mainConfig.attrShowGridLine = !attrAllConfig.mainConfig.attrShowGridLine;
		funcChangeGridLine(attrAllConfig);
	}
	
	//更新显隐
	function changeElementvisibility(value, index) {
		
		let newItem = itemConfig[index];
		
		newItem.item.visibility = !value;
		
		newItem.item.display = value ? 'none' : 'inline-block';
		
		newItem.item.select = false;
				
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig[index] = newItem;
		} else {
			attrAllConfig.behindPageConfig.itemConfig[index] = newItem;
		}		

		funcChangeElementVisibility(attrAllConfig);
	}
	
	//选中元素
	function changeSelectElement(index) {	
				
		let selectItem = undefined;
		itemConfig&&itemConfig.map((i, idx) => {
			if(index === idx) {
				selectItem = itemConfig[idx];
			   	itemConfig[idx].item.select = itemConfig[idx].item.visibility ? true : false;
			} else {
				itemConfig[idx].item.select = false;
			}
		})
						
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig = itemConfig;
		} else {
			attrAllConfig.behindPageConfig.itemConfig = itemConfig;
		}		

		funcChangeElementVisibility(attrAllConfig, selectItem);
	}
	
	//删除元素
	function changeDelectElement() {
		let selectIndex = undefined;
		itemConfig&&itemConfig.map((i, idx) => {			
			if(i.item.select) {	
			  	selectIndex = true;
			} 
		})
		
		if(selectIndex) {
			itemConfig&&itemConfig.map((i, idx) => {			
				if(i.item.select) {	
					itemConfig.splice(idx, 1);
					if(i.item.type === 'qrImage') {
						funcChangeAttrQrAlreadyAdd({attrAlreadyAdd : !attrAlreadyAdd})
					}
				} 
			})
		} else {
			return message.error('请选择元素')
		}
		
		//从新对元素索引进行排序
		itemConfig&&itemConfig.map((item, index) => {
			itemConfig[index].index = index;
		})
						
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig = itemConfig;
		} else {
			attrAllConfig.behindPageConfig.itemConfig = itemConfig;
		}	
		
		funcChangeElementDelect(attrAllConfig);		
	}
	
	//复制元素
	function changeCopyElement() {
		let selectItem = undefined;
		let copyElement = undefined;
		let selectIndex = undefined;
		let isCopyQrImage = false;
		let selectNum	= 0;
		itemConfig&&itemConfig.map((i, idx) => {
			if(i.item.select) {
				if(i.item.type !== 'qrImage') {
					selectNum++;
					  selectIndex = true;

					let newItem = JSON.parse(JSON.stringify(i.item));
					newItem.x = newItem.x + 10;
					newItem.y = newItem.y + 10;

					copyElement = {
						index 	: itemConfig.length,
						item 	: newItem,
						key 	: String(new Date().getTime()),
					};
					selectItem = copyElement;
					itemConfig[idx].item.select = false;
				} else {
					isCopyQrImage = true;
				}
			} 
		})

		if(isCopyQrImage) {
			return message.warning('只能添加一个二维码');
		}
		
		if(selectIndex) {
			if(selectNum > 1) {
				return message.error('只能选择一个元素')   
			}
			
			itemConfig.push(copyElement);						
			
			if(behindOrFront === 'front') {
				attrAllConfig.frontPageConfig.itemConfig = itemConfig;
			} else {
				attrAllConfig.behindPageConfig.itemConfig = itemConfig;
			}	
		} else {
			return message.error('请选择元素')
		}
			
		funcChangeElementCopy(attrAllConfig, selectItem);
	}

	function changeElementIndex(element, type) {
		let tempElement = JSON.parse(JSON.stringify(element));
		let newElement = undefined;
		let oldElement = undefined;
			
		if(type === 'topMove') {

			oldElement = itemConfig&&itemConfig[tempElement.index - 1];
			oldElement.index = tempElement.index;

			newElement = itemConfig&&itemConfig[tempElement.index];
			newElement.index = tempElement.index - 1;

			itemConfig.splice(element.index, 2);
			itemConfig.splice(element.index, 0, newElement, oldElement);

		} else {

			oldElement = itemConfig&&itemConfig[tempElement.index];
			oldElement.index = tempElement.index + 1;

			newElement = itemConfig&&itemConfig[tempElement.index + 1];
			newElement.index = tempElement.index;

			itemConfig.splice(tempElement.index, 2);
			itemConfig.splice(tempElement.index, 0, newElement, oldElement);
		}

		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig;
		} else {
			attrAllConfig.behindPageConfig.itemConfig;
		}
		funcChangeElementSort(attrAllConfig);

	}

	//元素上移
	function changeElementTopMove(element) {
		if(element.index) {
			changeElementIndex(element, 'topMove');
		}
	}

	//元素下移
	function changeElementButtomMove(element) {
		if(element.index != itemConfig.length - 1) {
			changeElementIndex(element, 'bottomMove');
		}
	}

	return (
		<div className="layerContent">
			<div className={styles.auxiliaryButton} style={auxiliaryStyle}>
				<ColorSelect width='50px' height='20px' value={pageConfig.borderColor} onChange={changeBorderColor} />
				<div className={attrAllConfig.mainConfig.attrShowBleedingLine ? styles.bleedingLineButton : styles.bleedingLineButtonF1F1F1} onClick={() => changeBleedingLine()}>出血线</div>
				<div className={attrAllConfig.mainConfig.attrShowGridLine ? styles.bleedingLineButton : styles.bleedingLineButtonF1F1F1} onClick={() => changeGridLine()}>网格线</div>
			</div>

			<div className={styles.itemHerder}>图层列表</div>
			<div className={styles.layerListBox}>
				{
					itemConfig&&itemConfig.map((item, index) => {
						let selectElementStyle = item&&item.item.select&&item.item.visibility ? styles.itemTextSelect : styles.itemText;
						let selectElementMoveTopStyle = item&&item.item.select&&item.item.visibility ? styles.itemTopMoveSelect : styles.topMove;
						let selectElementMoveBottomStyle = item&&item.item.select&&item.item.visibility ? styles.itemBottomSelect : styles.bottomMove;
						let iconStyle = item&&item.item.visibility ? styles.showIcon : styles.hiddenIcon;
						
						return  <div key={index} className={styles.itemBox} >
									<div className={styles.visibilityBox} onClick={() => changeElementvisibility(item&&item.item.visibility, index)}>
										<div className={iconStyle}></div>
									</div>
									<div className={selectElementStyle} onClick={() => changeSelectElement(index)}>
										{item&&item.item.type == 'image' ? '图片' : item&&item.item.type == 'qrImage' ? '二维码' : item&&item.item.value}
									</div>
									<div className={selectElementMoveTopStyle} onClick={() => changeElementTopMove(item&&item)}>{index != 0 ? <Icon type="shang" /> : ' '}</div>
									<div className={selectElementMoveBottomStyle} onClick={() => changeElementButtomMove(item&&item)}>{index != itemConfig.length - 1 ? <Icon type="xia" /> : ' '}</div>
								</div>
					})
				}
			</div>
			<div className={styles.itemFooter}>
			 	<Icon type="delete" title="删除元素" className={styles.delectIcon} onClick={() => changeDelectElement()} />
				<Icon type="copy" title="复制元素" className={styles.copyIcon} onClick={() => changeCopyElement()}  />
			</div>
		</div>
	)
}

export default LayerComponent;
