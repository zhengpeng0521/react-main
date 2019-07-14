import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin } from 'antd';
const FormItem = Form.Item;
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

const SaasPackageCheckIncludeModularModal = ({
    saasPackageCheckVisible,                    //查看包含模块modal显示
    saasPackageCheckIncludeData,                //查看包含模块数据
    SaasPackageCheckIncludeModalCancel,         //查看包含模块modal关闭
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    let showModular = [];
    if(saasPackageCheckIncludeData && saasPackageCheckIncludeData.length > 0){
        showModular =  saasPackageCheckIncludeData.map((item,index) => {
            return(
                <div key={index}>
                    <a>{item.moduleName}</a>
                </div>
            );
        })
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        SaasPackageCheckIncludeModalCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: '查看包含模块',
    maskClosable : false,
    visible : saasPackageCheckVisible,
    closable : true,
    width : 300,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="primary" size="default" onClick={handleCancel}>关闭</Button>
    ],
  };

    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <div style={{textAlign:'center'}}>
                    { showModular || [] }
                </div>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasPackageCheckIncludeModularModal);
