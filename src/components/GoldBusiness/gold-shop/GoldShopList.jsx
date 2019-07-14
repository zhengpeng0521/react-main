import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './GoldShop.less'

function GoldShopList({
    loading, list, total, pageIndex, pageSize,selectedRowKeys, selectedRows, sortColName, sortColType,
    tableRowSelectChange,
    tableRowCheckProps,
    tablePageChange,
    tableOnChange,
    tableColumnHeadClick,
    tableOnEditItem,
    tableOnDeleteItem,
    tableOnClearCacheItem,
    tableOnAddEssenceItem,
    tableOnRecommendItem,
    tableOnDoUpItem,
    tableOnCreate,
    tableOnFilter,
    tableOnShowAll,
    tableOnShowClose,
  }) {
  const columns = [{
    width: 120,
    title: '订单编号',
    dataIndex: 'orderNo',
    key: 'orderNo'
  }, {
    width: 60,
    title: '用户ID',
    dataIndex: 'user.id',
    key: 'user.id'
  }, {
    width: 100,
    title: '昵称',
    dataIndex: 'user.nickname',
    key: 'user.nickname',
  }, {
    width: 100,
    title: '联系方式',
    dataIndex: 'user.mobile',
    key: 'user.mobile',
  }, {
    width: 100,
    title: '用户头像',
    dataIndex: 'user.headimgurl',
    key: 'user.headimgurl',
    render: (text, record) => (<div>{text != undefined && text != '' ?　<img src={text} width="100px" height="100px"/>　: '无'}</div>),
  }, {
    width: 100,
    title: '快递公司',
    dataIndex: 'expressName',
    key: 'expressName',
    render: (text,record) => (<div>{text==''||text==null||text==undefined?'无':text}</div>)
  }, {
    width: 100,
    title: '快递单号',
    dataIndex: 'trackNumber',
    key: 'trackNumber',
  }, {
    width: 100,
    title: '订单描述',
    dataIndex: 'shortIntro',
    key: 'shortIntro',
    render: (text,record,index) =>
                (
                    <div>{text}<br/>
                        {record.thisLong=='1'&&text.length<27?(<a className={style.check} onClick={() => tableOnShowAll(index)}>{record.expend}</a>):
                         record.thisLong=='1'&&text.length>26?(<a className={style.check} onClick={() => tableOnShowClose(index)}>{record.shrink}</a>):''}
                    </div>
                ),
  }, {
    width: 80,
    title: '订单状态',
    dataIndex: 'oriStatus',
    key: 'oriStatus',
    render: (text,record) => (<div>{text=='0'?'失效':
                                    text=='1'?'待付款':
                                    text=='2'?'待确认':
                                    text=='3'?'已发货':
                                    text=='4'?'已确认':
                                    text=='5'?'待评价/已解冻':
                                    text=='6'?'待退款':
                                    text=='7'?'已退款':'其他'}</div>)
  }, {
    width: 100,
    title: '收货人',
    dataIndex: 'contacterName',
    key: 'contacterName',
  }, {
    width: 100,
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    width: 110,
    title: '支付时间',
    dataIndex: 'payTime',
    key: 'payTime',
  }, {
    width: 110,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
        <div>
            <a href="javascript:void(0)" className = {style.check} onClick={tableOnEditItem.bind(this, record)}>编辑</a>
        </div>
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

    function expend(data){
        console.log('------');
    }
  return (
    <div className="table-bg">
	    <div className="common-over">
		    <div className="common-left" style={{width : '60%'}}>
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
                scroll={{ x : 1000 }} />
      </div>
  );
}

GoldShopList.propTypes = {
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
    tableOnDeleteItem : PropTypes.func,
    tableOnClearCacheItem : PropTypes.func,
    tableOnRecommendItem : PropTypes.func,
    tableOnDoUpItem : PropTypes.func,
    tableOnShowAll : PropTypes.func,
    tableOnShowClose : PropTypes.func,
};

export default GoldShopList;
