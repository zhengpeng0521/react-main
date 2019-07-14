import React, {PropTypes} from 'react';
import styles from './TextComponent.less';
import { Upload, Icon, message, Button } from 'antd';

function TextComponent({

	attrObjType,
	attrAllConfig,
	attrAlreadyAdd,
	behindOrFront,
	itemConfig,
	attrSelectElement,
	funcChangeImageItem,
	funcUploadImage,
	funcChangeAttrQrAlreadyAdd,
	
}) {
	
	let itemArr = itemConfig;
	
	let fileList = [];
	
	itemArr&&itemArr.length>0&&itemArr.map((item, index) => {
		
		if(item.item.type === attrObjType) {
			let obj = {
				uid 	: item.key,
				status	: 'done',
				url		: item.item.backgroundImage,
			}
			fileList.push(obj);
		}
	})
	
	let addImageItem = {
		fontSize 			: '',
		type 				: attrObjType === 'image' ? 'image' : 'qrImage',
		color 				: 'black',
		backgroundColor 	: 'rgba(0,0,0,0)',
		textAlign			: 'center',
		x 					: 50,
		y 					: 50,
		h 					: '100px',
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
		value				: '',
		orgSet				: false,
		visibility			: true,
		display				: 'inline-block',
		select				: false,
		wordWrap			: 'break-word',
		attrRadioValue		: 'select',
		activityId			: '',
		qrInputValue		: '',
	}		
		
	//添加操作
	function onChangeFunction(e) {
		if(attrObjType === 'image') {
			funcUploadImage({file : e.file, type : attrObjType === 'image' ? 'image' : 'qrImage', newElement : addImageItem});
		} 
	}
	
	//添加二维码
	function addImageElement() {
		
		let isAlreadyAdd = false;

		attrAllConfig.frontPageConfig.itemConfig.map((item, index) => {
			if(item.item.type == 'qrImage') {
				return isAlreadyAdd = true;
			}
		})

		attrAllConfig.behindPageConfig.itemConfig.map((item, index) => {
			if(item.item.type == 'qrImage') {
				return isAlreadyAdd = true;
			}
		})

		if(isAlreadyAdd == false) {

			let timeStamp = String(new Date().getTime());
			let element = {
				...addImageItem,
				backgroundImage	: 'http://img.ishanshan.com/gimg/img/4b165e0a176c46911e6383499a6d0ee4',
			}

			itemArr.push({index : itemArr.length, item : element, key : timeStamp });
			
			if(behindOrFront === 'front') {
				attrAllConfig.frontPageConfig.itemConfig = itemArr;
			} else {
				attrAllConfig.behindPageConfig.itemConfig = itemArr;
			}

			funcChangeImageItem(attrAllConfig);
			funcChangeAttrQrAlreadyAdd({attrAlreadyAdd : isAlreadyAdd})
		} else {
			return message.warning('只能添加一个二维码');
		}
	}
	
	//图片删除操作
	function onChangeRemoveFunction(e) {

		itemArr&&itemArr.map((item, index) => {
			if(e.uid === item.key) {
			   itemArr.splice(index, 1);
			}
		})
				
		if(behindOrFront === 'front') {
			attrAllConfig.frontPageConfig.itemConfig = itemArr;
		} else {
			attrAllConfig.behindPageConfig.itemConfig = itemArr;
		}
		funcChangeImageItem(attrAllConfig);
	}
		
	const props = {
        name : "file",
		action: window.manager_platform == 'thinknode' ? '/thinknode/upload/image' : `${BASE_URL}/systemController/upload`,
		className : "avatar-uploader", 
		listType :"picture-card",
		fileList : fileList,
		customRequest : onChangeFunction,
		onRemove : onChangeRemoveFunction,
	};

	return (
		<div className="imageComponent">
			{
				attrObjType === 'qrImage' 
					? 
				    <Button type="primary" onClick={() => addImageElement()}>添加二维码</Button>
					: 
					<Upload {...props}>
						<div>
							<Icon type="plus" />
							<div className="ant-upload-text">Upload</div>
						</div>
					</Upload>			 
			}
		</div>
    );
}

export default TextComponent;
