import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './ApplicableActivitiesMgr.less'

function ApplicableActivitiesMgrList({
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
    tableOnEditExplainHtmlDetailItem,
    tableOnEditFlowHtmlDetailItem,
    tableOnBalanceItem,
    tableOpenImg,
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
    render: (text, record) => <span>{text != undefined && text != '' ?　<img src={text} width='150px' height='100px' onClick={() => tableOpenImg(record)} />　: '无主图'}</span>,
  }, {
    width: 100,
    title: '参与人数',
    dataIndex: 'sumNum',
    key: 'sumNum',
    render: (text, record) => <span>{record.joinNum || 0}/{record.sumNum || 0}</span>,
  }, {
    width: 100,
    title: '数量',
    dataIndex: 'count',
    key: 'count',
  }, {
    width: 150,
    title: '开始时间',
    dataIndex: 'beginTime',
    key: 'beginTime',
  }, {
    width: 150,
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  }, {
    width: 100,
    title: '活动说明',
    dataIndex: 'explainHtmlDetail',
    key: 'explainHtmlDetail',
    render: (text, record) => <span><a href="javascript:void(0)" className={style.check} onClick={tableOnEditExplainHtmlDetailItem.bind(this, record.id)}>修改</a></span>,
  }, {
    width: 100,
    title: '申请流程',
    dataIndex: 'flowHtmlDetail',
    key: 'flowHtmlDetail',
    render: (text, record) => <span><a href="javascript:void(0)" className={style.check} onClick={tableOnEditFlowHtmlDetailItem.bind(this, record.id)}>修改</a></span>,
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => <span>{text == '1' ? '内部测试' :
                                    text == '2' ? '下架' :
                                    text == '3' ? '上架' : '无效'}</span>,
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => tableOnEditItem(record.id)}>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a className={style.check} onClick={() => tableOnBalanceItem(record.id)}>结算</a>
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
            scroll={{ x : 1400 }} />
  </div>
  );
}

ApplicableActivitiesMgrList.propTypes = {
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
    tableOpenImg : PropTypes.func,
};

export default ApplicableActivitiesMgrList;
