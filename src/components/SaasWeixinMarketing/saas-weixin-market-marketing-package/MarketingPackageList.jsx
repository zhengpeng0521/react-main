import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './MarketingPackage.less'

function MarketingPackageList({
    loading,
    total,
    list,

    tableOnChange,
    tableOnEditItem,
    tableOnCreate,
    tableOnCheckModal,
    tableOnFilter,
    tableWeiXinPackageUp,
    tableWeiXinPackageDown,
    tableWeiXinPackageUpdateBuyRecord,      //更新购买记录
}) {

    function getModuleCount(record) {
        let jsonData = record &&record.modelArray ? JSON.parse(record.modelArray) : [];
        let tempArr = [], tempIndex = [];
        jsonData &&jsonData.map((item, index) => {
           if(tempIndex.indexOf(item.id) == -1 && item.title != undefined) {
                tempIndex.push(item.id)
                tempArr.push(item)
           }
        })
         return tempArr.length;
    }
  const columns = [{
    width: 100,
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '套餐名称',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '包含模板',
    dataIndex: 'modelNum',
    key: 'modelNum',
    render: (text, record) => (
        <div>
            <a className={style.check} onClick={() => tableOnCheckModal(record.id)}>{text}个</a>

        </div>
    ),
  }, {
    width: 100,
    title: '套餐价格',
    dataIndex: 'price',
    key: 'price',
  }, {
    width: 100,
    title: '价格单位（天，月，年）',
    dataIndex: 'unit',
    key: 'unit',
    render:(text,record) => (
        <div>
            {text == '1' ? '天' :
             text == '2' ? '月' :
             text == '3' ? '年' : '未指定'}
        </div>
    ),
  }, {
    width: 100,
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
}, {
    width: 100,
    title: '展示人数限制',
    dataIndex: 'viewLimit',
    key: 'viewLimit',
    render:(text, record) =>{
        if(text>=0){
            return text;
        }else{
            return '不限制';
        }
    }
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 60,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => tableOnEditItem(record)}>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;
      </p>
    ),
  }, {
    width: 60,
    title: '状态(可操作)',
    dataIndex: 'status',
    key: 'status',
    render: (text,record) => (
        <div>{'0' == text ?
            (<Popconfirm title={<span>确定设置<strong style={{color:'red'}}>上架</strong>吗</span>} onConfirm={() => tableWeiXinPackageUp(record.id)}>
                <a className={style.check}>下架中</a>
             </Popconfirm>)
            :'1' == text ?
            (<Popconfirm title={<span>确定设置<strong style={{color:'#57c5f7'}}>下架</strong>吗</span>} onConfirm={() => tableWeiXinPackageDown(record.id)}>
                <a style={{color:'red'}}>上架中</a>
             </Popconfirm>):'未指定' }
        </div>
    ),
  }, {
    width: 60,
    title: '更新购买记录',
    dataIndex: 'updateRecord',
    key: 'updateRecord',
    render: (text,record) => (
        <div>
            <Popconfirm title={<span>确定<strong style={{color:'red'}}>更新</strong>吗</span>} onConfirm={() => tableWeiXinPackageUpdateBuyRecord(record.id)}>
                <a className={style.check}>更新</a>
            </Popconfirm>
        </div>
    ),
  }];

	let paginationProps = {
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
			    <div className="table-handle" key="table-handle">
                </div>
            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增</Button>
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
                    scroll={{ x : 1000 }} />
	      </div>
  );
}

export default MarketingPackageList;
