import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const SaasScrmViewBannerAddOrEditBannerModal = ({
    addOrEditSaasScrmOverViweBannerModalType,       //套餐管理新增修改类型('add'/'edit')
    addOrEditSaasScrmOverViweBannerModalVisible,    //套餐管理modal是否显示
    addOrEditSaasScrmOverViweBannerModalData,       //套餐管理编辑时回填数据
    addOrEditSaasScrmOverViweBannerButtonLoading,   //套餐管理按钮是否加载状态

    AddOrEditSaasScrmOverViweBannerModalSubmit,     //表单提交
    AddOrEditSaasScrmOverViweBannerModalCancel,     //关闭modal

    type,                                           //业务类型
    radioChangeFunc,                                //选择类型函数

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
            let data = getFieldsValue();
            //处理图片显示
            if(data.IMG == '' || data.IMG == null || data.IMG == undefined){
                data.image = '';
            }else{
                data.image = data.IMG[0].url ? data.IMG[0].url : data.IMG[0].response.data.url ;
            }
            delete data.IMG;

            AddOrEditSaasScrmOverViweBannerModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSaasScrmOverViweBannerModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditSaasScrmOverViweBannerModalType ? '新增banner' : '编辑banner',
        maskClosable : false,
        visible : addOrEditSaasScrmOverViweBannerModalVisible,
        closable : true,
        width : 650,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={addOrEditSaasScrmOverViweBannerButtonLoading}
                    loading={addOrEditSaasScrmOverViweBannerButtonLoading}>保存</Button>
        ],
    };

    /*上传图片属性*/
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
                message.error('只能选择一张图片');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小不大于2M!');
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

    let url = addOrEditSaasScrmOverViweBannerModalType == 'edit' && addOrEditSaasScrmOverViweBannerModalData.image && addOrEditSaasScrmOverViweBannerModalData.image != null && addOrEditSaasScrmOverViweBannerModalData.image != '' && addOrEditSaasScrmOverViweBannerModalData.image != undefined ? addOrEditSaasScrmOverViweBannerModalData.image : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : url,
        thumbUrl : url,
    }];

    /*检验图片是否上传*/
    function checkImgUrl(rule, value, callback){
        if(value == undefined || value == '' || value == null){
            callback(new Error('请选择图片'));
        }else{
            callback();
        }
    }

    //单选按钮
    function radioChange(e){
        let data =  e.target.value
		radioChangeFunc(data);
    }

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                      label="图片"
                      hasFeedback
                      {...formItemLayout}
                    >
                        {getFieldDecorator('IMG', {
                            initialValue: addOrEditSaasScrmOverViweBannerModalType == 'edit' ? (displayImg[0].url != '' ? displayImg : null) : null,
                            valuePropName: 'fileList',
                            normalize: normFile,
                            rules: [
                                {validator: checkImgUrl},
                            ],
                        })(
                            <Upload {...imgurlUploadProps} >
                                 <Icon type="plus" />
                                 <div className="ant-upload-text">选择banner</div>
                            </Upload>
                        )}
                </FormItem>
                    <RadioGroup onChange={radioChange} value={type} style={{paddingLeft:'63px',marginBottom:'20px'}}>
                        <Radio value='0'>营销首页</Radio>
                        <Radio value='1'>闪闪收银宝</Radio>
                        <Radio value='2'>钉钉收银宝</Radio>
                        <Radio value='3'>未开通收银宝</Radio>
                        <Radio value='4'>中小学缴费</Radio>
                        <Radio value='5'>新版云校轮播图</Radio>
                        <Radio value='6'>新版云校新闻</Radio>
                    </RadioGroup>

                    <FormItem
                        label="外链"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('link', {
                            initialValue : addOrEditSaasScrmOverViweBannerModalType == 'edit' && addOrEditSaasScrmOverViweBannerModalData.link ? addOrEditSaasScrmOverViweBannerModalData.link + '' : undefined
                        })(
                            <Input type="textarea" rows={3} placeholder='请填写外链'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasScrmViewBannerAddOrEditBannerModal);
