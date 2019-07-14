import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon ,Popover } from 'antd';

function AtTheManageList({
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
    tablePageSizeChange,
    tableOnChange,
    tableOnFilter, //筛选
    tableOnCreate, //新增
    tableToBind,   //改绑
  }) {

  const columns = [{
    width: 100,
    title: '租户ID',
    dataIndex: 'tenantId',
    key: 'tenantId',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 80,
    title: '租户名称',
    dataIndex: 'tenantName',
    key: 'tenantName',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 100,
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
    title: '员工编号',
    dataIndex: 'tenantUserId',
    key: 'tenantUserId',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 60,
    title: '姓名',
    dataIndex: 'tenantUserName',
    key: 'tenantUserName',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 80,
    title: '手机号',
    dataIndex: 'userMobile',
    key: 'userMobile',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 60,
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  }, {
    width: 90,
    title: '外呼账号',
    dataIndex: 'accCallOut',
    key: 'accCallOut',
    render : (text,record) => (
        <Popover placement="top" content={text} trigger="hover">
            { text }
        </Popover>
    )
  },{
    width: 60,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {text=='1'?
                <span>未激活</span>

            : text=='3'?
                <span>已过期</span>

            :
                <span>已开通</span>
            }
        </div>
    )
  },{
    width: 80,
    title: '到期时间',
    dataIndex: 'endTime',
    key: 'endTime',
    render: (text,record) => (
        <Popover placement="top" content={text || '--'} trigger="hover">
            {
                text == undefined || text == null || text == ''?
                    ''
                :
                   text
            }
        </Popover>

    ),
  },{
    width: 60,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
        <div>
            {record.status=='1'?null
                :
                <a onClick={()=>tableToBind(record.orgId,record.tenantUserName,record.accCallOut,record.id,record.tenantId)}>改绑</a>
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
        onShowSizeChange : tablePageSizeChange,
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
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增坐席</Button>
                    <Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
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

AtTheManageList.propTypes = {
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
    tableOnFilter : PropTypes.func,
    tableOnCreate : PropTypes.func,
};

export default AtTheManageList;
