import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function TopicRewardList({
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
    width: 200,
    title: '打赏人信息',
    children: [{
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
        width: 100,
        }, {
        title: '用户昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 100,
    }],
  }, {
    width: 200,
    title: '主题(帖子)信息',
    children: [{
        title: '主题(帖子)ID',
        dataIndex: 'dataId',
        key: 'dataId',
        width: 100,
        }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 100,
    }],
  }, {
    width: 50,
    title: '打赏金额',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    width: 100,
    title: '打赏类型',
    dataIndex: 'dataType',
    key: 'dataType',
    render: (text,record) => (<div>{text == 1 ? '购买打赏(主题)' : '直接打赏(主题)'}</div>)
  }, {
    width: 100,
    title: '打赏时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == '' ? '':FormatDate(text)}</div>),
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

TopicRewardList.propTypes = {
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

export default TopicRewardList;
