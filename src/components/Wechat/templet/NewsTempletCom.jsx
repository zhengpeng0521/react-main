import React from 'react';
import { Button,Form,Input,Upload,Icon , message , Table , Popconfirm  } from 'antd';
import styles from './NewsTempletCom.less';

const { TextArea } = Input;
const FormItem = Form.Item;
let url;

function NewBannerCom({
    dataSource,
    tableLoading,
    openAddModel,
    editModel,
    infoFun,
    pageSize,
    pageIndex,
    total,
    tableOnChange,
    form : {
        getFieldDecorator,
        validateFieldsAndScroll,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        resetFields,
       }
}) {
    let columns = [
        {
            key       : 'todo',
			dataIndex : 'todo',
			title     : '操作',
			width     : 80,
            render    : (text, record) => (
                <a onClick = { () => infoFun(record.id) }>查看</a>
            )
        },{
			key       : 'id',
			dataIndex : 'id',
			title     : '编号',
			width     : 80,
		},{
			key       : 'demoAppId',
			dataIndex : 'demoAppId',
			title     : '模板APPID',
			width     : 80,
		},{
            key       : 'cover',
			dataIndex : 'cover',
			title     : '封面',
			width     : 180,
            render    : (text,record) => (
                    <img src = {record.cover} style={{width : '100%',height : '60px',display : 'block'}}/>
            )
        },{
            key       : 'name',
			dataIndex : 'name',
			title     : '模板名称',
			width     : 120,
        },{
            key       : 'demoUrl',
			dataIndex : 'demoUrl',
			title     : '地址',
			width     : 120,
        },{
            key       : 'seqNo',
			dataIndex : 'seqNo',
			title     : '排序',
			width     : 80,
        }
    ]

    let paginationProps = {
        current : pageIndex + 1,
        pageSize : pageSize,
        total: total,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    return(
        <div>
            <div style={{marginBottom : '10px'}}>
                <Button key='addTet' type="primary" onClick = { openAddModel }><Icon type="plus"/>新增</Button>
            </div>
            <Table
                rowKey='id'
                columns = { columns }
                dataSource = { dataSource }
                bordered
                loading = { tableLoading }
                pagination={paginationProps}
                onChange={tableOnChange}
                />

        </div>
    );
}

export default Form.create({})(NewBannerCom);
