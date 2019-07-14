import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Select, Cascader, Checkbox, Upload, Icon, Radio } from 'antd';
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

/*编辑租户modal*/
function NewsTempletAdd ({
    addModelVisible,
    closeAddModel,
    addModelSubmit,
    fromData,
    addType,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        setFieldsValue,
    },
  }) {
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
    function handleComplete() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            values.cover = values.cover[0].url;
            addModelSubmit(values)
        });
    }

    //模态框的属性
    let modalOpts = {
        title: '新增模板',
        maskClosable : false,
        visible : addModelVisible,
        closable : true,
        width : 600,
        onOk: handleComplete,
        onCancel : closeAddModel,
//        className : 'zj_org_manage_modal'
    };

    let url = addType == 'edit' && fromData && fromData.imgUrl != null && fromData.imgUrl != '' && fromData.imgUrl != undefined ? fromData.imgUrl : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : url,
        thumbUrl : url,
    }];

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
										<FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                    {getFieldDecorator("name", {
                        initialValue: fromData.name || '',
                        rules: [
                            { required: true, message: '请输入名称' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入名称" style={{width: '100%'}}/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="封面"
                    >
                    {getFieldDecorator("cover", {
                        initialValue: addType == 'edit' ? (fromData.cover  != '' ? displayImg : null) : null,
                        rules: [{
                          required: true, message: '请选择图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...iconUploadProps} >
                         {(getFieldValue('cover') && getFieldValue('cover').length > 0) ?
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

                    <FormItem
                        {...formItemLayout}
                        label="二维码地址"
                    >
                    {getFieldDecorator("demoUrl", {
                        initialValue: fromData.demoUrl || '',
                        rules: [
                            { required: true, message: '请输入二维码地址' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入二维码地址" style={{width: '100%'}}/>
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模版AppId"
                    >
                    {getFieldDecorator("demoAppId", {
                        initialValue: fromData.demoAppId || '',
                        rules: [
                            { required: true, message: '请输入模版AppId' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入模版AppId" style={{width: '100%'}}/>
                      )}
                    </FormItem>

                    <FormItem
                        label="排序"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('seqNo', {
                            initialValue : fromData.seqNo || '',

                        })(
                            <Input type="text" placeholder='请填写排序' size='default'/>
                        )}
                    </FormItem>


                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(NewsTempletAdd);
