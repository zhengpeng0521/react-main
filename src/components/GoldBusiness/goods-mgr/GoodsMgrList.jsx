import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './GoodsMgr.less';

function GoodsMgrList({
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
    tableOnEditGoodsHtmlDetailItem,
  }) {
  const columns = [{
    width: 100,
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
    render: (text, record) => (<div>{text != undefined && text != '' && text != 'wutu' ?　<img src={text} width="120px" height='90px'/>　: '无'}</div>),
  }, {
    width: 150,
    title: '商品链接',
    dataIndex: 'goodsUrl',
    key: 'goodsUrl',
  }, {
    width: 100,
    title: '库存',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    width: 100,
    title: '序号',
    dataIndex: 'seqNo',
    key: 'seqNo',
  }, {
    width: 100,
    title: '市场价',
    dataIndex: 'marketPrice',
    key: 'marketPrice',
  }, {
    width: 100,
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  }, {
    width: 100,
    title: '金币价格',
    dataIndex: 'goldPrice',
    key: 'goldPrice',
  }, {
    width: 100,
    title: '钻石价格',
    dataIndex: 'diamondPrice',
    key: 'diamondPrice',
  }, {
    width: 150,
    title: '商品类型',
    dataIndex: 'goodsTypeName',
    key: 'goodsTypeName',
  },{
    width: 150,
    title: '销售类型',
    dataIndex: 'saleType',
    key: 'saleType',
    render:(text, record) => (
        <div>
            <p>{text=='1'?'普通商品':
                text=='2'?'秒杀商品':
                text=='3'?'试用活动':'其他'}</p>
        </div>
    ),
  }, {
    width: 150,
    title: '销售状态',
    dataIndex: 'saleStatus',
    key: 'saleStatus',
    render:(text, record) => (
        <div>
            <p style={{color:text>0?'red':'gray'}}>{text=='1'?"上架":
                                                    text=='0'?"下架":"其他"}</p>
        </div>
    ),
  }, {
    width: 150,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record ) =>(
        <div>
            <p>{text=='0'?'无效':
                text=='1'?'显示':
                text=='2'?'隐藏':'其他'}</p>
        </div>
    ),
  }, {
    width: 150,
    title: '修改商品详情',
    dataIndex: 'changeDetail',
    key: 'changeDetail',
    render: (text, record) => (<div><a href="javascript:void(0)" className={style.check} onClick={() => tableOnEditGoodsHtmlDetailItem(record.id)}>修改</a></div>),
  }, {
    width: 150,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className="common-table-item-bar" onClick={() => tableOnEditItem(record)}>编辑</a>
        <Popconfirm title="确定要删除吗?" onConfirm={() => tableOnDeleteItem(record.id)}>
            <a className="common-table-item-bar">删除</a>
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

GoodsMgrList.propTypes = {
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

export default GoodsMgrList;
