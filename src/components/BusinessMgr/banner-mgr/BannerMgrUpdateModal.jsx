import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message } from 'antd';
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
const BannerMgrUpdateModal = ({
    formLoading, formData, formUpdateVisible,formType,searchChannelList,areasList, targetList,
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
        data.imgurl = 'wutu';
      }else{
        data.imgurl = data.imgurl[0].url;
      }
      switch(data.target){
        case '育儿健康':data.target='1';break;
        case '早教分享':data.target='2';break;
        case '巧手作家':data.target='3';break;
        case '宝宝美食':data.target='4';break;
        case '绘本儿歌':data.target='5';break;
        case '亲子生活':data.target='6';break;
        case '公开课堂':data.target='7';break;
        case '成长驿站':data.target='8';break;
        case '首页':data.target='main';break;
      }
      formSubmit(data);
    });
  }
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancle();
    };

  let modalOpts = {
    title: '修改Banner',
    maskClosable : false,
    visible : formUpdateVisible,
    closable : true,
    width : 585,
    onOk: handleOk,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
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

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    let url = formData.imgurl ? formData.imgurl[0].url : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : formData.intro,
        thumbUrl : url,
    }];

    let loopAreas = data => data.map((item) => {
    	return <Option value={item.name + ''} key={item.name}>{item.name}</Option>;
    });

    let loopTargets = data => data.map((item) => {
    	return <Option value={item.target + ''} key={item.target}>{item.intro}</Option>;
    });

    //频道列表
    let loopChannel = data => data.map((item) => {
        return <Option value={item.id + ''} key={item.id}>{item.title}</Option>;
    });

    //检验主图
    function checkImgUrl(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback(new Error('请选择主图'));
        }else{
            callback();
        }
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
                initialValue: formType=='update'?formData.title:'',
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
                    initialValue: formType=='update'?formData.intro:'',
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
                    initialValue: formType=='update'?(displayImg[0].url!=''?displayImg:null):null,
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
              label="类型"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('type', {
                initialValue: formType=='update'?formData.type:'',
                rules: [
                  { required: true, message: '请选择类型' },
                ],
              })(
                <Select placeholder="请选择类型" >
                   <Option value="01" key="01">原生界面</Option>
                   <Option value="02" key="02">网页</Option>
                   <Option value="03" key="03">教程专题</Option>
                   <Option value="04" key="04">话题专题</Option>
                   <Option value="05" key="05">达人榜单</Option>
                </Select>
              )}
            </FormItem>

            <FormItem
              label="链接"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('shareUrl', {
                initialValue: formType=='update'?formData.shareUrl:'',
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
                initialValue: formType=='update'?formData.status:'',
                rules: [
                  { required: true, message: '请选择状态' },
                ],
              })(
                <Select placeholder="请选择状态" >
                    <Option value="1" key="1">上架</Option>
                    <Option value="0" key="0">下架</Option>
                </Select>
              )}
            </FormItem>

            <FormItem
              label="序号"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('seqNo', {
                initialValue: formType=='update'?formData.seqNo:'',
              })(
                <InputNumber min={1} style={{width : '100%'}} placeholder="请输入序号"/>
              )}
            </FormItem>

            <FormItem
              label="目标"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('target', {
                initialValue: formType=='update'?(formData.target=='1'?'育儿健康':
                                                  formData.target=='2'?'早教分享':
                                                  formData.target=='3'?'巧手作家':
                                                  formData.target=='4'?'宝宝美食':
                                                  formData.target=='5'?'绘本儿歌':
                                                  formData.target=='6'?'亲子生活':
                                                  formData.target=='7'?'公开课堂':
                                                  formData.target=='8'?'成长驿站':
                                                  formData.target=='channel_1'?'育儿健康':
                                                  formData.target=='channel_2'?'早教分享':
                                                  formData.target=='channel_3'?'巧手作家':
                                                  formData.target=='channel_4'?'宝宝美食':
                                                  formData.target=='channel_5'?'绘本儿歌':
                                                  formData.target=='channel_6'?'亲子生活':
                                                  formData.target=='channel_7'?'公开课堂':
                                                  formData.target=='channel_8'?'成长驿站':'其他'):'',
                rules: [
                  { required: true, message: '目标未选择' },
                ],
              })(
                <Select placeholder="请选择目标" >
                    <Option value="main">首页</Option>
                    {loopChannel(searchChannelList || [])}
                </Select>
              )}
            </FormItem>

            <FormItem
              label="区域"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('areas', {
                initialValue: formType=='update'?formData.areas:'',
              })(
                <Select placeholder="请选择区域" >
                  <Option value="" key="">全部</Option>
                   {loopAreas(areasList||[])}
                </Select>
              )}
            </FormItem>

      </Form>

    </Modal>
  );
};

BannerMgrUpdateModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    searchChannelList : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancle : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(BannerMgrUpdateModal);
