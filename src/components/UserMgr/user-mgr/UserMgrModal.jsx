import React, { PropTypes } from 'react';
import { Form, Input, Modal,Button, Select } from 'antd';
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

const UserMgrModal = ({
    formLoading, formData, formVisible,formType,
    formSubmit,
    formCancel,
    handleOk,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {


    function handleComplete(){
        console.log("开始提交");
        validateFields((errors) => {
        if (errors) {
            return;
        }
        const data = { ...getFieldsValue()};
        console.info(data);
        console.log("提交成功");
        formSubmit(data);
        });
    }
    /*function checkNumber(rule, value, callback) {
        if (!value) {
            callback(new Error('年龄未填写'));
        }
        if (!/^[\d]{1,2}$/.test(value)) {
            callback(new Error('年龄不合法'));
        } else {
            callback();
        }
    }*/
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }
  const modalOpts = {
    title: formType == 'create' ? '新增用户(暂未开放功能)' : '编辑用户(暂未开放功能)',
    visible : formVisible,
    onOk: handleComplete,
    onCancel : handleCancel,
    maskClosable : false,
    closable : true,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
            onClick={handleComplete}
            disabled={formLoading}
            loading={formLoading}>保存</Button>
    ],
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="昵称："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('nickname', {
            initialValue: formData.nickname,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="简介："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('intro', {
            initialValue: formData.intro,
            rules: [
              { required: true, message: '简介未填写' },
            ],
          })(
            <Input type="textarea" rows={3}/>
          )}
        </FormItem>
        <FormItem
          label="性别："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('sex', {
            rules: [
              { required: true, message: '不能为空' },
            ],
          })(
            <Select placeholder='请选择性别'>
                <Option value='1'>男</Option>
                <Option value='2'>女</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

UserMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    addFormVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(UserMgrModal);
