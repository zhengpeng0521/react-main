import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon, Popover } from 'antd';
import style from './TenantMessage.less';

/*租户信息table*/
function TenantMessageList({
    tenantPageIndex,        //租户列表页码
    tenantPageSize,         //租户列表一页条数
    tenantLoading,          //租户列表加载状态
    tenantTotal,            //列表内容总条数
    tenantTableContent,     //列表内容

    tenantTableOnFilter,    //点击筛选
    tenantTableOnChange,    //table分页等条件改变事件
    tenantTableOnCheckOrg,  //table查看租户下所有的机构
    tenantTableOnExport,    //按查询结果导出
    tenantMessageAddTet,    //点击新增租户
    tenantMessageCheckTet,  //编辑租户名称
  }) {
    const columns = [{
        width: 100,
        title: '操作',
        dataIndex: 'report',
        key: 'report',
        render:(text,record) => (
            <div>
                <a onClick={() => tenantMessageCheckTet(record.id)}>编辑</a>
                <a onClick={() => tenantTableOnCheckOrg(record)} style={{marginLeft:'10px'}}>管理机构</a>
            </div>
        )
    }, {
        width: 60,
        title: '租户ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        width: 100,
        title: '租户名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        width: 100,
        title: '简介',
        dataIndex: 'intro',
        key: 'intro',
    }, {
        width: 100,
        title: '租户手机号',
        dataIndex: 'tel',
        key: 'tel',
    }, {
        width: 100,
        title: '口碑商户号',
        dataIndex: 'merchantPid',
        key: 'merchantPid',
    }, {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (
            <div>
                { '0' == text ? '无效'
                   :
                  '1' == text ? <span style={{color:'red'}}>有效</span>
                   :
                  '未指定'
                }
            </div>
        )
    }, {
        width: 100,
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }];

	let paginationProps = {
        current : tenantPageIndex + 1,
        pageSize : tenantPageSize,
        total: tenantTotal,
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
                    <div className="table-handle" >
                        <Button key='export' type="primary" onClick={tenantTableOnExport}><Icon type="export" />按查询结果导出</Button>
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button key='addTet' type="primary" onClick={tenantMessageAddTet}><Icon type="plus" />新增</Button>
                        <Button key='filter' type="primary" onClick={tenantTableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={tenantTableContent}
                loading={tenantLoading}
                pagination={paginationProps}
                onChange={tenantTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1500 }} />
        </div>
    );
}

export default TenantMessageList;
