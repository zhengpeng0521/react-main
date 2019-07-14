import React from 'react';
import { Button,Form,Input,Upload,Icon , message , Table , Popconfirm} from 'antd';
import styles from './news_inCom.less';
//import ReactQuill from 'react-quill';
// import { ImageDrop } from 'quill-image-drop-module';
//import 'quill/dist/quill.snow.css';
import { get } from 'https';

const { TextArea } = Input;
const FormItem = Form.Item;
let url;
// Quill.register('modules/imageDrop', ImageDrop);


function news_inComponent({
    dataSource,
    total,
    pageIndex,
    pageSize,
    tableLoading,
    tableOnChange,
    changeApply,
    changeDelete,
    NewsAddBtn,
    changeTop,
    editModel,
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
            key       : 'title',
			dataIndex : 'title',
			title     : '标题',
			width     : 80,
        },{
            key       : 'context',
			dataIndex : 'context',
			title     : '简介',
			width     : 80,
        },{
            key       : 'imgUrl',
			dataIndex : 'imgUrl',
			title     : '图片',
			width     : 180,
            render    : (text,record) => (
                    <img src = {text} style={{width : '100%',height : '60px',display : 'block'}}/>
            )
        },{
            key       : 'classify',
			dataIndex : 'classify',
			title     : '所属类别',
			width     : 80,
            render    : (text,record) => (
                <div>
                    {text == '1' ? '常见问题' : text == '2' ? '操作方案' : text == '3' ? '新闻公告' : text == '4' ? '功能更新' : '-'}
                </div>
            )
        },{
            key       : 'url',
			dataIndex : 'url',
			title     : '详情地址',
			width     : 180,
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
        },{
            key       : 'top',
			dataIndex : 'top',
			title     : '置顶',
			width     : 80,
            render    : (text,record) => (
                <div>
                    {
                    '1' == text ?
                        (<Popconfirm title={<p>确定<strong style={{color:'#77c8f8'}}>置顶</strong>吗?</p>} onConfirm={() => changeTop(record)}>
                            <a style={{color:'red'}}>非置顶</a>
                         </Popconfirm>)
                    :
                    '2' == text ?
                        (<Popconfirm title={<p>确定<strong style={{color:'red'}}>非置顶</strong>吗?</p>} onConfirm={() => changeTop(record)}>
                            <a>置顶</a>
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
            return '总共' + this.total + '条数据';
        }
    };


    return(
        <div>
            <div style={{marginBottom : '10px'}}>
                <Button key='addTet' type="primary" onClick = { NewsAddBtn }><Icon type="plus"/>新增</Button>
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

export default Form.create({})(news_inComponent);
