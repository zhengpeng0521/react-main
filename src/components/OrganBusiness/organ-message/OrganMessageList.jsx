import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon ,data} from 'antd';
import style from './OrganMessage.less';

function OrganMessageList({
    pageIndex,
    pageSize,
    loading,
    list,
    total,
//    tableOnCheckModal,//查看套餐
    tableOnChange,
    tableOnFilter,
    tableOnExport,  //按查询结果导出
    tableOrganPackageFreeze, //冻结机构
    tableOrganPackageNoFreeze, //解冻机构
    showDetilFun,

  }) {
  const columns = [{
    width:100,
    title:'租户ID',
    dataIndex:'tenantId',
    key:'tenantId',
  },{
    width:100,
    title:'租户名称',
    dataIndex:'tenantName',
    key:'tenantName',
  }, {
    width: 100,
    title: '机构ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    width: 100,
    title: '机构类型',
    dataIndex: 'schoolType',
    key: 'schoolType',
  }, {
    width: 100,
    title: '详细地址',
    dataIndex: 'addr',
    key: 'addr',
  }, {
    width: 100,
    title: '具体地址',
    dataIndex: 'allAddr',
    key: 'allAddr',
  }, {
    width: 100,
    title: '联系人',
    dataIndex: 'realname',
    key: 'realname',
  }, {
    width: 100,
    title: '联系电话',
    dataIndex: 'tel',
    key: 'tel',
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {'0'==text?'无效':
             '1'==text?'有效':
             '2'==text?'停用':
             '3'==text?'冻结':'未指定'
            }
        </div>
    ),
  }, {
    width: 100,
    title: '招生宝套餐',
    dataIndex: 'moid',
    key: 'moid',
    render:(text,record) =>(
        <a onClick={() => showDetilFun(record.tenantId,record.id,'zsb')}>{record.mealTitle}</a>
    )
  },{
    width: 100,
    title: 'saas套餐',
    dataIndex: 'saas',
    key: 'saas',
    render: (text, record) => (<a onClick = {() => showDetilFun(record.tenantId,record.id,'saas')}>{ record.saasMeal }</a>),
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '操作栏',
    dataIndex: 'status',
    key: 'statu',
    render:(text,record) =>(
         <div>
            {
            '3' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>解冻</strong>吗?</p>} onConfirm={() => tableOrganPackageNoFreeze(record,record.tenantId)}>
                    <a className={style.check}>解冻</a>
                 </Popconfirm>)
            :
                (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>冻结</strong>吗?</p>} onConfirm={() => tableOrganPackageFreeze(record,record.tenantId)}>
                    <a style={{color:'red'}}>冻结</a>
                 </Popconfirm>)
            }
        </div>
    )
  }, {
    width: 100,
    title: '到期时间',
    dataIndex: 'expireTime',
    key: 'expireTime',
  }];

	let paginationProps = {
        current : pageIndex + 1,
        pageSize,
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
                {/*
                <div className="table-handle" key="table-handle">
                    <Button type="primary" onClick={() => tableOnExport()}><Icon type="export" />按查询结果导出</Button>
                </div>
                */}
            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                    <Button type="primary" onClick={tableOnFilter}><Icon type="filter" />筛选</Button>
                </div>
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
                scroll={{ x : 1600 }} />
      </div>
  );
}
export default OrganMessageList;
