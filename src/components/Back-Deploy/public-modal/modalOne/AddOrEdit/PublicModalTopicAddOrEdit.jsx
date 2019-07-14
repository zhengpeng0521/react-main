import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer } from 'antd';
import style from '../../publicModal.less';
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

//模板1新增主题
const PublicModalTopicAddOrEdit = ({
    topicAddOrEditModalVisibleModalOne,formLoading,formType,formData,
    modalOneFormAddOrEditTopicSubmit,
    modalOneFormAddOrEditTopicCancel,
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
      modalOneFormAddOrEditTopicSubmit(data,formType);
    });
  }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalOneFormAddOrEditTopicCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: formType=='EditTopicModalOne'?'编辑主题':
           formType=='AddTopicModalOne'?'新增主题':'未指定',
    maskClosable : false,
    visible : topicAddOrEditModalVisibleModalOne,
    closable : true,
    width : 585,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
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
          label="主题名称："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('themeName', {
            initialValue:formType=='EditTopicModalOne'?formData.themeName:'',
            rules: [
              { required: true, message: '主题名称未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写主题名称'/>
          )}
        </FormItem>

        <FormItem
          label="主题URL："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('themeUrl', {
            initialValue:formType=='EditTopicModalOne'?formData.themeUrl:'',
          })(
            <Input type="text" placeholder='请填写主题URL'/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

PublicModalTopicAddOrEdit.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formType : PropTypes.any,
    modalOneFormAddOrEditTopicCancel : PropTypes.func,
    modalOneFormAddOrEditTopicSubmit : PropTypes.func,
    topicAddOrEditModalVisibleModalOne : PropTypes.any,
};

export default Form.create()(PublicModalTopicAddOrEdit);
