import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Icon,DatePicker } from 'antd';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

/*编辑租户modal*/
const OpenUpAddOrEditModal = ({
    addOrEditTeanantVisible,               //编辑校区modal是否显示
    addOrEditSupModalButtonLoading,         //编辑校区modal按钮是否在加载状态

    myData,                  //新增编辑租户的信息
    AddOrEditOpenUpSubmit,                //编辑校区提交
    AddOrEditOpenUpCancel,                //编辑校区modal关闭

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
            data.startTime = data.expireTime[0].format('YYYY-MM-DD HH:mm:ss');
            data.expireTime = data.expireTime[1].format('YYYY-MM-DD HH:mm:ss');
            AddOrEditOpenUpSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditOpenUpCancel();
    }
    //模态框的属性
    let modalOpts = {
        title: '编辑',
        maskClosable : false,
        visible : addOrEditTeanantVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={addOrEditSupModalButtonLoading}
                    loading={addOrEditSupModalButtonLoading}
                    style={{marginLeft:'10px'}}>保存</Button>
        ],
        className : 'zj_org_manage_modal'
    };

    /*检验是否只输入了空格*/
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[u4E00-u9FA5]+$/.test(value)){
            callback(new Error('输入不能为空'));
        }else{
            callback();
        }
    }

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
                    <FormItem
                        label="租户号"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('tenantId', {
                            initialValue : myData && myData.tenantId ? myData.tenantId : undefined,
                            rules: [
                                { required: true, message: '请填写租户号' }
                            ],
                        })(
                            <Input type="text" placeholder='请填写租户号' size='default'/>
                        )}
                    </FormItem>

                    <FormItem
	                    { ...formItemLayout }
	                    label = "有效时间"
	                >
	                    { getFieldDecorator('expireTime', {
	                        initialValue: !!myData.startTime || !!myData.endTime ? [myData.startTime && moment(data.startTime, 'YYYY-MM-DD HH:mm:ss'), myData.endTime && moment(myData.endTime, 'YYYY-MM-DD HH:mm:ss')] : undefined,
	                        rules : [
	                            { required : true , message : '请选择售卖时间' }
	                        ]
	                    })(
	                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={['请选择上架时间', '请选择下架时间']}  />
	                    )}
	                </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(OpenUpAddOrEditModal);
