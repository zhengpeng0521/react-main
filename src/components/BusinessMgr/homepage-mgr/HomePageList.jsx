import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function HomePageList({
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
    title: '数据类型',
    dataIndex: 'dataType',
    key: 'dataType',
    render: (text,record) => (<div>{text=='1'?'教程':
                                    text=='2'?'作品':
                                    text=='3'?'机构':
                                    text=='4'?'机构课程':
                                    text=='5'?'机构活动':'其他'}</div>),
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '简介',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '图片',
    dataIndex: 'imgurl',
    key: 'imgurl',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="150px" height="100px"/>　: '无'}</div>),
  }, {
    width: 100,
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    width: 100,
    title: '浏览数',
    dataIndex: 'views',
    key: 'views',
  }, {
    width: 100,
    title: '浏览数(真实)',
    dataIndex: 'realViews',
    key: 'realViews',
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a style={{color:'red'}} className="common-table-item-bar" onClick={() => tableOnDeleteItem(record.id)}>删除</a>
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

HomePageList.propTypes = {
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

export default HomePageList;
