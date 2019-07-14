import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message, DatePicker } from 'antd';
import moment from 'moment';
import styles from './SecondSale.less';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const SecondSaleModal = ({
    formLoading, formData, formVisible,formType,
    updateFormSubmit,createFormSubmit,
    formCancel,
    handleOk,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {


    function checkNumber(rule, value, callback) {
        if (!value) {
            callback();
        }
        if (!/^[+]*[\d]*$/.test(value)) {
            callback(new Error('请输入阿拉伯正整数'));
        } else {
            callback();
        }
    }

  function handleComplete(e) {
    e.preventDefault();
    validateFieldsAndScroll((errors,fieldsValue) => {
      if (errors) {
        return;
      }
      let data = fieldsValue;

      //处理图片
      if(data.IMG==''||data.IMG==null){
         data.imgurl = '';
      }else{
         data.imgurl = data.IMG[0].url;
      }

      //处理时间
      const rangeValue = fieldsValue['game_time'];
      if(rangeValue!=undefined&&rangeValue.length>0){
        data.startTime = rangeValue[0].format('YYYY-MM-DD HH:mm:ss');
        data.endTime = rangeValue[1].format('YYYY-MM-DD HH:mm:ss');
      }

      //id传递
      if(formData){
          data.id = formData.id;
      }
      delete data.IMG;
      delete data.game_time;

      resetFields();
      if(formType=='update'){
        updateFormSubmit(data);
      }else{
        createFormSubmit(data);
      }
    });
  }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    };

    let dateFormat = 'YYYY-MM-DD hh:mm:ss';

    let activityTimesInitValue = formData.startTime && formData.endTime ?
                                [moment(formData.startTime,dateFormat),moment(formData.endTime,dateFormat)] : undefined;
    let activityTimesConfig = {
        initialValue: activityTimesInitValue,
        rules: [{ type: 'array', required: true, message: '请选择游戏时间' }],
    };

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
            <Input type="textarea" rows={3}/>
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
              label="游戏时间"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('game_time', activityTimesConfig)(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width : '100%'}} />
                )}
        </FormItem>

        <FormItem
          label="限购(次/人)："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('amountLimit', {
            initialValue: formType=='update'?formData.amountLimit+'':'',
            rules: [
              { required: true, message:'限购人次未填写' },{validator: checkNumber}
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
              label="活动状态"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                initialValue: formData.status,
                rules: [
                  { required: true, message: '请选择活动状态' },
                ],
              })(
                <Select placeholder="请选择活动状态" >
                    <Option value="1" >上架</Option>
                    <Option value="0" >下架</Option>
                    <Option value="9" >内部测试</Option>
                </Select>
              )}
         </FormItem>

      </Form>
    </Modal>

  );
};

SecondSaleModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    createFormSubmit : PropTypes.func,
    updateFormSubmit : PropTypes.func,
};

export default Form.create()(SecondSaleModal);
