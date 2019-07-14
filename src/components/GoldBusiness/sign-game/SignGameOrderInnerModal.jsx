import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select } from 'antd';
import styles from './SignGame.less';

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

const SignGameOrderInnerModal = ({
    formLoading, formData, formVisibleOrderInner,formType,
    formSubmit,
    innerFormCancel,
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
    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue()};

      //处理id传递
      data.uid = formData.uid;
      data.orderNo = formData.orderNo;

      switch(data.express){
          case '中国邮政' : data.express='youzhengguonei';break;
          case '韵达' : data.express='yunda';break;
          case '顺丰' : data.express='shunfeng';break;
          case '百世汇通' : data.express='huitongkuaidi';break;
          case '天天' : data.express='tiantian';break;
          case '宅急送' : data.express='zhaijisong';break;
          case '全峰快递' : data.express='quanfengkuaidi';break;
          case '德邦' : data.express='debangwuliu';break;
          case 'EMS' : data.express='ems';break;
          case '圆通' : data.express='yuantong';break;
          case '申通' : data.express='shentong';break;
          case '中通' : data.express='zhongtong';break;
      }
      switch(data.status){
          case '失效' : data.status='0';break;
          case '待付款' : data.status='1';break;
          case '待确认' : data.status='2';break;
          case '已发货' : data.status='3';break;
          case '已确认' : data.status='4';break;
          case '已解冻' : data.status='5';break;
          case '待退款' : data.status='6';break;
          case '已退款' : data.status='7';break;
      }
      resetFields();
      formSubmit(data,'Order');
    });
  }
    //检验排序值
    function checkDefaultSort(rule, value, callback){
        if (!/^[\d]*$/.test(value)) {
            callback(new Error('输入排序值不合法，必须是阿拉伯正整数'));
        }else if(parseInt(value)>999999999){
            callback(new Error('输入排序值最大为999999999'));
        }else{
            callback();
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        innerFormCancel();
    }

    let modalOpts = {
    title: '订单编辑',
    maskClosable : false,
    visible : formVisibleOrderInner,
    closable : true,
    width : 585,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={formLoading}
                loading={formLoading}>保存</Button>
    ],
  };

  return (
      <div className={styles.inner_modal}>
        <Modal {...modalOpts}>
          <Form horizontal>
            <FormItem
              label="快递公司："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('express', {
                initialValue: formData.express,
                rules: [
                  { required: false, message: '快递公司未选择' },
                ],
              })(
                <Select placeholder="请选择快递公司">
                    <Option value="youzhengguonei">中国邮政</Option>
                    <Option value="yunda">韵达</Option>
                    <Option value="shunfeng">顺丰</Option>
                    <Option value="huitongkuaidi">百世汇通</Option>
                    <Option value="tiantian">天天</Option>
                    <Option value="zhaijisong">宅急送</Option>
                    <Option value="quanfengkuaidi">全峰快递</Option>
                    <Option value="debangwuliu">德邦</Option>
                    <Option value="ems">EMS</Option>
                    <Option value="yuantong">圆通</Option>
                    <Option value="shentong">申通</Option>
                    <Option value="zhongtong">中通</Option>
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
                  { required: false, message: '快递单号不能为空' },
                ],
              })(
                <Input type="textarea" rows={3} placeholder="请填写快递单号"/>
              )}
            </FormItem>

            <FormItem
              label="状态："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                initialValue: formData.status,
                rules: [
                  { required: false, message: '状态未选择' },
                ],
              })(
                <Select placeholder="请选择状态">
                  <Option value="0">失效</Option>
                  <Option value="1">待付款</Option>
                  <Option value="2">待确认</Option>
                  <Option value="3">已发货</Option>
                  <Option value="4">已确认</Option>
                  <Option value="5">已解冻</Option>
                  <Option value="6">待退款</Option>
                  <Option value="7">已退款</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
  );
};

SignGameOrderInnerModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisibleOrderInner : PropTypes.any,
    formType : PropTypes.any,
    innerFormCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(SignGameOrderInnerModal);
