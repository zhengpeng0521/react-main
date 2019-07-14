import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message,Table,Popconfirm } from 'antd';
import styles from './SignGame.less';

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

const SignGameGiftModal = ({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,formVisibleGift,formLoading,
    tableOnChange,tablePageChange,formCancel,tableOnGiftEditItem,tableOnGiftDeleteItem,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  }, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 50,
  }, {
    title: '说明',
    dataIndex: 'intro',
    key: 'intro',
    width: 100,
  }, {
    title: '图片',
    dataIndex: 'imgurl',
    key: 'imgurl',
    width: 50,
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px"/>　: '无'}</div>),
  }, {
    title: '奖品等级',
    dataIndex: 'level',
    key: 'level',
    width: 50,
  }, {
    title: '最小天数',
    dataIndex: 'minScore',
    key: 'minScore',
    width: 50,
  }, {
    title: '最大天数',
    dataIndex: 'maxScore',
    key: 'maxScore',
    width: 50,
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: (text,record) => (<div className={text==1?'common-text-red':'common-text-darkgray'}>{text=='1'?'有效':'无效'}</div>),
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className="common-table-item-bar" onClick={() => tableOnGiftEditItem(record)}>编辑</a>
        <Popconfirm title="确定要删除吗?" onConfirm={() => tableOnGiftDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    };

    let paginationProps = {
        total: total,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tablePageChange,
        onChange : tablePageChange,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    let modalOpts = {
        title: '奖品',
        maskClosable : false,
        visible : formVisibleGift,
        closable : true,
        width : 1000,
        onCancel : handleCancel,
        footer : [
            <Button key="cancle" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };

    let aaa=[];
    for(let i=0;i<15;i++){
        aaa.push({
            id:i,
            title:`一头猪${i}`,
            level:`${i}`,
            status:i,
        });
    }

  return (
    <div className={styles.outer_modal}>
        <Modal {...modalOpts}>
            <Table
            columns={columns}
            dataSource={aaa}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 900 }} />
        </Modal>
    </div>

  );
};

SignGameGiftModal.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageIndex : PropTypes.any,
    pageSize : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableOnChange : PropTypes.any,
    tableOnModify : PropTypes.func,
    tablePageChange : PropTypes.func,
    tableOnGiftDeleteItem : PropTypes.func,
    formVisibleGift : PropTypes.any,
    formLoading : PropTypes.any,
    tableOnGiftEditItem : PropTypes.func,
};

export default Form.create()(SignGameGiftModal);
