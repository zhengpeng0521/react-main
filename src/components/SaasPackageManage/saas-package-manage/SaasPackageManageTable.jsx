import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './SaasPackageManage.less'

//saas套餐管理
function SaasPackageManageTable({
    saasPackageManagePageIndex,     //套餐页码
    saasPackageManagePageSize,      //套餐每页条数
    saasPackageManageTableData,     //套餐管理列表数据
    saasPackageManagetotal,         //套餐管理列表条数
    saasPackageManageLoading,       //套餐管理列表加载状态

    AddOrEditPackage,               //新增套餐
    ShowPackageSearchTable,         //点击筛选
    SaasPackageManageTableOnChange, //套餐管理列表状态改变(分页等)
    SaasPackageChangeStatus,        //套餐改变上下架状态
    CheckIncludeModular,            //查看套餐内包含的模板
}) {
  const columns = [{
    width: 80,
    title: '套餐ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '套餐名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    width: 100,
    title: '简介',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '单位',
    dataIndex: 'unitType',
    key: 'unitType',
    render:(text,record) => (
        <div>
            {text == '1' ? '季' :
             text == '2' ? '月' :
             text == '3' ? '年' : '未指定'}
        </div>
    )
  }, {
    width: 100,
    title: '类型',
    dataIndex: 'free',
    key: 'free',
    render:(text,record) => (
        <div>
            {text == '0' ? '收费' :
             text == '1' ? '免费' : '未指定'}
        </div>
    )
  }, {
    width: 100,
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    render:(text,record) => (
        <div>
            ￥{text}
        </div>
    )
  }, {
    width: 40,
    title: '包含模块',
    dataIndex: 'moduleNum',
    key: 'moduleNum',
    render:(text,record) => (
        <a onClick={() => CheckIncludeModular(record.id)} className={style.check}>{text}个</a>
    )
  }, {
    width: 50,
    title: '状态(可操作)',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {
            '0' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>上架</strong>吗?</p>} onConfirm={() => SaasPackageChangeStatus(record)}>
                    <a className={style.check}>下架</a>
                 </Popconfirm>)
            :
            '1' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>下架</strong>吗?</p>} onConfirm={() => SaasPackageChangeStatus(record)}>
                    <a style={{color:'red'}}>上架</a>
                 </Popconfirm>)
            :
            '未指定'
            }
        </div>
    )
  }, {
    width: 40,
    title: '更新套餐',
    dataIndex: 'reUp',
    key: 'reUp',
    render:(text,record) => (
        <div>
            <Popconfirm title={<p>确定<strong style={{color:'red'}}>重新上架</strong>吗?</p>} onConfirm={() => SaasPackageChangeStatus(record,'reUp')}>
                <a style={{color:'red'}}>更新并上架</a>
             </Popconfirm>
        </div>
    )
  }, {
    width: 50,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
        <a className={style.check} onClick={() => AddOrEditPackage('edit',record)}>编辑</a>
    )
  }];

	let paginationProps = {
        current : saasPackageManagePageIndex + 1,
        pageSize : saasPackageManagePageSize,
        total: saasPackageManagetotal,
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
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => AddOrEditPackage('add')}><Icon type="plus" />新增</Button>
                        <Button type="primary" onClick={() => ShowPackageSearchTable()}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasPackageManageTableData}
                loading={saasPackageManageLoading}
                pagination={paginationProps}
                onChange={SaasPackageManageTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default SaasPackageManageTable;
