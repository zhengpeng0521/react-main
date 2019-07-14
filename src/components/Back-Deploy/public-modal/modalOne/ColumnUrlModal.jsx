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

const ColumnUrlModal = ({
    columnUrlVisibleModalOne,formLoading, formData,formType,columnUrlContentModalOne,
    modalOneFormUrlModalCancel,
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
        modalOneFormUrlModalCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: '栏目预览',
    maskClosable : false,
    visible : columnUrlVisibleModalOne,
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
            <a href={columnUrlContentModalOne||'http://saas.ishanshan.com/h5/bbs/publicModalOne'} target='_blank'>{columnUrlContentModalOne||'http://saas.ishanshan.com/h5/bbs/publicModalOne'}</a>
        </FormItem>
      </Form>
    </Modal>
  );
};

ColumnUrlModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    columnUrlVisibleModalOne : PropTypes.any,
    formType : PropTypes.any,
    modalOneFormUrlModalCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(ColumnUrlModal);
