import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Select, Cascader, Checkbox, Upload, Icon, Radio } from 'antd';
import style from './TenantMessage.less';
import ChinaDivision from './CascaderAddressOptions';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const formItemLayoutWithoutLabel = {
    wrapperCol : {
        span   : 18,
        offset : 4,
    }
}

/*新增编辑租户modal*/
const TenantMessageAddTetModal = ({
    addOrEditTetModalVisible,               //新增编辑校区modal是否显示
    addOrEditTetModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
    checkTenantTypeDetailMsg,               //机构类型
    checkOrEditTetDetailMsg,                //新增编辑租户信息

    AddOrEditTetModalSubmit,                //新增编辑校区提交
    AddOrEditTetModalCancel,                //新增编辑校区modal关闭

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

    let schoolType = [];
    if(!!checkTenantTypeDetailMsg && checkTenantTypeDetailMsg.length > 0){
        schoolType = checkTenantTypeDetailMsg.map((item,index) => {
            return(
                <Option key = { index } value = { item.value }>{ item.name }</Option>
            );
        })
    }

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,data) => {
            if (!!errors) {
                return;
            }

            //处理省市区
            /*if(data.addrColumn[0] == '' || data.addrColumn[0] == null || data.addrColumn[0] == undefined){
                message.warn('请填写所在地址');
                return;
            }
            if((data.addrColumn[1] == '' || data.addrColumn[1] == null || data.addrColumn[1] == undefined) && (data.addrColumn[2] != '' || data.addrColumn[2] != null || data.addrColumn[2] != undefined)){
                message.warn('请填写所在地址');
                return;
            }*/

            if(!!data.addrColumn && !!data.addrColumn.length > 0){
                data.privince = data.addrColumn[0];
                if(data.addrColumn[1] != null && data.addrColumn[1] != undefined && data.addrColumn[1] != ''){
                    if(data.addrColumn[1] == '市辖区' || data.addrColumn[1] == '县'){
                        data.city = data.addrColumn[0];
                    }else{
                        data.city = data.addrColumn[1];
                    }
                }else{
                    data.city = undefined;
                }
                if(data.addrColumn[2] != null && data.addrColumn[2] != undefined && data.addrColumn[2] != ''){
                    if(data.addrColumn[2] == '市辖区' || data.addrColumn[2] == '县'){
                        data.area = data.addrColumn[1];
                    }else{
                        data.area = data.addrColumn[2];
                    }
                }else{
                    data.area = undefined;
                }
                data.addrColumn = JSON.stringify(getFieldValue('addrColumn'));
            }
            AddOrEditTetModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditTetModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '新增租户',
        maskClosable : false,
        visible : addOrEditTetModalVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={addOrEditTetModalButtonLoading}
                    loading={addOrEditTetModalButtonLoading}
                    style={{marginLeft:'10px'}}>保存</Button>
        ],
        className : 'zj_org_manage_modal'
    };

    /*检验联系方式*/
    function checkMobile(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(!(/^\d+$/.test(value))){
            callback(new Error('请输入数字'));
        }else{
            callback();
        }
    }

    /*检验是否只输入了空格*/
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('输入不能为空'));
        }else{
            callback();
        }
    }

    return (
        <Modal {...modalOpts}>
            <Form className='zj_org_manage_form'>
                <div style={{width:'100%',height:'30px',margin:'20px 0 0 38px'}}>
                    <div style={{float:'left',height:'30px',width:'15px',backgroundColor:'#2f4151',borderRadius:'3px'}}></div>
                    <span style={{float:'left',height:'30px',lineHeight:'30px',marginLeft:'10px',fontSize:'14px',fontWeight:'700'}}>租户信息</span>
                </div>
                <FormItem
                    label="租户名称"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('tenantName', {
                        rules: [
                            { required : true , message : '请填写租户名称' , whitespace : true }
                        ],
                    })(
                        <Input placeholder='请填写租户名称' size='default' style = {{ width : 300 }}/>
                    )}
                </FormItem>
                <FormItem
                    label="机构类型"
                    {...formItemLayout}
                >
                    {getFieldDecorator('schoolType', {
                        rules: [
                            { required: true, message: '请选择机构类型' },
                        ],
                    })(
                        <Select placeholder = '请选择机构类型' size='default' style={{width:'300px'}}>
                            { schoolType || [] }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="联系人"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('userName', {
                        rules: [
                            { required : true , message : '请填写联系人' },
                            { validator : checkWetherSpace }
                        ],
                    })(
                        <Input type="text" placeholder='请填写联系人' size='default' style={{width:'300px'}}/>
                    )}
                </FormItem>
                <FormItem
                    label="联系方式"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('tel', {
                        rules: [
                            { required: true, message: '请填写联系方式' },{validator: checkMobile}
                        ],
                    })(
                        <Input type="text" placeholder='请填写联系方式' size='default' style={{width:'300px'}}/>
                    )}
                </FormItem>
                <FormItem
                    label="所在地址"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('addrColumn', {
                        rules: [
                            { type:'array', message: '请选择所在地址' },
                        ],
                    })(
                        <Cascader placeholder='请选择所在地址' options={ChinaDivision} changeOnSelect size='default'/>
                    )}
                </FormItem>
                <FormItem
                    label="详细地址"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('addr', {
                        rules: [
                            { message : '请填写详细地址' },
                            { validator : checkWetherSpace },
                        ],
                    })(
                        <Input size='default' placeholder='请填写详细地址'/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(TenantMessageAddTetModal);
