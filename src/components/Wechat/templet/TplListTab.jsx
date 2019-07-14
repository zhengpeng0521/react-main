import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function TplListTab({

    tplListData,     			//列表内容
  	setDefaltFun,					//设为默认
  	deleteFun,
}) {
   const columns = [
      {
        title: '操作',
        dataIndex: 'doing',
        key: 'doing',
        render:(text,record) => (
            <div>
                <a onClick={()=>setDefaltFun(record)}>设为默认   </a>
                <a onClick={()=>deleteFun(record)}>删除</a>
            </div>
        )
     },
	    {
	       title: '描述',
	       dataIndex: 'user_desc',
	       key: 'user_desc',
	   	}, {
	        title: 'demoAppId',
	        dataIndex: 'source_miniprogram_appid',
	        key: 'source_miniprogram_appid',
	    }, {
	        title: '版本号',
	        dataIndex: 'user_version',
	        key: 'user_version',
	    }, {
        title: '是否为默认版本',
        dataIndex: 'isDefault',
        key: 'isDefault',
        render : (text, record) => (
            <div>
                <a>{text}</a>
            </div>
        )
    	} , {
	        title: '开发者',
	        dataIndex: 'developer',
	        key: 'developer',
	    }, {
	        title: '模板编号',
	        dataIndex: 'template_id',
	        key: 'template_id',
	    }, {
	        title: '小程序名称',
	        dataIndex: 'source_miniprogram',
	        key: 'source_miniprogram',
	    }, {
	        title: '创建时间',
	        dataIndex: 'create_time',
	        key: 'create_time',
	    }
    ];
  return (
          <Table
            columns={columns}
            dataSource= { tplListData }
            bordered
            rowKey="template_id"
            scroll={{ x : 1000 }} />
  );
}

export default TplListTab;
