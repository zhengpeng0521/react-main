import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree } from 'antd';
import styles from './MarketingPackage.less';
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

const MarketingPackageCheckModalNoModal = ({
    checkModalNoDefaultExpandedKeys,

    checkModalVisible,
    checkModalContent,
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
	let weOfflineLeafletsChildren = [];

    if(checkModalContent){
        if(checkModalContent.weAct && (checkModalContent.weAct).length > 0){
            weActChildren = (checkModalContent.weAct).map((item) => {
                return(
                    <TreeNode title={item.title} key={item.id} />
                );
            });
        }
        if(checkModalContent.weGame && (checkModalContent.weGame).length > 0){

//            console.info(checkModalContent.weGame);
            weGameChildren = (checkModalContent.weGame).map((item) => {
                let privilege = item.privilege;

                if(privilege!==""){
                    privilege = JSON.parse(item.privilege);

                    let limit_num_str = '不限制报名人数';
                    let limit_echarts_str = '未开通社交图谱';

                    privilege && privilege.map(function(item, index) {
                        if(item.name == 'numLimit') {
                            if(item.data == -1) {
                                limit_num_str = '不限制报名人数';
                            } else {
                                limit_num_str = '限制报名人数 ' + item.data;
                            }
                        }

                        if(item.name == 'chart') {
                            if(item.data == 1) {
                                limit_echarts_str = '开通社交图谱';
                            }
                        }
                    });

                    return(
                        <TreeNode title={item.title + ' (' + limit_num_str + ', ' + limit_echarts_str + ')'} key={item.id}/>
                    );
                }else{

                    return(
                        <TreeNode title={item.title} key={item.id}/>
                    );
                }


            });
        }
		if(checkModalContent.weOfflineLeaflet && (checkModalContent.weOfflineLeaflet).length > 0){
            weOfflineLeafletsChildren = (checkModalContent.weOfflineLeaflet).map((item) => {
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
    title: '查看包含模版',
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
                <TreeNode title='微游戏' key="weLeaflet" >
                    { weGameChildren || [] }
                </TreeNode>
                <TreeNode title='线下传单' key="offlineLeaflets" >
                    { weOfflineLeafletsChildren || [] }
                </TreeNode>
            </Tree>
        </Modal>
    );
};

export default Form.create()(MarketingPackageCheckModalNoModal);
