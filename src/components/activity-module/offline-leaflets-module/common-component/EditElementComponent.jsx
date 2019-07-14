import React, {PropTypes} from 'react';
import styles from './EditElementComponent.less';
import ColorSelect from '../../../common/color-select/ColorSelect';
import { Collapse, Slider, InputNumber, Row, Col, Select, Input, Checkbox, Icon, message, Switch} from 'antd';
import ImageBarUpdate from '../../module-building/module-toolbar/imageComponent/ImageBarUpdate';
import {basePxFunction, baseTextPxFunction, baseTextSadowBlurPxFunction, baseTextStrokePxArrFunction} from './CommonParam.jsx';
import ImageComponent from './ImageComponent';

const Panel = Collapse.Panel;
const Option = Select.Option;
const { TextArea } = Input;

function TextComponent({
	
	attrAllConfig,
	attrSelectElement,
	attrAligntext,
	attrElementLocation,
	funcChangeSelectElement,
	funcChangeAligntext,
	funcChangeElementLocation,
	funcChangeEditElementText,
	attrEditElementText,
	
}) {

	let fontFamily = [
		{key : '微软雅黑', value : 'Microsoft YaHei'},
	  	{key : '华文宋体', value : 'STSong'},
	  	{key : '华文楷体', value : 'STKaiti'},
	  	{key : '华文黑体', value : 'STHeiti'},
	  	{key : '新宋体', value : 'NSimSun'},
	  	{key : '宋体', value : 'SimSun'},
	  	{key : '仿宋', value : 'FangSong'},
	  	{key : '黑体', value : 'SimHei'},
	  	{key : '楷体', value : 'KaiTi'},
		{key : '草书', value : 'cursive'},
		{key : '等宽', value : 'monospace'},
		{key : '幻想', value : 'fantasy'},
		{key : '无衬线', value : 'sans-serif'},
		{key : '衬线', value : 'serif'},
		{key : '象形', value : 'pictograph'},
		{key : '酷黑', value : 'saasfont_font6'},	
		{key : '快乐体2016', value : 'saasfont_font7'},
	];
		
	let behindOrFront = attrAllConfig.mainConfig.attrFrontAndBehind;
	
	let selectTextAlginArr = attrSelectElement&&attrSelectElement.item.selectTextAlign&&attrSelectElement.item.selectTextAlign.split(',') || ["false", "false", "false", "false", "false", "false", "false", "false", "false"];
		
	function generalValue(value) {
					
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig[attrSelectElement.index] = value;
		} else {
			attrAllConfig.behindPageConfig.itemConfig[attrSelectElement.index] = value;
		}		
		funcChangeSelectElement(attrAllConfig);
	}

	function baseOpacityParamonChange(value) {
		attrSelectElement.item.opacity = value;
		generalValue(attrSelectElement);
	}
	
	function baseRotateParamonChange(value) {
		attrSelectElement.item.rotate = value;
		generalValue(attrSelectElement);
	}
	
	function baseBoxShadowParamonChange(value) {
		attrSelectElement.item.boxShadow = value;
		generalValue(attrSelectElement);
	}
	
	function baseBorderWidthParamonChange(value) {
		attrSelectElement.item.borderWidth = value;
		generalValue(attrSelectElement);
	}
	
	function baseBorderRadiusParamonChange(value) {
		attrSelectElement.item.borderRadius = value;
		generalValue(attrSelectElement);
	}
	
	function baseBorderColorParamonChange(value) {
		attrSelectElement.item.borderColor = value;
		generalValue(attrSelectElement);
	}
	
	function baseBorderStyleParamonChange(value) {
		attrSelectElement.item.borderStyle = value;
		generalValue(attrSelectElement);
	}
	
	function basePaddingTopSpacingParamonChange(value) {
		attrSelectElement.item.paddingTop = value;
		generalValue(attrSelectElement);
	}
		
	function basePaddingLeftSpacingParamonChange(value) {
		attrSelectElement.item.paddingLeft = value;
		generalValue(attrSelectElement);
	}
		
	function basePaddingRightSpacingParamonChange(value) {
		attrSelectElement.item.paddingRight = value;
		generalValue(attrSelectElement);
	}
		
	function basePaddingBottomSpacingParamonChange(value) {
		attrSelectElement.item.paddingBottom = value;
		generalValue(attrSelectElement);
	}
	
	var elementH = parseInt(attrSelectElement.item.h&&attrSelectElement.item.h.replace("px", ""));
	
	var elementW = parseInt(attrSelectElement.item.w&&attrSelectElement.item.w.replace("px", ""));
	
	var elementFontSize = parseInt(attrSelectElement.item.fontSize&&attrSelectElement.item.fontSize.replace("px", ""));
		
	function alignParmaChange(value) {

		var totalWidth	= 0;
		var totalHeight = 0;
				
		if(attrAllConfig.mainConfig.attrDirection === 'vertical') {
			totalWidth 	= 583;
			totalHeight = 786;
		} else {
			totalWidth	= 786;
			totalHeight = 583;
		}		
		
		function changeStatus(indexArr, value) {
			indexArr.map((item, index) => {
				if(value == item) {
					attrElementLocation[item].selectStatus = true;
				} else {	
					attrElementLocation[item].selectStatus = false;
				}
			})
		}
		
		if(value <= 2) {
		   	changeStatus([0,1,2], value);
		} else if(value <= 5 && value >= 3) {
			changeStatus([3,4,5], value);
		} 
		
		switch(value) {
			case 0 :
				attrSelectElement.item.y = 0;
				break;
			case 1 :
				attrSelectElement.item.y = totalHeight / 2 - elementH / 2;
				break;
			case 2 :
				attrSelectElement.item.y = totalHeight - elementH;
				break;
			case 3 :
				attrSelectElement.item.x = 0;
				break;
			case 4 :
				attrSelectElement.item.x = totalWidth / 2 - elementW / 2;
				break;
			case 5 :
				attrSelectElement.item.x = totalWidth - elementW;
				break;
			default :
				break;
		}
		
		let elementLocationStatusArr = [];
		attrElementLocation&&attrElementLocation.map((item, index) => {
			if(item.selectStatus) {
				elementLocationStatusArr.push(index);
			}
		})
		attrSelectElement.item.selectElementStatus = elementLocationStatusArr.join(',');
		funcChangeElementLocation(attrElementLocation);
		generalValue(attrSelectElement);
	}

	function baseWidthParamonChange(value) {
		attrSelectElement.item.w = value + 'px';
		generalValue(attrSelectElement);
	}
	
	function baseHeightParamonChange(value) {
		attrSelectElement.item.h = value + 'px';
		generalValue(attrSelectElement);
	}
	
	function baseTopOrBottomParamonChange(value) {
		attrSelectElement.item.y = value;
		generalValue(attrSelectElement);
	}
	
	function baseLeftOrRightParamonChange(value) {
		attrSelectElement.item.x = value;
		generalValue(attrSelectElement);
	}
	
	function baseTextSpacingParamonChange(value) {
		attrSelectElement.item.letterSpacing = value;
		generalValue(attrSelectElement);
	}
	
	function baseBackgroundColorParamonChange(value) {
		attrSelectElement.item.backgroundColor = value;
		generalValue(attrSelectElement);
	}
	
	function baseBackgroundImageParamonChange(value) {
		attrSelectElement.item.backgroundImage = value;
		generalValue(attrSelectElement);
	}
	
	function baseTextColorParamonChange(value) {
		attrSelectElement.item.color = value;
		generalValue(attrSelectElement);
	}
	
	function baseTextPxParamonChange(value) {
		// var elementLineHeight = attrSelectElement.item.lineHeight;
		var elementFontSize = parseInt(value.replace("px", ""));

		// if( typeof(elementLineHeight) === 'string') {
		// 	elementLineHeight = parseInt(attrSelectElement.item.lineHeight.replace("px", ""));
		// }

		// // if(elementLineHeight <= elementFontSize) {
		// 	// 	attrSelectElement.item.lineHeight = elementFontSize;
		// 	// }

		attrSelectElement.item.lineHeight = elementFontSize;
		attrSelectElement.item.fontSize = value;
		generalValue(attrSelectElement);
	}

	function baseTextShadowColorParamonChange(value) {
		attrSelectElement.item.textShadowColor = value;
		attrSelectElement.item.textShadow = `${attrSelectElement.item.textShadowH} ${attrSelectElement.item.textShadowV} ${attrSelectElement.item.textShadowFuzzyDeg} ${value}`;
		generalValue(attrSelectElement);
	}

	function baseTextShadowPxFuzzyDegParamonChange(value) {
		attrSelectElement.item.textShadowFuzzyDeg = value;
		attrSelectElement.item.textShadow = `${attrSelectElement.item.textShadowH} ${attrSelectElement.item.textShadowV} ${value} ${attrSelectElement.item.textShadowColor}`;
		generalValue(attrSelectElement);
	}

	function baseTextShadowPxHParamonChange(value) {
		attrSelectElement.item.textShadowH = value;
		attrSelectElement.item.textShadow = `${value} ${attrSelectElement.item.textShadowV} ${attrSelectElement.item.textShadowFuzzyDeg} ${attrSelectElement.item.textShadowColor}`;
		generalValue(attrSelectElement);
	}

	function baseTextShadowPxVParamonChange(value) {
		attrSelectElement.item.textShadowV = value;
		attrSelectElement.item.textShadow = `${attrSelectElement.item.textShadowH} ${value} ${attrSelectElement.item.textShadowFuzzyDeg} ${attrSelectElement.item.textShadowColor}`;
		generalValue(attrSelectElement);
	}

	// function baseTextStrokeColorParamonChange(value) {
	// 	attrSelectElement.item.webkitTextStrokeColor = value;
	// 	attrSelectElement.item.webkitTextStroke = `${attrSelectElement.item.webkitTextStrokePx} ${value}`;
	// 	generalValue(attrSelectElement);
	// }

	// function baseTextStrokePxParamonChange(value) {
	// 	attrSelectElement.item.webkitTextStrokePx = value;
	// 	attrSelectElement.item.webkitTextStrokeWaiPx = '0px';
	// 	attrSelectElement.item.textShadow = `0px 0px 0px ${attrSelectElement.item.webkitTextStrokeColor}`;
	// 	attrSelectElement.item.webkitTextStroke = `${value} ${attrSelectElement.item.webkitTextStrokeColor}`;
	// 	generalValue(attrSelectElement);
	// }

	// function baseTextStrokePxWaiParamonChange(value) {
	// 	attrSelectElement.item.textShadow = `${attrSelectElement.item.webkitTextStrokeColor} 1px 0 0, ${attrSelectElement.item.webkitTextStrokeColor} 0 1px 0, ${attrSelectElement.item.webkitTextStrokeColor} -1px 0 0,${attrSelectElement.item.webkitTextStrokeColor} 0 -1px 0`;
	// 	attrSelectElement.item.webkitTextStrokePx = '0px';
	// 	attrSelectElement.item.webkitTextStrokeWaiPx = value;
	// 	generalValue(attrSelectElement);
	// }
	
	function baseTextParamonChange(e) {		
		attrSelectElement.item.value = e.target.value;
		funcChangeEditElementText({attrEditElementText : true});
		generalValue(attrSelectElement);
	}
	
	function baseTextParamonBlurChange(e) {
		
		if(attrSelectElement.item.orgSet) {
			// if(e.target.value.length > attrSelectElement.item.textMaxLength) {
			// 	let vue = e.target.value.substring(0, attrSelectElement.item.textMaxLength);
			// 	attrSelectElement.item.value = vue;
			// 	generalValue(attrSelectElement);
			// 	funcChangeEditElementText({attrEditElementText : false});
			// 	return message.error(`最多${attrSelectElement.item.textMaxLength}个字`);
			// }
		} else {
			attrSelectElement.item.value = e.target.value;
			generalValue(attrSelectElement);
		}
	}
	
	function baseOrgSetParamonChange(value) {
		attrSelectElement.item.orgSet = value.target.checked;
		generalValue(attrSelectElement);
	}
	
	function textAlignParmaChange(value) {
				
		var elementH = parseInt(attrSelectElement.item.h&&attrSelectElement.item.h.replace("px", ""));
		var elementW = parseInt(attrSelectElement.item.w&&attrSelectElement.item.w.replace("px", ""));
		
		function delectParam() {
			delete attrSelectElement.item.display;
			delete attrSelectElement.item.justifyContent;
			delete attrSelectElement.item.alignItems;	
		}
			
		function changeStatus(indexArr, value) {
			indexArr.map((item, index) => {
				if(value == item) {
					if(value >= 6 && value <= 8) {
						selectTextAlginArr[value] = selectTextAlginArr[value] == 'true' ? 'false' : 'true';
					} else {
						selectTextAlginArr[value] = 'true';
					}
				} else {
					if(value >= 6 && value <= 8) {
						selectTextAlginArr[item] = selectTextAlginArr[item];
					} else {
						selectTextAlginArr[item] = 'false';
					}
				}
			})
		}
		
		if(value <= 2) {
		   	changeStatus([0,1,2], value);
		} else if(value <= 5 && value >= 3) {
			changeStatus([3,4,5], value);
		} else if(value <= 8 && value >= 6) {	
			changeStatus([6,7,8], value);
		}
		
		switch(value) {
			case 0 :
				delectParam();
				break;
			case 1 :
				attrSelectElement.item.display = 'flex';
				attrSelectElement.item.justifyContent = attrSelectElement.item.textAlign === 'left' ? 'start' : attrSelectElement.item.textAlign === 'right' ? 'flex-end' : 'center';
				attrSelectElement.item.alignItems = 'center';
				break;
			case 2 :
				attrSelectElement.item.display = 'table-cell';
				attrSelectElement.item.verticalAlign = 'bottom';
				break;
			case 3 :
				attrSelectElement.item.textAlign = 'left';
				attrSelectElement.item.justifyContent = attrSelectElement.item.textAlign === 'left' ? 'start' : attrSelectElement.item.textAlign === 'right' ? 'flex-end' : 'center';
				break;
			case 4 :
				attrSelectElement.item.textAlign = 'center';
				attrSelectElement.item.justifyContent = attrSelectElement.item.textAlign === 'left' ? 'start' : attrSelectElement.item.textAlign === 'right' ? 'flex-end' : 'center';
				break;
			case 5 :
				attrSelectElement.item.textAlign = 'right';
				attrSelectElement.item.justifyContent = attrSelectElement.item.textAlign === 'left' ? 'start' : attrSelectElement.item.textAlign === 'right' ? 'flex-end' : 'center';
				break;
			case 6 :
				attrSelectElement.item.fontWeight = attrSelectElement.item.fontWeight == 'bold' ? '' : 'bold';
				break;
			case 7 :
				attrSelectElement.item.fontStyle = attrSelectElement.item.fontStyle == 'oblique' ? '' : 'oblique';
				break;
			case 8 :
				attrSelectElement.item.textDecoration = attrSelectElement.item.textDecoration == 'underline' ? '' : 'underline';
				break;
			default :
				break;
		}
		
		attrSelectElement.item.selectTextAlign = selectTextAlginArr.join(',');
		funcChangeAligntext(attrAligntext);
		generalValue(attrSelectElement);
	}
		
	function baseFontFamilyParamChange(value) {
		attrSelectElement.item.fontFamily = value;
		generalValue(attrSelectElement);
	}
	
	function baseFontLineHeightParamonChange(value) {

		var originFontSize = parseFloat(attrSelectElement.item.fontSize&&attrSelectElement.item.fontSize.replace("px", ""));

		var newValue = originFontSize * value;

		newValue = newValue.toFixed(1);

		attrSelectElement.item.lineHeight = newValue;

		generalValue(attrSelectElement);
	}
	
	function baseTextMaxParamonChange(value) {
		//attrSelectElement.item.textMaxLength = value;
		//generalValue(attrSelectElement);
	}
	
	//横版竖版
	function onTextTypographyTBChange(e) {
		attrSelectElement.item.writingMode = e ? 'horizontal-tb' : 'vertical-lr';
		generalValue(attrSelectElement);
	}

	//左侧右侧
	function onTextTypographyLRChange(e) {
		attrSelectElement.item.writingMode = e ? 'vertical-lr' : 'vertical-rl';
		generalValue(attrSelectElement);
	}

	let pxArr = basePxFunction();
	let textShowPxArr = baseTextPxFunction();
	let textShowBlurPxArr = baseTextSadowBlurPxFunction();
	let webkitTextStrokePxArr = baseTextStrokePxArrFunction();
	
	let imageProps = {
		attrSelectElement,
	}

	function setExclusiveParam() {
		
		let gereralQrImageOrImage = (
			  <Panel header={'特有属性'} key="4">
				<div className={styles.imageBox} style={{backgroundImage : 'url(' + attrSelectElement.item.backgroundImage + ')'}}>
					{/*<ImageComponent {...imageProps} />*/}
				</div>
				<div className={styles.editElementParamLabel}>圆角</div>
				<Row>
					<Col span={12}>
						<Slider min={0} max={100} onChange={baseBorderRadiusParamonChange} value={attrSelectElement.item.borderRadius || 0} step={1} />
					</Col>
					<Col>
						<InputNumber
							style={{ marginLeft: 16 }}
							min={0}
							step={1}
							value={attrSelectElement.item.borderRadius}
							onChange={baseBorderRadiusParamonChange}
						  />
					</Col>
				</Row>
			</Panel>							
		)
		
		//获取lineHeight
		var stringLinHeight = attrSelectElement.item.lineHeight&&attrSelectElement.item.lineHeight / elementFontSize;
		stringLinHeight = stringLinHeight&&stringLinHeight.toFixed(1);

		switch(attrSelectElement.item.type) {
			case 'text' :			
				return  <Panel header={'特有属性'} key="4">
							<Row style={{marginTop : '10px'}}>
								<div className={styles.editElementParamLabel}>文字间距</div>
								<Col>
									<InputNumber
										style={{ marginLeft: 16, width: 240, marginTop: 3 }}
										min={0}
										step={0.1}
										value={attrSelectElement.item.letterSpacing || 0}
										onChange={baseTextSpacingParamonChange}
								  	/>
								</Col>
							</Row>
							<div className={styles.exclusiveEditElementParamLabel}>背景颜色</div>
							<Row style={{marginTop : '10px'}}>
								<Col span={12}>
									<ColorSelect width='228px' height='20px' value={attrSelectElement.item.backgroundColor} onChange={baseBackgroundColorParamonChange} />
								</Col>
							</Row>
							<div className={styles.exclusiveEditElementParamLabel}>背景图片</div>
							<Row style={{marginTop : '10px'}}>
								<Col span={12}>
									<ImageBarUpdate changeImage={baseBackgroundImageParamonChange} imgurl={attrSelectElement.item.backgroundImage || ''} />
								</Col>
							</Row>
							<div className={styles.exclusiveEditElementParamLabel}>字体颜色</div>
							<Row style={{marginTop : '10px'}}>
								<Col span={5}>
									<ColorSelect width='62px' height='20px' value={attrSelectElement.item.color} onChange={baseTextColorParamonChange} />
								</Col>
								<Col>
									<Select defaultValue={attrSelectElement.item.fontSize} value={attrSelectElement.item.fontSize} style={{ width: 74, marginRight : '10px', marginLeft: '16px' }} onChange={baseTextPxParamonChange}>
								  		{pxArr&&pxArr.map(index => <Option key={index} value={index}>{index}</Option>)}
									</Select>
									<Select defaultValue={stringLinHeight + '倍' || attrSelectElement.item.fontSize}
						  					value={stringLinHeight + '倍' || attrSelectElement.item.fontSize}
						  					style={{ width: 74, marginRight : '10px' }}
						  					onChange={baseFontLineHeightParamonChange}>
							  			{
											styleLinHeight&&styleLinHeight.map((item, index) => {
												return <Option key={index} value={item.value}>{item.key + '倍'}</Option>
											})
										
										}
									</Select>
								</Col>
							</Row>
							<div className={styles.exclusiveEditElementParamLabel}>阴影颜色</div>
							<Row style={{marginTop : '10px'}}>
								<Col span={5}>
									<ColorSelect width='230px' height='20px' value={attrSelectElement.item.textShadowColor} onChange={baseTextShadowColorParamonChange} />
								</Col>
							</Row>
							<div className={styles.exclusiveEditElementParamLabel}>阴影设置</div>
							<Row style={{marginTop : '10px'}}>
								<Col>
									<Select
						  		 		defaultValue={attrSelectElement.item.textShadowH|| '0px'}
							  		 	value={attrSelectElement.item.textShadowH || '0px'}
							  		  	style={{ width: 74, marginRight : '5px', marginLeft: '0px' }}
							  		  	onChange={baseTextShadowPxHParamonChange}>
								  		{textShowPxArr&&textShowPxArr.map(index => <Option key={index} value={index}>{index}</Option>)}
									</Select>
									<Select
						  		 		defaultValue={attrSelectElement.item.textShadowV || '0px'}
							  		 	value={attrSelectElement.item.textShadowV || '0px'}
							  		  	style={{ width: 74, marginRight : '5px', marginLeft: '4px' }}
							  		  	onChange={baseTextShadowPxVParamonChange}>
								  		{textShowPxArr&&textShowPxArr.map(index => <Option key={index} value={index}>{index}</Option>)}
									</Select>
									<Select
						  		 		defaultValue={attrSelectElement.item.textShadowFuzzyDeg || '0px'}
							  		 	value={attrSelectElement.item.textShadowFuzzyDeg || '0px'}
							  		  	style={{ width: 74, marginRight : '5px', marginLeft: '4px' }}
							  		  	onChange={baseTextShadowPxFuzzyDegParamonChange}>
								  		{textShowBlurPxArr&&textShowBlurPxArr.map(index => <Option key={index} value={index}>{index}</Option>)}
									</Select>
								</Col>
							</Row>
							{/*
							<div className={styles.exclusiveEditElementParamLabel}>描边颜色</div>
							<Row style={{marginTop : '10px'}}>
								<Col span={5}>
									<ColorSelect width='230px' height='20px' value={attrSelectElement.item.webkitTextStrokeColor || 'black'} onChange={baseTextStrokeColorParamonChange} />
								</Col>
							</Row>
							<div className={styles.exclusiveEditElementParamLabel}>描边设置</div>
							<Row style={{marginTop : '10px'}}>
								<Col>
									<Select
						  		 		defaultValue={attrSelectElement.item.webkitTextStrokePx || '0px'}
							  		 	value={attrSelectElement.item.webkitTextStrokePx || '0px'}
							  		  	style={{ width: 74, marginRight : '5px', marginLeft: '4px' }}
							  		  	onChange={baseTextStrokePxParamonChange}>
								  		{webkitTextStrokePxArr&&webkitTextStrokePxArr.map(index => <Option key={index} value={index}>{index}</Option>)}
									</Select>
									<Select
						  		 		defaultValue={attrSelectElement.item.webkitTextStrokeWaiPx || '0px'}
							  		 	value={attrSelectElement.item.webkitTextStrokeWaiPx || '0px'}
							  		  	style={{ width: 74, marginRight : '5px', marginLeft: '4px' }}
							  		  	onChange={baseTextStrokePxWaiParamonChange}>
								  		{webkitTextStrokePxArr&&webkitTextStrokePxArr.map(index => <Option key={index} value={index}>{index}</Option>)}
									</Select>
								</Col>
							</Row>
							*/}
							<div className={styles.exclusiveEditElementParamLabel}>字体类型</div>
							<Row style={{marginTop : '10px'}}>
								<Col span={12}>
									<Select defaultValue={attrSelectElement.item.fontFamily} value={attrSelectElement.item.fontFamily} style={{ width: 240, marginRight : '10px' }} onChange={baseFontFamilyParamChange}>
							  			{
											fontFamily&&fontFamily.map((item, index) => {
												return <Option key={index} value={item.value}>{item.key}</Option>
											})
										}
									</Select>
								</Col>
							</Row>
								
							<div className={styles.exclusiveEditElementParamLabel}>字体位置</div>
							<Row style={{marginTop : '10px'}}>
								<div style={{float : 'left'}}>
									{
										attrAligntext&&attrAligntext.map((item, index) => {
											let selectStyle = selectTextAlginArr[index] == 'true' ? styles.selectAlginText : styles.alignText;
											return <div key={index} className={selectStyle} style={index % 3 ? {} : {clear : 'both'}} onClick={() => textAlignParmaChange(index)}><Icon type={item.value} title={item.title}/></div>
										})
									}
								</div>
							</Row>
							<TextArea style={{marginTop : '10px'}} rows={4} onChange={baseTextParamonChange} onBlur={baseTextParamonBlurChange} placeholder="请输入内容" value={attrSelectElement.item.value}/>
							<div className={styles.exclusiveEditElementParamLabel}>字体排版</div>
							<Row style={{marginTop : '10px'}}>
								<Switch checkedChildren={'横向'}
								 		unCheckedChildren={'纵向'}
										defaultChecked={attrSelectElement.item.writingMode == 'horizontal-tb' ? true : false}
										onChange={onTextTypographyTBChange}>
								</Switch>
								{
									attrSelectElement&&attrSelectElement.item.writingMode != 'horizontal-tb' ?
									<Switch checkedChildren={'居左'}
											unCheckedChildren={'居右'}
											defaultChecked={attrSelectElement.item.writingMode == 'vertical-lr' ? true : false}
											onChange={onTextTypographyLRChange}>
									</Switch>
									: ''
								}
							</Row>
						</Panel>
				break;
			case 'image' :
					return gereralQrImageOrImage
				break;
				case 'qrImage' :
					return gereralQrImageOrImage
				break;
			default :
				break;
		}
	}

	let styleLinHeight = [];
	for (let i = 0; i <= 10; i++ ) {
		//10分之一
		let v = elementFontSize / 10;
		v = 1 + v * i / elementFontSize;
		let fontSizeObj = {
			key : v.toFixed(1),
			value : v.toFixed(1),
		}
		styleLinHeight.push(fontSizeObj);
	}

	return (
		<div className="editElement">
			<Collapse accordion defaultActiveKey={attrSelectElement != undefined ? ['4'] : {}} >
				<Panel header={'基本属性'} key="1">
					<div className={styles.editElementParamLabel}>透明</div>
					<Row>
						<Col span={12}>
						  	<Slider min={0} max={1} onChange={baseOpacityParamonChange} value={attrSelectElement.item.opacity || 0} step={0.01} />
						</Col>
						<Col>
							<InputNumber
								min={0}
								max={1}
								style={{ marginLeft: 16 }}
								step={0.01}
								value={attrSelectElement.item.opacity}
								onChange={baseOpacityParamonChange}
							  />
						 </Col>
					</Row>
					<div className={styles.editElementParamLabel}>阴影</div>
					<Row>
						<Col span={12}>
					  	    <Slider defaultValue={0} onChange={baseBoxShadowParamonChange} value={attrSelectElement.item.boxShadow || 1} />
						</Col>
						<Col>
							<InputNumber
								style={{ marginLeft: 16 }}
								step={1}
								value={attrSelectElement.item.boxShadow}
								onChange={baseBoxShadowParamonChange}
							  />
						 </Col>
					</Row>
					<div className={styles.editElementParamLabel}>旋转</div>
					<Row>
						<Col span={12}>
					  	    <Slider defaultValue={0} max={360} onChange={baseRotateParamonChange} value={attrSelectElement.item.rotate || 1} />
						</Col>
						<Col>
							<InputNumber
								style={{ marginLeft: 16 }}
								step={1}
								max={360}
								value={attrSelectElement.item.rotate}
								onChange={baseRotateParamonChange}
							  />
						 </Col>
					</Row>
				</Panel>
				<Panel header={'边框属性'} key="2">
					<div className={styles.editElementParamLabel}>类型</div>
					<Row>
						<Col span={12}>
						  	 <Select defaultValue="solid" style={{ width: 255, marginTop : '3px' }} onChange={baseBorderStyleParamonChange}>
							  	<Option value="dashed">虚线</Option>
							  	<Option value="solid">实线</Option>
							  	<Option value="dotted">点缀</Option>
							</Select>
						 </Col>
					</Row>
					<div className={styles.editElementParamLabel}>粗细</div>
					<Row>
						<Col span={12}>
						  	<Slider min={0} max={100} onChange={baseBorderWidthParamonChange} value={attrSelectElement.item.borderWidth || 0} step={1} />
						</Col>
						<Col>
							<InputNumber
								style={{ marginLeft: 16 }}
								min={0}
								step={1}
								value={attrSelectElement.item.borderWidth}
								onChange={baseBorderWidthParamonChange}
							  />
						 </Col>
					</Row>
					{attrSelectElement !== undefined && attrSelectElement.item.type === 'text' ? <div className={styles.editElementParamLabel}>圆角</div> : ''}
					{attrSelectElement !== undefined && attrSelectElement.item.type === 'text' ? 
						<Row>
							<Col span={12}>
								<Slider min={0} max={100} onChange={baseBorderRadiusParamonChange} value={attrSelectElement.item.borderRadius || 0} step={1} />
							</Col>
							<Col>
								<InputNumber
									style={{ marginLeft: 16 }}
									min={0}
									step={1}
									value={attrSelectElement.item.borderRadius}
									onChange={baseBorderRadiusParamonChange}
								  />
							 </Col>
						</Row>
						: ''
					}
					<div className={styles.editElementParamLabel}>颜色</div>
					<Row>
						<Col span={12}>
							<ColorSelect width='243px' height='20px' value={attrSelectElement.item.borderColor} onChange={baseBorderColorParamonChange} />
						</Col>
					</Row>
					<div className={styles.editElementParamLabel}>上间距</div>
					<Row>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 255 }}
								min={0}
								step={1}
								value={attrSelectElement.item.paddingTop}
								onChange={basePaddingTopSpacingParamonChange}
							  />
						 </Col>
					</Row>
					<div className={styles.editElementParamLabel}>左间距</div>
					<Row>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 255 }}
								min={0}
								step={1}
								value={attrSelectElement.item.paddingLeft}
								onChange={basePaddingLeftSpacingParamonChange}
							  />
						 </Col>
					</Row>
					<div className={styles.editElementParamLabel}>右间距</div>
					<Row>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 255 }}
								min={0}
								step={1}
								value={attrSelectElement.item.paddingRight}
								onChange={basePaddingRightSpacingParamonChange}
							  />
						 </Col>
					</Row>
					<div className={styles.editElementParamLabel}>下间距</div>
					<Row>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 255 }}
								min={0}
								step={1}
								value={attrSelectElement.item.paddingBottom}
								onChange={basePaddingBottomSpacingParamonChange}
							  />
						 </Col>
					</Row>
				</Panel>								
				<Panel header={'位置属性'} key="3">
					<Row>
						<div className={styles.editElementParamLabel}>对齐</div>
						<div style={{float : 'left'}}>
							{
								attrElementLocation&&attrElementLocation.map((item, index) => {
									let selectStyle = item.selectStatus ? styles.selectAlginText : styles.alignText;
									return <div key={index} className={selectStyle} style={index % 3 ? {} : {clear : 'both'}} onClick={() => alignParmaChange(index)}><Icon type={item.value} title={item.title} /></div>
								})
							}
						</div>
					</Row>
					<div className={styles.editElementParamLabel}>宽度</div>
					<Row>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 100, float : 'left' }}
								min={0}
								step={1}
								value={parseInt(attrSelectElement.item.h&&attrSelectElement.item.w.replace("px", "")) || 100}
								onChange={baseWidthParamonChange}
							  />
						</Col>
						<div className={styles.editElementParamLabelRight}>高度</div>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 100 }}
								min={0}
								step={1}
								value={parseInt(attrSelectElement.item.h&&attrSelectElement.item.h.replace("px", "")) || 100}
								onChange={baseHeightParamonChange}
							  />
						</Col>
					</Row>
					<div className={styles.editElementParamLabel}>上下</div>
					<Row>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 100, float : 'left' }}
								min={0}
								step={1}
								value={attrSelectElement.item.y || 0}
								onChange={baseTopOrBottomParamonChange}
							  />
						</Col>
						<div className={styles.editElementParamLabelRight}>左右</div>
						<Col>
							<InputNumber
								style={{ marginTop: 3, width: 100 }}
								min={0}
								step={1}
								value={attrSelectElement.item.x || 0}
								onChange={baseLeftOrRightParamonChange}
							  />
						</Col>
					</Row>
				</Panel>
				
				{setExclusiveParam()}
				
				<Panel header={'机构设置'} key="5">
				
					<Checkbox onChange={baseOrgSetParamonChange} checked={attrSelectElement.item.orgSet}>是否允许机构设置</Checkbox>
					{/*
						attrSelectElement.item.orgSet && attrSelectElement.item.type === 'text' ? 
							<div className={styles.setTextMax}>
								<div className={styles.editElementParamLabel}>最大字数</div>					
								<InputNumber
									style={{ marginTop: 3, width: 100, float : 'left', marginLeft : '10px' }}
									min={0}
									step={1}
									value={attrSelectElement.item.textMaxLength}
									onChange={baseTextMaxParamonChange}
								 />
							</div>
							: ''
					*/}
				</Panel>
				
		  	</Collapse>
		</div>
    );
}

export default TextComponent;
