import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Select, Cascader, Checkbox, Upload, Icon, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

/*编辑租户modal*/
const RegistrationFormAddChannelModal = ({
    addChannelsModalVisible,               //新增渠道modal是否显示
    addChannelsModalButtonLoading,         //新增渠道modal按钮是否在加载状态

    AddregistrationModalSubmit,                //新增渠道提交
    AddregistrationModalCancel,                //新增渠道modal关闭

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
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            AddregistrationModalSubmit(values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddregistrationModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '新增渠道',
        maskClosable : false,
        visible : addChannelsModalVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={addChannelsModalButtonLoading}
                    loading={addChannelsModalButtonLoading}
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
                        label="表单名称"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('channelName', {
                            rules: [
                                { required: true, message: '请填写表单名称' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="text" placeholder='请填写表单名称' size='default'/>
                        )}
                    </FormItem>

                    <FormItem
                        label="回调地址"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}

                    >
                        {getFieldDecorator('returnUrl', {

                        })(
                            <Input type="text" placeholder='请填写跳转链接' size='default'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(RegistrationFormAddChannelModal);
