import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message } from 'antd';
import styles from './GgMgr.less';

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

const GgMgrAdOrModifyModal = ({
    formLoading, formData, addFormVisible,innerFormVisible,formType,searchChannelList,
    modifyFormCancel,
    formUpdateSubmit,formCreateSubmit,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {
  function handleOk(e) {
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
      delete data.IMG;

      //处理id传递
      data.id = formData.id;

      //判断默认值上架
      if('上架'==status){
          data.status = '1';
      }
      resetFields();
      if(formType=='create'){
         formCreateSubmit(data);
      }else if(formType=='update'){
         formUpdateSubmit(data);
      }
    });
  }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modifyFormCancel();
    };

  let modalOpts = {
    title: formType=='create'?'新增广告':'修改广告',
    maskClosable : false,
    visible : addFormVisible,
    closable : true,
    width : 585,
    onOk: handleOk,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleOk}
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
            console.log('onChange');
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
        name : formData.title,
        thumbUrl : url,
    }];

    let img_item = getFieldValue('IMG');
    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">选择主图</div>
        </div>
    );

  return (
    <Modal {...modalOpts} className={styles.inner_modal}>

      <Form horizontal className="common-component-form">

           <FormItem
              label="标题"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('title', {
                initialValue: formData.title,
                rules: [
                  { required: true, message: '标题未填写' },
                ],
              })(
                <Input type="text" placeholder="请输入标题"/>
              )}
            </FormItem>

            <FormItem
              label="简介"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('intro', {
                    initialValue: formData.intro,
                })(
                    <Input type="textarea" placeholder="请输入简介" />
                )}
            </FormItem>

             <FormItem
              label="主图"
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
              label="类型"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('type', {
                initialValue: formData.type,
                rules: [
                  { required: true, message: '请选择类型' },
                ],
              })(
                <Select placeholder="请选择类型" >
                    <Option value="101" key="101">启动广告位</Option>
                    <Option value="102" key="102">首页弹屏广告</Option>
                    <Option value="103" key="103">首页提醒条位</Option>
                    <Option value="104" key="104">首页浮框广告位</Option>
                    <Option value="105" key="105">个人中心金币广告位</Option>
                    <Option value="106" key="106">个人中心底部广告位</Option>
                    <Option value="107" key="107">金币商城广告</Option>
                </Select>
              )}
            </FormItem>

            <FormItem
              label="链接"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('linkUrl', {
                initialValue: formData.linkUrl,
              })(
                <Input type="text" placeholder="请输入链接" />
              )}
            </FormItem>

            <FormItem
              label="状态"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                initialValue: formType=='update'?formData.status:'上架',
              })(
                <Select placeholder="请选择状态" >
                   <Option value="1" key="1">上架</Option>
                   <Option value="0" key="0">下架</Option>
                </Select>
              )}
            </FormItem>

      </Form>

    </Modal>

  );
};

GgMgrAdOrModifyModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    addFormVisible : PropTypes.any,
    innerFormVisible : PropTypes.any,
    formType : PropTypes.any,
    modifyFormCancel : PropTypes.func,
    formUpdateSubmit : PropTypes.func,
    formCreateSubmit : PropTypes.func,
};

export default Form.create()(GgMgrAdOrModifyModal);
