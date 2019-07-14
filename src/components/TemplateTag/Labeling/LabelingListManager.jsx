import React from 'react';
import styles from './Labeling.less';
import {Table, Form, Button, Popconfirm, Select, Modal, Input, message, Icon,Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

function LabelingListManager({
    sourceType,
    filter,
    totalCount,
    dataList,
    listLoading,
    listSelectIds,
    pageIndex,
    pageSize,
    onPageQuery,
    adLabeling,
    adCollectVisible,
    AddOrEditLabelShow,
    AddOrEditLabelCancel,
    AddOrEditLabelSubmit,
    labeledModal,
    changeSelectIds,

    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
        setFieldsValue,
    },
}) {

    function handleTablePageChange(page, filter, sort) {
       onPageQuery && onPageQuery(
            page.current -1,
            page.pageSize,
        );
    }
     function handleAdCollectSubmit(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            let data = {};
            let bart = values.options
            data.labelIds = bart.join(',');
            data.product = sourceType;
            console.log(listSelectIds);
            if(listSelectIds.length>0){
                data.productIds = listSelectIds.join(',')
            }else{
                data.productIds = labeledModal.id;
            }
            AddOrEditLabelSubmit(data);
        });
    }
    function onAdCollectCancle(e) {
        e.preventDefault();
        resetFields();
        AddOrEditLabelCancel();
    }
    let labelArr = [];
    adLabeling && adLabeling.length>0 && adLabeling.map(function(item,index){
        let labelChild = item.value;
        let labelOptions = [];
        let initValue = [];
        for(let i in labelChild){
            labelOptions.push({
                label : labelChild[i].labelName,
                value : labelChild[i].id
            })
        }
        if(!!labeledModal && !!labeledModal.labels && labeledModal.labels.length > 0){
            for(let i in labeledModal.labels){
                initValue.push(labeledModal.labels[i].id)
            }
        }
        labelArr.push(
                <FormItem
                 key={index}
                 label={item.group}
                 { ...formItemLayout }
                >
                 { getFieldDecorator('options',{
                    initialValue : initValue || []
                })(
				        <CheckboxGroup options={ labelOptions } />
				    )}
                </FormItem>
        )
    })
    const rowSelection = {
        selectedRowKeys: listSelectIds,
        onChange: changeSelectIds
    };

    let columns = [{
        width:200,
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render:(text,record) =>(
            <div>
                <a onClick={()=>AddOrEditLabelShow(record)}>打标签</a>
            </div>
        )
    },{
        width:300,
        title: '模板名称',
        dataIndex: 'title',
        key: 'title',
    },{
        title: '标签',
        dataIndex: 'labels',
        key: 'labels',
        render:(text,record) =>(
            <div>
                {
                    text && text.length>0 && text.map(function(item,index){
                        return(
                            <span key ={index} style={{margin:'3px 10px', display:'inline-block',width:'10%', textAlign:'center',background:'#eee'}}>{item.labelName}</span>
                        )
                    })
                }
            </div>
        )
    }];
    let paginationProps = {
        current : pageIndex + 1,
        pageSize : pageSize,
        total: totalCount,
        showSizeChanger: true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+totalCount+'条数据';
        }
    };

    return (
        <div className={styles.label_list_content}>

            <div className={styles.list_bar_cont}>
                <div className={styles.bar_text}>操作:</div>
                <div className={styles.bar_item} style={{height:'40px',lineHeight:'28px'}}>
                     <Button
                        type="ghost"
                        onClick={()=>AddOrEditLabelShow()}
                        disabled={!(listSelectIds && listSelectIds.length > 0)}
                        loading={listLoading}
                    >
                        打标签
                    </Button>
                </div>
            </div>
            <div className="table-operations" >
                <Button key='filter' type="primary"><Icon type="filter" />筛选</Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataList}
                loading={listLoading}
                rowSelection={rowSelection}
                pagination={paginationProps}
                onChange={handleTablePageChange}
                bordered
                rowKey="id"
                scroll={{ x : 1200 }} />
            { adCollectVisible ?
                <Modal
                    key = 'id'
                    title="打标签"
                    visible={adCollectVisible}
                    onOk={handleAdCollectSubmit}
                    onCancel={onAdCollectCancle}
                    maskClosable={false}
                    style={{width:'700'}}
                >
                    <Form>
                        {labelArr}
                    </Form>
                </Modal>
                :
                null
            }
        </div>
    );
}

export default Form.create()(LabelingListManager);
