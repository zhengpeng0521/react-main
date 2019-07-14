import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './SaasScrmOverViewFreeTrail.less'

//saas营销首页免费申请试用
function SaasScrmOverViewFreeTrailTable({
    saasScrmOverViewFreeTrailPageIndex,             //免费申请试用管理页码
    saasScrmOverViewFreeTrailPageSize,              //免费申请试用管理每页条数
    saasScrmOverViewFreeTrailTableData,             //免费申请试用管理管理列表数据
    saasScrmOverViewFreeTrailDataTotal,             //免费申请试用管理管理列表条数
    saasScrmOverViewFreeTrailTableLoading,          //免费申请试用管理管理列表加载状态

    ShowScrmOverViewFreeTrailSearch,                //免费申请试用列表点击筛选
    SaasScrmOverViewFreeTrailTableOnChange,         //免费申请试用管理列表状态改变(分页等)
    SaasScrmOverViewFreeTrailChangeStatus,          //免费申请试用改变处理未处理状态
    ShowScrmOverViewFreeTrailExport,                //免费申请试用列表导出
}) {
  const columns = [{
    width: 100,
    title: '机构名(租户名)',
    dataIndex: 'orgName',
    key: 'orgName',
    render:(text,record) => (
        <div>{text}({record.tenantName})</div>
    )
  }, {
    width: 100,
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    width: 100,
    title: '姓名ID',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    width: 100,
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    width: 50,
    title: '来源',
    dataIndex: 'source',
    key: 'source',
    render:(text,record) => (
        <div>
            { text == '1' ? '营销首页' : '未指定'}
        </div>
    )
  }, {
    width: 100,
    title: '状态(可操作)',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {
            '2' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>已处理</strong>吗?</p>} onConfirm={() => SaasScrmOverViewFreeTrailChangeStatus(record)}>
                    <a className={style.check}>未处理</a>
                 </Popconfirm>)
            :
            '1' == text ?
                (<div style={{color:'red'}}>已处理</div>)
            :
            '未指定'
            }
        </div>
    )
  }];

	let paginationProps = {
        current : saasScrmOverViewFreeTrailPageIndex + 1,
        pageSize : saasScrmOverViewFreeTrailPageSize,
        total: saasScrmOverViewFreeTrailDataTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    return (
        <div className="table-bg">
            <div className="common-over">
                <div className="common-left" style={{width : '60%'}}>
                    <div className="table-handle" key="table-handle">
                        <Button type="primary" onClick={() => ShowScrmOverViewFreeTrailExport()}><Icon type="export" />按查询结果导出</Button>
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => ShowScrmOverViewFreeTrailSearch()}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasScrmOverViewFreeTrailTableData}
                loading={saasScrmOverViewFreeTrailTableLoading}
                pagination={paginationProps}
                onChange={SaasScrmOverViewFreeTrailTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default SaasScrmOverViewFreeTrailTable;
