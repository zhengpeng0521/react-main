import React, { PropTypes }from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function MechanismList({
    mechPageIndex,        //列表页码
    mechPageSize,         //列表一页条数
    mechLoading,          //列表加载状态
    mechTotal,            //列表内容总条数
    mechTableContent,     //列表内容

    mechTableOnFilter,    //点击筛选
    mechTableOnChange,    //table分页等条件改变事件
    mechMessageAdd,       //新增
    mechSupTableOnEdit,              //编辑
    mechPackageDown,         //上架
    mechPackageUp,           //下架
    mechPackageDel,         //删除
	ExportOrgRegExcel,      //导出查询结果
  }) {
   const columns = [{
        title: '操作',
        dataIndex: 'doing',
        key: 'doing',
        render:(text,record) => (
            <div>
                <a onClick={()=>mechSupTableOnEdit(record)}>编辑 </a>
                <a onClick={()=>mechPackageDel(record)}>删除</a>
            </div>
        )
    }, {
       title: '租户号',
       dataIndex: 'tenantId',
       key: 'tenantId',
   },
	{
        title: '机构号',
        dataIndex: 'orgId',
        key: 'orgId',
	},
	{
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
    }, {
        title: '机构状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (<a>{text==1?"有效":"无效"}</a>),
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }];
    let paginationProps = {
        current : mechPageIndex + 1,
        pageSize : mechPageSize,
        total: mechTotal,
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
						<Button type="primary" onClick={ExportOrgRegExcel}><Icon type="export" />按查询结果导出</Button>
					</div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button key='addTet' type="primary" onClick={mechMessageAdd}><Icon type="plus" />新增</Button>
                        <Button key='filter' type="primary" onClick={mechTableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
           <Table
                columns={columns}
                dataSource={mechTableContent}
                loading={mechLoading}
                pagination={paginationProps}
                onChange={mechTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1500 }} />
        </div>
  );
}

export default MechanismList;
