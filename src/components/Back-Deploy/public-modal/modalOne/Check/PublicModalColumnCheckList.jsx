import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message,Table,Popconfirm } from 'antd';
import style from '../../publicModal.less';

const FormItem = Form.Item;

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

//模板1栏目编辑弹窗内容，显示主题
const PublicModalColumnEditList = ({
    loading, list, formLoading,totalTopicModalOne, listTopicModalOne,
    pageTopicIndexModalOne, pageTopicSizeModalOne,
    columnEditListVisibleModalOne,
    tableOnChange,tableTopicPageChangeModalOne,modalOneFormColumnListCancel,modalOneTableOnTopicCheckItem,
    modalOneTableOnTopicDeleteItem,modalOneTableOnCreateTopic,modalOneTableOnTopicModifyItem,
    columnModalTitleModalOne,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

const columns = [{
    title: '主题编号',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  }, {
    title: '主题名称',
    dataIndex: 'themeName',
    key: 'themeName',
    width: 50,
  }, {
    title: '相关文章数',
    dataIndex: 'articleCount',
    key: 'articleCount',
    width: 50,
  }, {
    title: '主题URL',
    dataIndex: 'themeUrl',
    key: 'themeUrl',
    width: 50,
    render:(text,record) => (<div><a href={text} target='_blank' className={style.check}>{text}</a></div>),
  }, {
    width: 80,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => modalOneTableOnTopicCheckItem(record)}>查看文章</a>&nbsp;&nbsp;
        <a className={style.check} onClick={() => modalOneTableOnTopicModifyItem(record)}>编辑本主题</a>&nbsp;&nbsp;
        <Popconfirm title={deleteContent(record)} onConfirm={() => modalOneTableOnTopicDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    //删除气泡框确认框内容
    function deleteContent(record){
        return(<p>确定删除<strong>主题</strong><strong style={{color:'red'}}>《{record.themeName}》</strong>吗?</p>);
    }

    //表单名称
    function titleName(columnModalTitleModalOne){
        if(columnModalTitleModalOne){
            return(<p>栏目&nbsp;&nbsp;<span style={{color:'red'}}>{columnModalTitleModalOne}</span>&nbsp;&nbsp;下所有主题</p>);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalOneFormColumnListCancel();
    };

    let paginationProps = {
        total: totalTopicModalOne,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tableTopicPageChangeModalOne,
        onChange : tableTopicPageChangeModalOne,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    let modalOpts = {
        title: titleName(columnModalTitleModalOne),
        maskClosable : false,
        visible : columnEditListVisibleModalOne,
        closable : true,
        width : 1000,
        onCancel : handleCancel,
        footer : [
            <Button key="cancle" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };

    let aaa=[];
    for(let i=0;i<15;i++){
        aaa.push({
            id:i,
            title:`一头猪${i}`,
            level:`${i}`,
            status:i,
        });
    }

  return (
    <div >
        <Modal {...modalOpts}>
            <Button type="primary" onClick={modalOneTableOnCreateTopic} className={style.addBtn}><Icon type="plus" />新增主题</Button>
            <Table
            columns={columns}
            dataSource={listTopicModalOne}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 900 }} />
        </Modal>
    </div>

  );
};

PublicModalColumnEditList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageTopicIndexModalOne : PropTypes.any,
    pageTopicSizeModalOne : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableOnChange : PropTypes.any,
    tableTopicPageChangeModalOne : PropTypes.func,
    formTopicVisibleModalOne : PropTypes.any,
    formLoading : PropTypes.any,
    columnModalTitleModalOne : PropTypes.any,
    modalOneTableOnTopicCheckItem : PropTypes.func,
    modalOneTableOnTopicModifyItem : PropTypes.func,
    modalOneTableOnTopicDeleteItem : PropTypes.func,
    modalOneFormColumnListCancel : PropTypes.func,
    modalOneTableOnCreateTopic : PropTypes.func,
};

export default Form.create()(PublicModalColumnEditList);
