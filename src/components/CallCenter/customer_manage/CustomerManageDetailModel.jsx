import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


const UserManageDetailModal = ({
    userManageDetailModalVisible,                  //模态框显示状态
    userManageModalDeatilCancel,                   //关闭模态框

    userManageModelDetail,                         //详情数据
    orgAddress,                                    //机构地址
    orgId ,                                        //机构id
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

    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        userManageModalDeatilCancel();
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
        beforeUpload(file) {
            let imgurl_cover = getFieldValue('busLicense');

            return true;
        },
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
        beforeUpload(file) {
            let imgurl_smallImg = getFieldValue('contract');

            return true;
        },
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

    //模态框的属性
    let modalOpts = {
        title: '客户信息',
        maskClosable : false,
        visible : userManageDetailModalVisible,
        closable : true,
        width : 700,
        onCancel : handleCancel,
        footer : null,
      };

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
    return (
        <div className='zj_modal_header'>
            <div>
                <Modal {...modalOpts}>
                    <Form>
                        <FormItem
                            label="机构名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('orgName', {
                                initialValue : userManageModelDetail && userManageModelDetail.orgName || undefined,
                            })(
                                <Input placeholder='请填写详细地址' style={{ width : 300 }} disabled/>
                            )}
                        </FormItem>
                        <FormItem
                            label="详细地址"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('address', {
                                initialValue : userManageModelDetail && userManageModelDetail.orgAddress || undefined,

                            })(
                                <Input placeholder='请填写详细地址' style={{ width : 300 }} disabled/>
                            )}
                        </FormItem>
                        <FormItem
                            label="联系人"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('contacts', {
                                initialValue : userManageModelDetail && userManageModelDetail.contacts || undefined,

                            })(
                                <Input placeholder='请填写联系人' style={{ width : 300 }} disabled/>
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
                                <Input placeholder='请填写联系方式' style={{ width : 300 }} disabled/>
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
                                <Input placeholder='请填写邮箱'  style={{ width : 300 }} disabled/>
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

                            })(
                                <Upload {...imgurlUploadContractImgProps} >
                                    {uploadButton2}
                                </Upload>
                            )}
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(UserManageDetailModal);
