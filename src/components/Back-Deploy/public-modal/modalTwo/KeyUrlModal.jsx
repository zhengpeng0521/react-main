import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const KeyUrlModal = ({
    keyUrlVisibleModalTwo,formLoading, formData,formType,keyUrlContentModalTwo,
    modalTwoFormUrlModalCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalTwoFormUrlModalCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: '关键词预览',
    maskClosable : false,
    visible : keyUrlVisibleModalTwo,
    closable : true,
    width : 585,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="primary" size="large" onClick={handleCancel}>取消</Button>,
    ],
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
        label="链接："
        hasFeedback
        {...formItemLayout}
        >
            <a href={keyUrlContentModalTwo||'http://202.108.22.5'} target='_blank'>{keyUrlContentModalTwo||'http://202.108.22.5'}</a>
        </FormItem>
      </Form>
    </Modal>
  );
};

KeyUrlModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    columnUrlVisibleModalOne : PropTypes.any,
    formType : PropTypes.any,
    modalTwoFormUrlModalCancel : PropTypes.func,
};

export default Form.create()(KeyUrlModal);
