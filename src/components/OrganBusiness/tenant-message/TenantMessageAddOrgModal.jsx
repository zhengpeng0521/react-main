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

/*新增编辑校区modal*/
const TenantMessageAddOrgModal = ({
    addOrEditOrgModalType,                  //新增编辑校区modal类型(总部hq/机构org)
    addOrEditOrgModalVisible,               //新增编辑校区modal是否显示
    addOrEditOrgModalButtonLoading,         //新增编辑校区modal按钮是否在加载状态
    checkOrEditOrgDetailMsg,                //新增编辑机构信息
    checkTenantTypeDetailMsg,               //学校类型

    AddOrEditOrgModalSubmit,                //新增编辑校区提交
    AddOrEditOrgModalCancel,                //新增编辑校区modal关闭

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

    //console.info('checkOrEditOrgDetailMsg',checkOrEditOrgDetailMsg)

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

            //处理ID
            data.orgId = checkOrEditOrgDetailMsg.id || undefined

            //处理省市区
            if(!!data.addrColumn && !!data.addrColumn.length > 0){
                data.privince = data.addrColumn[0];
                if(data.addrColumn[1] != null && data.addrColumn[1] != undefined && data.addrColumn[1] != ''){
                    if(data.addrColumn[1] == '市辖区' || data.addrColumn[1] == '县'){
                        data.city = data.addrColumn[0];
                    }else{
                        data.city = data.addrColumn[1];
                    }
                }else{
                    data.city = '';
                }
                if(data.addrColumn[2] != null && data.addrColumn[2] != undefined && data.addrColumn[2] != ''){
                    if(data.addrColumn[2] == '市辖区' || data.addrColumn[2] == '县'){
                        data.area = data.addrColumn[1];
                    }else{
                        data.area = data.addrColumn[2];
                    }
                }else{
                    data.area = '';
                }
                data.addrColumn = JSON.stringify(getFieldValue('addrColumn'));

            }
            AddOrEditOrgModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditOrgModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: addOrEditOrgModalType == 'hq' ? '总部' : '机构',
        maskClosable : false,
        visible : addOrEditOrgModalVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={addOrEditOrgModalButtonLoading}
                    loading={addOrEditOrgModalButtonLoading}
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
                    <span style={{float:'left',height:'30px',lineHeight:'30px',marginLeft:'10px',fontSize:'14px',fontWeight:'700'}}>基本信息</span>
                </div>
                <FormItem
                    label="机构名称"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('orgName', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.orgName || undefined,
                        rules: [
                            { required : true , message: '请填写机构名称' , whitespace : true },
                        ],
                    })(
                        <Input type="text" placeholder='请填写机构名称' size='default' style={{width:'300px'}}/>
                    )}
                </FormItem>
                { addOrEditOrgModalType == 'org' ?
                    <FormItem
                        label="机构类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('schoolType', {
                            initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.schoolType || undefined,
                            rules: [
                                { required: true, message: '请选择机构类型' },
                            ],
                        })(
                            <Select style={{width:'300px'}} placeholder = '请选择机构类型'>
                                { schoolType || [] }
                            </Select>
                        )}
                    </FormItem> : null
                }
                {/*<FormItem
                    label="营业类型"
                    {...formItemLayout}
                >
                    {getFieldDecorator('orgType', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.orgType || undefined,
                        rules: [
                            {message: '请选择营业类型' },
                        ],
                    })(
                        <RadioGroup>
                            <Radio value='1'>直营</Radio>
                            <Radio value='2'>加盟</Radio>
                            <Radio value='3'>代理</Radio>
                        </RadioGroup>
                    )}
                </FormItem>*/}
                <FormItem
                    label="联系人"
                    {...formItemLayout}
                >
                    {getFieldDecorator('userName', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.userName || undefined,
                        rules: [
                            { required: true, message: '请填写联系人', validator : checkWetherSpace }
                        ],
                    })(
                        <Input type="text" placeholder='请填写联系人' size='default' style={{width:'300px'}}/>
                    )}
                </FormItem>
                <FormItem
                    label="联系方式"
                    {...formItemLayout}
                >
                    {getFieldDecorator('tel', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.tel || undefined,
                        rules: [
                            { required: true, message: '请填写联系方式' },{validator: checkMobile}
                        ],
                    })(
                        <Input type="text" placeholder='请填写联系方式' size='default' style={{width:'300px'}}/>
                    )}
                </FormItem>
                <FormItem
                    label="校区介绍"
                    {...formItemLayout}
                >
                    {getFieldDecorator('intro',{
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.intro || undefined,
                    })(
                        <Input type="textarea" rows={4} placeholder='请填写校区介绍'/>
                    )}
                </FormItem>
                <div style={{width:'100%',height:'30px',margin:'20px 0 0 38px'}}>
                    <div style={{float:'left',height:'30px',width:'15px',backgroundColor:'#2f4151',borderRadius:'3px'}}></div>
                    <span style={{float:'left',height:'30px',lineHeight:'30px',marginLeft:'10px',fontSize:'14px',fontWeight:'700'}}>校区详情</span>
                </div>
                <FormItem
                    label="所在地址"
                    {...formItemLayout}
                >
                    {getFieldDecorator('addrColumn', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.addrColumn && JSON.parse(checkOrEditOrgDetailMsg.addrColumn) || [],
                        rules: [
                            { type:'array',},
                        ],
                    })(
                        <Cascader placeholder='请选择所在地址' options={ChinaDivision} changeOnSelect size='default'/>
                    )}
                </FormItem>
                <FormItem
                    label="详细地址"
                    {...formItemLayout}
                >
                    {getFieldDecorator('addr', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.addr || undefined,
                        rules: [
                            { message : '请填写详细地址' },
                            { validator : checkWetherSpace },
                        ],
                    })(
                        <Input size='default' placeholder='请填写详细地址'/>
                    )}
                </FormItem>
                <FormItem
                    label="营业时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('serverTime', {
                        initialValue : checkOrEditOrgDetailMsg && checkOrEditOrgDetailMsg.serverTime || undefined,
                        rules: [
                            { message : '请填写营业时间' },
                            { validator : checkWetherSpace },
                        ],
                    })(
                        <Input size='default' placeholder='请填写营业时间(可无限制自由填写)'/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(TenantMessageAddOrgModal);
