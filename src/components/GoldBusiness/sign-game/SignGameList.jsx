import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import styles from './SignGame.less';

function SignGameList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnClearCacheItem,
    tableOnAddEssenceItem,
    tableOnRecommendItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
    tableOnDeleteItem,
    tableOnGift,
    tableOnOrder,
  }) {
  const columns = [{
    width: 50,
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '简介',
    dataIndex: 'intro',
    key: 'intro',
  }, {
    width: 100,
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'createTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == ''? '':FormatDate(text)}</div>),
  }, {
    width: 100,
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'modifyTime',
    render: (text,record) => (<div>{text == undefined || text == null || text == ''? '':FormatDate(text)}</div>),
  }, {
    width: 120,
    title: '地址',
    dataIndex: 'h5url',
    key: 'h5url',
  }, {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text,record) => (<div style={{color:text=='1'?'red':'gray'}}>{text=='1'?'有效':
                                                                           text=='0'?'无效':'其他'}</div>),
  }, {
    width: 50,
    title: '奖品',
    dataIndex: 'gamePrize',
    key: 'gamePrize',
    render: (text,record) =>(<div><a className="common-table-item-bar" style={{color:'red'}} onClick={() => tableOnGift(record)}>奖品</a></div>),
  }, {
    width: 50,
    title: '订单',
    dataIndex: 'orders',
    key: 'orders',
    render: (text,record) =>(<div><a className="common-table-item-bar" style={{color:'red'}} onClick={() => tableOnOrder(record)}>订单</a></div>),
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className="common-table-item-bar" onClick={() => tableOnEditItem(record)}>编辑</a>
        <Popconfirm title="确定要删除吗?" onConfirm={() => tableOnDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
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

    //时间格式化方法
    function charge(DateType,Number){
        if(DateType<Number){
            return '0'+DateType;
        }else{
            return DateType;
        }
    }
    //时间格式化函数
    function FormatDate (strTime) {
        let date = new Date(strTime);
        let Months,Day,Hours,Minutes,Seconds;
        Months = charge(date.getMonth()+1,10);
        Day = charge(date.getDate(),10);
        Hours = charge(date.getHours(),10);
        Minutes = charge(date.getMinutes(),10);
        Seconds = charge(date.getSeconds(),10);
        return date.getFullYear()+"-"+Months+"-"+Day+" "+Hours+":"+Minutes+":"+Seconds;
    }

    let aaa=[];
    for(let i=0;i<20;i++){
        aaa.push({
            key:i,
            id:i,
            title:`你是第${i}头猪`,
            intro:`你就是第${i}头猪`,
            startTime:`2017-01-27 ${i}:18:08`,
            endTime:`2017-01-27 ${i}:18:08`,
            status:`${i}`
        });
    }
  return (
    <div className="table-bg">
	    <div className="common-over">
		    <div className="common-left" style={{width : '60%'}}>

			    <div className="table-handle" key="table-handle">
                    <Button type="primary" onClick={tableOnCreate}><Icon type="plus" />新增</Button>
                </div>

            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >

                </div>
            </div>
        </div>
				<Table
                    columns={columns}
                    dataSource={aaa}
                    loading={loading}
                    pagination={paginationProps}
                    onChange={tableOnChange}
                    bordered
                    rowKey="id"
                    scroll={{ x : 1000 }} />
	      </div>
  );
}

SignGameList.propTypes = {
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
    tableColumnHeadClick : PropTypes.func,
    tableOnEditItem : PropTypes.func,
    tableOnCreate :PropTypes.func,
    tableOnClearCacheItem : PropTypes.func,
    tableOnRecommendItem : PropTypes.func,
    tableOnDoUpItem : PropTypes.func,
    tableOnDeleteItem : PropTypes.func,
    tableOnGift : PropTypes.func,
    tableOnOrder : PropTypes.func,
};

export default SignGameList;
