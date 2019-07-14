import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon ,Popover} from 'antd';

function OutboundPackageManageList({
    loading,
    list,
    total,
    pageIndex,
    pageSize,
    selectedRowKeys,
    selectedRows,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableOnFilter,      //筛选
    tableOnCreate,      //新增
    tableOpenPackages,  //开通套餐
    tabKey,             //tab标志
    upDownOperation,    //上下架及删除
    OutboundPackageManageEdit ,  //销售产品设置开通
    OutboundOpenPackageCheck,    //套餐审核
    OutboundOpenPackageEdit,     //套餐编辑
    OutboundOpenPackageView,     //查看
  }) {
  function cancel(){

  }

  const columns =
    tabKey=='1'?
    [{
        width: 100,
        title: '产品编号',
        dataIndex: 'id',
        key: 'id',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 80,
        title: '产品类型',
        dataIndex: 'proType',
        key: 'proType',
        render:(text,record) => (
            <div>
                {text == '0'?
                    <span>坐席</span>
                   :
                    null
                }
            </div>
        )
      }, {
        width: 100,
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 60,
        title: '售卖价格',
        dataIndex: 'salePrice',
        key: 'salePrice',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 60,
        title: '成本',
        dataIndex: 'saleCost',
        key: 'saleCost',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 60,
        title: '单位',
        dataIndex: 'saleUnit',
        key: 'saleUnit',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 100,
        title: '简介',
        dataIndex: 'content',
        key: 'content',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 60,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (
            <div>
                {text == '1'?
                    <span>已上架</span>
                   :
                    <span>已下架</span>
                }
            </div>
        )
      },{
        width: 120,
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render:(text,record) => (
            <div>
                <a>
                    {record.status == '1'?
                        <span onClick = {()=>upDownOperation(record.id,2)}>下架</span>
                       :
                        <span onClick = {()=>upDownOperation(record.id,1)}>上架</span>
                    }
                </a>
                <a style={{paddingLeft:'20px'}} onClick = { ()=>OutboundPackageManageEdit(record.id) }>编辑</a>
                <Popconfirm title="确定删除?" onConfirm={()=>upDownOperation(record.id,0)} onCancel={cancel} okText="确认" cancelText="否">
                       <a style={{paddingLeft:'20px'}}>删除</a>
                </Popconfirm>

            </div>
        )
      }]
  :
      [{
        width: 100,
        title: '租户ID',
        dataIndex: 'tenantId',
        key: 'tenantId',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 80,
        title: '租户名称',
        dataIndex: 'tenantName',
        key: 'tenantName',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 100,
        title: '机构ID',
        dataIndex: 'orgId',
        key: 'orgId',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 100,
        title: '机构名称',
        dataIndex: 'orgName',
        key: 'orgName',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 60,
        title: '总合计',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      },  {
        width: 60,
        title: '总实收',
        dataIndex: 'realPrice',
        key: 'realPrice',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 100,
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 100,
        title: '审核通过时间',
        dataIndex: 'passTime',
        key: 'passTime',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
      }, {
        width: 60,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (
            <div>
                {text == '1'?
                    <span>待审核</span>
                   :
                    <span>已通过</span>
                }
            </div>
        )
      },{
        width: 100,
        title: '审核备注',
        dataIndex: 'auditRemark',
        key: 'auditRemark',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )

      },{
        width: 100,
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render:(text,record) => (
            <div>
                {record.status=='1'?
                    <div>
                        <a onClick = {()=>OutboundOpenPackageCheck(record.id)}>审核</a>
                        <a onClick = {()=>OutboundOpenPackageEdit(record.id)} style={{paddingLeft:'20px'}}>编辑</a>
                    </div>
                :

                    <a onClick = {()=>OutboundOpenPackageView(record.id)}>查看</a>

                }

            </div>
        )
      }];

    //当前是否有选中项
    let hasSelected = selectedRowKeys.length > 0;

    let rowSelection = {
        selectedRowKeys,
        onChange : tableRowSelectChange,
        getCheckboxProps : tableRowCheckProps,
	};

	let paginationProps = {
        total: total,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tablePageChange,
        onChange : tablePageChange,
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
                {tabKey=='1'?
                    <div className="table-operations" >
                        <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增产品</Button>
                        <Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                :
                    <div className="table-operations" >
                        <Button type="primary" onClick={tableOpenPackages}><Icon type="plus" />开通套餐</Button>
                        <Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
                    </div>
                }

            </div>
        </div>

        <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 1500 }} />
      </div>
  );
}

OutboundPackageManageList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageIndex : PropTypes.any,
    pageSize : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableRowSelectChange : PropTypes.func,
    tableRowCheckProps : PropTypes.func,
    tablePageChange : PropTypes.func,
    tableOnChange : PropTypes.func,
    tableOnFilter : PropTypes.func,
    tableOnCreate : PropTypes.func,
};

export default OutboundPackageManageList;
