import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Icon,Cascader ,Upload} from 'antd';
import ChinaDivision from '../../OrganBusiness/tenant-message/CascaderAddressOptions';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

/*编辑租户modal*/
const MechanismAddOrEditModal = ({
    addOrEditMechVisible,               //编辑校区modal是否显示
    addOrEditSupModalButtonLoading,         //编辑校区modal按钮是否在加载状态

    checkOrEditMsg,                  //新增编辑租户的信息
    AddOrEditMechSubmit,                //编辑校区提交
    AddOrEditMechCancel,                //编辑校区modal关闭

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
            if(checkOrEditMsg.tenantId){
            	data.isEdit = true;
            }else{
            	data.isEdit = false;
            }
            data.tenantId = checkOrEditMsg.tenantId || data.id;
            data.orgId = checkOrEditMsg.orgId || '';
            data.logo = data.logo[0].url;
            AddOrEditMechSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditMechCancel();
    }
    //模态框的属性
    let modalOpts = {
        title: '编辑',
        maskClosable : false,
        visible : addOrEditMechVisible,
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

		let url = checkOrEditMsg && checkOrEditMsg.logo != null && checkOrEditMsg.logo != '' && checkOrEditMsg.logo != undefined ? checkOrEditMsg.logo : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : url,
        thumbUrl : url,
    }];


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
    let dis = checkOrEditMsg && checkOrEditMsg.tenantId ? true:false;
    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
                    <FormItem
                        label="租户号"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('id', {
                            initialValue : checkOrEditMsg && checkOrEditMsg.tenantId ? checkOrEditMsg.tenantId : undefined,
                            rules: [
                                { required: true, message: '请填写租户号' }
                            ],
                        })(
                            <Input type="text" placeholder='请填写租户号' size='default' disabled={dis}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="机构名称"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('orgName', {
                            initialValue : checkOrEditMsg && checkOrEditMsg.orgName ? checkOrEditMsg.orgName : undefined,
                            rules: [
                                { required: true, message: '请填写机构名称' }],
                        })(
                            <Input type="text" placeholder='请填写机构名称' size='default'/>
                        )}
                    </FormItem>
                     <FormItem
                    label="所在地址"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('addrColumn', {
                    	initialValue : checkOrEditMsg && checkOrEditMsg.addrColumn && JSON.parse(checkOrEditMsg.addrColumn) || [],
                        rules: [
                            { required: true,type:'array', message: '请选择所在地址' },
                        ],
                    })(
                        <Cascader placeholder='请选择所在地址' options={ChinaDivision}  size='default'/>
                    )}
                </FormItem>
                <FormItem
                    label="详细地址"
                    {...formItemLayout}
                    style={{lineHeight:'12px'}}
                >
                    {getFieldDecorator('address', {
                    	initialValue : checkOrEditMsg && checkOrEditMsg.address ? checkOrEditMsg.address : undefined,
                        rules: [
                            { required: true,message : '请填写详细地址' },
                            { validator : checkWetherSpace },
                        ],
                    })(
                        <Input size='default' placeholder='请填写详细地址'/>
                    )}
                </FormItem>
                <FormItem
                      {...formItemLayout}
                      label="logo图片"
                    >
                    {getFieldDecorator("logo", {
                        initialValue: checkOrEditMsg && checkOrEditMsg.logo ? displayImg : checkOrEditMsg.logo,
                        rules: [{
                          required: true, message: '请选择图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...iconUploadProps} >
                         {(getFieldValue('logo') && getFieldValue('logo').length > 0) ?
                            null
                            :
                            <div>
                                <Icon type="plus" />
                                <div >选择图片</div>
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

export default Form.create()(MechanismAddOrEditModal);
