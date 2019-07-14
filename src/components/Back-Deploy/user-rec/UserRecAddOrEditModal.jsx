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

const UserRecAddOrEditModal = ({
    formLoading, formData, formVisible,formType,
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
      data.id = formData.id;
      resetFields();
      formSubmit(data,formType);
    });
  }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }

    function checkNumber(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback();
        }else if (!/^[\d]*$/.test(value)) {
            callback(new Error('输入不合法，必须是自然数'));
        }else{
            callback();
        }
    }
    //判断相关专题编号
    function checkTopicArray(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback();
        };
        let array = value.split(",");
        for(let i=0;i<array.length;i++){
            if(isNaN(parseInt(array[i]))){
                callback(new Error('输入不合法,标点符号多余或者非数字存在'));
            }
        }
        callback();
    }

    let modalOpts = {
        title: '设置',
        maskClosable : false,
        visible : formVisible,
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
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="用户ID"
          hasFeedback
          {...formItemLayout}
        >
            {getFieldDecorator('userId', {
                initialValue: formType=='edit'?(formData.userId?formData.userId+'':''):'',
                rules: [
                  { required: true, message: '用户ID未填写' },{validator: checkNumber},
                ],
            })(
                <Input type="text" disabled={formType=='edit'?true:false} placeholder='请填写用户ID'/>
            )}
        </FormItem>

        <FormItem
          label="排序值"
          hasFeedback
          {...formItemLayout}
        >
            {getFieldDecorator('sortValue', {
                initialValue: formData.sortValue?formData.sortValue+'':'',
                rules: [
                  { required: true, message: '排序值未填写' },{validator: checkNumber},
                ],
            })(
                <Input type="text" placeholder='请填写排序值'/>
            )}
        </FormItem>

        <FormItem
          label="推荐介绍"
          hasFeedback
          {...formItemLayout}
        >
            {getFieldDecorator('intro', {
                initialValue: formData.intro,
            })(
                <Input type="textarea" placeholder='请填写推荐介绍' rows={4}/>
            )}
        </FormItem>

        <FormItem
          label="相关专题编号"
          hasFeedback
          {...formItemLayout}
        >
            {getFieldDecorator('relatedCardTopic', {
                initialValue: formData.relatedCardTopic?formData.relatedCardTopic+'':'',
                rules: [
                  { required: true, message: '相关专题编号不能为空' },{validator: checkTopicArray},
                ],
            })(
                <Input type="textarea"placeholder='写成"相关专题+逗号的形式，例如111,222,333"，否则不予承认'/>
            )}
        </FormItem>

      </Form>
    </Modal>
  );
};

UserRecAddOrEditModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formType : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(UserRecAddOrEditModal);
