/*
 *	attrDeafaultValue : {
 *		x : number,
 *		y : number,
 *		w : string,
 *		h : string,
 *	}
 *
 *	
 *	业务：更新处理和返回x值，y值， 宽，高
 */
import React, {PropTypes} from 'react';
import Draggable from 'react-draggable';
import styles from './ResizeComponent.less';
import {message} from 'antd';


function LeafletsModuleBuildComponent({

	funcChangeDraggableAxis,
	funcChangeElement,
	funcChangeEditElementText,
	funcChangeConfig,
	attrDeafaultValue,
	attrDraggableAxis,
	attrShowBleedingLine,
	attrAllConfig,
	attrSelectElement,
	behindOrFront,
	attrEditElementText,
	
}) {

	let config = attrAllConfig.mainConfig;
	
	//获取元素
	let itemArr = behindOrFront === 'front' ? attrAllConfig.frontPageConfig.itemConfig : attrAllConfig.behindPageConfig.itemConfig;
	
	//点击可拖拽元素
	function handleStart(e, data) {		
		e.preventDefault();
		funcChangeDraggableAxis('both');
	}
		
	//点击元素进行拖拽
	function handleDrag(e, data) {
		e.preventDefault();
		var value = {};
		if(attrDraggableAxis === 'none') {	
						
			//改变wh			
			var oldH = parseInt(attrSelectElement.item.h&&attrSelectElement.item.h.replace("px", ""));
			var oldW = parseInt(attrSelectElement.item.w&&attrSelectElement.item.w.replace("px", ""));

			value = {
				x : attrSelectElement.item.x,
				y : attrSelectElement.item.y,
				h : oldH + data.deltaY + 'px',
				w : oldW + data.deltaX + 'px',	
			}
			
		} else {
						
			//改变xy
			value = {
				x : data.x,
				y : data.y,
				h : attrSelectElement.item.h,
				w : attrSelectElement.item.w,	
			}
		}
		
		attrSelectElement.item.x = value.x;
		attrSelectElement.item.y = value.y;
		attrSelectElement.item.h = value.h;
		attrSelectElement.item.w = value.w;
							
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig[attrSelectElement.index] = attrSelectElement;			
		} else {
			attrAllConfig.behindPageConfig.itemConfig[attrSelectElement.index] = attrSelectElement;
		}
				
		funcChangeConfig(attrAllConfig);
	}

	//开始拉伸元素
	function resetDragablePamamValue(e) {
		e.preventDefault();
		funcChangeDraggableAxis('none');
	}
	
	//停止拉伸元素
	function onStopDraggable(e) {
		e.preventDefault();
	}

	//更新选中元素
	function selectElement(item) {		

		itemArr&&itemArr.map((i, idx) => {
			if(item.index === idx) {
			   	itemArr[idx].item.select = itemArr[idx].item.visibility ? true : false;
			} else {
				itemArr[idx].item.select = false;
			}
		})
						
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig = itemArr;
		} else {
			attrAllConfig.behindPageConfig.itemConfig = itemArr;
		}		
		
		funcChangeConfig(attrAllConfig);
		funcChangeElement(item);
	}

	//监听键盘事件
	window.onkeydown = function(e) {
        if(e.keyCode == 37) {
			attrSelectElement.item.x = attrSelectElement.item.x - 1;
 			funcChangeElement(attrSelectElement);
		} else if(e.keyCode == 38) {
			attrSelectElement.item.y = attrSelectElement.item.y - 1;
 			funcChangeElement(attrSelectElement);
		} else if(e.keyCode == 39) {
			attrSelectElement.item.x = attrSelectElement.item.x + 1;
 			funcChangeElement(attrSelectElement);
		} else if(e.keyCode == 40) {
			attrSelectElement.item.y = attrSelectElement.item.y + 1;
 			funcChangeElement(attrSelectElement);
		}
    }
		
	//监听拉伸按钮鼠标按下事件
	window.onmousedown = function(e) {
        //e.preventDefault();		
		if(e.target.className.indexOf("editableElement") != -1) {
			funcChangeDraggableAxis('none');
		}
		
		let isThrough = false;
		
		//判断元素是不是在编辑状态
		if(attrEditElementText) {
			// if(attrSelectElement&&attrSelectElement.item.orgSet) {
			// 	if(attrSelectElement.item.value.length > attrSelectElement.item.textMaxLength) {
			// 		let vue = attrSelectElement.item.value.substring(0, attrSelectElement.item.textMaxLength);
			// 		attrSelectElement.item.value = vue;
			// 		funcChangeEditElementText({attrEditElementText : false});
			// 		funcChangeElement(attrSelectElement);
			// 		isThrough = true;
			// 		return message.error(`最多${attrSelectElement.item.textMaxLength}个字`);
			// 	}
			// }
		} 
		
		if(isThrough) { return }
		
		if(e.target.className.indexOf('bleedingLine') != -1 || e.target.className.indexOf('contentBox') != -1 ||  e.target.className.indexOf('layerContent') != -1) {
		   	funcChangeElement(undefined);
		} 
    }
	
	let bleedingLaoyoutStyle = config&&config.attrDirection === 'vertical' ? { minWidth : '567px', minHeight : '770px', maxWidth : '567px', maxHeight : '770px' } : { minWidth : '770px', minHeight	: '567px', maxWidth : '770px', maxHeight : '567px' }	
	
	function styleDeal(item) {
		
		let newStyle = {};
			newStyle = {
				backgroundColor 	: item.backgroundColor,
				color 				: item.color,
				fontSize 			: item.fontSize,
				opacity 			: item.opacity,
				textAlign 			: item.textAlign,
				boxShadow			: `rgb(0, 0, 0) 0px 0px ${item.boxShadow}px`,
				transform			: `rotate(${item.rotate}deg)`,
				borderWidth 		: `${item.borderWidth}px`,
				borderRadius 		: `${item.borderRadius}${item.type === 'text' ? 'px' : '%'}`,
				borderColor			: item.borderColor,
				borderStyle 		: item.borderStyle,
				paddingTop			: item.paddingTop,
				paddingLeft			: item.paddingLeft,
				paddingRight		: item.paddingRight,
				paddingBottom		: item.paddingBottom,
				letterSpacing		: `${item.letterSpacing}px`,
				backgroundImage 	: item.backgroundImage.length > 0 ? `url(${item.backgroundImage})` : '',
				backgroundSize 		: item.backgroundSize,
				backgroundRepeat	: item.backgroundRepeat,
				backgroundPosition	: item.backgroundPosition,
				lineHeight			: item.lineHeight,
				justifyContent		: item.justifyContent,
				alignItems			: item.alignItems,
				display				: item.display,
				verticalAlign		: item.verticalAlign,
				textAlign			: item.textAlign,
				height 				: item.h,
				width 				: item.w,	
				display				: item.display,
				wordWrap			: item.wordWrap,	
				fontStyle			: item.fontStyle,
				textDecoration		: item.textDecoration,
				fontFamily			: item.fontFamily,
				lineHeight			: item.lineHeight + 'px',
				fontWeight			: item.fontWeight,
				whiteSpace			: item.whiteSpace,
				textShadow			: item.textShadow,
				webkitTextStroke 	: item.webkitTextStroke,
				writingMode			: item.writingMode,
			};
		
		return newStyle;
	}
	
	var H_LINE_Array	= [];
	var W_LINE_Array	= [];
	var H_LINE			= 0;
	var W_LINE			= 0;
	if(!!config.attrShowGridLine) {
		H_LINE = parseInt(bleedingLaoyoutStyle&&bleedingLaoyoutStyle.maxHeight.replace("px", ""));
		W_LINE = parseInt(bleedingLaoyoutStyle&&bleedingLaoyoutStyle.maxWidth.replace("px", ""));		
		H_LINE = Math.ceil(H_LINE + 10);
		W_LINE = Math.ceil(W_LINE + 10);
		
		for(let i = 0; i < W_LINE / 10; i++) {
			H_LINE_Array.push(i * 10);
		}

		for(let i = 0; i < H_LINE / 10; i++) {
			W_LINE_Array.push(i * 10);
		}
	}

	var borderHeight = parseInt(attrSelectElement&&attrSelectElement.item.h&&attrSelectElement.item.h.replace("px", ""));
	var borderWidth = parseInt(attrSelectElement&&attrSelectElement.item.w&&attrSelectElement.item.w.replace("px", ""));
		
	return (
		<div>
			{!!config.attrShowGridLine ? 
				<div className={styles.bleedingLine}>
					{
						H_LINE_Array&&H_LINE_Array.map((i, idx) => {
							return <div key={idx} style={{width : '1px', height : H_LINE - 10, backgroundColor : '#dcdcdc', position : 'absolute', left : i + 'px'}}></div>
						})
					}
				</div> 	
				: ''
			}
			{!!config.attrShowGridLine ? 
				<div className={styles.bleedingLine}>
					{
						W_LINE_Array&&W_LINE_Array.map((i, idx) => {
							return <div key={idx} style={{width : W_LINE - 6, height : '1px', backgroundColor : '#dcdcdc', position : 'absolute', top : i + 'px'}}></div>
						})
					}
				</div> 	
				: ''
			}
			{!!config.attrShowBleedingLine ? <div className={styles.bleedingLine} style={bleedingLaoyoutStyle}></div> : ''}
			{
				itemArr&&itemArr.map((item, index) => {
					if(item != undefined && item != null) {
						let newStyles = styleDeal(item.item);						
						if(String(index) == String(attrSelectElement&&attrSelectElement.index)) {
				
							return	<Draggable
										key={index}
										axis={attrDraggableAxis}
										defaultPosition={{x: item.item.x, y: item.item.y}}
										position={{x: item.item.x, y: item.item.y}}
										grid={[10, 10]}
										onDrag={handleDrag}
										onStart={handleStart}
									>
										<div style={{
												width : item.item.w || undefined, 
												height : item.item.h || undefined,
												display : item.item.display == 'none' ? item.item.display : 'inline-block',
												zIndex : 1000 + item.index,
												position : 'absolute',
											}}>
											<div className={styles.contentDivSelectBoxBorder} 
													style={{
														height : borderHeight + 2 + 'px',
														width : borderWidth + 2 + 'px',
													}}>
												<div className={styles.contentDivSelect} style={newStyles}>
													<pre style={{whiteSpace : item.item.whiteSpace || 'normal', fontFamily : item.item.fontFamily}}>{item.item.value || ''}</pre>
												</div>
											</div>
											{
												attrSelectElement != undefined ? 
													<div className="editableElement"
														style={{
															height 	: '10px', 
															width 	: '10px', 
															float	: 'right',
															borderRadius: '50%',
															border	: '1px black solid',
															right	: '-10px',
															position: 'relative',
															display : item.item.display,
														}} onMouseDown={resetDragablePamamValue}>
															<div className={styles.originPointLine}></div>
													</div>
												: ''
											}
										</div>
									</Draggable>

						} else {
							return <div key={index} 
										style={{
											width : item.item.w || undefined,
											height : item.item.h || undefined, 
											position: 'absolute',
											top : item.item.y + 'px',
											left : item.item.x + 'px',
											display : item.item.display == 'none' ? item.item.display : 'inline-block',
											zIndex : 1000 + item.index,
										}} onMouseDown={() => selectElement(item)}>
										<div className={styles.contentDivNoSelectBoxBorder}>
											<div className={styles.contentDiv} style={newStyles}>
												<pre style={{whiteSpace : item.item.whiteSpace || 'normal', fontFamily : item.item.fontFamily}}>{item.item.value || ''}</pre>
											</div>
										</div>
									</div>
						}
					}					
				})
			}
		</div>
    );
}

export default LeafletsModuleBuildComponent;