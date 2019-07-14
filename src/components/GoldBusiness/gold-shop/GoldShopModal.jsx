import React, { PropTypes } from 'react';
import { Form, Input, Modal,Button,Select } from 'antd';
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

const GoldShopModal = ({
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
        validateFields((errors) => {
        if (errors) {
            return;
        }
        const data = { ...getFieldsValue()};
        data.orderNo = formData.orderNo;
        formSubmit(data);
        resetFields();
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }
  const modalOpts = {
    title: '编辑订单',
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
          label="快递公司："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('expressName', {
            initialValue : formData.expressName,
            rules: [
              { required: false, message: '快递公司未填写' },
            ],
          })(
            <Select placeholder='请选择快递公司'>
                <Option value='韵达'>韵达</Option>
                <Option value='顺丰'>顺丰</Option>
                <Option value='百世汇通'>百世汇通</Option>
                <Option value='天天'>天天</Option>
                <Option value='宅急送'>宅急送</Option>
                <Option value='全峰快递'>全峰快递</Option>
                <Option value='德邦'>德邦</Option>
                <Option value='EMS'>EMS</Option>
                <Option value='圆通'>圆通</Option>
                <Option value='申通'>申通</Option>
                <Option value='中通'>中通</Option>
                <Option value='中国邮政'>中国邮政</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="快递单号："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('trackNumber', {
            initialValue: formData.trackNumber,
            rules: [
              { required: false, message: '快递单号未填写' },
            ],
          })(
            <Input type="text" rows={3}/>
          )}
        </FormItem>

        <FormItem
          label="订单状态："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('status', {
            initialValue: formData.status,
            rules: [
              { required: false, message: '订单状态未选择' },
            ],
          })(
            <Select placeholder='请选择订单状态'>
                <Option value='0'>失效</Option>
                <Option value='1'>待付款</Option>
                <Option value='2'>待确认</Option>
                <Option value='3'>已发货</Option>
                <Option value='4'>已确认</Option>
                <Option value='5'>已解冻</Option>
                <Option value='6'>待退款</Option>
                <Option value='7'>已退款</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

GoldShopModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    addFormVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(GoldShopModal);
