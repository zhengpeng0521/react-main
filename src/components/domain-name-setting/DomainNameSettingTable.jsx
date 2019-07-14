import React from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

/*域名设置列表*/
function BannerMgrList({
    total,                      //表格总条数
    dataSource,                 //列表数据
    loading,                    //列表加载状态
    TableOnFilter,              //table点击筛选
    TablePageChange,            //table分页改变
    TableOnExamine,             //租户点击审核
    TableOnOpen,                //租户点击开通
}) {
    const columns = [{
        width: 96,
        title: '租户ID',
        dataIndex: 'tenantId',
        key: 'tenantId'
    }, {
        width: 112,
        title: '租户名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        width: 120,
        title: '联系方式',
        dataIndex: 'tel',
        key: 'tel',
    }, {
        width: 120,
        title: '域名名称',
        dataIndex: 'hostName',
        key: 'hostName',
        render:(text,record) => (
            <div>{ !!text ? text + '.saas.ishanshan.com' : '' }</div>
        )
    }, {
        width: 140,
        title: '提交时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }, {
        width: 82,
        title: '状态',
        dataIndex: 'auditStatus',
        key: 'auditStatus',
        render: (text, record) => <span>{ text == '1' ? '待审核' :
                                          text == '2' ? '审核通过，待开通' :
                                          text == '3' ? '已开通' :
                                          text == '4' ? '已驳回' :
                                          text == '5' ? '已关闭' : '' }</span>,
    }, {
        width: 200,
        title: '域名有效期',
        dataIndex: 'timeRange',
        key: 'timeRange',
        render: (text, record) => (
            <div>{ record.startDate && record.endDate ? record.startDate + ' ~ ' + record.endDate : '' }</div>
        )
    }, {
        width: 100,
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    }, {
        width: 100,
        title: '操作',
        key: 'operation',
        render: (text, record) => (
            <div>
                { record.auditStatus == '1' ?
                    <a onClick = {() => TableOnExamine(record.tenantId,record.hostName)}>审核</a>
                    :
                  record.auditStatus == '2' ?
                    <a onClick = {() => TableOnOpen(record.tenantId,record.hostName)}>开通</a>
                    :
                    null
                }
            </div>
        ),
    }];

    let list = [];
    for(let i = 0 ; i < 20 ; i++){
        list.push({
            tenantId : i ,
            status : i,
            hostName : i+''
        })
    }

	let paginationProps = {
        total: total,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

  return (
    <div className="table-bg">
	    <div className="common-over">
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                    {/*<Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增</Button>*/}
                    <Button type="primary" onClick={TableOnFilter}><Icon type="filter" />筛选</Button>
                </div>
            </div>
        </div>

        <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={paginationProps}
            onChange={TablePageChange}
            bordered
            rowKey="hostId"
            scroll={{ x : 1000 }} />
      </div>
  );
}
export default BannerMgrList;
