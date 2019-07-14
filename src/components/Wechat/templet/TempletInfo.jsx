import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Cascader,  Upload, Icon, Tabs  } from 'antd';
import styles from './TempletInfo.less';
import DraftListTab from './DraftListTab';
import TplListTab from './TplListTab';
const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};


function TempletInfo ({
    infoModelVisible,
    closeTempletInfo,
    temInfoComplete,
    addModelSubmit,
    infoData,
    draftListData,
    tplListData,
    tabChange,
    setTpFun,
    setDefaltFun,
    deleteFun,

    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        setFieldsValue,
    },
  }) {
     function normFile(e) {
        let fileList = [];
        if (Array.isArray(e)) {
            fileList = e;
        } else {
            fileList = e && e.fileList;
        }

         fileList && fileList.length > 0 && fileList.map(function(item, index) {
            if(item.response && (item.response.errorCode == 9000) && item.response.data && item.response.data.url) {
                item.url = item.response.data.url;
            }
        });

        return fileList;
    }

    /*校验图片*/
    function imageBeforeUpload(file) {
		if(file.size > 5242880) {
			message.error('图片不得大于5M');
			return false;
		}
		return true;
    }

    let iconUploadProps = {
        action: BASE_URL+'/systemController/upload',
        listType: 'picture-card',
        beforeUpload : imageBeforeUpload,
        withCredentials: true,//上传请求时是否携带 cookie
    };
    function handleComplete() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            values.cover = values.cover[0].url;
            addModelSubmit(values)
        });
    }

    //模态框的属性
    let modalOpts = {
        title: '查看详情',
        maskClosable : false,
        visible : infoModelVisible,
        closable : true,
        width : 1000,
        onOk: temInfoComplete,
        onCancel : closeTempletInfo,
    };

    let url = infoData && infoData.cover != null && infoData.cover != '' && infoData.cover != undefined ? infoData.cover : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : url,
        thumbUrl : url,
    }];
    let DraftListTabProps = {
    	draftListData,
    	setTpFun,
    }
    let TplListTabProps ={
    	tplListData,
    	setDefaltFun,
    	deleteFun,
    }
    return (
        <div>
            <Modal {...modalOpts}>
            		<div className={styles.content}>
	            			<span className={styles.title}>名称:</span>
	            			<span>{infoData && infoData.name || ''}</span>
            		</div>
            		<div className={styles.content}>
	            		<div className={styles.box}>
		            			<span className={styles.title}>封面:</span>
		            			<img className={styles.img} src={infoData &&infoData.cover || ''} />
	            		</div>
	            		<div className={styles.box_two}>
		            			<span className={styles.title}>二维码:</span>
		            			<img className={styles.img} src= {infoData &&infoData.demoUrl || ''} />
	            		</div>
            		</div>
            		<Tabs defaultActiveKey="1"  onChange={tabChange}>
						<TabPane tab="草稿箱" key="draftList">
							 <DraftListTab { ...DraftListTabProps } />
						</TabPane>
						<TabPane tab="模板" key="tplList">
							 <TplListTab { ...TplListTabProps } />
						</TabPane>
					  </Tabs>,
            </Modal>
        </div>
    );
};

export default Form.create()(TempletInfo);
