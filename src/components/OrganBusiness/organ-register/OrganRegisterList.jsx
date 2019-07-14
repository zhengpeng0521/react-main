import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';
import style from './OrganRegister.less';

function OrganRegisterList({
    pageIndex,
    pageSize,
    loading,
    list,
    total,
    tableOnChange,
    tableOnFilter,
    tableOnCreateSaas,
    tableOnDeal,
    tableOnEditHtmlDetail,
    tableOnEditHref,
    ExportOrgRegExcel,      //导出查询结果
  }) {
  const columns = [{
    width: 100,
    title: '编号',
    dataIndex: 'id',
    key: 'id'
  }, {
    width: 100,
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    width: 100,
    title: '电话',
    dataIndex: 'tel',
    key: 'tel',
  }, {
    width: 100,
    title: '用户姓名',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    width: 100,
    title: '学校类型',
    dataIndex: 'schoolType',
    key: 'schoolType',
  }, {
    width: 100,
    title: '租户名称',
    dataIndex: 'tenantName',
    key: 'tenantName',
  }, {
    width: 100,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    width: 100,
    title: '详细地址',
    dataIndex: 'detailAddr',
    key: 'detailAddr',
  },{
    width: 100,
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },{
    width: 100,
    title: '机构需求',
    dataIndex: 'orgNeeds',
    key: 'orgNeeds',
  }, {
    width: 100,
    title: '申请平台',
    dataIndex: 'platform',
    key: 'platform',
  }, {
    width: 100,
    title: '注册/报名',
    dataIndex: 'isRegister',
    key: 'isRegister',
    render: (text, record) => {
      if(text == 'false'){
        return '报名';
      }else{
        return '注册';
      }
    }
  }, {
      width: 100,
      title: '其他信息',
      dataIndex: 'otherFormInfo',
      key: 'otherFormInfo',
      render:(text, record) =>{
        if(!!text && text != '' && text.startsWith("[")){
            let str = "";
            let textArr = JSON.parse(text);
            !!textArr && textArr.map((item) => {
              if(!!item.text && !!item.value){
                str += item.text + ":" +  item.value + ";";
              }
            });
            return str;
        }
        return text;
      }
  }, {
    width: 100,
    title: '状态(手动操作)',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) =>(
        <div>
        { '2' == text ?
            <Popconfirm title="确定设置为已构建吗?" onConfirm={() => tableOnCreateSaas(record)}>
                <a style={{color:'red'}}>已处理</a>
            </Popconfirm>
            :
          '1' == text ?
            <Popconfirm title="确定设置为已处理吗?" onConfirm={() => tableOnDeal(record)}>
                <a className={style.check}>未处理</a>
            </Popconfirm>
            :
          '3' == text ? '已构建' : '未指定'
        }
        </div>
    ),
  }];


	let paginationProps = {
        current : pageIndex + 1,
        pageSize,
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
                <div className="table-handle" >
                    <Button type="primary" onClick={ExportOrgRegExcel}><Icon type="export" />按查询结果导出</Button>
                </div>
            </div>
            <div className="common-right" style={{width : '40%'}}>
                <div className="table-operations" >
                    <Button type="primary" onClick={tableOnEditHtmlDetail}><Icon type="edit" />编辑H5富文本</Button>
                    <Button type="primary" onClick={tableOnEditHref}><Icon type="edit" />编辑H5外链文案</Button>
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
                scroll={{ x : 1500 }} />
      </div>
  );
}

export default OrganRegisterList;
