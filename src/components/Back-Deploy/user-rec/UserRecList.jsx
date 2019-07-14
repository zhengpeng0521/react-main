import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './UserRec.less'

function UserRecList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnClearCacheItem,
    tableOnAddEssenceItem,
    tableOnRecommendItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
    tableOnDeleteItem,
    tableOnShowAll,
    tableOnShowClose,
    tableOnSet,
  }) {
  const columns = [{
    width: 50,
    title: '推荐编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '用户昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    width: 100,
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    width: 100,
    title: '推荐介绍',
    dataIndex: 'shortIntro',
    key: 'shortIntro',
    render: (text,record,index) =>
                (
                    <div>{text}<br/>
                        {record.thisLong=='1'&&text.length<37?(<a className={style.check} onClick={() => tableOnShowAll(index)}>{record.expend}</a>):(<a className={style.check} onClick={() => tableOnShowClose(index)}>{record.shrink}</a>)}
                    </div>
                ),
  }, {
    width: 100,
    title: '相关专题数',
    dataIndex: 'relatedCardTopicNum',
    key: 'relatedCardTopicNum',
  }, {
    width: 100,
    title: '排序值',
    dataIndex: 'sortValue',
    key: 'sortValue',
  }, {
    width: 130,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => tableOnEditItem(record)}>编辑</a>&nbsp;&nbsp;
        <Popconfirm title="确定要删除吗?" onConfirm={() => tableOnDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
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

			    <div className="table-handle" key="table-handle">
                </div>

            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增</Button>
                    <Button type="primary" onClick={tableOnSet}><Icon type="link" />链接</Button>
                    <Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
                </div>
            </div>
        </div>
            <Table
                columns={columns}
                dataSource={list}
                expandedRowRender={record => <p>相关专题编号：{record.relatedCardTopic}</p>}
                loading={loading}
                pagination={paginationProps}
                onChange={tableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
	      </div>
  );
}

UserRecList.propTypes = {
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
    tableOnCreate :PropTypes.func,
    tableOnClearCacheItem : PropTypes.func,
    tableOnRecommendItem : PropTypes.func,
    tableOnDoUpItem : PropTypes.func,
    tableOnDeleteItem  : PropTypes.func,
    tableOnShowAll : PropTypes.func,
    tableOnShowClose : PropTypes.func,
    tableOnSet : PropTypes.func,
};

export default UserRecList;
