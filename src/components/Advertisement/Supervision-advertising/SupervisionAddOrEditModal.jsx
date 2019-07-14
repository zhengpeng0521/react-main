import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Icon } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

/*编辑租户modal*/
const SupervisionAddOrEditModal = ({
    addOrEditSupervisionVisible,               //编辑校区modal是否显示
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
            data.id = checkOrEditSupDetailMsg.id || undefined
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
        title: '编辑广告',
        maskClosable : false,
        visible : addOrEditSupervisionVisible,
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
                                { required: true, message: '请填写广告名称' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="text" placeholder='请填写广告名称' size='default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="文字"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('character', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.characters ? checkOrEditSupDetailMsg.characters : undefined,
                            rules: [
                                { required: true, message: '请填写广告文案' }],
                        })(
                            <Input type="text" placeholder='请填写广告文案' size='default'/>
                        )}
                    </FormItem>
                     <FormItem
                        label="外链地址"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('url', {
                            initialValue : checkOrEditSupDetailMsg && checkOrEditSupDetailMsg.url ? checkOrEditSupDetailMsg.url : undefined,
                            rules: [
                                { required: true, message: '请填写外链地址' }],
                        })(
                            <Input type="text" placeholder='请填写外链地址' size='default'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SupervisionAddOrEditModal);
