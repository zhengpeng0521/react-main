import React, {PropTypes} from 'react';
import styles from './AnimationLibFunction.less';
import Toast from 'antd-mobile/lib/toast';

let prompt = "使用了字体动画, 字体不能为空";

/*
 * case : 100 滚入
 * case : 101 旋转
 * case : 102 打印
 */

export function setText(code, text, isRreverse=false) {
	switch(code) {
		case 100:
			return setTextRollIn(text, isRreverse);
			break;
		case 101:
			return setTextPrint(text);
			break;
		case 102:
			//return setTextTornado(text);
			break;
		default :
			return text;
			break;
	}
}

//文字切割
function textDealWith(text) {
	let textArr = [];
	if(text.length > 0) {
		if(text.length > 8) {
			text = text.substring(0, 8);
		}
		for(let val of Object(text)) {
			textArr.push(val);
		}
		return textArr;
	}
}

//滚入 http://img.ishanshan.com/gimg/img/a7838ef245f7fad71b27a74064da9b41
function setTextRollIn(text, isRreverse) {

	if(text == '' || text == undefined || text == null) {return Toast.info(prompt);}
	let textArr = [];
	textArr = textDealWith(text);

	if(isRreverse) {
		textArr = textArr.reverse();
	}

	let component = (
		textArr&&textArr.map((item, index) => {
			return <span key={index} className={styles.ani_text_one_roll} style={{animationDelay : 400 * index + 'ms'}}>{item}</span>
		})
	)
	return 	<div>{component}</div>
}

//旋转 http://img.ishanshan.com/gimg/img/c09c1588a2fbe09e6a08c85ef63ec851
function setTextTornado(text) {

	if(text == '' || text == undefined || text == null) {return Toast.info(prompt);}
	let textArr = [];
	textArr = textDealWith(text);
	let component = (
		textArr&&textArr.map((item, index) => {
			return <p key={index} className={styles.ani_text_tornado} style={{animationDelay : 500 * index + 'ms'}}>{item}</p>
		})
	)
	return 	<div>{component}</div>
}

//打印 http://img.ishanshan.com/gimg/img/be997c2b0a26434adcd720a51f65c18f
function setTextPrint(text) {
	if(text == '' || text == undefined || text == null) {return Toast.info(prompt);}
	let textArr = [];
	textArr = textDealWith(text);
	let component = (
		textArr&&textArr.map((item, index) => {
			return <span key={index} className={styles.ani_text_print} style={{animationDelay : 200 * index + 'ms'}}>{item}</span>
		})
	)
	return 	<div>{component}</div>
}
