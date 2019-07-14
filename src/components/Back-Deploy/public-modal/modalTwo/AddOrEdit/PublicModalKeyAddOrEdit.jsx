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

//模板2新增关键词
const PublicModalKeyAddOrEdit = ({
    keyAddOrEditModalVisibleModalTwo,formLoading,formType,formData,
    modalTwoFormAddOrEditKeySubmit,
    modalTwoFormAddOrEditKeyCancel,
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
        modalTwoFormAddOrEditKeySubmit(data,formType);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalTwoFormAddOrEditKeyCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: formType=='CreateKeyModalTwo'?'新增关键词':
           formType=='EditKeyModalTwo'?'编辑关键词':'',
    maskClosable : false,
    visible : keyAddOrEditModalVisibleModalTwo,
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
    <Modal {...modalOpts} className={style.PublicModalTopicAdd}>
      <Form horizontal>
        <FormItem
          label="关键词名称："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('themeName', {
            initialValue:formType=='EditKeyModalTwo'?formData.themeName:'',
            rules: [
              { required: true, message: '关键词名称未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写关键词名称'/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

PublicModalKeyAddOrEdit.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formType : PropTypes.any,
    modalTwoFormAddOrEditKeyCancel : PropTypes.func,
    modalTwoFormAddOrEditKeySubmit : PropTypes.func,
    keyAddOrEditModalVisibleModalTwo : PropTypes.any,
};

export default Form.create()(PublicModalKeyAddOrEdit);
