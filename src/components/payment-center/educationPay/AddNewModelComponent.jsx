import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Icon, Cascader, Select, Upload } from 'antd';
import ChinaDivision from './CascaderAddressOptions';
import styles from './AddNewModelComponent.less';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

/*编辑租户modal*/
const AddNewModelComponent = ({
      addNewSchoolVisible,   				  //新增学校的弹窗显示
	  addNewSchoolModalSubmit,                //新增学校的信息提交
      addNewSchoolModalCancel,                //新增学校的弹窗关闭
	  addrChange,                             //地址选择
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
        	addNewSchoolModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        addNewSchoolModalCancel();
    }
    //模态框的属性
    let modalOpts = {
        title: '添加学校',
        maskClosable : false,
        visible : addNewSchoolVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
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

	function normFile(e) {
        let fileList = [];
        if (Array.isArray(e)) {
            fileList = e;
        } else {
            fileList = e && e.fileList;
        }

         fileList && fileList.length > 0 && fileList.map(function(item, index) {
            if(item.response && (item.response.errorCode == 9000) && item.response.data && item.response.data.url) {
                item.url = item.response.data.url;
            }
        });

        return fileList;
    }

    /*校验图片*/
    function imageBeforeUpload(file) {
		if(file.size > 5242880) {
			message.error('图片不得大于5M');
			return false;
		}
		return true;
    }

    let iconUploadProps = {
        action: BASE_URL+'/systemController/upload',
        listType: 'picture-card',
        beforeUpload : imageBeforeUpload,
        withCredentials: true,//上传请求时是否携带 cookie
    };

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
                    <FormItem
                        {...formItemLayout}
                        label="学校名称"
                    >
                    {getFieldDecorator("name", {
                        initialValue: '',
                        rules: [
                            { required: true, message: '请输入学校名称' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入学校名称" style={{width: '100%'}}/>
                      )}
                    </FormItem>
					<FormItem
                    	label="所在地址"
                    	{...formItemLayout}
                	>
						{getFieldDecorator('address', {
							initialValue : [],
							rules: [
								{ required: true, type:'array', message: '请选择所在地址'},
							],
						})(
							<Cascader placeholder='请选择所在地址' options={ChinaDivision} onChange={addrChange} size='default'/>
						)}
                	</FormItem>
					<FormItem
                    	label="学校性质"
                    	{...formItemLayout}
                	>
						{getFieldDecorator('type', {
							initialValue : '',
							rules: [
								{ required: true , message: '请选择学校性质'},
							],
						})(
							<Select placeholder="请选择学校性质">
								<Option value='0'>幼儿园</Option>
								<Option value='1'>小学</Option>
								<Option value='2'>初中</Option>
								<Option value='3'>高中</Option>
							</Select>
						)}
                	</FormItem>
					 <FormItem
                        {...formItemLayout}
                        label="联系人姓名"
                    >
                    {getFieldDecorator("userName", {
                        initialValue: '',
                        rules: [
                            { required: true, message: '请输入联系人姓名' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入联系人姓名" style={{width: '100%'}}/>
                      )}
                    </FormItem>
					<FormItem
                        {...formItemLayout}
                        label="联系人手机号"
                    >
                    {getFieldDecorator("tel", {
                        initialValue: '',
                        rules: [
                            { required: true, message: '请输入联系人手机号' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入联系人手机号" style={{width: '100%'}}/>
                      )}
                    </FormItem>
					<FormItem
                        {...formItemLayout}
                        label="支付宝账号"
                    >
                    {getFieldDecorator("aliNum", {
                        initialValue: '',
                        rules: [
                            { required: true, message: '请输入支付宝账号' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入支付宝账号" style={{width: '100%'}}/>
                      )}
                    </FormItem>
					<FormItem
                      {...formItemLayout}
                      label="资质证件照"
                    >
                    {getFieldDecorator("orgImgUrl", {
                        initialValue: '',
                        rules: [{
                          required: true, message: '请上传资质证件照',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...iconUploadProps} >
                         {(getFieldValue('orgImgUrl') && getFieldValue('orgImgUrl').length >= 1) ?
                            null
                            :
                            <div>
                                <Icon type="plus" />
                                <div >选择资质证件照</div>
                            </div>
                         }
                        </Upload>
                      )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(AddNewModelComponent);
