import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import styles from './GgMgr.less'

function GgMgrList({
    loading, List, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnSetItem,
    tableOnClearCacheItem,
    tableOnAddEssenceItem,
    tableOnRecommendItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
    tableOnChangeStatus,
  }) {
  const columns = [{
    title: '广告ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  }, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 100,
  }, {
    title: '图片',
    dataIndex: 'imgurl',
    key: 'imgurl',
    width: 100,
    render:(text,record) => (
        <div>
            <img src={text} alt={text} style={{width:'100px',heigth:'100px'}} />
        </div>
    )
  }, {
    title: '介绍',
    dataIndex: 'intro',
    key: 'intro',
    width: 100,
  }, {
    title: '链接',
    dataIndex: 'linkUrl',
    key: 'linkUrl',
    width: 100,
  }, {
    title: '类型',
    dataIndex: 'typeName',
    key: 'typeName',
    width: 100,
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 100,
  }, {
    title: '点击量',
    dataIndex: 'clickNum',
    key: 'clickNum',
    width: 100,
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (text, record) => (<span className={text > 0 ? 'common-text-red' : 'common-text-darkgray'}>
                        {text > 0 ?
                        (<Popconfirm title="确定要下架吗?" onConfirm={() => tableOnChangeStatus(record)}>
                            <a className="common-table-item-bar" style={{color:'red'}}>上架</a>
                        </Popconfirm>)
                        :
                        (<Popconfirm title="确定要上架吗?" onConfirm={() => tableOnChangeStatus(record)}>
                            <a className="common-table-item-bar" style={{color:'gray'}}>下架</a>
                        </Popconfirm>) }
                        </span>),
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <div>
        <a className="common-table-item-bar" onClick={() => tableOnSetItem(record)} className={styles.check}>编辑</a>
      </div>
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
    //时间格式化方法
    function charge(DateType,Number){
        if(DateType<Number){
            return '0'+DateType;
        }else{
            return DateType;
        }
    }
    //时间格式化函数
    function FormatDate (strTime) {
        let date = new Date(strTime);
        let Months,Day,Hours,Minutes,Seconds;
        Months = charge(date.getMonth()+1,10);
        Day = charge(date.getDate(),10);
        Hours = charge(date.getHours(),10);
        Minutes = charge(date.getMinutes(),10);
        Seconds = charge(date.getSeconds(),10);
        return date.getFullYear()+"-"+Months+"-"+Day+" "+Hours+":"+Minutes+":"+Seconds;
    }

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
            dataSource={List}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 1000 }} />
  </div>
  );
}

GgMgrList.propTypes = {
    loading : PropTypes.any,
    List: PropTypes.array,
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
    tableOnSetItem : PropTypes.func,
    tableOnClearCacheItem : PropTypes.func,
    tableOnRecommendItem : PropTypes.func,
    tableOnDoUpItem : PropTypes.func,
    tableOnCreate : PropTypes.func,
    tableOnChangeStatus : PropTypes.func,
};

export default GgMgrList;
