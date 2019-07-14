import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function SecondSaleList({
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
    width: 50,
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 150,
    title: '说明',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '图片',
    dataIndex: 'imgurl',
    key: 'imgurl',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px" height="100px"/>　: '无'}</div>),
  }, {
    width: 100,
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  }, {
    width: 100,
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  }, {
    width: 100,
    title: '限制(次/人)',
    dataIndex: 'amountLimit',
    key: 'amountLimit',
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text,record) => (<div style={{color:text=='9'?'red':''}}>{text=='9'?'内部测试':
                                                                       text=='1'?'上架':
                                                                       text=='0'?'下架':''}</div>)
  }, {
    width: 150,
    title: '链接',
    dataIndex: 'url',
    key: 'url',
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a style={{color:'red'}} className="common-table-item-bar" onClick={() => tableOnEditItem(record)}>修改</a>
      </p>
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
                <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增</Button>
            </div><br/>
            <div className="common-right" style={{width : '40%'}}>

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

SecondSaleList.propTypes = {
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

export default SecondSaleList;
