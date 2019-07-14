import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Select, Cascader, Checkbox, Upload, Icon, Radio } from 'antd';
import style from './TenantMessage.less';
import ChinaDivision from './CascaderAddressOptions';

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
const TenantMessageCheckTetModel = ({
    checkOrEditTetModalVisible,               //编辑校区modal是否显示
    checkOrEditTetModalButtonLoading,         //编辑校区modal按钮是否在加载状态

    checkOrEditTetDetailMsg,                    //新增编辑租户的信息
    CheckOrEditTetModalSubmit,                //编辑校区提交
    CheckOrEditTetModalCancel,                //编辑校区modal关闭

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

    //console.info(checkOrEditTetDetailMsg)

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            values.id = checkOrEditTetDetailMsg.tenantId;
            CheckOrEditTetModalSubmit(values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        CheckOrEditTetModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '编辑租户',
        maskClosable : false,
        visible : checkOrEditTetModalVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={checkOrEditTetModalButtonLoading}
                    loading={checkOrEditTetModalButtonLoading}
                    style={{marginLeft:'10px'}}>保存</Button>
        ],
        className : 'zj_org_manage_modal'
    };

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
                    <FormItem
                        label="租户名称"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('tenantName', {
                            initialValue : checkOrEditTetDetailMsg && checkOrEditTetDetailMsg.tenantName ? checkOrEditTetDetailMsg.tenantName : undefined,
                            rules: [
                                { required : true, message : '请填写租户名称' , whitespace : true },
                            ],
                        })(
                            <Input type="text" placeholder='请填写租户名称' size='default'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(TenantMessageCheckTetModel);
