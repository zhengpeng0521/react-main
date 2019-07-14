import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, message } from 'antd';
const FormItem = Form.Item;

const UserManageCheckModal = ({
    userManageCheckModalVisible,
    userManageCheckModalCancel,  //关闭
    userManageCheckModalSave,    //保存
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    //表单布局
	let formItemLayout = {
		labelCol : { span : 4 },
		wrapperCol : { span : 18 }
	};
    //保存事件
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }

            userManageCheckModalSave(values);
            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        userManageCheckModalCancel();
    }


    //模态框的属性
    let modalOpts = {
        title: '客户审核',
        maskClosable : false,
        visible : userManageCheckModalVisible,
        closable : true,
        width : 550,
        height : 300,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}>保存</Button>
        ],
      };

    return (
        <div className='zj_modal_header'>
            <div>
                <Modal {...modalOpts}>
                    <Form>
                       <FormItem
                            label="备注"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('remark', {
                            })(
                                <Input type="textarea" rows={4} placeholder='请填写备注'/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(UserManageCheckModal);
