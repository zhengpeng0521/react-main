import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function RobotList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnDeleteItem,
    tableOnClearCacheItem,
    tableOnAddEssenceItem,
    tableOnRecommendItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
  }) {
  const columns = [{
    width: 100,
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '业务类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    width: 150,
    title: '规则类型',
    dataIndex: 'ruleType',
    key: 'ruleType',
  }, {
    width: 100,
    title: '操作数',
    dataIndex: 'num',
    key: 'num',
  }, {
    width: 100,
    title: '开始时间',
    dataIndex: 'beginTime',
    key: 'beginTime',
  }, {
    width: 100,
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    width: 100,
    title: '运行开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  }, {
    width: 100,
    title: '运行结束时间',
    dataIndex: 'overTime',
    key: 'overTime',
  }, {
    width: 150,
    title: '查看',
    dataIndex: 'detail',
    key: 'detail',
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
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增</Button>
                    <Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
                </div>
            </div>
        </div>

        <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 1500 }} />
      </div>
  );
}

RobotList.propTypes = {
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
    tableColumnHeadClick : PropTypes.func,
    tableOnEditItem : PropTypes.func,
    tableOnDeleteItem : PropTypes.func,
    tableOnClearCacheItem : PropTypes.func,
    tableOnRecommendItem : PropTypes.func,
    tableOnDoUpItem : PropTypes.func,
};

export default RobotList;
