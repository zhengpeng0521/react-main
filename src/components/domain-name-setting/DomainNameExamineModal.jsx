import React from 'react';
import { Form , Input , Modal , Button , Spin , Radio , Popconfirm } from 'antd';
import styles from './Modal.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol : { span : 4 },
    wrapperCol : { span: 18 },
};

//域名审核
const DomainNameExamineModal = ({
    domainNameExamineModalVisible,              //表单是否显示
    domainNameExamineModalLoading,              //表单加载状态
    domainNameExamineModalButtonLoading,        //表单按钮加载状态
    domainNameExamineModalTenantId,             //表单审核的租户id
    domainNameExamineModalHostName,             //域名审核域名名称

    DomainNameExamineModalSubmit,               //表单提交
    DomainNameExamineModalCancel,               //表单关闭
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            values.hostName = domainNameExamineModalHostName || '';
            DomainNameExamineModalSubmit(values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        DomainNameExamineModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '域名审核',
        maskClosable : false,
        visible : domainNameExamineModalVisible,
        closable : true,
        width : 550,
        onOk: handleComplete,
        onCancel : handleCancel,
        className : 'zj_domain_name_setting_modal',
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={ handleCancel }>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={ handleComplete }
                    disabled={ domainNameExamineModalButtonLoading }
                    loading={ domainNameExamineModalButtonLoading }>保存</Button>
        ],
    };

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { domainNameExamineModalLoading }>
                <FormItem
                    label="租户ID"
                    {...formItemLayout}
                >
                    {getFieldDecorator('tenantId',{
                        initialValue : !!domainNameExamineModalTenantId || domainNameExamineModalTenantId == 0 ? domainNameExamineModalTenantId + '' : undefined
                    })(
                        <Input placeholder='租户ID' disabled = { true } size = 'default' style = {{ color : '#666' }}/>
                    )}
                </FormItem>
                <FormItem
                    label="域名名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('hostName',{
                        initialValue : (!!domainNameExamineModalHostName ? domainNameExamineModalHostName : '***(unknown)') + '.saas.ishanshan.com'
                    })(
                        <Input placeholder='域名名称' disabled = { true } size = 'default' style = {{ color : '#666' }}/>
                    )}
                </FormItem>
                <FormItem
                    label="审核结果"
                    {...formItemLayout}
                >
                    {getFieldDecorator('auditStatus',{
                        rules: [
                            { required: true, message: '请选择审核结果' },
                        ],
                    })(
                        <RadioGroup>
                            <Radio value='2'>通过</Radio>
                            <Radio value='4'>驳回</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('remarks',{
                        rules: [
                            { required: true, message: '请填写备注' },
                        ],
                    })(
                        <Input type="textarea" placeholder='请填写备注' autosize = {{ minRows : 3 , maxRows : 4 }}/>
                    )}
                </FormItem>
            </Spin>
        </Modal>
    );
};

export default Form.create()(DomainNameExamineModal);
