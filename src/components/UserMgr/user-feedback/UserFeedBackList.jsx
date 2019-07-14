import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function UserFeedBackList({
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
    tableOnCancleEssenceItem,
    tableOnRecommendItem,
    tableOnPreviewItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
    tableOnAddEssenceBatch,
    tableOnCancleEssenceBatch,
    tableOnRecommendBatch,
    tableOnDoUpBatch,
    tableOnClearCacheBatch,
    tableOnDeleteBatch,
  }) {
  const columns = [{
    width: 50,
    title: '反馈ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '发表人',
    dataIndex: 'contactInfo',
    key: 'contactInfo',
  }, {
    width: 120,
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  }, {
    width: 120,
    title: '发表时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 120,
    title: '修改时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
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

UserFeedBackList.propTypes = {
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
    tableOnFilter : PropTypes.func,
};

export default UserFeedBackList;
