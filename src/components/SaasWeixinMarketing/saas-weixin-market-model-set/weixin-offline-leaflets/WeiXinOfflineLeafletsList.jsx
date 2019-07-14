import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './WeiXinOfflineLeaflets.less'


function WeiXinOfflineLeafletsList({
    weiXinOfflineLeafletsPageIndex,      //微信活动列表当前页码
    weiXinOfflineLeafletsPageSize,       //微信活动列表每页显示数量
    weiXinOfflineLeafletsLoading,
    weiXinOfflineLeafletsList,
    weiXinOfflineLeafletsTotal,

    tableOnWeiXinOfflineLeafletsCreate,
    tableOnWeiXinOfflineLeafletsFilter,
    changeWeiXinOfflineLeafletsPageSize,
    changeWeiXinOfflineLeafletsPageIndex,
    tablePageChangeWeiXinOfflineLeaflets,
    tableOnWeiXinOfflineLeafletsUpdate,
    tableWeiXinOfflineLeafletsUp,
    tableWeiXinOfflineLeafletsDown,

    handleOnAdd,    //点击新增
    handleOnPagesConfig,    //点击页面配置
  }) {
	
  const columns = [{
    width: 150,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
        <div>
            <a className={style.check} onClick={() => handleOnAdd(record.id, record.type)}>编辑</a>
			<a className={style.check} onClick={() => handleOnPagesConfig(record.id, record.type)}>页面配置</a>

        </div>
    ),
  }, {
    width: 100,
    title: '传单ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '传单代码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 120,
    title: '简介',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    render: (text, record) => {

        return (
            <div>
                {text != undefined && text != '' ?　<img src={text} alt={text} width="100px" height='100px'/>　: '无'}
            </div>
        )
    },
  }, {
    width: 100,
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  }, {
    width: 100,
    title: '模板类型',
    dataIndex: 'type',
    key: 'type',
    render: function(text, record, index) {
        let typeText = '高级模板';
        if(text != undefined && text != '') {
            if(text == 'activity') {
                typeText = '自定义微活动';
            } else if(text == 'leaflet') {
                typeText = '自定义微传单';
            } else if(text == 'offlineLeaflets') {
				typeText = '自定义线下传单';	  
			}
        }
        return (
            <div>
                {typeText}
            </div>
        )
    },
  }, {
    width: 100,
    title: '模板预览url',
    dataIndex: 'previewUrl',
    key: 'previewUrl',
  }, {
    width: 100,
    title: '排序值',
    dataIndex: 'defsort',
    key: 'defsort',
  }, ];


  if(window.manager_platform == 'thinknode') {
        //判断是否是外援访问的界面
        columns.push(
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(text,record) =>(
                    <div>{'2' == text ?
                            <span className={style.check}>下架中</span>
                        :'1' == text ?
                            <span style={{color:'red'}}>上架中</span>
                        : <span style={{color:'red'}}>未知状态</span>}
                    </div>
                ),
            }
        );

    } else {
        columns.push(
            {
			    width: 100,
			    title: '状态(可修改)',
			    dataIndex: 'status',
			    key: 'status',
			    render:(text,record) =>(
			        <div>{'2' == text ?
			            (<Popconfirm title={<span>确定设置<strong style={{color:'red'}}>上架</strong>吗</span>} onConfirm={() => tableWeiXinOfflineLeafletsUp(record.id)}>
			                <a className={style.check}>下架中</a>
			             </Popconfirm>)
			            :'1' == text ?
			            (<Popconfirm title={<span>确定设置<strong style={{color:'#57c5f7'}}>下架</strong>吗</span>} onConfirm={() => tableWeiXinOfflineLeafletsDown(record.id)}>
			                <a style={{color:'red'}}>上架中</a>
			             </Popconfirm>):'未指定' }
			        </div>
			    ),
			  }
        );
    }


	let paginationProps = {
        current : weiXinOfflineLeafletsPageIndex + 1,
        pageSize : weiXinOfflineLeafletsPageSize,
        total: weiXinOfflineLeafletsTotal,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : changeWeiXinOfflineLeafletsPageSize,
        onChange : changeWeiXinOfflineLeafletsPageIndex,
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
                        <Button type="primary" onClick={()=>handleOnAdd(undefined, 'offlineLeaflets')}><Icon type="plus" />新增</Button>
                        <Button type="primary" onClick={tableOnWeiXinOfflineLeafletsFilter}><Icon type="filter" />筛选</Button>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={weiXinOfflineLeafletsList}
                loading={weiXinOfflineLeafletsLoading}
                pagination={paginationProps}
                onChange={tablePageChangeWeiXinOfflineLeaflets}
                bordered
                rowKey="id"
            />
        </div>
  );
}


export default WeiXinOfflineLeafletsList;
