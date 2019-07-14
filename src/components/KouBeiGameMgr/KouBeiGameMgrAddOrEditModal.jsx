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

const KouBeiGameMgrAddOrEditModal = ({
    kouBeiGameFormLoading,
    kouBeiGameFormData,
    kouBeiGameFormVisible,
    kouBeiGameFormType,
    kouBeiGameFormSubmit,
    kouBeiGameFormCancel,
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
         data.icon = '';
      }else{
         data.icon = data.zhutu[0].url;
      }

      data.id=kouBeiGameFormData.id;
      //删除多余元素
      delete data.zhutu;

      resetFields();
      kouBeiGameFormSubmit(data,kouBeiGameFormType);
    });
  }
    //判断图标
    function checkCover(rule, value, callback){
       if(value==undefined||value==''||value==null){
            callback(new Error('请选择图标'));
       }else{
            callback();
       }
    }

    //判断周期数
    function checkPeriod(rule, value, callback) {
        if (!/^[+]*[\d]*$/.test(value)) {
            callback(new Error('周期数不合法，必须是自然数'));
        }else {
            callback();
        }
    }
    //判断价格
    function checkPrice(rule, value, callback){
        if (!/^[0-9].*$/.test(value)) {
            callback(new Error('价格不合法，必须是自然数或正小数'));
        }else {
            callback();
        }
    }

    //判断排序值
    function checkDefsort(rule, value, callback){
        if (!/^[+]*[\d]*$/.test(value)) {
            callback(new Error('排序值不合法，必须是自然数'));
        }else if(parseInt(value)>999999999){
            callback(new Error('输入排序值最大为999,999,999'));
        }else {
            callback();
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        kouBeiGameFormCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: kouBeiGameFormType=='create'?'口碑游戏新增':'口碑游戏编辑',
    maskClosable : false,
    visible : kouBeiGameFormVisible,
    closable : true,
    width : 585,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={kouBeiGameFormLoading}
                loading={kouBeiGameFormLoading}>保存</Button>
    ],
  };

    //编辑图片默认展示
    let urlIcon = kouBeiGameFormData.icon==''||kouBeiGameFormData.icon==null||kouBeiGameFormData.icon==undefined ? null: kouBeiGameFormData.icon;
    let displayImgCover = [{
        uid : -1,
        url : urlIcon,
        name : kouBeiGameFormData.intro,
        thumbUrl : urlIcon,
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
                message.error('只能选择一张图标');
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
            <div className="ant-upload-text">选择图标</div>
        </div>
    );

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                <FormItem
                  label="标题："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('gameTitle', {
                    initialValue: 'update'!=kouBeiGameFormType?'':
                                  kouBeiGameFormData.gameTitle==undefined?'':kouBeiGameFormData.gameTitle+'',
                    rules: [
                      { required: true, message: '请填写标题' },
                    ],
                  })(
                    <Input type="text" placeholder='请填写标题'/>
                  )}
                </FormItem>
                <FormItem
                  label="说明："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('gameIntro', {
                    initialValue: 'update'!=kouBeiGameFormType?'':
                                  kouBeiGameFormData.gameIntro==undefined?'':kouBeiGameFormData.gameIntro+'',
                    rules: [
                      { required: true, message: '请填写简介' },
                    ],
                  })(
                    <Input type="textarea" rows={4} placeholder='请填写简介'/>
                  )}
                </FormItem>
                <FormItem
                  label="图标"
                  hasFeedback
                  {...formItemLayout}
                >
                    {getFieldDecorator('zhutu', {
                        initialValue: 'update'==kouBeiGameFormType?(displayImgCover[0].url!=''&&displayImgCover[0].url!=null&&displayImgCover[0].url!=''!=undefined?displayImgCover:null):null,
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
                  label="试玩URL地址："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('demoUrl', {
                    initialValue: 'update'!=kouBeiGameFormType?'':
                                  kouBeiGameFormData.demoUrl==undefined?'':kouBeiGameFormData.demoUrl+'',
                  })(
                    <Input type="text" placeholder='请填写试玩URL地址'/>
                  )}
                </FormItem>
                <FormItem
                  label="价格："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('price', {
                    initialValue: 'update'!=kouBeiGameFormType?'':
                                  kouBeiGameFormData.price==undefined?'':kouBeiGameFormData.price+'',
                    rules: [
                      { required: true, message: '请填写价格' },{validator: checkPrice},
                    ],
                  })(
                    <Input type="text" placeholder='请填写价格(正整数或小数)'/>
                  )}
                </FormItem>
                <FormItem
                  label="时间单位："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('unit', {
                    initialValue: 'update'==kouBeiGameFormType?kouBeiGameFormData.unit+'':undefined,
                    rules: [
                      { required: true, message: '请填写价格' },
                    ],
                  })(
                    <Select placeholder="请选择时间单位">
                        <Option value="1">天</Option>
                        <Option value="2">月</Option>
                        <Option value="3">年</Option>
                        <Option value="4">永远</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label="周期："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('period', {
                    initialValue: 'update'!=kouBeiGameFormType?'':
                                  kouBeiGameFormData.period==undefined?'':kouBeiGameFormData.period+'',
                    rules: [
                      { required: true, message: '请填写周期' },{validator: checkPeriod},
                    ],
                  })(
                    <Input type="text" placeholder='请填写周期(自然数)'/>
                  )}
                </FormItem>
                <FormItem
                  label="排序值(越大越靠前)："
                  hasFeedback
                  {...formItemLayout}
                >
                  {getFieldDecorator('defsort', {
                    initialValue: 'update'!=kouBeiGameFormType?'':
                                  kouBeiGameFormData.defsort==undefined?'':kouBeiGameFormData.defsort+'',
                    rules: [
                      {validator: checkDefsort},
                    ],
                  })(
                    <Input type="text" placeholder='请填写排序值(自然数,越大越靠前)'/>
                  )}
                </FormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(KouBeiGameMgrAddOrEditModal);
