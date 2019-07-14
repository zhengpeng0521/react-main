import React, { PropTypes } from 'react';
import { Form, Input, Modal,Button, Select, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const Password = ({
    formLoading, PasswordFormVisible,PassWordSubmit,formCancel,
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
        //e.preventDefault();
        validateFieldsAndScroll((errors) => {
        if (errors) {
            return;
        }
        let data = { ...getFieldsValue()};
        PassWordSubmit(data);
        });
    }

    function handleCancel(e) {
        //e.preventDefault();
        formCancel();
    }

    document.onkeydown = function(e){
        if(!e){
            e = window.event;
        }
        if((e.keyCode || e.which) == 13){
            handleComplete();
        }
    }
    const modalOpts = {
        title: '账号密码',
        visible : PasswordFormVisible,
        onOk : handleComplete,
        onCancel : handleCancel,
        maskClosable : false,
        closable : true,
        footer : [
            <Button key="submit" type="primary" size="large" onClick={handleComplete}>提交</Button>,
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>放弃</Button>,
        ],
    };

    return (
        <Modal {...modalOpts}>
            <Form inline >
                <FormItem>
                  {getFieldDecorator('userName', {
                  })(
                    <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                  })(
                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                  )}
                </FormItem>
            </Form>
        </Modal>
    );
};

Password.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    PasswordFormVisible : PropTypes.any,
    formCancel : PropTypes.func,
    PassWordSubmit : PropTypes.func,
};

export default Form.create()(Password);
