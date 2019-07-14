import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from '../SaasPackageManage/saas-package-opening/SaasPackageOpening.less'

//saas套餐管理
function FaceMgrTable({
    pageIndex,        //套餐页码
    pageSize,         //套餐每页条数
    tableData,        //套餐管理列表数据
    total,            //套餐管理列表条数
    loading,          //套餐管理列表加载状态

    OpeningPackage,                     //开通套餐
    ShowPackageOpeningSearchBar,        //点击筛选
    tableOnChange,                      //套餐管理列表状态改变(分页等)
    ExportTableContent,                 //按查询结果导出
    openDevice,                         //打开设备列表
}) {
  const columns = [{
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
    width: 70,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      let statusText = text == '1' ? '已开通' : '已过期'
      return statusText
    }
  }, {
    width: 100,
    title: '设备数',
    dataIndex: 'deviceNumber',
    key: 'deviceNumber',
    render: (text, record) => {
      return <a onClick={openDevice.bind(this, record)}>{text}</a>
    }
  }, {
    width: 150,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '套餐开始时间',
    dataIndex: 'mealStartTime',
    key: 'mealStartTime',
  }, {
    width: 100,
    title: '套餐结束时间',
    dataIndex: 'mealEndTime',
    key: 'mealEndTime',
  }];

	let paginationProps = {
        current : pageIndex + 1,
        pageSize : pageSize,
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
                dataSource={tableData}
                loading={loading}
                pagination={paginationProps}
                onChange={tableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default FaceMgrTable;
