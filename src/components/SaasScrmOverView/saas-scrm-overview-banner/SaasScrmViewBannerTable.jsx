import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './SaasScrmViewBanner.less'

//saas营销首页banner管理
function SaasScrmViewBannerTable({
    saasScrmOverViewBannerPageIndex,                //banner管理页码
    saasScrmOverViewBannerPageSize,                 //banner管理每页条数
    saasScrmOverViewBannerTableData,                //banner管理管理列表数据
    saasScrmOverViewBannerDataTotal,                //banner管理管理列表条数
    saasScrmOverViewBannerTableLoading,             //banner管理管理列表加载状态

    AddOrEditBanner,                                //新增banner
    SaasScrmOverViewBannerTableOnChange,            //banner管理列表状态改变(分页等)
    SaasScrmOverViewBannerChangeStatus,             //banner改变上下架状态
}) {
  const columns = [{
    width: 125,
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 250,
    title: 'banner图',
    dataIndex: 'image',
    key: 'image',
    render: (text, record) => (
        <div>
            { text != undefined && text != '' && text != null ?　<img src={text} width="250px" height="60px"/>　: '无' }
        </div>
    ),
  }, {
    width: 250,
    title: '外链',
    dataIndex: 'link',
    key: 'link',
  },{
     width: 125,
     title: 'banner类型',
     dataIndex: 'type',
     key: 'type',
     render: (text, record) => (
        <div>
            {
                 text == '0' ? '营销首页'
                 :
                 text == '1' ? '收银宝'
                 :
				 text == '2' ? '钉钉收银宝'
				 :
				 text == '3' ? '未开通收银宝'
				 :
				 text == '4' ? '中小学缴费'
                 :
                 text == '5' ? '新版云校轮播图'
                 :
                 text == '6' ? '新版云校新闻'
				 :
                 ''
            }
        </div>
     ),
  },{
    width: 125,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '状态(可操作)',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (
        <div>
            {
            '0' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'red'}}>上架</strong>吗?</p>} onConfirm={() => SaasScrmOverViewBannerChangeStatus(record)}>
                    <a className={style.check}>下架</a>
                 </Popconfirm>)
            :
            '1' == text ?
                (<Popconfirm title={<p>确定设置<strong style={{color:'#77c8f8'}}>下架</strong>吗?</p>} onConfirm={() => SaasScrmOverViewBannerChangeStatus(record)}>
                    <a style={{color:'red'}}>上架</a>
                 </Popconfirm>):'未指定'
            }
        </div>
    )
  }, {
    width: 100,
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render:(text,record) => (
        <a className={style.check} onClick={() => AddOrEditBanner('edit',record)}>编辑</a>
    )
  }];

	let paginationProps = {
        current : saasScrmOverViewBannerPageIndex + 1,
        pageSize : saasScrmOverViewBannerPageSize,
        total: saasScrmOverViewBannerDataTotal,
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
            image : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3518769679,775197924&fm=23&gp=0.jpg',
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
                        <Button type="primary" onClick={() => AddOrEditBanner('add')}><Icon type="plus" />新增</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={saasScrmOverViewBannerTableData}
                loading={saasScrmOverViewBannerTableLoading}
                pagination={paginationProps}
                onChange={SaasScrmOverViewBannerTableOnChange}
                bordered
                rowKey="id"
                scroll={{ x : 1000 }} />
        </div>
    );
}

export default SaasScrmViewBannerTable;
