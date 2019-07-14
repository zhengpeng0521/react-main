import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message } from 'antd';
const FormItem = Form.Item;

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const GoldMgrModal = ({
    formLoading, formData, formVisible,formType,searchChannelList,areasList, targetList,
    formCancel,
    formSubmit,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

  function handleOk(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue()};
      data.tradeType='999';
      resetFields();
      formSubmit(data);
    });
  }

    function checkGoldNo(rule, value, callback) {
        if (!/^[-+]*[\d]*$/.test(value)) {
            callback(new Error('金币数不合法，必须是阿拉伯自然数'));
        }else {
            callback();
        }
    }
    function checkUserId(rule, value, callback){
        if (!/^[\d]*$/.test(value)) {
            callback(new Error('用户ID不合法，必须是阿拉伯正整数'));
        }else {
            callback();
        }
    }


    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    };

  let modalOpts = {
    title: formType == 'create' ? '新增' : '修改',
    maskClosable : false,
    visible : formVisible,
    closable : true,
    width : 585,
    onOk: handleOk,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleOk}
                disabled={formLoading}
                loading={formLoading}>保存</Button>
    ],
  };

  return (
    <Modal {...modalOpts}>

      <Form horizontal className="common-component-form">

        <FormItem
          label="用户ID："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('uid', {
            rules: [
              { required: true, message: '用户ID未填写' },{validator: checkUserId},
            ],
          })(
            <Input size="default" type="text" placeholder="请输入用户ID"/>
          )}
        </FormItem>
        <FormItem
          label="信息："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('tradeDesc', {
            rules: [
              { required: true, message: '交易信息不能为空' },
            ],
          })(
            <Input size="default" type="textarea" rows={3}/>
          )}
        </FormItem>

        <FormItem
          label="金币数量："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('amount', {
            rules: [
              { required: true, message: '金币数未填写' },{validator: checkGoldNo},
            ],
          })(
            <Input size="default" placeholder="请输入金币正整数或者负整数" type="text" />
          )}
        </FormItem>

      </Form>

    </Modal>
  );
};

GoldMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(GoldMgrModal);
