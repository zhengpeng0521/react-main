import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer ,Popconfirm ,Spin} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


const UserManageNewModal = ({
    userManageNewModalVisible,                  //模态框显示状态
    userManageModalButtonLoading,               //提交禁止状态
    userManageModalLoading,                     //页面加载指示
    userManageModalSearchOrgName,               //搜索机构名称
    userManageModalCancel,                      //关闭模态框
    userManageModalSave,                        //保存按钮
    userManageModelAllcontent,
    userManageModelTransferTargetContent,
    userManageModalTransferhandleChange,        //选项在两栏之间转移时的回调函数

    userManageModelDetail,                      //详情数据
    orgAddress,                                 //机构地址
    orgId ,                                     //机构id
    tenantIid,                                  //编辑主键id
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
            values.orgId = orgId;
            if(tenantIid){ //编辑时主键id
                values.id = tenantIid;
            }

            //营业执照
            var busLicenseImg = values.busLicense;
            let busLicenseStr = [];
            if(busLicenseImg && busLicenseImg.length > 0){
                busLicenseImg.map((item) => {
                    if(!!item.url){
                        busLicenseStr.push(item.url)
                    }else{
                        busLicenseStr.push(item.response.data.url)
                    }
                })
            }

            values.busLicense = busLicenseStr + '';
            //合同资料
            var contractImg = values.contract;
            var contractStr = [];
            if(contractImg && contractImg.length > 0){
                contractImg.map((item) => {
                    if(!!item.url){
                        contractStr.push(item.url)
                    }else{
                        contractStr.push(item.response.data.url)
                    }
                })
            }
            values.contract = contractStr + '';
            delete values.orgName;
            delete values.org;
            userManageModalSave(values);
            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        userManageModalCancel();
    }

    /*-----------------------图片属性--------------------*/
    //初始图片
    let picStrBusLicense = [];
    if( userManageModelDetail && userManageModelDetail.busLicense &&  userManageModelDetail.busLicense!=null){
        let busLicenseImgList = userManageModelDetail.busLicense.split(',')
        for(var i in busLicenseImgList){
            picStrBusLicense.push({
                uid    : - i - 1,
                url    :  busLicenseImgList[i],
                status : 'done'
            })
        }
    };
    let picStrContract = [];
    if( userManageModelDetail && userManageModelDetail.contract &&  userManageModelDetail.contract!=null){
        let contractImgList = userManageModelDetail.contract.split(',')
        for(var i in contractImgList){
            picStrContract.push({
                uid    : - i - 1,
                url    :  contractImgList[i],
                status : 'done'
            })
        }
    };
    /*校验文件大小*/
    function validateFileSize(file, size) {
        let sizeInt = size * 1024 * 1024;
        if(file.size > sizeInt) {
            message.error('文件大小不能超过' + size + 'M');
            return false;
        }

        return true;
    }

    let imgurlUploadLicenseProps = {
        name: 'file',
        action: `${BASE_URL}/systemController/upload`,
        listType: 'picture-card',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                info.file.url = info.file.response.data.url;
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
        beforeUpload : (file) => validateFileSize(file,5),
    };

    let imgurlUploadContractImgProps = {
        name: 'file',
        action: `${BASE_URL}/systemController/upload`,
        listType: 'picture-card',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                info.file.url = info.file.response.data.url;
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
        beforeUpload : (file) => validateFileSize(file,5),
    };

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const uploadButton1 = (
        <div key='uploadCover'>
            <Icon type="plus" />
            <div className="ant-upload-text">选择营业执照</div>
        </div>
    );
    const uploadButton2 = (
        <div key='uploadSmallImg'>
            <Icon type="plus" />
            <div className="ant-upload-text">选择合同资料</div>
        </div>
    );

    /*----------------------------------------------------*/
    //校验手机号
    function validator(rule, value, callback) {
        if (!/^1[3-8]\d{9}$/.test(value)) {
            callback(new Error('手机号格式不正确'));
        }else {
            callback();
        }

	}
    //校验邮箱
    function validatorEmail(rule, value, callback){
        if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)) {
            callback(new Error('邮箱格式不正确'));
        }else {
            callback();
        }
    }
    function cancel(){

    }
    let subTitle=''
    if(userManageModelDetail.contacts){
        subTitle = '编辑'
    }else{
        subTitle = '新增'
    }
    //模态框的属性
    let modalOpts = {
        title: subTitle,
        maskClosable : false,
        visible : userManageNewModalVisible,
        closable : true,
        width : 900,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <div key = 'confirm_btn' style={{float:'right',marginLeft:'20px'}}>
                { userManageModelDetail.contacts?
                    <Popconfirm title="确定修改?" onConfirm={handleComplete} onCancel={cancel} okText="确认" cancelText="否">
                                <Button key="submit" type="primary" size="large"
                                    disabled={userManageModalButtonLoading}
                                    loading= {userManageModalButtonLoading}>保存</Button>
                    </Popconfirm>
                :
                    <Button key="submit" type="primary" size="large"
                                    onClick={handleComplete}
                                    disabled={userManageModalButtonLoading}
                                    loading= {userManageModalButtonLoading}>保存</Button>
                }
            </div>

        ],
      };


