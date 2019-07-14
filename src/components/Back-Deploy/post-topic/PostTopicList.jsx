import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './PostTopic.less'

function PostTopicList({
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
  }) {
  const columns = [{
    width: 50,
    title: '专题编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '主标题',
    dataIndex: 'mainTitle',
    key: 'mainTitle',
    render: (text, record) => (<div>{text.length>10?text.substr(0,10)+'......':text}</div>),
  }, {
    width: 100,
    title: '副标题',
    dataIndex: 'subTitle',
    key: 'subTitle',
    render: (text, record) => (<div>{text.length>10?text.substr(0,10)+'......':text}</div>),
  }, {
    width: 100,
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px" height='100px'/>　: '无'}</div>),
  }, {
    width: 100,
    title: '小图',
    dataIndex: 'smallImg',
    key: 'smallImg',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px" height='100px'/>　: '无'}</div>),
  }, {
    width: 100,
    title: '专题简介',
    dataIndex: 'shortIntro',
    key: 'shortIntro',
    render: (text,record,index) =>
                (
                    <div>{text}<br/>
                        {record.thisLong=='1'&&text.length<37?(<a className={style.check} onClick={() => tableOnShowAll(index)}>{record.expend}</a>):
                        record.thisLong=='1'&&text.length>36?(<a className={style.check} onClick={() => tableOnShowClose(index)}>{record.shrink}</a>):''}
                    </div>
                ),
  }, {
    width: 50,
    title: '相关帖子数',
    dataIndex: 'relatedTopicNum',
    key: 'relatedTopicNum',
  }, {
    width: 130,
    title: '链接',
    dataIndex: 'link',
    key: 'link',
    render: (text,record) => (<a href={text} target='_blank'>{text}</a>)
  }, {
    width: 100,
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

			    <div className="table-handle" key="table-handle">
                </div>

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
                    expandedRowRender={record => <p>相关帖子编号：{record.relatedTopic}</p>}
                    loading={loading}
                    pagination={paginationProps}
                    onChange={tableOnChange}
                    bordered
                    rowKey="id"
                    scroll={{ x : 1000 }} />
	      </div>
  );
}

PostTopicList.propTypes = {
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
    tableOnDeleteItem : PropTypes.func,
    tableOnShowAll : PropTypes.func,
    tableOnShowClose : PropTypes.func,
};

export default PostTopicList;
