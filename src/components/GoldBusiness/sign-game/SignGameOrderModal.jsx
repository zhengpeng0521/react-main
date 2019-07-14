import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message,Table } from 'antd';
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

const SignGameOrderModal = ({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,formVisibleOrder,formLoading,
    tableOnChange,tablePageChange,formCancel,tableOnOrderEditItem,
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
    width: 150,
    title: '订单编号',
    dataIndex: 'orderNo',
    key: 'orderNo'
  }, {
    width: 100,
    title: '用户ID',
    dataIndex: 'uid',
    key: 'uid'
  }, {
    width: 100,
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    width: 100,
    title: '图',
    dataIndex: 'headimgurl',
    key: 'headimgurl',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px"/>　: '无'}</div>),
  }, {
    width: 100,
    title: '快递公司',
    dataIndex: 'express',
    key: 'express',
    render: (text,record) => (<div>{text=='yunda'?'韵达':
                                 text=='shunfeng'?'顺丰':
                                 text=='huitongkuaidi'?'百世汇通':
                                 text=='tiantian'?'天天':
                                 text=='zhaijisong'?'宅急送':
                                 text=='quanfengkuaidi'?'全峰快递':
                                 text=='debangwuliu'?'德邦':
                                 text=='ems'?'EMS':
                                 text=='yuantong'?'圆通':
                                 text=='shentong'?'申通':
                                 text=='zhongtong'?'中通':
                                 text=='youzhengguonei'?'中国邮政':'其他' }</div>)
  }, {
    width: 100,
    title: '快递单号',
    dataIndex: 'trackNumber',
    key: 'trackNumber',
  }, {
    width: 100,
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    render: (text,record) => (<div>{text=='0'?'失效':
                                    text=='1'?'待付款':
                                    text=='2'?'待确认':
                                    text=='3'?'已发货':
                                    text=='4'?'已确认':
                                    text=='5'?'已解冻':
                                    text=='6'?'待退款':
                                    text=='7'?'已退款':'其他'}</div>)
  }, {
    width: 100,
    title: '收货人',
    dataIndex: 'contacterName',
    key: 'contacterName',
  }, {
    width: 100,
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    width: 100,
    title: '支付时间',
    dataIndex: 'payTime',
    key: 'payTime',
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 60,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className="common-table-item-bar" onClick={() => tableOnOrderEditItem(record)}>编辑</a>
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
        title: '订单',
        maskClosable : false,
        visible : formVisibleOrder,
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
            orderNo:i,
            uid:i,
            title:`标题${i}`,
            trackNumber:`${i}${i}`,
            express: '天天',
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

SignGameOrderModal.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageIndex : PropTypes.any,
    pageSize : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableOnChange : PropTypes.any,
    tablePageChange : PropTypes.func,
    tableOnUpdateHtmldetailItem : PropTypes.func,
    formVisibleOrder : PropTypes.any,
    formLoading : PropTypes.any,
    tableOnOrderEditItem : PropTypes.func,
    formCancel : PropTypes.func,
};

export default Form.create()(SignGameOrderModal);
