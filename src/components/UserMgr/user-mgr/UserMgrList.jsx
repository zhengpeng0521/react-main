import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './UserMgr.less';

function UserMgrList({
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
    width: 100,
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    width: 150,
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    width: 150,
    title: '简介',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '头像',
    dataIndex: 'headimgurl',
    key: 'headimgurl',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px" height='100px'/>　: '无'}</div>),
  }, {
    width: 100,
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render:(text,record) => (
        <div>{text==1?"男":"女"}</div>
    ),
  },{
    width: 120,
    title: '发起主题数',
    dataIndex: 'topicCnt',
    key: 'topicCnt',
  }, {
    width: 100,
    title: '金币数',
    dataIndex: 'userPoint',
    key: 'userPoint',
  }, {
    width: 120,
    title: '发起评论数',
    dataIndex: 'commentCnt',
    key: 'commentCnt',
  }, {
    width: 120,
    title: '收藏数',
    dataIndex: 'collectCnt',
    key: 'collectCnt',
  }, {
    width: 100,
    title: '粉丝数',
    dataIndex: 'fansCnt',
    key: 'fansCnt',
  }, {
    width: 100,
    title: '关注数',
    dataIndex: 'starCnt',
    key: 'starCnt',
  }, {
    width: 100,
    title: '是否达人',
    dataIndex: 'expert',
    key: 'expert',
    render:(text,record) => (
        <div>{text==0?"":"达人"}</div>
    ),
  }, {
    width: 100,
    title: '达人类型',
    dataIndex: 'expertType',
    key: 'expertType',
  }, {
    width: 100,
    title: '是否版主',
    dataIndex: 'moderator',
    key: 'moderator',
    render:(text,record) => (
        <div>{text==0?"":"版主"}</div>
    ),
  }, {
    width: 200,
    title: '注册时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == ''? '':FormatDate(text)}</div>),
  }, {
    width: 150,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => tableOnEditItem(record)}>编辑</a>
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

UserMgrList.propTypes = {
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

export default UserMgrList;
