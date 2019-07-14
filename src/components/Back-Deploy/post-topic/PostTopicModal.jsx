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

const PostTopicModal = ({
    formLoading, formData, formVisible,formType,transData,
    formSubmit,
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
      if(data.zhutu==''||data.zhutu==null||data.zhutu==undefined){
         data.cover = '';
      }else{
         data.cover = data.zhutu[0].url;
      }

      if(data.xiaotu==''||data.xiaotu==null||data.xiaotu==undefined){
         data.smallImg = '';
      }else{
         data.smallImg = data.xiaotu[0].url;
      }

      //删除多余元素
      delete data.zhutu;
      delete data.xiaotu;

      resetFields();
      if(formType=='create'){
         formSubmit(data,'create');
      }else if(formType=='update'){
         //帖子ID传递
         data.id = formData.id;
         formSubmit(data,'update');
      }
    });
  }
    //检验输入是否是数字
    function checkNumber(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback();
        }else if (!/^[\d]*$/.test(value)) {
            callback(new Error('输入不合法，必须是阿拉伯正整数'));
        }else{
            callback();
        }
    }
    //判断相关帖子编号
    function checkTopicArray(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback();
        };
        let array = value.split(",");
        for(let i=0;i<array.length;i++){
            if(isNaN(parseInt(array[i]))){
                callback(new Error('输入不合法,标点符号多余或者不合法或者有非数字存在'));
            }
        }
        callback();
    }
    //判断封面
    function checkCover(rule, value, callback){
       if(value==undefined||value==''||value==null){
            callback(new Error('请选择封面'));
       }else{
            callback();
       }
    }
    //判断小图
    function checkSmallImg(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback(new Error('请选择小图'));
       }else{
            callback();
       }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: formType=='create'?'新增':'编辑',
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

    //编辑封面默认展示
    let urlCover = formData ? formData.cover : null;
    let displayImgCover = [{
        uid : -1,
        url : urlCover,
        name : formData.intro,
        thumbUrl : urlCover,
    }];

    //编辑小图默认展示
    let urlSmallImg = formData ? formData.smallImg : null;
    let displayImgSmallImg = [{
        uid : -2,
        url : urlSmallImg,
        name : formData.intro,
        thumbUrl : urlSmallImg,
    }];

    let imgurlUploadCoverProps = {
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
            let imgurl_cover = getFieldValue('zhutu');
            if(imgurl_cover && imgurl_cover.length > 0) {
                message.error('只能选择一张封面');
                return false;
            }
            return true;
        },
    };

    let imgurlUploadSmallImgProps = {
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
            let imgurl_smallImg = getFieldValue('xiaotu');
            if(imgurl_smallImg && imgurl_smallImg.length > 0) {
                message.error('只能选择一张小图');
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

    const uploadButton1 = (
        <div key='uploadCover'>
            <Icon type="plus" />
            <div className="ant-upload-text">选择主图</div>
        </div>
    );
    const uploadButton2 = (
        <div key='uploadSmallImg'>
            <Icon type="plus" />
            <div className="ant-upload-text">选择小图</div>
        </div>
    );

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
              label="专题封面"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('zhutu', {
                    initialValue: formType=='update'?(displayImgCover[0].url!=''?displayImgCover:null):null,
                    valuePropName: 'fileList',
                    normalize: normFile,
                    rules: [
                        {validator: checkCover},
                    ],
                })(
                    <Upload {...imgurlUploadCoverProps} >
			             {uploadButton1}
			        </Upload>
                )}
        </FormItem>

        <FormItem
              label="小图"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('xiaotu', {
                    initialValue: formType=='update'?(displayImgSmallImg[0].url!=''?displayImgSmallImg:null):null,
                    valuePropName: 'fileList',
                    normalize: normFile,
                    rules: [
                        {validator: checkSmallImg},
                    ],
                })(
                    <Upload {...imgurlUploadSmallImgProps} >
			             {uploadButton2}
			        </Upload>
                )}
        </FormItem>

        <FormItem
          label="主标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('mainTitle', {
            initialValue: formData.mainTitle,
                rules: [
                  { required: true, message: '主标题未填写' },
                ],
          })(
            <Input type="text" placeholder='请填写主标题'/>
          )}
        </FormItem>

        <FormItem
          label="副标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('subTitle', {
            initialValue: formData.subTitle,
            rules: [
              { required: true, message: '副标题未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写副标题'/>
          )}
        </FormItem>

        <FormItem
          label="专题简介："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('intro', {
            initialValue: formData.intro,
            rules: [
              { required: true, message: '专题简介不能为空' },
            ],
          })(
            <Input type="textarea" rows={5} placeholder='请填写专题简介'/>
          )}
        </FormItem>

        <FormItem
          label="相关帖子编号："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('relatedTopic', {
            initialValue: formData.relatedTopic,
            rules: [
              { required: true, message: '相关帖子不能为空' },{validator: checkTopicArray},
            ],
          })(
            <Input type="textarea" rows={3} placeholder='写成"相关贴子编号+逗号的形式，例如111,222,333"，否则不予承认'/>
          )}
        </FormItem>

        <FormItem
          label="赞数："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('praises', {
            initialValue: formData.praises!=undefined?formData.praises+'':'',
            rules: [
              { required: true, message: '赞数未填写' },{validator: checkNumber},
            ],
          })(
            <Input type="text" placeholder='请填写赞数'/>
          )}
        </FormItem>

        <FormItem
          label="收藏数："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('collect', {
            initialValue: formData.collect!=undefined?formData.collect+'':'',
            rules: [
              { required: true, message: '收藏数未填写' },{validator: checkNumber},
            ],
          })(
            <Input type="text" placeholder='请填写收藏数'/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

PostTopicModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    transData : PropTypes.any,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(PostTopicModal);
