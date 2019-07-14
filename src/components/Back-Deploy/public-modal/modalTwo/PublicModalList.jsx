import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from '../publicModal.less';

function PublicModalKeyList({
    loading,formType, formData,
    listKeyModalTwo, totalKeyModalTwo,
    pageKeyIndexModalTwo, pageKeySizeModalTwo,
    selectedRowKeys, selectedRows,
    modalTwoTableOnModifyItem,
    modalTwoTableOnEditItem,
    modalTwoTableOnDeleteItem,
    modalTwoTableOnCreateKey,
    modalTwoTableOnSetState,
    modalTwoTableOnOpenColumnUrl,
    tableKeyPageChangeModalTwo,
    tableOnFilter,
    tableRowSelectChange,
    tableRowCheckProps,
    tableOnChange,
  }) {
  const columns = [{
    width: 50,
    title: '关键词编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '关键词名称',
    dataIndex: 'themeName',
    key: 'themeName',
  }, {
    width: 100,
    title: '关键词URL',
    dataIndex: 'themeUrl',
    key: 'themeUrl',
    render:(text,record) => (<div><a href={text} target='_blank' className={style.check}>{text}</a></div>),
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '修改时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
  }, {
    width: 100,
    title: '相关测评数',
    dataIndex: 'articleCount',
    key: 'articleCount',
  }, {
    width: 80,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => modalTwoTableOnEditItem(record)}>查看测评项目</a>&nbsp;&nbsp;
        <a className={style.check} onClick={() => modalTwoTableOnModifyItem(record)}>编辑</a>&nbsp;&nbsp;
        <Popconfirm title={deleteContent(record)} onConfirm={() => modalTwoTableOnDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    //删除气泡框确认框内容
    let deleteContent = function(record){
        return(<p>确定删除<strong>关键词</strong><strong style={{color:'red'}}>《{record.themeName}》</strong>吗?</p>);
    }


	let paginationProps = {
        total: totalKeyModalTwo,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tableKeyPageChangeModalTwo,
        onChange : tableKeyPageChangeModalTwo,
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
                    <Button type="primary" onClick={modalTwoTableOnSetState}><Icon type="select" />状态栏设置</Button>
                    <Button type="primary" onClick={modalTwoTableOnCreateKey}><Icon type="plus" />新增(关键词)</Button>
                    <Button type="primary" onClick={modalTwoTableOnOpenColumnUrl}><Icon type="link" />链接</Button>
                    <Button type="primary" onClick={tableOnFilter} disabled><Icon type="filter" />筛选</Button>
                </div>
            </div>
        </div>
				<Table
                    columns={columns}
                    dataSource={listKeyModalTwo}
                    loading={loading}
                    pagination={paginationProps}
                    onChange={tableOnChange}
                    bordered
                    rowKey="id"
                    scroll={{ x : 1000 }} />
    </div>
  );
}

PublicModalKeyList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    totalKeyModalTwo : PropTypes.any,
    pageKeyIndexModalTwo : PropTypes.any,
    pageKeySizeModalTwo : PropTypes.any,
    modalTwoTableOnCreateKey : PropTypes.func,
    modalTwoTableOnDeleteItem : PropTypes.func,
    modalTwoTableOnCreateKey : PropTypes.func,
    modalTwoTableOnSetState : PropTypes.func,
    modalTwoTableOnEditItem : PropTypes.func,
    modalTwoTableOnModifyItem : PropTypes.func,
    tableOnFilter : PropTypes.func,
    tableOnChangeModalTwo : PropTypes.func,
    tableKeyPageChangeModalTwo : PropTypes.func,
    modalTwoTableOnOpenColumnUrl : PropTypes.func,
};

export default PublicModalKeyList;
