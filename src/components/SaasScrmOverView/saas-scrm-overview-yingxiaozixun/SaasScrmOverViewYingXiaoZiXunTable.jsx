import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './SaasScrmOverViewYingXiaoZiXun.less'

//saas营销首页banner管理
function SaasScrmOverViewYingXiaoZiXunTable({
    saasScrmOverViewYingXiaoZiXunPageIndex,         //营销咨询页码
    saasScrmOverViewYingXiaoZiXunPageSize,          //营销咨询每页条数
    saasScrmOverViewYingXiaoZiXunTableData,         //营销咨询列表数据
    saasScrmOverViewYingXiaoZiXunDataTotal,         //营销咨询列表条数
    saasScrmOverViewYingXiaoZiXunTableLoading,      //营销咨询列表加载状态

    AddOrEditYingXiaoZiXun,                         //新增编辑营销咨询
    SaasScrmOverViewYingXiaoZiXunTableOnChange,     //营销咨询状态改变(分页等)
    SaasScrmOverViewYingXiaoZiXunChangeStatus,      //营销咨询改变上下架状态
}) {
  const columns = [{
    width: 60,
    title: '营销资讯ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 200,
    title: '外链',
    dataIndex: 'link',
    key: 'link',
  }, {
    width: 80,
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
                (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>上架</strong>吗?</p>} onConfirm={() => SaasScrmOverViewYingXiaoZiXunChangeStatus(record)}>
                    <a className={style.check}>下架</a>
                 </Popconfirm>)
            :
            '1' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>下架</strong>吗?</p>} onConfirm={() => SaasScrmOverViewYingXiaoZiXunChangeStatus(record)}>
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
        <a className={style.check} onClick={() => AddOrEditYingXiaoZiXun('edit',record)}>编辑</a>
    )
  }];

	let paginationProps = {
        current : saasScrmOverViewYingXiaoZiXunPageIndex + 1,
        pageSize : saasScrmOverViewYingXiaoZiXunPageSize,
        total: saasScrmOverViewYingXiaoZiXunDataTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    let list = [];
    for(let i = 0 ; i < 20 ; i ++ ){
        list.push({
            status : i,
            link : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3518769679,775197924&fm=23&gp=0.jpg',
        });
    }

    return (
        <div className="table-bg">
            <div className="common-over">
                <div className="common-left" style={{width : '60%'}}>
                    <div className="table-handle" key="table-handle">
                    </div>
                </div>
                <div className="common-right" style={{width : '40%'}}>
                    <div className="table-operations" >
                        <Button type="primary" onClick={() => AddOrEditYingXiaoZiXun('add')}><Icon type="plus" />新增</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasScrmOverViewYingXiaoZiXunTableData}
                loading={saasScrmOverViewYingXiaoZiXunTableLoading}
                pagination={paginationProps}
                onChange={SaasScrmOverViewYingXiaoZiXunTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default SaasScrmOverViewYingXiaoZiXunTable;
