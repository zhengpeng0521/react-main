import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select } from 'antd';
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

const ChannelMgrModal = ({
    formLoading, formData, formVisible,formType,
    formCreateSubmit,formUpdateSubmit,
    formCancel,
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

      //处理图片显示
      if(data.IMG==''||data.IMG==null){
         data.imgurl = '';
      }else{
         data.imgurl = data.IMG[0].url;
      }
      delete data.IMG;
      //处理id传递
      data.id = formData.id;



      resetFields();
      if(formType=='create'){
         //频道status处理,新增时默认上传值为1
         data.status = '1';
         formCreateSubmit(data);
      }else{
         //频道status处理,编辑是不上传此参数
         delete data.status;
         formUpdateSubmit(data);
      }
    });
  }
    //检验排序值
    function checkDefaultSort(rule, value, callback){
        if (!/^[\d]*$/.test(value)) {
            callback(new Error('输入排序值不合法，必须是自然数'));
        }else if(parseInt(value)>999999999){
            callback(new Error('输入排序值最大为999999999'));
        }else{
            callback();
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }

    let modalOpts = {
    title: formType=='create'?'新增':'修改',
    maskClosable : false,
    visible : formVisible,
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

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue: formData.title,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
            <Input type="text" />
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
			             <Icon type="plus" />
                         <div className="ant-upload-text">选择主图</div>
			        </Upload>
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
              { required: true, message: '不能为空' },
            ],
          })(
            <Input type="textarea" rows={3}/>
          )}
        </FormItem>

        <FormItem
          label="状态："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('status', {
            initialValue: formData.status,
          })(
            <Select disabled placeholder="请选择状态">
              <Option value="1">上架</Option>
              <Option value="0">下架</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="排序值(越小越靠前)："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('defsort', {
            initialValue: formData.defsort!=undefined?formData.defsort+'':'',
            rules: [
              { required: true, message: '排序值未填写' },{validator: checkDefaultSort},
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>

      </Form>
    </Modal>
  );
};

ChannelMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formCreateSubmit : PropTypes.func,
    formUpdateSubmit : PropTypes.func,
};

export default Form.create()(ChannelMgrModal);
