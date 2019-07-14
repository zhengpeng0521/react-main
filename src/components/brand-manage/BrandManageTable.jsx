import React from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import styles from './BrandManageTable.less';

//总部品牌管理
function BrandManageTable({
    tablePageIndex,                 //页码
    tablePageSize,                  //每页条数
    tableDataSource,                //列表数据
    tableTotal,                     //列表条数
    tableLoading,                   //加载状态

    ShowSearchBar,                  //点击筛选
    TableOnChange,                  //套餐管理列表状态改变(分页等)
    ClickExamine                    //点击审核
}) {
    const columns = [{
        width: 80,
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
    }, {
        width: 100,
        title: '品牌源地',
        dataIndex: 'sourceRegion',
        key: 'sourceRegion',
    }, {
        width: 80,
        title: '所属总部',
        dataIndex: 'belongHqName',
        key: 'belongHqName',
    }, {
        width: 80,
        title: '租户号',
        dataIndex: 'tenantId',
        key: 'tenantId',
    }, {
        width: 50,
        title: '直营店',
        dataIndex: 'directNumber',
        key: 'directNumber',
    }, {
        width: 50,
        title: '加盟店',
        dataIndex: 'joinNumber',
        key: 'joinNumber',
    }, {
        width: 50,
        title: '状态',
        dataIndex: 'auditStatusName',
        key: 'auditStatusName',
    }, {
        width: 100,
        title: '提交时间',
        dataIndex: 'applyTime',
        key: 'applyTime',
    }, {
        width: 50,
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render:(text,record) => (
            <div>
                { record.auditStatus == '1' || record.auditStatus == '2' ? <a className={styles.check} onClick={() => ClickExamine(record)}>审核</a> : null }
            </div>
        )
    }];

	let paginationProps = {
        current : tablePageIndex + 1,
        pageSize : tablePageSize,
        total: tableTotal,
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
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => ShowSearchBar()}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={tableDataSource}
                loading={tableLoading}
                pagination={paginationProps}
                onChange={TableOnChange}
                bordered
                rowKey="brandId"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default BrandManageTable;
