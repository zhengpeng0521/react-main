import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button, Icon } from 'antd';

function DraftListTab({

    draftListData,     			//列表内容
    setTpFun,

}) {
   const columns = [
   		{
        key       : 'todo',
				dataIndex : 'todo',
				title     : '操作',
				width     : 80,
        render    : (text, record) => (
            <a onClick = { () => setTpFun(record) }>设为模板</a>
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
	        title: '开发者',
	        dataIndex: 'developer',
	        key: 'developer',
	    }, {
	        title: '草稿编号',
	        dataIndex: 'draft_id',
	        key: 'draft_id',
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
            dataSource= { draftListData }
            bordered
            rowKey="draft_id"
            scroll={{ x : 1000 }} />
  );
}

export default DraftListTab;
