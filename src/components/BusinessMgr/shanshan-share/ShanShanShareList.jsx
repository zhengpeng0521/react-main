import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './ShanShanShare.less';

function ShanShanShareList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableOnEditItem,
  }) {
  const columns = [{
    width: 100,
    title: '闪闪分享ID',
    dataIndex: 'ID',
    key: 'ID'
  }, {
    width: 100,
    title: '贴子ID',
    dataIndex: 'source_id',
    key: 'source_id',
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '主图',
    dataIndex: 'imgurl',
    key: 'imgurl',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="120px" height='80px'/>　: '无'}</div>),
  }, {
    width: 180,
    title: '分享链接',
    dataIndex: 'url',
    key: 'url',
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  }, {
    width: 100,
    title: '修改时间',
    dataIndex: 'modify_time',
    key: 'modify_time',
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <div>
        <a href="javascript:void(0)" onClick={() => tableOnEditItem(record)} className={style.check}>编辑</a>
      </div>
    ),
  }];

    //当前是否有选中项
    let hasSelected = selectedRowKeys.length > 0;

    let rowSelection = {
        selectedRowKeys,
        onChange : tableRowSelectChange,
        getCheckboxProps : tableRowCheckProps,
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

  return (
    <div className="table-bg">
	    <div className="common-over">
		    <div className="common-left" style={{width : '60%'}}>
            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                </div>
            </div>
        </div>

            <Table
                columns={columns}
                dataSource={list}
                loading={loading}
                onChange={tableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1500 }} />
      </div>
  );
}


export default ShanShanShareList;
