import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const OrganRegisterEditH5HrefModal = ({
    htmlDetailId,
    htmlText,
    htmlhref,
    editHrefVisible,
    editHrefButtonLoading,
    editHrefModalSubmit,
    editHrefModalCancel,
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
            if (!!errors) {
                return;
            }
            let data = { ...getFieldsValue()};
            if(data.linkText && data.linkText.length>30){
                message.error('文案长度不能超过30个字符');
                return;
            }
            data.id = htmlDetailId;
            console.info(data);
            editHrefModalSubmit(data);
            resetFields();
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        editHrefModalCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: '编辑免费申请H5外链文案',
    maskClosable : false,
    visible : editHrefVisible,
    closable : true,
    width : 650,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={editHrefButtonLoading}
                loading={editHrefButtonLoading}>保存</Button>
    ],
  };

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form horizontal>
                    <FormItem htmlText
                        label="H5外链文案说明"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('linkText', {
                            initialValue: htmlText != ''? htmlText : '',
                        })(
                            <Input type="text" placeholder='请填写H5外链文案说明'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="H5外链"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('link', {
                            initialValue: htmlhref != ''? htmlhref : '',
                        })(
                            <Input type="text" placeholder='请填写H5外链'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(OrganRegisterEditH5HrefModal);
