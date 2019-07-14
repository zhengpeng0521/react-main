import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './ChannelMgr.less';

function ChannelMgrList({
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
  }) {
  const columns = [{
    width: 50,
    title: '频道ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '简介',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '图标',
    dataIndex: 'imgurl',
    key: 'imgurl',
    render: (text, record) => <div>{text != undefined && text != '' && text != null ?　<img src={text} alt={text} width="100px" height='100px'/>　: '无'}</div>,
  }, {
    width: 100,
    title: '排序值',
    dataIndex: 'defsort',
    key: 'defsort',
  }, {
    width: 140,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == ''? '':FormatDate(text)}</div>),
  }, {
    width: 140,
    title: '修改时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == ''? '':FormatDate(text)}</div>),
  }, {
    width: 100,
    title: '订阅数',
    dataIndex: 'subscription',
    key: 'subscription',
  }, {
    width: 100,
    title: '主题数',
    dataIndex: 'topicCount',
    key: 'topic_count',
  }, {
    width: 100,
    title: '帖子数',
    dataIndex: 'articleCount',
    key: 'article_count',
  }, {
    width: 100,
    title: '最后回复作者ID',
    dataIndex: 'lastCmtAuthorId',
    key: 'lastCmtAuthorId',
  }, {
    width: 100,
    title: '最后回复作者名称',
    dataIndex: 'lastCmtAuthorName',
    key: 'lastCmtAuthorName',
  }, {
    width: 130,
    title: '最后回复时间',
    dataIndex: 'lastCmtTime',
    key: 'lastCmtTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == ''? '':FormatDate(text)}</div>),
  }, {
    width: 100,
    title: '推荐',
    dataIndex: 'recommend',
    key: 'recommend',
    render: (text, record) => (<span className={text > 0 ? 'common-text-red' : 'common-text-darkgray'}>
                        {text > 0 ? '推荐' :
                        (<Popconfirm title="确定要设置为推荐吗?" onConfirm={() => tableOnRecommendItem(record.id)}>
                            <a className="common-table-item-bar">设置为推荐</a>
                        </Popconfirm>) }
                        </span>),
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (<div style={{color:text=='0'?'red':'black'}}>{text=='1'?'上架':'下架'}</div>)
  }, {
    width: 100,
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

    let aaa=[];
    for(let i=0;i<20;i++){
        aaa.push({
            key:i,
            id:i,
            title:`你是第${i}头猪`,
            intro:`你就是第${i}头猪`
        });
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
                    loading={loading}
                    pagination={paginationProps}
                    onChange={tableOnChange}
                    bordered
                    rowKey="id"
                    scroll={{ x : 1500 }} />
	      </div>
  );
}

ChannelMgrList.propTypes = {
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
    tableOnFilter : PropTypes.func,
};

export default ChannelMgrList;
