import React from 'react';
import styles from './ModuleBasePropsFormComponent.less';
import PageModal from '../../../common/page-modal/PageModal';
import {Button,Form, Input, Select, message, Radio, Upload, Icon, InputNumber,Checkbox, }

from 'antd';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option   = Select.Option;
const RadioGroup = Radio.Group;

/**
 * 自定义模板-基本属性表单
 * 表单组件
 */
function ModuleBasePropsFormComponent ({
    visible, loading, formData, typeComList, categoryComList,
    onSubmit, onClose, labelAll,
    form: {
        getFieldDecorator,
        getFieldValue,
        setFieldsValue,
        validateFields,
        resetFields,
        getFieldError,
        validateFieldsAndScroll,
    }
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

    function handleClose() {
        resetFields();
        onClose && onClose();
    }

    function handleOnSubmit() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }

            let icon = values.icon;
            if(icon && icon.length > 0) {
                let iconList = [];
                icon.map(function(item, index) {
                    iconList.push(item.url);
                });
                values.icon = iconList.join(',');
            }
            if(labelAll.length>0&& labelAll != null){
                    let bart = values.labelIds;
                    values.labelIds = bart.join(',');
               }

            onSubmit && onSubmit(values, handleClose);
        });
    }
    let formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    };
    let formDataId = formData && formData.id;

    let iconUploadProps = {
        action: BASE_URL+'/systemController/upload',
        listType: 'picture-card',
        beforeUpload : imageBeforeUpload,
        withCredentials: true,//上传请求时是否携带 cookie
    };

    //外包环境下  图片上传地址修改
    if(window.manager_platform == 'thinknode') {
        iconUploadProps.action = '/thinknode/upload/image';
    }
		
	/*获取选择的模板类型*/
	let fomrDataValue =  formData&&formData.type || getFieldValue('type') ;

	/*根据模板诶性进行文案展示*/
	let component = (
		<RadioGroup disabled={(formDataId != undefined && formDataId != '')}>
            <Radio value={fomrDataValue === 'offlineLeaflets' ? 'vertical' : 'many'}>{fomrDataValue === 'offlineLeaflets' ? '竖版' : '多页'}</Radio>
            <Radio value={fomrDataValue === 'offlineLeaflets' ? 'horizontal' : 'one'}>{fomrDataValue === 'offlineLeaflets' ? '横版' : '单页(长页)'}</Radio>
		</RadioGroup>
	)
    /*标签*/
    let labelNum = formData.labels;
    let init = [];
    let labelArr = [];
    labelAll && labelAll.length>0 && labelAll.map(function(item,index){
        let labelChild = item.value;
        let labelOptions = [];
        let initValue = item.group;
        for(let i in labelChild){
            labelOptions.push({
                label : labelChild[i].labelName,
                value : labelChild[i].id,
            });
            for(let j in labelNum){
                if(labelChild[i].id == labelNum[j].id){
                  init.push(labelNum[j].id);
                }
            }
        }
        labelArr.push(
            <div key={index}>
                <FormItem
                 label={item.group}
                 { ...formItemLayout }
                >
                 { getFieldDecorator('labelIds' , {
				  initialValue : init ||'',
				    })(
				        <CheckboxGroup options={ labelOptions } />
				    )}
                </FormItem>
            </div>
        )
    })

    return (
        <PageModal
           visible={visible}
           maskClosable={false}
           title="自定义模板"
           width="500px"
           onClose={handleClose}
           footer={[
                {msg: '确定要提交吗?', handle: handleOnSubmit, component: (<Button type="primary" loading={loading}>提交</Button>)},
                {msg: '确定要关闭吗?', handle: handleClose, component: (<Button type="ghost">关闭</Button>)},
            ]}
        >
            <div className={styles.form_modal_cont}>
                <Form>

                    {getFieldDecorator("id", {
                        initialValue: formData.id,
                      })(
                        <Input type="hidden" placeholder="活动编号" />
                      )}

                   {!!(formDataId != undefined && formDataId != '') &&
                    <FormItem
                          {...formItemLayout}
                          label="活动代码"
                        >
                        {getFieldDecorator("code", {
                            initialValue: formData.code,
                          })(
                            <Input type="text" placeholder="活动代码" disabled={true} />
                          )}
                      </FormItem>
                    }

                     <FormItem
                          {...formItemLayout}
                          label="标题"
                        >
                        {getFieldDecorator("title", {
                            initialValue: formData.title,
                            rules: [
                                {required: true, message: '请输入标题',},
                            ],
                          })(
                            <Input type="text" placeholder="请输入标题" />
                          )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="简介"
                        >
                        {getFieldDecorator("intro", {
                            initialValue: formData.intro,
                            rules: [
                                {required: true, message: '请输入简介',},
                            ],
                          })(
                            <Input type="textarea" placeholder="请输入简介" />
                          )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="模板类型"
                          help={getFieldError('type') ? getFieldError('type')[0] : "创建之后不可修改"}
                        >
                        {getFieldDecorator("type", {
                            initialValue: formData.type,
                            rules: [
                                {required: (formData.type != ''), message: '请选择模板类型',},
                            ],
                          })(
                            <RadioGroup disabled={(formDataId != undefined && formDataId != '')}>
                                 {(labelAll != '' && labelAll != [])?
									  <Radio value="activity">自定义微活动</Radio>
									  :
								  		''
								  }
                                  {(labelAll == '' || labelAll&&labelAll.length == 0 || labelAll == undefined) ?
                                      <Radio value="offlineLeaflets">自定义线下传单</Radio>
                                      :
                                        ''
                                  }
                                <Radio value="" disabled={true}>高级模板</Radio>
                              </RadioGroup>
                          )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="页面类型"
                          help={getFieldError('page_type') ? getFieldError('page_type')[0] : "创建之后不可修改"}
                        >
                        {getFieldDecorator("page_type", {
                            initialValue: formData.page_type,
                            rules: [
                                {required: (getFieldValue('type') != ''), message: '请选择页面类型',},
                            ],
                          })(
                            	component
                          )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="图标"
                        >
                        {getFieldDecorator("icon", {
                            initialValue: formData && formData.iconList,
                            rules: [{
                              required: true, message: '请选择图标',
                            }],
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                          })(
                            <Upload {...iconUploadProps} >
                             {(getFieldValue('icon') && getFieldValue('icon').length > 0) ?
                                null
                                :
                                <div>
                                    <Icon type="plus" />
                                    <div className={styles.img_upload_text}>选择图标</div>
                                </div>
                             }
                            </Upload>
                          )}
                      </FormItem>
                        {labelArr}
                      <FormItem
                          {...formItemLayout}
                          label="价格"
                        >
                        {getFieldDecorator("price", {
                            initialValue: formData.price,
                            rules: [
                                {required: true, message: '请输入价格',},
                            ],
                          })(
                            <InputNumber placeholder="请输入价格" style={{width: '100%'}}/>
                          )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="模板预览URL"
                        >
                        {getFieldDecorator("previewUrl", {
                            initialValue: formData.previewUrl || '',
                          })(
                            <Input type="textarea" placeholder="请输入模板预览URL" style={{width: '100%'}}/>
                          )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="排序值"
                          help={getFieldError('defsort') ? getFieldError('defsort')[0] : "自然数越大，排序越靠前"}
                        >
                        {getFieldDecorator("defsort", {
                            initialValue: formData.defsort || 0,
                            rules: [
                                {required: true, message: '请输入排序值',},
                            ],
                          })(
                            <InputNumber placeholder="请输入排序值" style={{width: '100%'}}/>
                          )}
                      </FormItem>
                      
   					  <FormItem
                          {...formItemLayout}
                          label="虚拟浏览数"
                          help={"saas端显示数据为：虚拟浏览量+实际浏览量"}
                        >
                        {getFieldDecorator("virtualViews", {
                            initialValue: formData.virtualViews || 0,

                          })(
                            <InputNumber placeholder="请输入虚拟浏览数" style={{width: '100%'}} min={0} />
                          )}
                      </FormItem>
                      
                      <FormItem
                          {...formItemLayout}
                          label="状态"
                          style={window.manager_platform == 'thinknode' ? {display: 'none'} : {}}
                        >
                        {getFieldDecorator("status", {
                            initialValue: formData.status || '2',
                            rules: [
                                {required: true, message: '请选择状态',},
                            ],
                          })(
                              <RadioGroup>
                                <Radio value="1">上架</Radio>
                                <Radio value="2">下架</Radio>
                                <Radio value="0">无效(删除)</Radio>
                              </RadioGroup>
                          )}
                      </FormItem>

                </Form>
            </div>

        </PageModal>
    );
}


export default Form.create()(ModuleBasePropsFormComponent);
