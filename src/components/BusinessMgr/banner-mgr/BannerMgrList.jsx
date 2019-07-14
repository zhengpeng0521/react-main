import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function BannerMgrList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnUpdateHtmldetailItem,
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
    width: 100,
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 150,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 150,
    title: '主图',
    dataIndex: 'imgurl',
    key: 'imgurl',
    render: (text, record) => <span>{text != undefined && text != '' && text!= 'wutu' ?　<img src={text} width="150px" />　: '无'}</span>,
  }, {
    width: 100,
    title: '预览',
    dataIndex: 'preview',
    key: 'preview',
    render: (text, record) => <span><a href="javascript:void(0)" onClick={tableOnPreviewItem.bind(this, record.shareUrl)}>预览</a></span>,
  }, {
    width: 200,
    title: '描述',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (text, record) => <span>{text == '01' ? '原生界面' :
                                     text == '02' ? '网页' :
                                    text == '03' ? '教程专题' :
                                    text == '04' ? '话题专题' :
                                    text == '05' ? '达人榜单' : '其他类型'}</span>,
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => <span>{text == '0' ? '下架' :
                                     text == '1' ? '上架' : '其他状态'}</span>,
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className="common-table-item-bar" href="javascript:void(0)" onClick={() => tableOnEditItem(record.id)}>编辑</a>
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
            rowSelection={rowSelection}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 1000 }} />
      </div>
  );
}

BannerMgrList.propTypes = {
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
    tableOnCreate : PropTypes.func,
};

export default BannerMgrList;
