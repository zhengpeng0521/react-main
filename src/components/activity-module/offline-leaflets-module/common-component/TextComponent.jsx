import React, {PropTypes} from 'react';
import styles from './TextComponent.less';
import { Radio } from 'antd';

function TextComponent({

	attrAllConfig,
	behindOrFront,
	itemConfig,
	funcAddTextItem,
	
}) {
	
	let itemArr = itemConfig;

	//构造元素
	function structureItem(fs) {
		let addTextItem = {
			fontSize 			: fs + 'px',
			type 				: 'text',
			color 				: 'black',
			backgroundColor 	: 'rgba(0,0,0,0)',
			textAlign			: 'center',
			x 					: 50,
			y 					: 50,
			h 					: '50px',
			w 					: '100px',
			opacity				: 1,
			boxShadow			: 0,	
			rotate				: 0,
			borderWidth			: 0,
			borderRadius		: 0,
			borderColor 		: 'white',
			borderStyle 		: 'solid',
			paddingTop 			: 0, 
			paddingLeft 		: 0,
			paddingRight 		: 0,
			paddingBottom 		: 0,
			letterSpacing   	: 0,
			backgroundSize 		: '100% 100%',
			backgroundRepeat	: 'no-repeat',
    		backgroundPosition	: 'center',
			backgroundImage		: '',
			value				: '内容区',
			orgSet				: false,
			visibility			: true,
			display				: 'inline-block',
			select				: false,
			wordWrap			: 'break-word',
			fontStyle			: 'normal',
			textDecoration		: 'none',
			fontFamily			: 'Microsoft YaHei',
			lineHeight 			: fs,
			textMaxLength		: 0,
			fontWeight			: 'normal',
			whiteSpace			: 'pre-wrap',
			selectTextAlign		: '',
			selectElementStatus : '',
			textShadow			: '0px 0px 0px black',
			textShadowH			: '0px',
			textShadowV			: '0px',
			textShadowFuzzyDeg	: '0px',
			textShadowColor		: 'black',
			writingMode			: 'horizontal-tb',

//			webkitTextStroke	: '0px black',
//			webkitTextStrokePx 	: '0px',
//			webkitTextStrokeColor: 'black',
//			webkitTextStrokeWaiPx : '0px',
			
		}	
		
		if(itemConfig.length > 0) {
			itemConfig.map((item, index) => {
				if(index == itemConfig.length - 1) {
					itemArr.push({index : index+1, item : addTextItem, key : String(new Date().getTime())});
				}
			})
		} else {
			itemArr.push({index : 0, item : addTextItem, key : String(new Date().getTime())});
		}
					
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig = itemArr;
		} else {
			attrAllConfig.behindPageConfig.itemConfig = itemArr;
		}

		funcAddTextItem(attrAllConfig);
	}
	
	function touchElementEvent(index) {
		switch(index) {
			case 0:
				structureItem(105);
				break;
			case 1:
				structureItem(80);
				break;				
			case 2: 
				structureItem(60);
				break;
			case 3:
				structureItem(50);
				break;
			default :
				return;
		}
	}
	
	let textArr = ["大号字体", "中号字体", "小号字体", "超小字体"];
	return (
		<div className="textComponent">
			{
				textArr&&textArr.map((item, index) => {
					return <div key={index} className={styles[`textStyle${index + 1}`]} onMouseDown={() => touchElementEvent(index)}>{item}</div>
				})
			}
		</div>
    );
}

export default TextComponent;
