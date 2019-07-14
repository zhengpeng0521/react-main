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

const SaasPackageManageAddOrEditModal = ({
    modularResType,                             //模块类型(1机构/2总部)
    addOrEditSaasPackageModalType,              //套餐管理新增修改类型('add'/'edit')
    addOrEditSaasPackageModalVisible,           //套餐管理modal是否显示
    addOrEditSaasPackageModalData,              //套餐管理编辑时回填数据
    addOrEditSaasPackageButtonLoading,          //套餐管理按钮是否加载状态

    addOrEditSaasPackageransferAllContent,      //穿梭框内所有模板的值
    addOrEditSaasPackageTransferTargetContent,  //穿梭框所选中的模板

    ModularResTypeOnChange,                     //切换系统类型(1机构/2总部)

    AddOrEditSaasPackageModalSubmit,            //表单提交
    AddOrEditSaasPackageModalCancel,            //关闭modal

    AddOrEditFormActivityTransferhandleChange,  //穿梭框onChange事件
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
            if(addOrEditSaasPackageTransferTargetContent.length == 0){
                message.error('请至少选择一个模块');
                return;
            }
            data.modules = addOrEditSaasPackageTransferTargetContent.join(',');
            AddOrEditSaasPackageModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSaasPackageModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditSaasPackageModalType?'新增套餐':'编辑套餐',
        maskClosable : false,
        visible : addOrEditSaasPackageModalVisible,
        closable : true,
        width : 650,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={addOrEditSaasPackageButtonLoading}
                    loading={addOrEditSaasPackageButtonLoading}>保存</Button>
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

    //校验套餐价格
    function checkPrice(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(!(/^\d+(\.\d+)?$/.test(value))){
            callback(new Error('价格输入有误，请检查是否非数字，超出限额或者小于等于0'));
        }else if(!(/^\d+(\.\d{1,2})?$/.test(value))){
            callback(new Error('价格输入有误，不能超过小数点后两位'));
        }else{
            callback();
        }
    }

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                        label="套餐名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue : addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.name ? addOrEditSaasPackageModalData.name+'' : undefined,
                            rules: [
                                { required: true, message: '请填写套餐名称' },{validator: checkName},
                            ],
                        })(
                            <Input type="text" placeholder='请填写套餐名称'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="价格"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('price', {
                            initialValue : addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.price ? addOrEditSaasPackageModalData.price + '' : undefined,
                            rules: [
                                { required: true, message: '请填写价格' },{validator: checkPrice},
                            ],
                        })(
                            <Input type="text" placeholder='请填写价格'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="系统类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('resType', {
                            initialValue : addOrEditSaasPackageModalType == 'add' ? modularResType : (addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.resType) ? addOrEditSaasPackageModalData.resType + '' : undefined,
                            rules: [
                                { required: true, message: '系统类型' },
                            ],
                        })(
                            <RadioGroup onChange = { ModularResTypeOnChange } disabled = { addOrEditSaasPackageModalType == 'edit' }>
                                <Radio value='1'>机构</Radio>
                                <Radio value='2'>总部</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="单位"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('unitType', {
                            initialValue : addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.unitType ? addOrEditSaasPackageModalData.unitType+'' : undefined,
                            rules: [
                                { required: true, message: '请选择单位' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value='2'>月</Radio>
                                <Radio value='1'>季</Radio>
                                <Radio value='3'>年</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('free', {
                            initialValue : addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.free ? addOrEditSaasPackageModalData.free+'' : addOrEditSaasPackageModalType == 'add' ? '0' : undefined,
                            rules: [
                                { required: true, message: '类型' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value='0'>收费</Radio>
                                <Radio value='1'>免费</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="包含模块"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('modules', {
                        })(
                            <Transfer
                                dataSource = {addOrEditSaasPackageransferAllContent}
                                targetKeys = {addOrEditSaasPackageTransferTargetContent}
                                showSearch
                                operations = {['加入', '退出']}
                                onChange = {AddOrEditFormActivityTransferhandleChange}
                                listStyle = {{ width: 197.7 , height: 250 }}
                                titles = {['全部模块','已选模块']}
                                render = {item => item.title}
                              />
                        )}
                    </FormItem>
                    <FormItem
                        label="简介"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('intro', {
                            initialValue : addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.intro ? addOrEditSaasPackageModalData.intro+'' : undefined,
                        })(
                            <Input type="textarea" placeholder='请填写简介' rows={4}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasPackageManageAddOrEditModal);
