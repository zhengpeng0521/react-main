import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './WeiXinGame.less'

function WeiXinGameList({
    weiXinGamePageIndex,          //微信游戏列表当前页码
    weiXinGamePageSize,           //微信游戏列表每页显示数量
    weiXinGameLoading,
    weiXinGameList,
    weiXinGameTotal,

    tableOnWeiXinGameCreate,
    tableOnWeiXinGameFilter,
    changeWeiXinGamePageSize,
    changeWeiXinGamePageIndex,
    tablePageChangeWeiXinGame,
    tableWeiXinGameUp,
    tableWeiXinGameDown,
    tableOnWeiXinGameUpdate,
  }) {
  const columns = [{
    width: 100,
    title: '游戏ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '游戏码',
    dataIndex: 'gameCode',
    key: 'gameCode',
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'gameTitle',
    key: 'gameTitle',
  }, {
    width: 120,
    title: '说明',
    dataIndex: 'gameIntro',
    key: 'gameIntro',
  }, {
    width: 100,
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} alt={text} width="100px" height='100px'/>　: '无'}</div>),
  }, {
    width: 100,
    title: '游戏管理地址',
    dataIndex: 'provider',
    key: 'provider',
  }, {
    width: 100,
    title: '试玩URL地址',
    dataIndex: 'demoUrl',
    key: 'demoUrl',
  }, {
    width: 100,
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  }, {
    width: 100,
    title: '时间单位',
    dataIndex: 'unit',
    key: 'unit',
    render:(text,record) => (
        <div>{'1'==text?'天':
              '2'==text?'月':
              '3'==text?'年':
              '4'==text?'永远':'未指定'}
        </div>
    ),
  }, {
    width: 100,
    title: '周期',
    dataIndex: 'period',
    key: 'period',
  }, {
    width: 100,
    title: '排序值',
    dataIndex: 'defsort',
    key: 'defsort',
  }, {
    width: 100,
    title: '状态(可修改)',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>{'0' == text ?
            (<Popconfirm title={<span>确定设置<strong style={{color:'red'}}>上架</strong>吗</span>} onConfirm={() => tableWeiXinGameUp(record.id)}>
                <a className={style.check}>下架中</a>
             </Popconfirm>)
            :'1' == text ?
            (<Popconfirm title={<span>确定设置<strong style={{color:'#57c5f7'}}>下架</strong>吗</span>} onConfirm={() => tableWeiXinGameDown(record.id)}>
                <a style={{color:'red'}}>上架中</a>
             </Popconfirm>):'未指定' }
        </div>
    )
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
        <div>
            <a className={style.check} onClick={() => tableOnWeiXinGameUpdate(record)}>编辑</a>
        </div>
    ),
  }];

	let paginationProps = {
        current : weiXinGamePageIndex + 1,
        pageSize : weiXinGamePageSize,
        total: weiXinGameTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : changeWeiXinGamePageSize,
        onChange : changeWeiXinGamePageIndex,
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
                        <Button type="primary" onClick={tableOnWeiXinGameFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={weiXinGameList}
                loading={weiXinGameLoading}
                pagination={paginationProps}
                onChange={tablePageChangeWeiXinGame}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
  );
}

export default WeiXinGameList;
