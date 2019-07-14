import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message, DatePicker } from 'antd';
import moment from 'moment';
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

const ApplicableActivitiesMgrModal = ({
    formLoading, formData, formUpdateVisible,formType,searchChannelList,goodsList,
    formCancle,
    formSubmit,
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
      if(data.imgurl==''||data.imgurl==null){
        data.imgurl = '';
      }else{
        data.imgurl = data.imgurl[0].url;
      }
      data.beginTime = data.activityTimes[0].format('YYYY-MM-DD hh:mm:ss');
      data.endTime   = data.activityTimes[1].format('YYYY-MM-DD hh:mm:ss');
      data.activityTimes = '';
      formSubmit(data,'update');
    });
  }

    function handleCancle(e) {
        e.preventDefault();
        resetFields();
        formCancle();
    };

  let modalOpts = {
    title: '修改试用活动',
    maskClosable : false,
    visible : formUpdateVisible,
    closable : true,
    width : 620,
    onOk: handleOk,
    onCancel : handleCancle,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancle}> 取 消 </Button>,
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
            if (info.file.status === 'done') {
                info.file.url = info.file.response.data.url;
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
        beforeUpload(file) {
            let imgurl_list = getFieldValue('imgurl');

            if(imgurl_list && imgurl_list.length > 0) {
                message.error('只能选择一张主图');
                return false;
            }
            return true;
        },
    };

     //检验主图
    function checkImgUrl(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback(new Error('请选择主图'));
        }else{
            callback();
        }
    };

   function normFile(e) {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
  };

    let loopGoods = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id}>{item.title}</Option>;
    });

    let dateFormat = 'YYYY-MM-DD hh:mm:ss';

    let activityTimesInitValue = formData.begin_time && formData.end_time ?
                                [moment(formData.begin_time, dateFormat), moment(formData.end_time, dateFormat)] : undefined
    let activityTimesConfig = {
        initialValue: activityTimesInitValue,
        rules: [{ type: 'array', required: true, message: '请选择活动时间' }],
    };

  return (
    <Modal {...modalOpts}>

      <Form horizontal className="common-component-form">

           {getFieldDecorator('id', {
                initialValue: formData.id
            })(
                <Input type="hidden" />
              )}

           <FormItem
              label="标题"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('title', {
                initialValue: formData.title||'',
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
                {getFieldDecorator('imgurl', {
                    initialValue: formData.imgurl,
                    valuePropName: 'fileList',
                    normalize: normFile,
                    rules: [
                        {validator: checkImgUrl},
                    ],
                })(
                    <Upload {...imgurlUploadProps} >
			          <Icon type="plus" />
			          <div className="ant-upload-text">选择主图</div>
			        </Upload>
                )}
            </FormItem>

            <FormItem
              label="商品"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('goodsId', {
                initialValue: formData.goodsId ? formData.goodsId + '' : undefined,
                rules: [
                  { required: true, message: '请选择商品' },
                ],
              })(
                <Select placeholder="请选择商品" >
                   {loopGoods(goodsList||[])}
                </Select>
              )}
            </FormItem>

            <FormItem
              label="限定参与人数"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('sumNum', {
                initialValue: formData.sumNum,
                rules: [
                  { required: true, message: '请输入限定参与人数', type: 'number' },
                ],
              })(
                <InputNumber min={1} style={{width : '100%'}} placeholder="请输入限定参与人数"/>
              )}
            </FormItem>

            <FormItem
              label="限量"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('count', {
                initialValue: formData.count,
                rules: [
                  { required: true, message: '请输入限量', type: 'number' },
                ],
              })(
                <InputNumber min={1} style={{width : '100%'}} placeholder="请输入数量"/>
              )}
            </FormItem>

            <FormItem
              label="活动时间"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('activityTimes', activityTimesConfig)(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width : '100%'}} />
                )}
            </FormItem>

            <FormItem
              label="序号"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('seqNo', {
                initialValue: formData.seqNo,
                rules: [
                  { required: true, message: '请输入序号', type: 'number' },
                ],
              })(
                <InputNumber min={1} style={{width : '100%'}} placeholder="请输入序号"/>
              )}
            </FormItem>

            <FormItem
              label="状态"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                initialValue: formData.status,
                rules: [
                  { required: true, message: '请选择状态' },
                ],
              })(
                <Select placeholder="请选择状态" >
                   <Option value="1" key="1">内部测试</Option>
                   <Option value="2" key="2">下架</Option>
                   <Option value="3" key="3">上架</Option>
                </Select>
              )}
            </FormItem>

      </Form>

    </Modal>
  );
};

ApplicableActivitiesMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancle : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(ApplicableActivitiesMgrModal);
