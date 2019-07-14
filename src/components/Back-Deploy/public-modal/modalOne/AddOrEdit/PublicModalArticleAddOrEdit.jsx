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

//模板1新增文章
const PublicModalArticleAdd = ({
    articleAddOrEditModalVisibleModalOne,formData,formLoading,formType,
    modalOneFormAddOrEditArticleSubmit,
    modalOneFormAddOrEditArticleCancel,
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
      modalOneFormAddOrEditArticleSubmit(data,formType);
    });
  }
    //判断封面
    function checkCover(rule, value, callback){
       if(value==undefined||value==''||value==null){
            callback(new Error('请选择图片'));
       }else{
            callback();
       }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalOneFormAddOrEditArticleCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: formType=='AddArticleModalOne'?'新增文章':
           formType=='EditArticleModalOne'?'编辑文章':'未指定',
    maskClosable : false,
    visible : articleAddOrEditModalVisibleModalOne,
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
    <Modal {...modalOpts} >
      <Form horizontal>
        <FormItem
          label="文章名称："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('articleName', {
            initialValue:formType=='EditArticleModalOne'?formData.articleName:'',
            rules: [
              { required: true, message: '文章名称未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写文章名称'/>
          )}
        </FormItem>

        <FormItem
          label="文章URL："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('articleUrl', {
            initialValue:formType=='EditArticleModalOne'?formData.articleUrl:'',
            rules: [
              { required: true, message: '文章URL未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写文章URL'/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

PublicModalArticleAdd.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formType : PropTypes.any,
    modalOneFormAddArticleCancel : PropTypes.func,
    modalOneFormAddArticleSubmit : PropTypes.func,
    articleAddOrEditModalVisibleModalOne : PropTypes.any,
};

export default Form.create()(PublicModalArticleAdd);
