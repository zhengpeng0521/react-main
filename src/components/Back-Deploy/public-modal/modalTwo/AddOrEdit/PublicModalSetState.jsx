import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer } from 'antd';
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

//模板1新增栏目
const PublicModalSetState = ({
    PublicModalSetStateVisibleModalTwo,formLoading,formData,
    modalTwoSetStateSubmit,
    modalTwoSetStateCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {
    function handleComplete(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue()};
      //处理编号传递
      data.id = formData.id;
      //处理图片显示
      if(data.zhutu==''||data.zhutu==null||data.zhutu==undefined){
         data.picUrl = '';
      }else{
         data.picUrl = data.zhutu[0].url;
      }

      //删除多余元素
      delete data.zhutu;
      resetFields();
      modalTwoSetStateSubmit(data);
    });
  }
    //判断栏目图
    function checkCover(rule, value, callback){
       if(value==undefined||value==''||value==null){
            callback(new Error('请选择图片'));
       }else{
            callback();
       }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalTwoSetStateCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: '状态栏设置',
    maskClosable : false,
    visible : PublicModalSetStateVisibleModalTwo,
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
            let imgurl_list = getFieldValue('zhutu');
            if(imgurl_list && imgurl_list.length > 0) {
                message.error('请选择栏目图');
                return false;
            }

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小不能超过2M!');
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

    let url = formData.pictureUrl ? formData.pictureUrl : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : formData.pictureUrl,
        thumbUrl : url,
    }];

    const uploadButton = (
        <div key='uploadCover'>
            <Icon type="plus" />
            <div className="ant-upload-text">选择图片</div>
        </div>
    );

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
              label="状态栏图片"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('zhutu', {
                    initialValue: displayImg[0].url==''||displayImg[0].url==null||displayImg[0].url==undefined?null:displayImg,
                    valuePropName: 'fileList',
                    normalize: normFile,
                    rules: [
                        {validator: checkCover},
                    ],
                })(
                    <Upload {...imgurlUploadProps} >
			             {uploadButton}
			        </Upload>
                )}
        </FormItem>

        <FormItem
          label="状态栏标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue:formData.title||'',
            rules: [
              { required: true, message: '状态栏标题未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写主标题'/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

PublicModalSetState.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formType : PropTypes.any,
    modalTwoSetStateCancel : PropTypes.func,
    modalTwoSetStateSubmit : PropTypes.func,
    PublicModalSetStateVisibleModalTwo : PropTypes.any,
};

export default Form.create()(PublicModalSetState);
