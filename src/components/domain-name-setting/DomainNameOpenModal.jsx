import React from 'react';
import { Form , Input , Modal , Button , Spin , Radio , DatePicker } from 'antd';
import styles from './Modal.less';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol : { span : 4 },
    wrapperCol : { span: 18 },
};

//域名审核
const DomainNameOpenModal = ({
    domainNameOpenModalVisible,                 //表单是否显示
    domainNameOpenModalLoading,                 //表单加载状态
    domainNameOpenModalButtonLoading,           //表单按钮加载状态
    domainNameOpenModalTenantId,                //表单审核的租户id
    domainNameOpenModalHostName,                //域名开通域名名称

    DomainNameOpenModalSubmit,                  //表单提交
    DomainNameOpenModalCancel,                  //表单关闭
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
            values.endDate = !!values.endDate ? values.endDate.format('YYYY-MM-DD HH:mm:ss') : undefined;
            values.hostName = domainNameOpenModalHostName || '';
            DomainNameOpenModalSubmit(values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        DomainNameOpenModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '域名开通',
        maskClosable : false,
        visible : domainNameOpenModalVisible,
        closable : true,
        width : 550,
        onOk: handleComplete,
        onCancel : handleCancel,
        className : 'zj_domain_name_setting_modal',
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={ handleCancel }>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={ handleComplete }
                    disabled={ domainNameOpenModalButtonLoading }
                    loading={ domainNameOpenModalButtonLoading }>保存</Button>
        ],
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now() - 24 * 60 * 60 * 1000;
    }

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { domainNameOpenModalLoading }>
                <FormItem
                    label="租户ID"
                    {...formItemLayout}
                >
                    {getFieldDecorator('tenantId',{
                        initialValue : !!domainNameOpenModalTenantId || domainNameOpenModalTenantId == 0 ? domainNameOpenModalTenantId + '' : undefined
                    })(
                        <Input placeholder='租户ID' disabled = { true } size = 'default' style = {{ color : '#666' }}/>
                    )}
                </FormItem>
                <FormItem
                    label="域名名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('hostName',{
                        initialValue : (!!domainNameOpenModalHostName ? domainNameOpenModalHostName : '***(unknown)') + '.saas.ishanshan.com'
                    })(
                        <Input placeholder='域名名称' disabled = { true } size = 'default' style = {{ color : '#666' }}/>
                    )}
                </FormItem>
                <FormItem
                    label="到期时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('endDate',{
                        rules: [
                            { required: true, message: '请选择到期时间' },
                        ],
                    })(
                        <DatePicker
                            format = "YYYY-MM-DD HH:mm:ss"
                            disabledDate = {disabledDate}
                            showTime
                            size = 'default'
                        />
                    )}
                </FormItem>
            </Spin>
        </Modal>
    );
};

export default Form.create()(DomainNameOpenModal);
