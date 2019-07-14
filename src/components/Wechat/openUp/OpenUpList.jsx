import React, { PropTypes }from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function OpenUpList({
    OpenUpPageIndex,        //列表页码
    OpenUpPageSize,         //列表一页条数
    OpenUpLoading,          //列表加载状态
    OpenUpTotal,            //列表内容总条数
    OpenUpTableContent,     //列表内容

    OpenUpTableOnFilter,    //点击筛选
    OpenUpTableOnChange,    //table分页等条件改变事件
    OpenUpMessageAdd,       //新增
    OpenUpsupTableOnEdit,              //编辑
    openPackageDown,         //上架
    openPackageUp,           //下架
    openPackageDel,         //删除
	ExportOrgRegExcel,      //导出查询结果

  }) {
   const columns = [
// {
//      title: '操作',
//      dataIndex: 'doing',
//      key: 'doing',
//      render:(text,record) => (
//          <div>
//              <a onClick={()=>OpenUpsupTableOnEdit(record.id)}>编辑 </a>
//              <a onClick={()=>openPackageDel(record)}>删除</a>
//          </div>
//      )
//  },
    {
       title: '租户号',
       dataIndex: 'tenantId',
       key: 'tenantId',
   }, {
        title: '状态',
        dataIndex: 'expireStatus',
        key: 'expireStatus',
        render:(text,record) => (<a>{text==1?"有效":"过期"}</a>),
    }, {
        title: '租户名称',
        dataIndex: 'tenantName',
        key: 'tenantName',
    }
   , {
   		width: 250,
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }, {
    	width: 250,
        title: '过期时间',
        dataIndex: 'expireTime',
        key: 'expireTime',
    }];
    let paginationProps = {
        current : OpenUpPageIndex + 1,
        pageSize : OpenUpPageSize,
        total: OpenUpTotal,
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
                        <Button key='addTet' type="primary" onClick={OpenUpMessageAdd}><Icon type="plus" />新增</Button>
                        <Button key='filter' type="primary" onClick={OpenUpTableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
           <Table
                columns={columns}
                dataSource={OpenUpTableContent}
                loading={OpenUpLoading}
                pagination={paginationProps}
                onChange={OpenUpTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1500 }} />
        </div>
  );
}

export default OpenUpList;
