import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Icon ,Upload} from 'antd';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

/*编辑租户modal*/
const TenantAddOrEditModal = ({
    addOrEditTeanantVisible,               //编辑校区modal是否显示
    addOrEditSupModalButtonLoading,         //编辑校区modal按钮是否在加载状态

    checkOrEditSupDetailMsg,                  //新增编辑租户的信息
    AddOrEditSupModalSubmit,                //编辑校区提交
    AddOrEditSupModalCancel,                //编辑校区modal关闭

    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        setFieldsValue,
    },
  }) => {

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,data) => {
            if (!!errors) {
                return;
            }
            data.logo = data.logo[0].url;
            data.tenantId = checkOrEditSupDetailMsg.tenantId || undefined;
            AddOrEditSupModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSupModalCancel();
    }
    //模态框的属性
    let modalOpts = {
        title: '编辑租户',
        maskClosable : false,
        visible : addOrEditTeanantVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={addOrEditSupModalButtonLoading}
                    loading={addOrEditSupModalButtonLoading}
                    style={{marginLeft:'10px'}}>保存</Button>
        ],
        className : 'zj_org_manage_modal'
    };

    /*检验是否只输入了空格*/
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[u4E00-u9FA5]+$/.test(value)){
            callback(new Error('输入不能为空'));
        }else{
            callback();
        }
    }
//  let url = addType == 'edit' && fromData && fromData.imgUrl != null && fromData.imgUrl != '' && fromData.imgUrl != undefined ? fromData.imgUrl : null;
    let url = checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.logo != null && checkOrEditSupDetailMsg.logo != '' && checkOrEditSupDetailMsg.logo != undefined ? checkOrEditSupDetailMsg.logo : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : url,
        thumbUrl : url,
    }];


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

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
                    <FormItem
                        label="名称"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('name', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.name ? checkOrEditSupDetailMsg.name : undefined,
                            rules: [
                                { required: true, message: '请填写租户名称' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="text" placeholder='请填写租户名称' size='default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="手机号"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('tel', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.tel ? checkOrEditSupDetailMsg.tel : undefined,
                            rules: [
                                { required: true, message: '请填写租户手机号' }],
                        })(
                            <Input type="text" placeholder='请填写租户手机号' size='default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="简介"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('intro', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.intro ? checkOrEditSupDetailMsg.intro : undefined,
                            rules: [
                                { required: true, message: '请填写简介' }],
                        })(
                            <Input type="text" placeholder='请填写简介' size='default'/>
                        )}
                    </FormItem>
                    {<FormItem
                      {...formItemLayout}
                      label="logo图片"
                    >
                    {getFieldDecorator("logo", {
                    		initialValue: checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.logo ? displayImg : checkOrEditSupDetailMsg.logo,
                        rules: [{
                          required: true, message: '请选择图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...iconUploadProps} >
                         {(getFieldValue('logo') && getFieldValue('logo').length > 0) ?
                            null
                            :
                            <div>
                                <Icon type="plus" />
                                <div >选择图片</div>
                            </div>
                         }
                        </Upload>
                      )}
                    </FormItem>}
                    <FormItem
                        label="联系人昵称"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('contacts', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.contacts ? checkOrEditSupDetailMsg.contacts : undefined,
                            rules: [
                                { required: true, message: '请填写联系人昵称' }],
                        })(
                            <Input type="text" placeholder='请填写联系人昵称' size='default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="备注"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('remark', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.remark ? checkOrEditSupDetailMsg.remark : undefined,
                            rules: [
                                { required: true, message: '请填写备注' }],
                        })(
                            <Input type="text" placeholder='请填写备注' size='default'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(TenantAddOrEditModal);
