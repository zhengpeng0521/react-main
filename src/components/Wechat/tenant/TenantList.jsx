import React, { PropTypes }from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function TenantList({
    tenantPageIndex,        //列表页码
    tenantPageSize,         //列表一页条数
    tenantLoading,          //列表加载状态
    tenantTotal,            //列表内容总条数
    tenantTableContent,     //列表内容

    tenantTableOnFilter,    //点击筛选
    tenantTableOnChange,    //table分页等条件改变事件
    tenantMessageAdd,       //新增
    supTableOnEdit,              //编辑
    tableSupPackageDown,         //上架
    tableSupPackageUp,           //下架
    tableSupPackageDel,         //删除
	ExportOrgRegExcel,      //导出查询结果

  }) {
   const columns = [{
        title: '操作',
        dataIndex: 'doing',
        key: 'doing',
        render:(text,record) => (
            <div>
                <a onClick={()=>supTableOnEdit(record)}>编辑 </a>
                {/*<span style={{margin:'0 10px'}}>
                    {
                    '2' == text ?
                        (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>上架</strong>吗?</p>} onConfirm={() =>          tableSupPackageDown(record)}>
                        <a style={{color:'#77c8f8'}}>上架</a>
                        </Popconfirm>)
                    :
                        (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>下架</strong>吗?</p>} onConfirm={() => tableSupPackageUp(record)}>
                            <a style={{color:'red'}}>下架</a>
                        </Popconfirm>)
                    }
                </span>*/}
                <a onClick={()=>tableSupPackageDel(record)}>删除</a>
            </div>
        )
    }, {
       title: '租户Id',
       dataIndex: 'tenantId',
       key: 'tenantId',
   }, {
        title: '租户名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '租户手机号',
        dataIndex: 'tel',
        key: 'tel',
    }, {
        title: '租户状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (<a>{text==1?"有效":"被删除"}</a>),
    }, {
        title: '到期时间',
        dataIndex: 'expireTime',
        key: 'expireTime',
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }, {
        title: '小程序状态',
        dataIndex: 'miniStatus',
        render:(text,record) => (<div>{text == '-1' ? '发布失败' : text == '0' ? '未发布' : text == '1' ? '发布中' : text == '2' ? '发布成功' : '' }</div>),
    }, {
        title: '小程序名称',
        dataIndex: 'miniName',
        key: 'miniName',
    }, {
	    title: '小程序二维码',
	    dataIndex: 'appQrCode',
	    key: 'appQrCode',
	    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px" height='100px'/>　: '无'}</div>),
	}, {
        title: '小程序AppId',
        dataIndex: 'miniAppId',
        key: 'miniAppId',
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
						<Button type="primary" onClick={ExportOrgRegExcel}><Icon type="export" />按查询结果导出</Button>
					</div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button key='addTet' type="primary" onClick={tenantMessageAdd}><Icon type="plus" />新增</Button>
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

export default TenantList;
