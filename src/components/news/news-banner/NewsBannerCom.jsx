import React from 'react';
import { Button,Form,Input,Upload,Icon , message , Table , Popconfirm  } from 'antd';
import styles from './NewsBannerCom.less';

const { TextArea } = Input;
const FormItem = Form.Item;
let url;

function NewBannerCom({
    dataSource,
    tableLoading,
    openAddModel,
    editModel,
    changeApply,
    changeDelete,
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
                <div>
                    <Popconfirm title={<p>确定删除吗?</p>} onConfirm={() => changeDelete(record.id)}>
                        <a>删除</a>
                     </Popconfirm>
                </div>
            )
        },{
			key       : 'id',
			dataIndex : 'id',
			title     : '编号',
			width     : 80,
            render    : (text, record) => (
                <div>
                    <a onClick = { () => editModel(record.id) }>{text}</a>
                </div>
            )
		},{
            key       : 'img',
			dataIndex : 'img',
			title     : '图片',
			width     : 180,
            render    : (text,record) => (
                    <img src = {record.imgUrl} style={{width : '100%',height : '60px',display : 'block'}}/>
            )
        },{
            key       : 'imgUrl',
			dataIndex : 'imgUrl',
			title     : '图片地址',
			width     : 120,
        },{
            key       : 'url',
			dataIndex : 'url',
			title     : '跳转地址',
			width     : 120,
        },{
            key       : 'seq',
			dataIndex : 'seq',
			title     : '排序',
			width     : 80,
        },{
            key       : 'apply',
			dataIndex : 'apply',
			title     : '状态',
			width     : 80,
            render    : (text,record) => (
                <div>
                    {
                    '1' == text ?
                        (<Popconfirm title={<p>确定<strong style={{color:'red'}}>下架</strong>吗?</p>} onConfirm={() => changeApply(record)}>
                            <a>上架</a>
                         </Popconfirm>)
                    :
                    '2' == text ?
                        (<Popconfirm title={<p>确定<strong style={{color:'#77c8f8'}}>上架</strong>吗?</p>} onConfirm={() => changeApply(record)}>
                            <a style={{color:'red'}}>下架</a>
                         </Popconfirm>):'未指定'
                    }
                </div>
            )
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
