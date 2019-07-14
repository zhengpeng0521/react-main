import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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

const SaasScrmOverViewYingXiaoZiXunAddOrEditModal = ({
    addOrEditSaasScrmOverViweYingXiaoZiXunModalType,       //营销咨询新增修改类型('add'/'edit')
    addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible,    //营销咨询modal是否显示
    addOrEditSaasScrmOverViweYingXiaoZiXunModalData,       //营销咨询编辑时回填数据
    addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading,   //营销咨询按钮是否加载状态

    AddOrEditSaasScrmOverViweYingXiaoZiXunModalSubmit,     //营销咨询表单提交
    AddOrEditSaasScrmOverViweYingXiaoZiXunModalCancel,     //营销咨询关闭modal

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
            let data = getFieldsValue();

            AddOrEditSaasScrmOverViweYingXiaoZiXunModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSaasScrmOverViweYingXiaoZiXunModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditSaasScrmOverViweYingXiaoZiXunModalType ? '新增营销咨询' : '编辑营销咨询',
        maskClosable : false,
        visible : addOrEditSaasScrmOverViweYingXiaoZiXunModalVisible,
        closable : true,
        width : 650,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading}
                    loading={addOrEditSaasScrmOverViweYingXiaoZiXunButtonLoading}>保存</Button>
        ],
    };

    //校验外链
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('填写内容不能为空'));
        }else{
            callback();
        }
    }


    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                        label="标题"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('title', {
                            initialValue : addOrEditSaasScrmOverViweYingXiaoZiXunModalType == 'edit' && addOrEditSaasScrmOverViweYingXiaoZiXunModalData.title ? addOrEditSaasScrmOverViweYingXiaoZiXunModalData.title + '' : undefined,
                            rules: [
                                { required: true, message: '请填写标题' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="text" placeholder='请填写标题'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="外链"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('link', {
                            initialValue : addOrEditSaasScrmOverViweYingXiaoZiXunModalType == 'edit' && addOrEditSaasScrmOverViweYingXiaoZiXunModalData.link ? addOrEditSaasScrmOverViweYingXiaoZiXunModalData.link + '' : undefined,
                            rules: [
                                { required: true, message: '请填写外链' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="textarea" rows={3} placeholder='请填写外链'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasScrmOverViewYingXiaoZiXunAddOrEditModal);
