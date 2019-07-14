import React from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import styles from './Table.less';

//总部套餐分配
function BrandManageTable({
    tablePageIndex,                 //页码
    tablePageSize,                  //每页条数
    tableDataSource,                //列表数据
    tableTotal,                     //列表条数
    tableLoading,                   //加载状态

    ShowSearchBar,                  //点击筛选
    TableOnChange,                  //套餐管理列表状态改变(分页等)
    OpenLeftPackageModal,           //点击剩余套餐
    ClickDispatch,                  //点击分配套餐
    CheckRecord                     //点击分配记录
}) {
    const columns = [{
        width: 80,
        title: '总部名称',
        dataIndex: 'orgName',
        key: 'orgName',
    },{
        width: 80,
        title: '租户号',
        dataIndex: 'tenantId',
        key: 'tenantId',
    }, {
        width: 100,
        title: '租户名称',
        dataIndex: 'tenantName',
        key: 'tenantName',
    }, {
        width: 80,
        title: '剩余套餐',
        dataIndex: 'leftNum',
        key: 'leftNum',
        render:(text,record) => (
            <a className={styles.check} style = {{ marginRight : 20 }} onClick={() => OpenLeftPackageModal(record,'checkLeft')}>{ text }</a>
        )
    }, {
        width: 80,
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render:(text,record) => (
            <div>
                <a className={styles.check} style = {{ marginRight : 20 }} onClick={() => ClickDispatch(record,'edit')}>分配套餐</a>
                <a className={styles.check} onClick={() => CheckRecord(record,'checkRec')}>分配记录</a>
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
                rowKey="tenantId"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default BrandManageTable;
