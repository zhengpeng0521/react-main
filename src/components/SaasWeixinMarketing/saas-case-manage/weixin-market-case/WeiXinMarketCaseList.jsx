import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './WeiXinMarketCase.less'

function WeiXinMarketCaseList({
    weiXinMarketCasePageSize,                 //微信游戏页面数据数量
    weiXinMarketCasePageIndex,                //微信游戏页码
    weiXinMarketCaseLoading,                  //列表是否加载状态
    weiXinMarketCaseList,                     //列表数据
    weiXinMarketCaseTotal,                    //列表数据总数

    WeiXinMarketFilter,                       //点击筛选
    WeiXinMarketCasePageChange,               //分页筛选分类信息改变
    OpenPreviewModal,                       //列表点击预览
    WeiXinMarketExportList,                   //按查询结果导出
	domainName,
	
  }) {
	
	function touRowData(record) {
		let qrArr = [];
		record&&record.map((item, index) => {
			let qrLink = `${domainName}html/market/activity?tenantId=${item.tenant_id}&orgId=${item.org_id}&activityId=${item.activity_id}&memberId=${item.member_id}`;
			qrArr.push({name : item.member_name, link : qrLink});
		})
		OpenPreviewModal(qrArr, 'market');
	}
		
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
        <a className={style.check} onClick={() => touRowData(record.members)}>{record.members.length || 0}</a>
    ),
  }, {
    width: 70,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            { '2' == text ? '上架中' :
              '0' == text ? '已删除' :
              '1' == text ? '下架中' : '未指定'}
        </div>
    ),
  }, {
    width: 100,
    title: '实例名称',
    dataIndex: 'name',
    key: 'name',
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
    dataIndex: 'count',
    key: 'count',
    sorter : true,
  }];

	let paginationProps = {
        current : weiXinMarketCasePageIndex + 1,
        pageSize : weiXinMarketCasePageSize,
        total: weiXinMarketCaseTotal,
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
                    <Button type="primary" onClick={WeiXinMarketExportList}><Icon type="export" />按查询结果导出</Button>
                </div>

                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={WeiXinMarketFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={weiXinMarketCaseList}
                loading={weiXinMarketCaseLoading}
                pagination={paginationProps}
                onChange={WeiXinMarketCasePageChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
  );
}


export default WeiXinMarketCaseList;
