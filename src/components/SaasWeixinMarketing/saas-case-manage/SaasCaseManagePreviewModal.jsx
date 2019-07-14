import React, { PropTypes } from 'react';
import { Input, Modal, Button, Spin } from 'antd';
import QRCode from 'qrcode.react';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const SaasCaseManagePreviewModal = ({
    PreviewModalVisible,      //微信活动预览模态框是否展示
    PreviewModalSpin,         //微信游戏预览内容是否加载中
    PreviewUrl,               //微信活动预览URL
    PreviewModalCancel,       //微信活动关闭预览模态框
  }) => {

    function handleCancel(e) {
        e.preventDefault();
        PreviewModalCancel();
    }

    function onChange(){

    }
	
    //模态框的属性
    let modalOpts = {
		title: '预览',
		maskClosable : false,
		visible : PreviewModalVisible,
		closable : true,
		width : 600,
		onCancel : handleCancel,
		footer : '',
	};	

	let commonQrComponent = (
		(PreviewUrl instanceof Array) 
			? 
			PreviewUrl&&PreviewUrl.length > 0 
				? 
					<div style={{maxHeight: '450px', overflow: 'auto'}}>
						{
							PreviewUrl&&PreviewUrl.map((item, index) => {
								return  <div style={{margin : '19px', width: '150px', float: 'left'}} key={index}>
											<div style={{textAlign : 'center', marginBottom : '10px', width : '150px'}}>{item.name}</div>
											<QRCode value={item.link} size={150}/>
										</div>
							})
						}
					</div>
		 		: ''
			: 
		<div style={{margin:'20px auto 30px auto',width:'150px',textAlign:'center',lineheight:'150px'}}>
			{(PreviewUrl != '' && PreviewUrl != undefined) ? <QRCode value={PreviewUrl} size={150}/> : PreviewModalSpin == true ? '二维码加载中...' : '无二维码'}
		</div>
	)
	
	let multipleQrStyle = {
		widht:'100%',
		maxHeight:'450px',
		paddingBottom: '20px',
		display: 'flex',
    	justifyContent: 'center',
    	alignItems: 'center',
	}
		
	let singleQrStyle = {
		widht:'100%',
		maxHeight:'250px',
		paddingBottom: '20px',
	}
	
    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <div style={(PreviewUrl instanceof Array) ? multipleQrStyle : singleQrStyle}>
                    <Spin tip='Loading' spinning={PreviewModalSpin}>
                        {commonQrComponent}
                        <div>
							{PreviewUrl instanceof Array ? '' : <Input value={PreviewUrl || '' } onChange={onChange}/>}
                        </div>
                    </Spin>
                </div>
            </Modal>
        </div>
    );
};

export default SaasCaseManagePreviewModal;

//<div style={{margin:'20px auto 30px auto',width:'150px',textAlign:'center',lineheight:'150px'}}>
//	{PreviewUrl != '' ?
//
//		<QRCode value={PreviewUrl} size={150}/>
//		:
//	 PreviewModalSpin == true ? '二维码加载中...' : '无二维码'}
//</div>
