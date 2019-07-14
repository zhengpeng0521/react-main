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

const SaasModularManageAddOrEditModular = ({
    modularResType,                             //模块类型(1机构/2总部)
    addOrEditSaasModularModalType,              //模块管理新增修改类型('add'/'edit')
    addOrEditSaasModularModalVisible,           //模块管理modal是否显示
    addOrEditSaasModularModalData,              //模块管理编辑时回填数据
    addOrEditSaasModularButtonLoading,          //模块管理按钮是否加载状态

    AddOrEditSaasModularModalSubmit,            //模块新增编辑表单提交
    AddOrEditSaasModularModalCancel,            //关闭modal
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
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            //处理机构类型
            values.resType = modularResType;
            AddOrEditSaasModularModalSubmit(values);
        });
    }

    //判断输入的价格
    function checkPrice(rule, value, callback){
        if (!/^[0-9].*$/.test(value)) {
            callback(new Error('套餐价格不合法，必须是自然数或正小数'));
        }else {
            callback();
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSaasModularModalCancel();
    }

    let modalTitleSuffix = modularResType == '1' ? '机构' : modularResType == '2' ? '总部' : '';

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditSaasModularModalType ? '新增模块' + `（${modalTitleSuffix}）` : '编辑模块' + `（${modalTitleSuffix}）`,
        maskClosable : false,
        visible : addOrEditSaasModularModalVisible,
        closable : true,
        width : 650,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={addOrEditSaasModularButtonLoading}
                    loading={addOrEditSaasModularButtonLoading}>保存</Button>
        ],
    };

    //校验套餐名称
    function checkName(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('套餐名称不能为空'));
        }else{
            callback();
        }
    }

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                        label="名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue : addOrEditSaasModularModalType == 'edit' && addOrEditSaasModularModalData.name ? addOrEditSaasModularModalData.name + '' : undefined,
                            rules: [
                                { required: true, message: '请填写模块名称' },{validator: checkName},
                            ],
                        })(
                            <Input type="text" placeholder='请填写模块名称'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Code"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('code', {
                            initialValue : addOrEditSaasModularModalType == 'edit' && addOrEditSaasModularModalData.code ? addOrEditSaasModularModalData.code + '' : undefined,
                        })(
                            <Input type="text" placeholder='请填写Code'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="简介"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('intro', {
                            initialValue : addOrEditSaasModularModalType == 'edit' && addOrEditSaasModularModalData.intro ? addOrEditSaasModularModalData.intro + '' : undefined,
                        })(
                            <Input type="textarea" placeholder='请填写简介' rows={4}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasModularManageAddOrEditModular);
