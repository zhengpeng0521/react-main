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
const PublicModalCommentAddOrEdit = ({
    commentAddOrEditModalVisibleModalTwo,formLoading,formType,formData,
    modalTwoFormAddOrEditCommentSubmit,
    modalTwoFormAddOrEditCommentCancel,
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
        modalTwoFormAddOrEditCommentSubmit(data,formType);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalTwoFormAddOrEditCommentCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: formType=='CreateCommentModalTwo'?'新增测评项目':
           formType=='UpdateCommentModalTwo'?'编辑测评项目':'未指定',
    maskClosable : false,
    visible : commentAddOrEditModalVisibleModalTwo,
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
    <Modal {...modalOpts} className={style.PublicModalCommentAdd}>
      <Form horizontal>
        <FormItem
          label="测评项目名称："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('articleName', {
            initialValue:formType=='UpdateCommentModalTwo'?formData.articleName:'',
            rules: [
              { required: true, message: '测评项目名称未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写测评项目名称'/>
          )}
        </FormItem>

        <FormItem
          label="测评项目URL："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('articleUrl', {
            initialValue:formType=='UpdateCommentModalTwo'?formData.articleUrl:'',
            rules: [
              { required: true, message: '测评项目URL未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写测评项目URL'/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

PublicModalCommentAddOrEdit.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formType : PropTypes.any,
    modalTwoFormAddOrEditCommentCancel : PropTypes.func,
    modalTwoFormAddOrEditCommentSubmit : PropTypes.func,
    commentAddOrEditModalVisibleModalTwo : PropTypes.any,
};

export default Form.create()(PublicModalCommentAddOrEdit);
