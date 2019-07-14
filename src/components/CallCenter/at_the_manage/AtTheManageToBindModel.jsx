import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, message,Select } from 'antd';
const FormItem = Form.Item;
let Option = Select.Option;
const AtTheManageToBind = ({
    atTheManageToBindModalVisible,
    atTheManageToBindModalCancel,  //关闭
    atTheManageToBindModalSave,    //保存
    tenantUserName,  //原员工
    accCallOut,      //外呼账号
    employeeArr,     //新员工
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
        validateFieldsAndScroll((errors,value) => {
            if (!!errors) {
                return;
            }
            console.log('value',value)
            atTheManageToBindModalSave(value);
            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        atTheManageToBindModalCancel();
    }

    //下拉框事件
    function handleChange(){

    }

    //新员工下拉框
    let employeeChildren = [];
    if(employeeArr && employeeArr.length > 0){
        employeeChildren = employeeArr.map((item,index) => {
             let status = undefined;
             if(item.status=='1'){
                 status = '未激活'
             }else if(item.status=='2'){
                 status = '已开通'
             }else if(item.status=='3'){
                 status = '已过期'
             }
             if(item.status=='1'){
                 return (<Option value={item.userId+''} key={item.userId+''}>{item.userName+'('+status+')'}</Option>);
             }else{
                 return (<Option value={item.userId+''} key={item.userId+''} disabled>{item.userName+'('+status+')'}</Option>);
             }

        });
    }
    //模态框的属性
    let modalOpts = {
        title: '坐席改绑',
        maskClosable : false,
        visible : atTheManageToBindModalVisible,
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
                            label="外呼账号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('b', {
                                initialValue :accCallOut,
                            })(
                                <Input disabled/>
                            )}
                        </FormItem>
                        <FormItem
                            label="原员工"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('a', {
                                initialValue :tenantUserName,
                            })(
                                <Input disabled/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="新员工"
                        >
                            {getFieldDecorator('c', {
                                rules: [{
                                    required: true, message: '请选择改绑后的员工',
                                }],
                            })(
                                <Select
                                    notFoundContent = "未找到"
                                    showSearch
                                    optionFilterProp = "children"
                                    style={{width:'240px'}} onChange={ handleChange } placeholder='请选择改绑后的员工' >
                                    { employeeChildren || [] }
                                </Select>
                          )}
                    </FormItem>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(AtTheManageToBind);
