import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message, DatePicker } from 'antd';
import moment from 'moment';
import styles from './SignGame.less';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const SignGameModal = ({
    formLoading, formData, formVisibleEdit,formVisibleAdd,formType,
    formSubmit,
    formCancel,
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

      //处理时间
      const rangeValue = getFieldValue('game_time');
      if(rangeValue!=undefined&&rangeValue.length>0){
        data.startTime = rangeValue[0].format('YYYY-MM-DD HH:mm:ss');
        data.endTime = rangeValue[1].format('YYYY-MM-DD HH:mm:ss');
      }
      delete data.game_time;
      //处理id传递
      data.id = formData.id;
      console.log(data);
      resetFields();
      formSubmit(data,'Edit');
    });
  }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }

    let modalOpts = {
    title: formType=='edit'?'编辑':'新增',
    maskClosable : false,
    visible : formType=='edit'?formVisibleEdit:formVisibleAdd,
    closable : true,
    width : 585,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={formLoading}
                loading={formLoading}>保存</Button>
    ],
  };

    let dateFormat = 'YYYY-MM-DD hh:mm:ss';

    let activityTimesInitValue = formData.startTime && formData.endTime ?
                                [moment(formData.startTime, dateFormat), moment(formData.endTime, dateFormat)] : undefined
    let activityTimesConfig = {
        initialValue: activityTimesInitValue,
        rules: [{ type: 'array', required: true, message: '请选择游戏时间' }],
    };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue: formData.title,
            rules: [
              { required: true, message: '标题未填写' },
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
              { required: true, message: '简介不能为空' },
            ],
          })(
            <Input type="textarea" rows={3}/>
          )}
        </FormItem>

        <FormItem
          label="游戏时间"
          hasFeedback
          {...formItemLayout}
        >
            {getFieldDecorator('game_time', activityTimesConfig)(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width : '100%'}} />
            )}
        </FormItem>

        <FormItem
          label="类型："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('status', {
            initialValue: formData.status,
            rules: [
              { required: true, message: '请选择类型' },
            ],
          })(
            <Select placeholder='请选择类型' style={{ width:120 }}>
                 <Option value='1'>有效</Option>
                 <Option value='0'>无效</Option>
            </Select>
          )}
        </FormItem>


      </Form>
    </Modal>
  );
};

SignGameModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisibleEdit : PropTypes.any,
    formVisibleAdd : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(SignGameModal);
