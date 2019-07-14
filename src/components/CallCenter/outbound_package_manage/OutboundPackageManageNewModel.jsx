import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Icon, message, Select, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const OutboundPackageManageNewModel = ({
    OutboundPackageNewModalVisible,                     //模态框显示状态
    OutboundPackageNewModalCancel,                      //关闭模态框
    OutboundPackageNewModalSave,                        //保存
    ChooseQueryType,                                    //产品类型选择事件
    OutboundPackageType,                                //产品类型标志
    SalesProductSetupDetail,                            //编辑时详情数据
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
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            if(OutboundPackageType=='0'){
                    values.saleUnit = '年'
            }else{
                values.saleUnit = '分钟'
            }
            if(SalesProductSetupDetail.proType){  //编辑时
                values.id = SalesProductSetupDetail.id
            }
            OutboundPackageNewModalSave(values)

            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        OutboundPackageNewModalCancel();
    }
    //金钱校验
    function checkMoney(rule, value, callback) {
        if(value == '' || value == undefined || value == null){
            callback();
        }else if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('数字格式不正确,最多保留两位小数'));
        }else {
            callback();
        }
	}
    let mainTitle = '';
    if(SalesProductSetupDetail.proType){
        mainTitle = '编辑产品'
    }else{
        mainTitle = '新增产品'
    }
    //模态框的属性
    let modalOpts = {
        title: mainTitle,
        maskClosable : false,
        visible : OutboundPackageNewModalVisible,
        closable : true,
        width : 650,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}>保存</Button>
        ],
      };

    let salePrice = ''
    if(SalesProductSetupDetail.salePrice){
        salePrice = SalesProductSetupDetail.salePrice
    }
    let saleCost = ''
    if(SalesProductSetupDetail.saleCost){
        saleCost = SalesProductSetupDetail.saleCost
    }
    return (
        <div className='zj_modal_header'>
            <div>
                <Modal {...modalOpts}>
                    <Form>
                        <FormItem
                            label="产品类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('proType', {
                                initialValue : SalesProductSetupDetail.proType || undefined,
                                rules: [
                                    { required: true, message: '请选择产品类型' },
                                ],
                            })(
                                <Select placeholder="请选择产品类型" style={{ width : 200 }} onChange={ChooseQueryType}>
                                    <Option value='0'>坐席</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="产品名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('productName', {
                                initialValue : SalesProductSetupDetail.productName || undefined,
                                rules : [
                                    { required : true , message : '请填写产品名称'},
                                ]
                            })(
                                <Input placeholder='请填写产品名称' style={{ width : 300 }}/>
                            )}
                        </FormItem>
                        <FormItem
                            label="售卖价格"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('salePrice', {
                                initialValue : salePrice || undefined,
                                rules : [
                                    { validator :  checkMoney },
                                    { required : true , message : '请填写售卖价格'},
                                ]
                            })(

                              <Input placeholder='请填写售卖价格' style={{ width : 300 }}/>

                            )}
                        </FormItem>
                        <FormItem
                            label="成本"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('saleCost', {
                                initialValue :saleCost || undefined,
                                rules: [
                                        { validator :  checkMoney },
                                        { required : true , message : '请填写成本'}
                                    ],

                            })(

                               <Input placeholder='请填写成本' style={{ width : 300 }}/>

                            )}
                        </FormItem>
                        <FormItem
                            label="单位"
                            {...formItemLayout}
                            style={{lineHeight:'12px'}}
                        >
                            {getFieldDecorator('saleUnit',{
                                initialValue :'0',
                                rules : [
                                    { required : true , message : '请填写成本'},
                                ]
                            })(
                                <RadioGroup>
                                  <Radio value="0">年</Radio>
                                </RadioGroup>
                            )}

                        </FormItem>
                        <FormItem
                            label="简介"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('content', {
                                initialValue : SalesProductSetupDetail.content || undefined,
                            })(
                                <Input type="textarea" rows={4} style={{ width : 300 }} placeholder='请填写简介'/>
                            )}
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(OutboundPackageManageNewModel);
