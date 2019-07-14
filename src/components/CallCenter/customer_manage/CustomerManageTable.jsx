import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon ,Popover} from 'antd';

function CustomerMannageList({
    loading,
    list,
    total,
    pageIndex,
    pageSize,
    selectedRowKeys,
    selectedRows,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,

    tableOnCreate,
    tableOnCheck,//审核
    tableOnEdit, //编辑
    tableOnLook, //查看
  }) {
  const columns = [{
    width: 80,
    title: '租户ID',
    dataIndex: 'tenantId',
    key: 'tenantId',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 100,
    title: '租户名称',
    dataIndex: 'tenantName',
    key: 'tenantName',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 80,
    title: '机构ID',
    dataIndex: 'orgId',
    key: 'orgId',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 100,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 60,
    title: '客户资料',
    dataIndex: 'detail',
    key: 'detail',
    render:(text,record) => (
        <div><a onClick = {()=>tableOnLook(record.id)}>查看</a></div>
    )
  }, {
    width: 60,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
        {text=='1'?
                <span>待审核</span>
        : text=='2'?
            <span>审核通过</span>
        :
            <span>已驳回</span>
            }
        </div>
    )
  }, {
    width: 80,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
        <div>
            {record.status=='3'?
                 <div>
                    <a onClick = {()=>tableOnEdit(record.id)} style={{paddingLeft:'20px'}}>编辑</a>
                 </div>
                : null
            }
        </div>
    )
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
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增客户</Button>
                </div>
            </div>
        </div>

        <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            //rowSelection={rowSelection}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 1500 }} />
      </div>
  );
}

CustomerMannageList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageIndex : PropTypes.any,
    pageSize : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableRowSelectChange : PropTypes.func,
    tableRowCheckProps : PropTypes.func,
    tablePageChange : PropTypes.func,
    tableOnChange : PropTypes.func,
    tableOnCreate : PropTypes.func,
    tableOnCheck : PropTypes.func,
    tableOnEdit : PropTypes.func,
};

export default CustomerMannageList;
