import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './TopicActivity.less'

function TopicActivityList({
    loading, list, total, pageIndex, pageSize,
    tableOnFilter,
    tablePageChange,
    tableOnChange,
    tableOnChangeStatus,
    tableOnEditItem,
    tableOnCreate,
    tableOnDeleteItem,
    tableOnShowAll,
    tableOnShowClose,
  }) {
  const columns = [{
    width: 100,
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '活动标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 50,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (<div className={text == '1' ? 'common-text-red' : 'common-text-darkgray'}>{text =='1' ?
                        (<Popconfirm title={titlePutDown} onConfirm={() => tableOnChangeStatus(record.id,text)}>
                            <a className="common-table-item-bar" style={{color:'red'}}>上架</a>
                         </Popconfirm>)
                        :
                        (<Popconfirm title={titlePutUp} onConfirm={() => tableOnChangeStatus(record.id,text)}>
                            <a className={style.check}>下架</a>
                         </Popconfirm>) }</div>),
  }, {
    width: 120,
    title: '内容',
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
    width: 100,
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} alt={text} width="100px" height='100px'/>　: '无'}</div>),
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '链接',
    dataIndex: 'link',
    key: 'link',
    render:(text,record) => (<div><a href={text} target='_blank' className={style.check}>{text}</a></div>),
  }, {
    width: 100,
    title: '限制频道ID',
    dataIndex: 'limitChannel',
    key: 'limitChannel',
  }, {
    width: 100,
    title: '限制频道标题',
    dataIndex: 'limitChannelTitle',
    key: 'limitChannelTitle',
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => tableOnEditItem(record)}>编辑</a>
      </p>
    ),
  }];
    const titlePutUp = (
        <p>确定要设置为<strong style={{color:'red'}}>上架</strong>吗?</p>
    );
    const titlePutDown = (
        <p>确定要设置为<strong style={{color:'#2db7f5'}}>下架</strong>吗?</p>
    );
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
                    scroll={{ x : 1000 }} />
	      </div>
  );
}

TopicActivityList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageIndex : PropTypes.any,
    pageSize : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableOnFilter : PropTypes.func,
    tablePageChange : PropTypes.func,
    tableOnChangeStatus : PropTypes.func,
    tableOnChange : PropTypes.func,
    tableOnCreate : PropTypes.func,
    tableOnDeleteItem : PropTypes.func,
    tableOnShowAll : PropTypes.func,
    tableOnShowClose : PropTypes.func,
};

export default TopicActivityList;
