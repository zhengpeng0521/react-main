import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './OpeningMgr.less';


/*开通(套餐/模板)管理*/
function OpeningMgrList({
    loading,
    total,
    list,

    tableOnChange,
    tableOnCheckModal,
    tableOnCreateTemplate,
    tableOnCreatePackage,
    tableOnFilter,
    exportTableContent,
}) {
  const columns = [{
    width: 100,
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  }, {
    width: 100,
    title: '机构ID',
    dataIndex: 'organId',
    key: 'organId',
  }, {
    width: 100,
    title: '包含模板名称',
    dataIndex: 'modelName',
    key: 'modelName',
    render: (text, record) => (
        <div>
            <a className={style.check} onClick={() => tableOnCheckModal(record.id)}>{text}</a>
        </div>
    ),
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '结束时间',
    dataIndex: 'expireTime',
    key: 'expireTime',
  }, {
    width: 100,
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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
                    <Button type="primary" onClick={exportTableContent}><Icon type="export" />按查询结果导出</Button>
                </div>
            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                    <Button type="primary" onClick={tableOnCreateTemplate}><Icon type="plus" />开通模板</Button>
                    <Button type="primary" onClick={tableOnCreatePackage}><Icon type="plus" />开通套餐</Button>
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

export default OpeningMgrList;
