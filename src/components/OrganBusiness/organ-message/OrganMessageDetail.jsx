import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon ,data , Modal} from 'antd';
import style from './OrganMessage.less';

function OrganMessageDetail({
    OrganMessageDetailVisible,
    showDetilFun,
    OrganMessageDetailDateSource,
    type,
    TableCancel,

  }) {
  const columns = type == "saas" ? [{
    width:100,
    title:'套餐名称',
    dataIndex:'name',
    key:'name',
  }, {
    width: 100,
    title: '开始时间',
    dataIndex: 'begDate',
    key: 'begDate',
  },{
    width: 100,
    title: '过期时间',
    dataIndex: 'endDate',
    key: 'endDate',
  }]
  :
  [
      {
        width:100,
        title:'套餐名称',
        dataIndex:'mealTitle',
        key:'mealTitle',
      },{
        width:100,
        title:'开始时间',
        dataIndex:'createTime',
        key:'createTime',
      },{
        width:100,
        title:'过期时间',
        dataIndex:'exTime',
        key:'exTime',
      }
  ]
  ;

  return (
    <Modal
        title = '套餐详情'
        visible ={OrganMessageDetailVisible}
        onCancel = { TableCancel }
        onOk = { TableCancel }
        width = '500px'
        >

          <Table
              bordered
              columns={columns}
              dataSource = { OrganMessageDetailDateSource }
              pagination = { false }
              rowKey = 'id'
              />
          {/*
        <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 1500 }} />*/}
      </Modal>
  );
}
export default OrganMessageDetail;