return (
    <div className='zj_modal_header'>
        <div>
            <Modal {...modalOpts}>
                <Spin spinning = { userManageModalLoading }>
                    <Form>
                        <FormItem
                            label="搜索机构"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('orgName', {
                            })(
                                 <Input placeholder='请输入机构名称或ID' style={{ width : 300 }}/>
                            )}
                            <span><a style={{position:'absolute',left:'320px',fontSize:'15px'}} onClick={() => userManageModalSearchOrgName (getFieldValue('orgName'))}>搜索</a></span>
                        </FormItem>
                            <FormItem
                                label="选择机构"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('org', {
                                })(
                                    <Transfer
                                        dataSource={userManageModelAllcontent}
                                        targetKeys={userManageModelTransferTargetContent}
                                        operations={['加入', '退出']}
                                        onChange={userManageModalTransferhandleChange}
                                        listStyle={{ width: 246 , height: 200 }}
                                        titles={['全部机构','已选机构']}
                                        render={item => item.title}

                                      />
                                )}
                            </FormItem>
                        <FormItem
                            label="详细地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('address', {
                                initialValue : orgAddress || undefined,
                                rules : [
                                    { required : true , message : '请填写详细地址'},
                                ]
                            })(
                                <Input placeholder='请填写详细地址' style={{ width : 300 }}/>
                            )}
                        </FormItem>
                        <FormItem
                            label="联系人"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('contacts', {
                                initialValue : userManageModelDetail && userManageModelDetail.contacts || undefined,
                                rules : [
                                    { required : true , message : '请填写联系人'},
                                ]
                            })(
                                <Input placeholder='请填写联系人' style={{ width : 300 }}/>
                            )}
                        </FormItem>
                        <FormItem
                            label="联系方式"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('mobile', {
                                initialValue : userManageModelDetail && userManageModelDetail.mobile || undefined,
                                rules : [
                                    { required : true , message : '请填写联系方式'},
                                    { validator :  validator },
                                ]
                            })(
                                <Input placeholder='请填写联系方式' style={{ width : 300 }}/>
                            )}
                        </FormItem>
                        <FormItem
                            label="邮箱"
                            {...formItemLayout}
                            style={{lineHeight:'12px'}}
                        >
                            {getFieldDecorator('email',{
                                initialValue : userManageModelDetail && userManageModelDetail.email || undefined,
                                rules : [
                                    { required : true , message : '请填写邮箱'},
                                    { validator :  validatorEmail },
                                ]
                            })(
                                <Input placeholder='请填写邮箱'  style={{ width : 300 }}/>
                            )}

                        </FormItem>
                        <FormItem
                            label="公司名称"
                            {...formItemLayout}
                            style={{lineHeight:'12px'}}
                        >
                            {getFieldDecorator('companyName',{
                                initialValue : userManageModelDetail && userManageModelDetail.companyName || undefined,
                                rules : [
                                    { required : true , message : '请填写公司名称'},
                                ]
                            })(
                                <Input placeholder='请填写公司名称'  style={{ width : 300 }}/>
                            )}

                        </FormItem>
                        <FormItem
                            label="营业执照"
                            help = "请上传营业执照副本，支持png、jpg、jpeg、gif格式的图片，单张最大不超过5M!"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('busLicense', {
                                initialValue: picStrBusLicense || '',
                                valuePropName: 'fileList',
                                normalize: normFile,
                                rules : [
                                    { required : true , message : '请上传营业执照'},
                                ]
                            })(
                                <Upload {...imgurlUploadLicenseProps} >
                                    {uploadButton1}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem
                            label="合同资料"
                            help = "请上传呼叫系统合同资料，支持png、jpg、jpeg、gif格式的图片，单张最大不超过5M!"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('contract', {
                                initialValue: picStrContract || '',
                                valuePropName: 'fileList',
                                normalize: normFile,
                                rules : [
                                    { required : true , message : '请上传合同资料'},
                                ]
                            })(
                                <Upload {...imgurlUploadContractImgProps} >
                                    {uploadButton2}
                                </Upload>
                            )}
                        </FormItem>

                    </Form>
                </Spin>
            </Modal>
        </div>
    </div>
    );
};

export default Form.create()(UserManageNewModal);
