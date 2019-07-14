import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './WeiXinAppointCase.less'

function WeiXinAppointCaseList({
    weiXinAppointCasePageSize,             //微信活动页面数据数量
    weiXinAppointCasePageIndex,            //微信活动页码
    weiXinAppointCaseLoading,              //列表是否加载状态
    weiXinAppointCaseList,                 //列表数据
    weiXinAppointCaseTotal,                //列表数据总数

    WeiXinAppointFilter,                   //点击筛选
    WeiXinAppointCasePageChange,           //分页筛选分类信息改变
    OpenPreviewModal,                       //列表点击预览
    weiXinAppointExportList,               //按查询结果导出
  }) {
  const columns = [{
    width: 80,
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 80,
    title: '预览',
    dataIndex: 'reservationUrl',
    key: 'reservationUrl',
    render:(text,record) => (
        <a className={style.check} onClick={() => OpenPreviewModal(record,'appoint')}>预览</a>
    ),
  }, {
    width: 120,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    width:80,
    title:'租户ID',
    dataIndex:'tenantId',
    key:'tenantId',
  }, {
    width: 80,
    title:'机构ID',
    dataIndex:'orgId',
    key:'orgId',
  }, {
    width: 100,
    title: '联系方式',
    dataIndex: 'tel',
    key: 'tel',
  }, {
    width: 60,
    title: '浏览数',
    dataIndex: 'views',
    key: 'views',
    sorter : true,
  }, {
    width: 70,
    title: '报名数',
    dataIndex: 'amount',
    key: 'amount',
    sorter : true,
  }];

	let paginationProps = {
        current : weiXinAppointCasePageIndex + 1,
        pageSize : weiXinAppointCasePageSize,
        total: weiXinAppointCaseTotal,
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
                    <Button type="primary" onClick={weiXinAppointExportList}><Icon type="export" />按查询结果导出</Button>
                </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={WeiXinAppointFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={weiXinAppointCaseList}
                loading={weiXinAppointCaseLoading}
                pagination={paginationProps}
                onChange={WeiXinAppointCasePageChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
  );
}


export default WeiXinAppointCaseList;
