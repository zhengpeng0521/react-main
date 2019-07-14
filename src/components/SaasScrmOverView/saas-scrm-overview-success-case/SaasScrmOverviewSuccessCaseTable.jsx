import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './SaasScrmOverviewSuccessCase.less'

//saas营销首页机构成功案例
function SaasScrmOverviewSuccessCaseTable({
    saasScrmOverviewSuccessCasePageIndex,           //机构成功案例管理页码
    saasScrmOverviewSuccessCasePageSize,            //机构成功案例管理每页条数
    saasScrmOverviewSuccessCaseTableData,           //机构成功案例管理管理列表数据
    saasScrmOverviewSuccessCaseDataTotal,           //机构成功案例管理管理列表条数
    saasScrmOverviewSuccessCaseTableLoading,        //机构成功案例管理管理列表加载状态

    AddOrEditSuccessCase,                           //新增编辑机构成功案例
    SaasScrmOverviewSuccessCaseTableOnChange,       //机构成功案例管理列表状态改变(分页等)
    SaasScrmOverviewSuccessCaseChangeStatus,        //机构成功案例改变处理未处理状态
}) {
  const columns = [{
    width: 70,
    title: '成功案例ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 120,
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  }, {
    width: 50,
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    render: (text, record) => (
        <div>
            { text != undefined && text != '' && text != null ?　<img src={text} width="100px" height="80px"/>　: '无' }
        </div>
    ),
  }, {
    width: 120,
    title: '外链',
    dataIndex: 'link',
    key: 'link',
  }, {
    width: 120,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 50,
    title: '状态(可操作)',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {
            '0' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>上架</strong>吗?</p>} onConfirm={() => SaasScrmOverviewSuccessCaseChangeStatus(record)}>
                    <a className={style.check}>下架</a>
                 </Popconfirm>)
            :
            '1' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>下架</strong>吗?</p>} onConfirm={() => SaasScrmOverviewSuccessCaseChangeStatus(record)}>
                    <a style={{color:'red'}}>上架</a>
                 </Popconfirm>):'未指定'
            }
        </div>
    )
  }, {
    width: 50,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
        <a className={style.check} onClick={() => AddOrEditSuccessCase('edit',record)}>编辑</a>
    )
  }];

	let paginationProps = {
        current : saasScrmOverviewSuccessCasePageIndex + 1,
        pageSize : saasScrmOverviewSuccessCasePageSize,
        total: saasScrmOverviewSuccessCaseDataTotal,
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
                        <Button type="primary" onClick={() => AddOrEditSuccessCase('add')}><Icon type="plus" />新增</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasScrmOverviewSuccessCaseTableData}
                loading={saasScrmOverviewSuccessCaseTableLoading}
                pagination={paginationProps}
                onChange={SaasScrmOverviewSuccessCaseTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default SaasScrmOverviewSuccessCaseTable;
