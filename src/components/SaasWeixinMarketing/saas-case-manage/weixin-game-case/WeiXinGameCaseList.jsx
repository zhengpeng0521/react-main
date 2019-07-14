import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './WeiXinGameCase.less'

function WeiXinGameCaseList({
    weiXinGameCasePageSize,                 //微信游戏页面数据数量
    weiXinGameCasePageIndex,                //微信游戏页码
    weiXinGameCaseLoading,                  //列表是否加载状态
    weiXinGameCaseList,                     //列表数据
    weiXinGameCaseTotal,                    //列表数据总数

    WeiXinGameFilter,                       //点击筛选
    WeiXinGameCasePageChange,               //分页筛选分类信息改变
    OpenPreviewModal,                       //列表点击预览
    WeiXinGameExportList,                   //按查询结果导出
  }) {
  const columns = [{
    width: 100,
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 80,
    title: '预览',
    dataIndex: 'preview',
    key: 'preview',
    render:(text,record) => (
        <a className={style.check} onClick={() => OpenPreviewModal(record,'game')}>预览</a>
    ),
  }, {
    width: 70,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            { '1' == text ? '上架中' :
              '0' == text ? '已删除' :
              '2' == text ? '下架中' : '未指定'}
        </div>
    ),
  }, {
    width: 100,
    title: '实例名称',
    dataIndex: 'instanceName',
    key: 'instanceName',
  }, {
    width: 100,
    title: '模板名称',
    dataIndex: 'modelName',
    key: 'modelName',
  }, {
    width: 120,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    width:70,
    title:'租户ID',
    dataIndex:'tenantId',
    key:'tenantId',
  },  {
    width: 70,
    title:'机构ID',
    dataIndex:'orgId',
    key:'orgId',
  }, {
    width: 100,
    title: '联系方式',
    dataIndex: 'tel',
    key: 'tel',
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 70,
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
  }, {
    width: 70,
    title: '分享数',
    dataIndex: 'shares',
    key: 'shares',
    sorter : true,
  }];

	let paginationProps = {
        current : weiXinGameCasePageIndex + 1,
        pageSize : weiXinGameCasePageSize,
        total: weiXinGameCaseTotal,
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
                    <Button type="primary" onClick={WeiXinGameExportList}><Icon type="export" />按查询结果导出</Button>
                </div>

                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={WeiXinGameFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={weiXinGameCaseList}
                loading={weiXinGameCaseLoading}
                pagination={paginationProps}
                onChange={WeiXinGameCasePageChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
  );
}


export default WeiXinGameCaseList;
