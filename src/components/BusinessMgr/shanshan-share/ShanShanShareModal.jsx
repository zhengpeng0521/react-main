import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message } from 'antd';
import styles from './ShanShanShare.less';

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

const ShanShanShareModal = ({
    formLoading, formData, newTopicData, formVisible,justify,
    formType,searchChannelList,
    formCancel,
    formSubmit,
    SearchTopic,
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

        //处理id传递
        data.id = formData.ID;

        console.log(data);
        resetFields();
        formSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    };

    function ModalOnSearch(){
        SearchTopic(getFieldValue('sourceId'));
    }

  let modalOpts = {
    title: '编辑',
    maskClosable : false,
    visible : formVisible,
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
              label="贴子ID"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('sourceId', {
                    initialValue: formData.source_id+'',
                    rules: [
                        { required: true, message: '贴子ID未填写' },
                    ],
                })(
                    <Input type="text" placeholder="请输入帖子ID" style={{ width:120 }}/>

                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={ModalOnSearch}><Icon type="search" />查询</Button>
            </FormItem>

            <FormItem
              label="标题"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('title', {
                    initialValue: justify=='null'?formData.title+'':newTopicData.title+'',
                })(
                    <Input type="text" placeholder="请输入标题" />
                )}
            </FormItem>

             <FormItem
              label="主图"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('imgurl', {
                    initialValue: justify=='null'?formData.imgurl+'':newTopicData.imgurl+'',
                })(
                    <Input type="text" placeholder="请输入图片地址" />
                )}
            </FormItem>

            <FormItem
              label="分享链接"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('url', {
                initialValue: justify=='null'?formData.url+'':newTopicData.url+'',
              })(
                <Input type="text" placeholder="请输入分享链接" />
              )}
            </FormItem>

      </Form>

    </Modal>

  );
};

ShanShanShareModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    SearchTopic : PropTypes.any,
};

export default Form.create()(ShanShanShareModal);
