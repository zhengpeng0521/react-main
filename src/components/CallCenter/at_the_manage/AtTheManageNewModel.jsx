import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


const AtTheManageNewModal = ({
    atTheManageNewModalVisible,    //模态框显示状态
    atTheManageNewModalSave,
    atTheManageModalCancel,        //关闭模态框
    //机构
    atTheManageModalSearchOrgName,          //搜索机构名称
    atTheManageModelAllcontent,             //左边全部数据
    atTheManageModelTransferTargetContent,  //右边已选中数据
    atTheManageModalTransferhandleChange,   //选项在两栏之间转移时的回调函数
    //账号
    atTheManageModalSearchAccount,                 //搜索账号
    atTheManageModelAccountAllcontent,             //左边全部数据
    atTheManageModelAccountTransferTargetContent,  //右边已选中数据
    atTheManageModalAccountTransferhandleChange,   //选项在两栏之间转移时的回调函数

    atTheManageNewLoading,
    atTheManageNewDisabled,
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
        validateFieldsAndScroll((errors) => {
            if (!!errors) {
                return;
            }

            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        atTheManageModalCancel();
    }


    //模态框的属性
    let modalOpts = {
        title: '新增坐席',
        maskClosable : false,
        visible : atTheManageNewModalVisible,
        closable : true,
        width : 900,
        onOk: atTheManageNewModalSave,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={atTheManageNewModalSave}
                    loading = { atTheManageNewLoading } disabled = { atTheManageNewDisabled }>保存</Button>
        ],
      };

    return (
        <div className='zj_modal_header'>
            <div>
                <Modal {...modalOpts}>
                    <Form>
                        <FormItem
                            label="搜索机构"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('orgName', {
                            })(
                                 <Input placeholder='请输入机构名称或ID进行搜索' style={{ width : 300 }}/>
                            )}
                            <span><a style={{position:'absolute',left:'320px',fontSize:'15px'}} onClick={() => atTheManageModalSearchOrgName (getFieldValue('orgName'))}>搜索</a></span>
                        </FormItem>
                        <FormItem
                            label="选择机构"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('org', {
                            })(
                                <Transfer
                                    dataSource={atTheManageModelAllcontent}
                                    targetKeys={atTheManageModelTransferTargetContent}
                                    operations={['加入', '退出']}
                                    onChange={atTheManageModalTransferhandleChange}
                                    listStyle={{ width: 246 , height: 200 }}
                                    titles={['全部机构','已选机构']}
                                    render={item => item.title}
                                  />
                            )}
                        </FormItem>
                        <FormItem
                            label="搜索账号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('account', {
                            })(
                                 <Input placeholder='请输入姓名或者手机号进行搜索' style={{ width : 300 }}/>
                            )}
                            <span><a style={{position:'absolute',left:'320px',fontSize:'15px'}} onClick={() => atTheManageModalSearchAccount (getFieldValue('account'))}>搜索</a></span>
                        </FormItem>
                        <FormItem
                            label="选择账号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('accountNum', {
                            })(
                                <Transfer
                                    dataSource={atTheManageModelAccountAllcontent}
                                    targetKeys={atTheManageModelAccountTransferTargetContent}
                                    operations={['请加入已选账号', '退出已选账号']}
                                    onChange={atTheManageModalAccountTransferhandleChange}
                                    listStyle={{ width: 246 , height: 200 }}
                                    titles={['全部账号','已选账号']}
                                    render={item => item.title}
                                  />
                            )}
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(AtTheManageNewModal);
