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

const TopicActivityModal = ({
    formLoading, formData, formVisible,formType,searchChannelList,
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
            if (!!errors) {
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

            //帖子ID传递
            data.id = formData.id;

            //删除多余元素
            delete data.zhutu;
            delete data.xiaotu;
            resetFields();
            formSubmit(data,formType);
        });
    }
    //判断封面
    function checkCover(rule, value, callback){
       if(value==undefined||value==''||value==null){
            callback(new Error('请选择封面'));
       }else{
            callback();
       }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }

    let loopChannel = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id} style={{color:item.status=='1'?'black':'red'}}>{item.title}</Option>;
    });

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

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const uploadButton = (
        <div key='uploadCover'>
            <Icon type="plus" />
            <div className="ant-upload-text">选择主图</div>
        </div>
    );
    const statusSelect = (
        <FormItem
              label="状态"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
              })(
                <Select placeholder="请选择类型" >
                    <Option value="1" key="1">上架</Option>
                    <Option value="0" key="0">下架</Option>
                </Select>
              )}
        </FormItem>
    );

  return (
    <Modal {...modalOpts}>
      <Form horizontal>

        <FormItem
          label="标题"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue: formType=='update'?formData.title+'':'',
            rules: [
              { required: true, message: '标题未填写' },
            ],
          })(
            <Input type="text" placeholder='请填写标题'/>
          )}
        </FormItem>

        <FormItem
              label="封面"
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
			             {uploadButton}
			        </Upload>
                )}
        </FormItem>

        <FormItem
          label="链接"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('link', {
            initialValue: formType=='update'?formData.link+'':'',
          })(
            <Input type="text" placeholder='请填写链接'/>
          )}
        </FormItem>

        {formType=='create'?statusSelect:null}

        <FormItem
          label="内容"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('content', {
            initialValue: formType=='update'?formData.content+'':'',
          })(
            <Input type="textarea" placeholder='请填写内容' rows={4}/>
          )}
        </FormItem>

        <FormItem
          label="限制频道"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('limitChannel', {
            initialValue: formType=='update'?formData.limitChannel+'':'',
            rules: [
              { required: true, message: '限制频道未选择' },
            ],
          })(
            <Select placeholder="请选择限制频道" >
                <Option value="0" key="0">不限频道</Option>
                {loopChannel(searchChannelList || [])}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

TopicActivityModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    transData : PropTypes.any,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(TopicActivityModal);
