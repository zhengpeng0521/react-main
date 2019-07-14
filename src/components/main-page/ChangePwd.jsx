import React from 'react';
import changeFormItem from './ChangePwd.json';
import { Modal , Form , Button , Input , Spin } from 'antd';

const formItemLayout = {
    labelCol : { span: 4 },
    wrapperCol : { span: 18 },
};

//修改密码
const ChangePwd = ({
    dp,
    changePwdModalVisible,      //修改密码表单是否显示
    changePwdModalLoading,      //修改密码加载状态
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        setFieldsValue,
    },
  }) => {

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,data) => {
            if (!!errors) {
                return;
            }
            dp('mainMenu/ChangePwd',data)
        })
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        dp('mainMenu/updateState' , { changePwdModalVisible : false })
    }

    //模态框的属性
    let modalOpts = {
        title: '修改密码',
        maskClosable : false,
        visible : changePwdModalVisible,
        closable : true,
        width : 585,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>关闭</Button>,
            <Button key="submit" type="primary" onClick={handleComplete} loading = { changePwdModalLoading } disabled = { changePwdModalLoading }>确认</Button>
        ],
    }

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { changePwdModalLoading }>
                { changeFormItem && changeFormItem.map((item,index) =>
                    <Form.Item
                        key = { item.key }
                        label = { item.label }
                        {...formItemLayout}
                    >
                        {getFieldDecorator(item.key, {
                            rules: [
                                { required : true, message : `请填写${item.label}` }
                            ],
                        })(
                            <Input placeholder = { `请填写${item.label}` } size='default' type = { item.type } onPressEnter = { handleComplete }/>
                        )}
                    </Form.Item>
                ) }
            </Spin>
        </Modal>
    );
};

export default Form.create()(ChangePwd);
