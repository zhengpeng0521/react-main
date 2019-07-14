import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function GoldMgrList({
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
    width: 130,
    title: '发送方信息',
    children: [{
        title: '用户ID',
        dataIndex: 'userid',
        key: 'userid',
        width: 50,
        }, {
        title: '用户名',
        dataIndex: 'snickname',
        key: 'snickname',
        width: 80,
    }],
  }, {
    width: 130,
    title: '接收方信息',
    children: [{
        title: '用户ID',
        dataIndex: 'sourceid',
        key: 'sourceid',
        width: 50,
        }, {
        title: '用户名',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 80,
    }],
  }, {
    width: 50,
    title: '前期金币余额',
    dataIndex: 'preBalance',
    key: 'preBalance',
  }, {
    width: 50,
    title: '发生额',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    width: 50,
    title: '后期金币余额',
    dataIndex: 'balance',
    key: 'balance',
  }, {
    width: 70,
    title: '交易类型',
    dataIndex: 'tradetype',
    key: 'tradetype',
    render: (text, record) => (<div>{text == '101' ? '打赏(主题)' :
                                     text == '102' ? '购买(主题)' :
                                     text == '103' ? '金币商城消费' :
                                     text == '104' ? '用户签到' :
                                     text == '105' ? '用户注册' :
                                     text == '106' ? '完善资料' :
                                     text == '107' ? '邀请好友成功' :
                                     text == '999' ? '系统':'其他'}</div>),
  }, {
    width: 100,
    title: '交易描述',
    dataIndex: 'tradedesc',
    key: 'tradedesc',
    render: (text, record) => (<div>{text.substring(0,text.indexOf('《'))}<span style={{color:'red'}}>{text.substring(text.indexOf('《'),text.indexOf('》')+1)}</span>{text.substring(text.indexOf('》')+1)}</div>),
  }, {
    width: 100,
    title: '发生时间',
    dataIndex: 'createtime',
    key: 'createtime',
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
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />加减金币</Button>
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

GoldMgrList.propTypes = {
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

export default GoldMgrList;
