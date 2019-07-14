import React, { PropTypes }from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function SupervisionList({
    supervisionPageIndex,        //广告列表页码
    supervisionPageSize,         //广告列表一页条数
    supervisionLoading,          //广告列表加载状态
    supervisionTotal,            //列表内容总条数
    supervisionTableContent,     //列表内容

    supervisionTableOnFilter,    //点击筛选
    supervisionTableOnChange,    //table分页等条件改变事件
    supervisionMessageAdd,       //点击新增广告
    supTableOnEdit,              //编辑广告
    supervisionMessagecheck,     //查看广告
    tableSupPackageDown,         //上架
    tableSupPackageUp,           //下架
    tableSupPackageDel,         //删除

  }) {
   const columns = [{
        width: 250,
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (
            <div>
                <a onClick={()=>supTableOnEdit(record.id)}>编辑</a>
                <span style={{margin:'0 10px'}}>
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
                </span>
                <a onClick={()=>tableSupPackageDel(record)}>删除</a>
            </div>
        )
    }, {
       width: 250,
       title: '编号',
       dataIndex: 'id',
       key: 'id',
   }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render:(text,record) =>(
            <a>{text}</a>
        )
    }, {
        width: 250,
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }];
    let paginationProps = {
        current : supervisionPageIndex + 1,
        pageSize : supervisionPageSize,
        total: supervisionTotal,
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

                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button key='addTet' type="primary" onClick={supervisionMessageAdd}><Icon type="plus" />新增</Button>
                        <Button key='filter' type="primary" onClick={supervisionTableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
           <Table
                columns={columns}
                dataSource={supervisionTableContent}
                loading={supervisionLoading}
                pagination={paginationProps}
                onChange={supervisionTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1500 }} />
        </div>
  );
}

export default SupervisionList;
