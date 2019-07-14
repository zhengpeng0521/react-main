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

const SaasScrmOverviewSuccessCaseAddOrEditBannerModal = ({
    addOrEditSaasScrmOverViweSuccessCaseModalType,       //机构成功案例新增修改类型('add'/'edit')
    addOrEditSaasScrmOverViweSuccessCaseModalVisible,    //机构成功案例modal是否显示
    addOrEditSaasScrmOverViweSuccessCaseModalData,       //机构成功案例编辑时回填数据
    addOrEditSaasScrmOverViweSuccessCaseButtonLoading,   //机构成功案例按钮是否加载状态

    AddOrEditSaasScrmOverViweSuccessCaseModalSubmit,     //机构成功案例表单提交
    AddOrEditSaasScrmOverViweSuccessCaseModalCancel,     //机构成功案例关闭modal

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
                data.img = '';
            }else{
                data.img = data.IMG[0].url ? data.IMG[0].url : data.IMG[0].response.data.url ;
            }
            delete data.IMG;
            AddOrEditSaasScrmOverViweSuccessCaseModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSaasScrmOverViweSuccessCaseModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditSaasScrmOverViweSuccessCaseModalType ? '新增成功案例' : '编辑成功案例',
        maskClosable : false,
        visible : addOrEditSaasScrmOverViweSuccessCaseModalVisible,
        closable : true,
        width : 650,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={addOrEditSaasScrmOverViweSuccessCaseButtonLoading}
                    loading={addOrEditSaasScrmOverViweSuccessCaseButtonLoading}>保存</Button>
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

    let url = addOrEditSaasScrmOverViweSuccessCaseModalType == 'edit' && addOrEditSaasScrmOverViweSuccessCaseModalData.img && addOrEditSaasScrmOverViweSuccessCaseModalData.img != null && addOrEditSaasScrmOverViweSuccessCaseModalData.img != '' && addOrEditSaasScrmOverViweSuccessCaseModalData.img != undefined ? addOrEditSaasScrmOverViweSuccessCaseModalData.img : null;
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

    //校验外链
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('填写内容不能为空'));
        }else{
            callback();
        }
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
                            initialValue: addOrEditSaasScrmOverViweSuccessCaseModalType == 'edit' ? (displayImg[0].url != '' ? displayImg : null) : null,
                            valuePropName: 'fileList',
                            normalize: normFile,
                            rules: [
                                {validator: checkImgUrl},
                            ],
                        })(
                            <Upload {...imgurlUploadProps} >
                                 <Icon type="plus" />
                                 <div className="ant-upload-text">选择图片</div>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        label="外链"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('link', {
                            initialValue : addOrEditSaasScrmOverViweSuccessCaseModalType == 'edit' && addOrEditSaasScrmOverViweSuccessCaseModalData.link ? addOrEditSaasScrmOverViweSuccessCaseModalData.link + '' : undefined,
                            rules: [
                                { required: true, message: '请填写外链' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="textarea" rows={3} placeholder='请填写外链'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="内容"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('content', {
                            initialValue : addOrEditSaasScrmOverViweSuccessCaseModalType == 'edit' && addOrEditSaasScrmOverViweSuccessCaseModalData.content ? addOrEditSaasScrmOverViweSuccessCaseModalData.content + '' : undefined,
                            rules: [
                                { required: true, message: '请填写内容' },{validator: checkWetherSpace},
                            ],
                        })(
                            <Input type="textarea" rows={4} placeholder='请填写内容'/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasScrmOverviewSuccessCaseAddOrEditBannerModal);
