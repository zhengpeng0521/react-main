import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './SaasPackageOpening.less'

//saas套餐管理
function SaasPackageOpeningTable({
    saasPackageOpeningPageIndex,        //套餐页码
    saasPackageOpeningPageSize,         //套餐每页条数
    saasPackageOpeningTableData,        //套餐管理列表数据
    saasPackageOpeningTotal,            //套餐管理列表条数
    saasPackageOpeningLoading,          //套餐管理列表加载状态

    OpeningPackage,                     //开通套餐
    ShowPackageOpeningSearchBar,        //点击筛选
    SaasPackageOpeningTableOnChange,    //套餐管理列表状态改变(分页等)
    SetSaasPackageStatus,               //套餐设置状态
    ExportTableContent,                 //按查询结果导出
}) {
  const columns = [{
    width: 100,
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 50,
    title: '租户ID',
    dataIndex: 'tenantId',
    key: 'tenantId',
  }, {
    width: 70,
    title: '机构ID',
    dataIndex: 'orgId',
    key: 'orgId',
  }, {
    width: 120,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    width: 100,
    title: '套餐ID',
    dataIndex: 'resPgId',
    key: 'resPgId',
  }, {
    width: 100,
    title: '套餐名称',
    dataIndex: 'resPgName',
    key: 'resPgName',
  }, {
    width: 150,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '开始日期',
    dataIndex: 'begDate',
    key: 'begDate',
  }, {
    width: 100,
    title: '结束日期',
    dataIndex: 'endDate',
    key: 'endDate',
  }, {
    width: 100,
    title: '开通状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {
            '0' == text ?
                (<a>无效</a>)
            :
            '1' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>无效</strong>吗?一经更改，无法撤回</p>} onConfirm={() => SetSaasPackageStatus(record)}>
                    <a style={{color:'red'}}>有效</a>
                 </Popconfirm>)
            :
            '未指定'
            }
        </div>
    )
  }];

	let paginationProps = {
        current : saasPackageOpeningPageIndex + 1,
        pageSize : saasPackageOpeningPageSize,
        total: saasPackageOpeningTotal,
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
                         <Button type="primary" onClick={ExportTableContent}><Icon type="export" />按查询结果导出</Button>
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => OpeningPackage()}><Icon type="plus" />开通套餐</Button>
                        <Button type="primary" onClick={() => ShowPackageOpeningSearchBar()}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasPackageOpeningTableData}
                loading={saasPackageOpeningLoading}
                pagination={paginationProps}
                onChange={SaasPackageOpeningTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default SaasPackageOpeningTable;
