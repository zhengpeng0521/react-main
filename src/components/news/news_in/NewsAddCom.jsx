import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, message, Select, Cascader, Checkbox, Upload, Icon, Radio } from 'antd';
import RichEditor from '../../common/rich-editor/RichEditor';
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
function NewsAddCom ({
    newsAddVisible,
    closeAddModel,
    addModelSubmit,
    fromData,
    addType,
    attrHTMLValue,
    funcChangeParam,
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
            values.summery = attrHTMLValue || fromData.summery;
            if(values.summery == '' || values.summery == null || values.summery == undefined){
                message.error('请填写正文');
                return
            }
            values.imgUrl = values.imgUrl[0].url;
            addModelSubmit(values)
        });
    }

    //模态框的属性
    let modalOpts = {
        title: '新增渠道',
        maskClosable : false,
        visible : newsAddVisible,
        closable : true,
        width : 700,
        onOk: handleComplete,
        onCancel : closeAddModel,
        afterClose : closeAddModel,
    };

    let url = addType == 'edit' && fromData && fromData.imgUrl != null && fromData.imgUrl != '' && fromData.imgUrl != undefined ? fromData.imgUrl : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : url,
        thumbUrl : url,
    }];

    function functionChangeHTML(html) {
        funcChangeParam(html)
    }

    let __htmlValue = attrHTMLValue || fromData.summery || undefined;

    return (
        <div>
            <Modal {...modalOpts}>
                <Form className='zj_org_manage_form'>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                    >
                    {getFieldDecorator("title", {
                        initialValue: fromData.title || '',
                        rules: [
                            { required: true, message: '请输入标题' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入标题" style={{width: '100%'}}/>
                      )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                    {getFieldDecorator("context", {
                        initialValue: fromData.context || '',
                        rules: [
                            { required: true, message: '请输入简介' }
                        ],
                      })(
                        <Input type="text" placeholder="请输入简介" style={{width: '100%'}}/>
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="封面图"
                    >
                    {getFieldDecorator("imgUrl", {
                        initialValue: addType == 'edit' ? (fromData.imgUrl  != '' ? displayImg : null) : null,
                        rules: [{
                          required: true, message: '请选择封面图',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...iconUploadProps} >
                         {(getFieldValue('imgUrl') && getFieldValue('imgUrl').length > 0) ?
                            null
                            :
                            <div>
                                <Icon type="plus" />
                                <div >选择封面图</div>
                            </div>
                         }
                        </Upload>
                      )}
                    </FormItem>

                    <FormItem
                        label="所属类别"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('classify', {
                            initialValue: fromData.classify || '1',
                            rules: [
                                { required: true, message: '请选择所属类别' }
                            ],
                        })(
                            <RadioGroup>
                                <Radio value="1">常见问题</Radio>
                                <Radio value="2">操作方案</Radio>
                                <Radio value="3">新闻公告</Radio>
                                <Radio value="4">功能更新</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>

                    <FormItem
                        label="状态"
                        {...formItemLayout}
                        style={{lineHeight:'12px'}}
                    >
                        {getFieldDecorator('apply', {
                            initialValue: fromData.apply || '1',
                            rules: [
                                { required: true, message: '请选择状态' }
                            ],
                        })(
                            <RadioGroup>
                                <Radio value="1">上架</Radio>
                                <Radio value="2">下架</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {
                        (__htmlValue != undefined || addType == 'add') ? <RichEditor value={__htmlValue}  onChange={functionChangeHTML} /> : null
                    }
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(NewsAddCom);
