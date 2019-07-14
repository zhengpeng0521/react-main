import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './KouBeiGameMgr.less'

function KouBeiGameMgrList({
    kouBeiGameLoading,
    kouBeiGameList,
    kouBeiGameTotal,

    tableOnKouBeiGameFilter,
    changeKouBeiGamePageSize,
    changeKouBeiGamePageIndex,
    tablePageChangeKouBeiGame,
    tableOnKouBeiGameCreate,
    tableOnKouBeiGameUpdate,
    tableKouBeiGameUp,
    tableKouBeiGameDown,
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
    render:(text,record) =>(
        <div>{'0' == text ?
            (<Popconfirm title="确定设置上架吗?" onConfirm={() => tableKouBeiGameUp(record.id)}>
                <a className={style.check}>下架</a>
             </Popconfirm>)
            :'1' == text ?
            (<Popconfirm title="确定设置下架吗?" onConfirm={() => tableKouBeiGameDown(record.id)}>
                <a style={{color:'red'}}>上架</a>
             </Popconfirm>):'未指定' }
        </div>
    ),
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
        <div>
            <a className={style.check} onClick={() => tableOnKouBeiGameUpdate(record)}>编辑</a>
        </div>
    ),
  }];

    let aaa=[];
    for(let i=0;i<12;i++){
        aaa.push({
            id:i,
            code:i,
            status:i,
        });
    }

	let paginationProps = {
        total: kouBeiGameTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : changeKouBeiGamePageSize,
        onChange : changeKouBeiGamePageIndex,
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
                        <Button type="primary" onClick={tableOnKouBeiGameFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={kouBeiGameList}
                loading={kouBeiGameLoading}
                pagination={paginationProps}
                onChange={tablePageChangeKouBeiGame}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
  );
}


export default KouBeiGameMgrList;
