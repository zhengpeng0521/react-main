import React from 'react';
import { Modal , Spin , Button , Popconfirm } from 'antd';
import styles from './BrandExamineModal.less';

const BrandExamineModal = ({
    examineModalVisible,            //modal是否显示
    examineModalLoading,            //modal加载状态和按钮加载状态
    examineModalData,               //点击审核获取当前选项的信息duixiang

    ExamineModalSubmit,             //品牌审核通过
    ExamineModalCancel,             //品牌审核驳回或者关闭
  }) => {

    //模态框的属性
    let modalOpts = {
        title : '品牌审核',
        maskClosable : false,
        visible : examineModalVisible,
        closable : true,
        onCancel : ExamineModalCancel,
        width : 550,
        footer : [
            <Popconfirm key = 'reject' placement = 'top' title = { '确定驳回吗' } onConfirm = {() => ExamineModalSubmit('4')}>
                <Button key="onCancel" type="ghost" disabled={ examineModalLoading } loading={ examineModalLoading }>驳回</Button>
            </Popconfirm>,
            <Popconfirm key = 'pass' placement = 'top' title = { '确定通过吗' } onConfirm = {() => ExamineModalSubmit('3')}>
                <Button key="onOk" type="primary" disabled={ examineModalLoading } loading={ examineModalLoading } style={{ marginLeft : 20  }}>通过</Button>
            </Popconfirm>
        ],
        className : 'common_alert_Modal'
    };

    return (
        <Modal {...modalOpts}>
            <div>是否审核通过？</div>
        </Modal>
    );
};

export default BrandExamineModal;
