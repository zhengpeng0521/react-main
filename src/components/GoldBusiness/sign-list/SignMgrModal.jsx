import React, { PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const SignMgrModal = ({
    formLoading, formData, formVisible,formType,
    formSubmit,
    formCancel,
    handleOk,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
  }) => {


    function handleComplete(){
        console.log("开始提交");
        validateFields((errors) => {
        if (errors) {
            return;
        }
        const data = { ...getFieldsValue(), key: item.key };
        console.log("提交成功");
        formSubmit(data);
        });
    }
    function checkNumber(rule, value, callback) {
        if (!value) {
            callback(new Error('年龄未填写'));
        }
        if (!/^[\d]{1,2}$/.test(value)) {
            callback(new Error('年龄不合法'));
        } else {
            callback();
        }
    }

  const modalOpts = {
    title: '修改用户',
    visible : formVisible,
    onOk: handleComplete,
    onCancel : formCancel,
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="姓名："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('name', {
            initialValue: formData.name,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="年龄："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('age', {
            initialValue: formData.age,
            rules: [
              { validator: checkNumber },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="住址："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('address', {
            initialValue: formData.address,
            rules: [
              { required: true, message: '不能为空' },
            ],
          })(
            <Input type="address" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

SignMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(SignMgrModal);
