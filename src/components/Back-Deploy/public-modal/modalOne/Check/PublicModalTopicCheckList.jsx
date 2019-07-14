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

//模板1主题编辑弹窗内容，显示文章
const PublicModalTopicEditList = ({
    loading, listArticleModalOne, totalArticleModalOne, pageArticleIndexModalOne, pageArticleSizeModalOne,formLoading,topicEditListVisibleModalOne,
    tableOnChange,tableArticlePageChangeModalOne,
    modalOneFormTopicEditCancel,modalOneTableOnArticleEditItem,modalOneTableOnArticleDeleteItem,modalOneTableOnCreateArticle,
    topicModalTitleModalOne,
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
    title: '文章编号',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  }, {
    title: '文章名称',
    dataIndex: 'articleName',
    key: 'articleName',
    width: 50,
  }, {
    title: '文章URL',
    dataIndex: 'articleUrl',
    key: 'articleUrl',
    width: 100,
    render:(text,record) => (<div><a href={text} target='_blank' className={style.check}>{text}</a></div>),
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.checkModalOne} onClick={() => modalOneTableOnArticleEditItem(record)}>编辑</a>&nbsp;&nbsp;
        <Popconfirm title={deleteContent(record)} onConfirm={() => modalOneTableOnArticleDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    //删除气泡框确认框内容
    let deleteContent = function(record){
        return(<p>确定删除<strong>文章</strong><strong style={{color:'red'}}>《{record.articleName}》</strong>吗?</p>);
    }
    //表单名称
    function titleName(topicModalTitleModalOne){
        if(topicModalTitleModalOne){
            return(<p>主题&nbsp;&nbsp;<span style={{color:'red'}}>{topicModalTitleModalOne}</span>&nbsp;&nbsp;下所有文章</p>);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalOneFormTopicEditCancel();
    };

    let paginationProps = {
        total: totalArticleModalOne,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tableArticlePageChangeModalOne,
        onChange : tableArticlePageChangeModalOne,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    let modalOpts = {
        title: titleName(topicModalTitleModalOne),
        maskClosable : false,
        visible : topicEditListVisibleModalOne,
        closable : true,
        width : 800,
        onCancel : handleCancel,
        footer : [
            <Button key="cancle" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };
  return (
    <div>
        <Modal {...modalOpts}>
            <Button type="primary" onClick={modalOneTableOnCreateArticle} className={style.addBtn}><Icon type="plus" />新增文章</Button>
            <Table
            columns={columns}
            dataSource={listArticleModalOne}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 700 }} />
        </Modal>
    </div>

  );
};

PublicModalTopicEditList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    total : PropTypes.any,
    pageTopicIndexModalOne : PropTypes.any,
    pageTopicSizeModalOne : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableOnChange : PropTypes.any,
    tableArticlePageChangeModalOne : PropTypes.func,
    topicEditListVisibleModalOne : PropTypes.any,
    formLoading : PropTypes.any,
    topicModalTitleModalOne : PropTypes.any,
    modalOneTableOnArticleEditItem : PropTypes.func,
    modalOneTableOnArticleDeleteItem : PropTypes.func,
    modalOneFormTopicEditCancel : PropTypes.func,
    modalOneTableOnCreateArticle : PropTypes.func,
};

export default Form.create()(PublicModalTopicEditList);
