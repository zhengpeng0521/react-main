import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, InputNumber } from 'antd';
import styles from './SignGame.less';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const SignGameGiftModal = ({
    formLoading, formData, formVisibleGiftInner,formType,
    formSubmit,
    innerFormCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        isFieldValidating,
    },
  }) => {

    function handleComplete(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue()};

      //处理图片显示
      if(data.IMG==''||data.IMG==null){
         data.imgurl = '';
      }else{
         data.imgurl = data.IMG[0].url;
      }

      //处理id传递
      data.id = formData.id;

      delete data.IMG;

      resetFields();
      formSubmit(data,'Gift');
    });
  }
    //检验是否为正整数
    function checkId(rule, value, callback) {
        if(value==''||value==null||value==undefined){
            callback();
        }else if (!/^[+]*[\d]*$/.test(value)) {
            callback(new Error('输入不合法，必须是阿拉伯自然数'));
        }else {
            callback();
        }
    }
    function checkMin(rule, value, callback){
        let min = parseInt(getFieldValue('minScore'));
        let max = parseInt(getFieldValue('maxScore'));
        if(value==''||value==null||value==undefined){
            callback();
        }else if(!/^[+]*[\d]*$/.test(value)){
            callback(new Error('输入不合法，必须是阿拉伯自然数'));
        }else if(min>max){
            callback(new Error('天数大小不合法'));
        }else {
            callback();
        }
    }
    function checkMax(rule, value, callback){
        let min = parseInt(getFieldValue('minScore'));
        let max = parseInt(getFieldValue('maxScore'));
        if(value==''||value==null||value==undefined){
            callback();
        }else if(!/^[+]*[\d]*$/.test(value)){
            callback(new Error('输入不合法，必须是阿拉伯自然数'));
        }else if(min>max){
            callback(new Error('天数大小不合法'));
        }else {
            callback();
        }
    }
    function check(){
        let min = parseInt(getFieldValue('minScore'));
        let max = parseInt(getFieldValue('maxScore'));
        if(min>max){
            console.log('error');
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        innerFormCancel();
    }

    let modalOpts = {
    title: formType=='edit'?'奖品编辑':'新增奖品',
    maskClosable : false,
    visible : formVisibleGiftInner,
    closable : true,
    width : 585,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={formLoading}
                loading={formLoading}>保存</Button>
    ],
  };

    let imgurlUploadProps = {
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
            let imgurl_list = getFieldValue('IMG');

            if(imgurl_list && imgurl_list.length > 0) {
                message.error('只能选择一张主图');
                return false;
            }
            return true;
        },
    };

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    let url = formData ? formData.imgurl : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : formData.intro,
        thumbUrl : url,
    }];

    let img_item = getFieldValue('IMG');
    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">选择图片</div>
        </div>
    )

  return (
      <div className={styles.inner_modal}>
        <Modal {...modalOpts}>
          <Form horizontal>
            <FormItem
              label="商品ID："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('id', {
                initialValue: formData.id!=undefined?formData.id+'':'',
                rules: [
                  { required: true, message: '商品ID未填写' },{validator: checkId},
                ],
              })(
                <Input type="text" />
              )}
            </FormItem>

            <FormItem
              label="标题："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('title', {
                initialValue: formData.title,
                rules: [
                  { required: true, message: '标题未填写' },
                ],
              })(
                <Input type="text" />
              )}
            </FormItem>

            <FormItem
              label="简介："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('intro', {
                initialValue: formData.intro,
                rules: [
                  { required: true, message: '简介未填写' },
                ],
              })(
                <Input type="textarea" />
              )}
            </FormItem>

            <FormItem
                  label="图片"
                  hasFeedback
                  {...formItemLayout}
                >
                    {getFieldDecorator('IMG', {
                        initialValue: formType=='update'?(displayImg[0].url!=''?displayImg:null):null,
                        valuePropName: 'fileList',
                        normalize: normFile,
                    })(
                        <Upload {...imgurlUploadProps} >
                              {uploadButton}
                        </Upload>
                    )}
            </FormItem>

            <FormItem
              label="奖品等级："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('level', {
                initialValue: formData.level!=undefined?formData.level+'':'',
                rules: [
                  { required: true, message: '奖品等级未填写' },
                ],
              })(
                <Input type="text" />
              )}
            </FormItem>

            <FormItem
              label="最小天数"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('minScore', {
                rules: [
                  { required: true, message: '最小天数未选择' },{validator: checkMin},
                ],
              })(
                <Input style={{ width:120 }} />
              )}
            </FormItem>

            <FormItem
              label="最大天数"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('maxScore', {
                rules: [
                  { required: true, message: '最大天数未选择' },{validator: checkMax},
                ],
              })(
                <Input style={{ width:120 }} />
              )}
            </FormItem>

            <FormItem
              label="状态："
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                rules: [
                  { required: true, message: '状态未选择' },
                ],
              })(
                <Select placeholder="请选择状态" style={{ width:120 }}>
                  <Option value="1">有效</Option>
                  <Option value="0">无效</Option>
                </Select>
              )}
            </FormItem>

          </Form>
        </Modal>
      </div>
  );
};

SignGameGiftModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisibleGiftInner : PropTypes.any,
    formType : PropTypes.any,
    innerFormCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(SignGameGiftModal);
