import React, { PropTypes } from 'react';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from '../publicModal.less'


let data=[{ name: 'a', value: 12 },{ name: 'b', value: 12 },{ name: 'c', value: 12 }];
function PublicModalList({
    loading, listColumnModalOne, totalColumnModalOne, pageColumnIndexModalOne, pageColumnSizeModalOne,selectedRowKeys, selectedRows,
    modalOneTableOnEditItem,
    modalOneTableOnModifyItem,
    modalOneTableOnDeleteItem,
    modalOneTableOnCreateColumn,
    tableOnFilter,
    tableColumnPageChangeModalOne,
    tableRowSelectChange,
    tableRowCheckProps,
    tableOnChange,
    modalOneTableOnOpenColumnUrl,
  }) {
  const columns = [{
    width: 50,
    title: '栏目编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '栏目标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    width: 100,
    title: '栏目图片',
    dataIndex: 'pictureUrl',
    key: 'pictureUrl',
    render: (text, record) => (<div>{text != undefined && text != '' && text != null ?　<img src={text} alt={text} width="100px" height='100px'/>　: '无'}</div>),
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '更新时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
  }, {
    width: 50,
    title: '相关主题数',
    dataIndex: 'themeCount',
    key: 'themeCount',
  }, {
    width: 50,
    title: '相关文章数',
    dataIndex: 'articleCount',
    key: 'articleCount',
  }, {
    width: 100,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => modalOneTableOnEditItem(record)}>查看主题</a>&nbsp;&nbsp;
        <a className={style.check} onClick={() => modalOneTableOnModifyItem(record)}>编辑本栏目</a>&nbsp;&nbsp;
        <Popconfirm title={deleteContent(record)} onConfirm={() => modalOneTableOnDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    //删除气泡框确认框内容
    let deleteContent = function(record){
        return(<p>确定删除<strong>栏目</strong><strong style={{color:'red'}}>《{record.title}》</strong>吗?</p>);
    }


    //当前是否有选中项
    let hasSelected = selectedRowKeys.length > 0;

    let rowSelection = {
        selectedRowKeys,
        onChange : tableRowSelectChange,
        getCheckboxProps : tableRowCheckProps,
	};

	let paginationProps = {
        total: totalColumnModalOne,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tableColumnPageChangeModalOne,
        onChange : tableColumnPageChangeModalOne,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };
    let a = [];
    for(let i=0;i<24;i++){
        a.push({
            id:i,
            title:`你不是猪${i}`,
            pictureUrl:i+1,
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
                    <Button type="primary" onClick={modalOneTableOnCreateColumn}><Icon type="plus" />新增栏目</Button>
                    <Button type="primary" onClick={modalOneTableOnOpenColumnUrl}><Icon type="link" />链接</Button>
                    <Button type="primary" onClick={tableOnFilter} disabled><Icon type="filter" />筛选</Button>
                </div>
            </div>
        </div>
				<Table
                    columns={columns}
                    dataSource={listColumnModalOne}
                    loading={loading}
                    pagination={paginationProps}
                    onChange={tableOnChange}
                    bordered
                    rowKey="id"
                    scroll={{ x : 1000 }} />
    </div>
  );
}

PublicModalList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageColumnIndexModalOne : PropTypes.any,
    pageColumnSizeModalOne : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    modalOneTableOnEditItem : PropTypes.func,
    modalOneTableOnModifyItem : PropTypes.func,
    modalOneTableOnDeleteItem : PropTypes.func,
    modalOneTableOnCreateColumn : PropTypes.func,
    modalOneTableOnOpenColumnUrl : PropTypes.func,
    tableColumnPageChangeModalOne : PropTypes.func,
    tableOnFilter : PropTypes.func,
    tableOnChange : PropTypes.func,
};

export default PublicModalList;
