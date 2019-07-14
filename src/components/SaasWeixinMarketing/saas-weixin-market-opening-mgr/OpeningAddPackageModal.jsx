import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, DatePicker  } from 'antd';
import style from './OpeningMgr.less';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
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

const OpeningAddPackageModal = ({
    addPackageModalVisible,
    addPackageModalButtonLoading,
    addPackageModalSelectContent,
    addPackageModalTransferAllcontent,
    addPackageModalTransferTargetContent,
    tenantSearchType,                           //机构搜索方式(0按机构和机构手机号/1按租户查询)
    tenantSelectVisible,                        //租户搜索下拉列表是否显示
    tenantSelectContent,                        //租户搜索下拉列表内容

    addPackageModalCancel,
    addPackageModalTransferhandleChange,
    addPackageModalCheckPackageType,
    addPackageModalSubmit,
    addPackageModalSearchOrgName,
    ChooseQueryType,                            //选择搜索方式onChange事件
    SearchTenant,                               //搜索租户列表
    ChooseTenant,                               //选择租户并查询租户下所有机构
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    /*租户下拉列表数据*/
    let tenant = [];
    if(tenantSelectContent && tenantSelectContent.length > 0){
        tenant = tenantSelectContent.map((item) => {
            return(
                <Option value={item.id+''} key={item.id+''}>
                    {item.name}
                </Option>
            );
        });
    }

    let children = [];
    if( addPackageModalSelectContent && addPackageModalSelectContent.length > 0 ){
        children = addPackageModalSelectContent.map((item) => {
            return(
                <Option value={item.id} key={item.id}>{item.title}</Option>
            );
        });
    }

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors) => {
            if (!!errors) {
                return;
            }
            let data = getFieldsValue();
            if(addPackageModalTransferTargetContent.length == 0){
                message.error('请选择机构');
                return;
            }
            const rangeValue = getFieldValue('time');
            if(rangeValue != undefined && rangeValue != null && rangeValue != ''){
                data.expireTime = rangeValue.format('YYYY-MM-DD HH:mm:ss');
            }
            data.organIdArray = JSON.stringify(addPackageModalTransferTargetContent);

            delete data.org;
            delete data.orgName;
            delete data.time;
            addPackageModalSubmit(data);
            resetFields();
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        addPackageModalCancel();
    }

    /*查看套餐类型*/
    function checkPackage(){
        let value = getFieldValue('mealId');
        if(value == undefined || value == null || value == ''){
            message.error('请先选择套餐类型');
            return;
        }else{
            addPackageModalCheckPackageType(value);
        }
    }

    //时间选择器时间范围限制
    function disabledDate(current) {
        return current && current.valueOf() < Date.now();
    }

    //模态框的属性
    let modalOpts = {
    title: '开通套餐',
    maskClosable : false,
    visible : addPackageModalVisible,
    closable : true,
    width : 800,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={addPackageModalButtonLoading}
                loading={addPackageModalButtonLoading}>保存</Button>
    ],
  };

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                        label="搜索方式"
                        {...formItemLayout}
                        >
                            {getFieldDecorator('searchType', {
                                initialValue : '1',
                                rules: [
                                    { required: true, message: '请填写搜索方式' },
                                ],
                            })(
                                <Select placeholder="请选择搜索方式" style={{ width : 200 }} onChange={ChooseQueryType}>
                                    <Option value='0'>按机构名称或者机构手机号查询</Option>
                                    <Option value='1'>按租户查询</Option>
                                </Select>
                            )}
                    </FormItem>
                </Form>
                { tenantSearchType == '0' ?
                    <Form>
                        <div style={{position:'relative'}}>
                            <FormItem
                                label="搜索机构"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('orgName', {
                                })(
                                     <Input placeholder='请输入机构名称或手机号' style={{ width : 200 }}/>
                                )}
                            </FormItem>
                            <span><a className={style.check} style={{position:'absolute',left:'340px',top:'7px'}} onClick={() => addPackageModalSearchOrgName (getFieldValue('orgName'))}>搜索</a></span>
                        </div>
                    </Form>
                    :
                  tenantSearchType == '1' ?
                    <Form inline style={{ marginBottom:'22.5px' }}>
                        <div style={{position:'relative'}}>
                            <FormItem
                                label="搜索条件"
                                labelCol = {{ span: 10}}
                                wrapperCol = {{span: 12}}
                                style={{marginLeft:'41px'}}
                            >
                                {getFieldDecorator('id')(
                                    <Input placeholder="租户ID" style={{ width : 150 }} />
                                )}
                            </FormItem>
                            <FormItem
                                labelCol = {{ span: 9}}
                                wrapperCol = {{span: 12}}
                                style={{marginLeft:'30px'}}
                            >
                                {getFieldDecorator('name')(
                                    <Input placeholder="租户名称" style={{ width : 150 }} />
                                )}
                            </FormItem>
                            <FormItem
                                labelCol = {{ span: 9}}
                                wrapperCol = {{span: 12}}
                                style={{marginLeft:'4px'}}
                            >
                                {getFieldDecorator('tel')(
                                    <Input placeholder="租户手机号" style={{ width : 150 }} />
                                )}
                            </FormItem>
                            <span><a className={style.check} style={{position:'absolute',top:'7px'}} onClick={() => SearchTenant(getFieldValue('id'),getFieldValue('name'),getFieldValue('tel'))}>搜索</a></span>
                        </div>
                    </Form>
                    :
                    null
                }
                <Form>
                    { tenantSelectVisible == true ?
                        <FormItem
                            label="选择租户"
                            {...formItemLayout}
                            >
                                {getFieldDecorator('tenantSelect')(
                                    <Select placeholder="请选择租户" style={{ width : 200 }} onChange={ChooseTenant}>
                                        { tenant || [] }
                                    </Select>
                                )}
                        </FormItem>
                        :
                        null
                    }
                    <FormItem
                        label="选择机构"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('org', {
                        })(
                            <Transfer
                                dataSource={addPackageModalTransferAllcontent}
                                targetKeys={addPackageModalTransferTargetContent}
                                operations={['加入', '退出']}
                                onChange={addPackageModalTransferhandleChange}
                                listStyle={{ width: 246 , height: 200 }}
                                titles={['全部机构','已选机构']}
                                render={item => item.title}
                              />
                        )}
                    </FormItem>
                    <div style={{position:'relative'}}>
                        <FormItem
                            label="选择套餐"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('mealId', {
                                rules: [
                                    { required: true, message: '请填写套餐名称' },
                                ],
                            })(
                                <Select placeholder="请选择套餐" style={{ width : 150 }}>
                                    { children || [] }
                                </Select>
                            )}
                        </FormItem>
                        <span style={{position:'absolute',top:'7px',left:'290px'}}><a className={style.check} onClick={checkPackage}>查看套餐</a></span>
                    </div>
                    <FormItem
                        label="到期时间"
                        {...formItemLayout}
                    >
                    {getFieldDecorator('time', {
                        rules: [
                            { type:'object', required: true, message: '请选择到期时间' },
                        ],
                    })(
                        <DatePicker
                          disabledDate={disabledDate}
                        />
                    )}
                    </FormItem>
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
    );
};

export default Form.create()(OpeningAddPackageModal);
