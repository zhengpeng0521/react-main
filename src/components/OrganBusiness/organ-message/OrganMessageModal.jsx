import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const OrganMessageModal = ({
    checkModalVisible,
    checkModalContent,
    checkModalNoDefaultExpandedKeys,

    checkModalNoModalCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    let weActChildren = [];
    let weFlyerChildren = [];
    let weGameChildren = [];

    if(checkModalContent){
        if(checkModalContent.weAct && (checkModalContent.weAct).length > 0){
            weActChildren = (checkModalContent.weAct).map((item) => {
                return(
                    <TreeNode title={item.title} key={item.id} />
                );
            });
        }
        if(checkModalContent.weLeaflet && (checkModalContent.weLeaflet).length > 0){
            weFlyerChildren = (checkModalContent.weLeaflet).map((item) => {
                return(
                    <TreeNode title={item.title} key={item.id} />
                );
            });
        }
        if(checkModalContent.weGame && (checkModalContent.weGame).length > 0){
            weGameChildren = (checkModalContent.weGame).map((item) => {
                return(
                    <TreeNode title={item.title} key={item.id} />
                );
            });
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        checkModalNoModalCancel();
    }

    //模态框的属性
    let modalOpts = {
    title: '查看营销套餐包含模版',
    maskClosable : false,
    visible : checkModalVisible,
    closable : true,
    width : 585,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>关闭</Button>,
    ],
  };

    return (
        <Modal {...modalOpts}>
            <Tree className="myCls" showLine
                defaultExpandedKeys={checkModalNoDefaultExpandedKeys}
            >
                <TreeNode title='微活动' key="weAct" >
                    { weActChildren || [] }
                </TreeNode>
                <TreeNode title='微传单' key="weGame" >
                    { weFlyerChildren || [] }
                </TreeNode>
                <TreeNode title='微游戏' key="weLeaflet" >
                    { weGameChildren || [] }
                </TreeNode>
            </Tree>
        </Modal>
    );
};

export default Form.create()(OrganMessageModal);
