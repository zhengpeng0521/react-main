import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select } from 'antd';
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

const UserRecModal = ({
    formLoading, formSetData, formSetVisible,
    formSetSubmit,
    formSetCancel,
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
        formSetCancel();
    }

    let modalOpts = {
        title: '链接',
        maskClosable : false,
        visible : formSetVisible,
        closable : true,
        width : 585,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="primary" size="large" onClick={handleCancel}> 取 消 </Button>
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
          <a href={formSetData} target='_blank'>{formSetData}</a>
        </FormItem>
      </Form>
    </Modal>
  );
};

UserRecModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formSetData : PropTypes.any,
    formSetVisible : PropTypes.any,
    formSetCancel : PropTypes.func,
    formSetSubmit : PropTypes.func,
};

export default Form.create()(UserRecModal);
