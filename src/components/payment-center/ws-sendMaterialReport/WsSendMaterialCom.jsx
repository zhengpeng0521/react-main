import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './WsSendMaterialCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WsSendMaterialCom({
    dataSource,
    showSearchFun,
    isShowSearch,
    SearchSubmit,
    total,
    pageSize,
    pageIndex,
    cancelShenhe,
    tableOnChange,
    exportFun,
    tableLoading,
    subjectSave,    //备注编辑
    subjectEdit,
    subject ,           //备注
    sendTime ,          //邮寄时间
    expressNum,       //快递单号
    mchName ,          //机构名称
    id,                //编号
    subjectVisible,    //备注框显示
    sendTimeSave,       //邮寄时间保存
    sendTimeEdit,       //邮寄时间编辑
    sendTimeVisible,    //邮寄时间框显示
    expressNumSave,     //快递单号保存
    expressNumEdit,     //快递单号编辑
    expressNumVisible,   //快递单号框显示
    selectedRowKeys ,
    selectedRows ,
    rowSelectChangeAction,
    sendInfoFun,     //短信发送
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
    let formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };

    /*备注编辑*/
    function subjectEditFunc(value,subject){
        subjectEdit(value,subject);
    }

    let columns = [
        {
			key       : 'mchId',
			dataIndex : 'mchId',
			title     : '商户号',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'mchName',
			dataIndex : 'mchName',
			title     : '机构名称',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'businessShort',
			dataIndex : 'businessShort',
			title     : '机构简称',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'userName',
			dataIndex : 'userName',
			title     : '收件人',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'tel',
			dataIndex : 'tel',
			title     : '手机号',
			width     : 130,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'address',
			dataIndex : 'address',
			title     : '详细地址',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'createTime',
			dataIndex : 'createTime',
			title     : '提交时间',
			width     : 130,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'subject',
			dataIndex : 'subject',
			title     : '备注',
			width     : 200,
            render : (text,record) =>(
                <div>
                    {
                        id == record.id && subjectVisible ?
                        <Popover placement="top" content={text} trigger="hover">
                            <Input
                                  style={{width:'250px'}}
                                  defaultValue={text}
                                  onBlur={e => subjectSave(e.target.value,record.id)}
                              />
                        </Popover>
                        :
                        <Popover placement="top" content={text} trigger="hover">
                             <a onClick = {() => subjectEditFunc(record.id,record.subject)}>
                                <span>{text || '编辑'}</span>
                            </a>
                        </Popover>
                    }
                 </div>
            )
		},{
			key       : 'sendTime',
			dataIndex : 'sendTime',
			title     : '邮寄时间',
			width     : 150,
            render : (text,record) =>(
                <div>
                    {
                        id == record.id && sendTimeVisible ?
                        <Popover placement="top" content={text} trigger="hover">
                            <Input
                                  style={{width:'150px'}}
                                  defaultValue={text}
                                  onBlur={e => sendTimeSave(e.target.value,record.id)}
                              />
                        </Popover>
                        :
                        <Popover placement="top" content={text} trigger="hover">
                             <a onClick = {() => sendTimeEdit(record.id)}>
                                <span>{text || '编辑'}</span>
                            </a>
                        </Popover>
                    }
                 </div>
            )
		},{
			key       : 'expressNum',
			dataIndex : 'expressNum',
			title     : '快递单号',
			width     : 150,
            render : (text,record) =>(
                <div>
                    {
                        id == record.id && expressNumVisible ?
                        <Popover placement="top" content={text} trigger="hover">
                            <Input
                                  style={{width:'250px'}}
                                  defaultValue={text}
                                  onBlur={e => expressNumSave(e.target.value,record.id)}
                              />
                        </Popover>
                        :
                        <Popover placement="top" content={text} trigger="hover">
                             <a onClick = {() => expressNumEdit(record.id)}>
                                <span>{text || '编辑'}</span>
                            </a>
                        </Popover>
                    }
                 </div>
            )
		}
	];

    //搜索框是否显示
    let hiddenState = '';
    isShowSearch == true ? hiddenState = 'block' : hiddenState = 'none';
    //操作取消
    function cancelShenheFun(){
        resetFields();
        cancelShenhe();
    }

    //搜索和清空
    function handleSearchSubmit(e,type) {
        e.preventDefault();
        let data = {};
        if(type == 'clear'){
            resetFields();
        }else if(type == 'search'){
            let obj = {};
            obj.mchName = getFieldValue('mchName') || undefined;
            obj.mchId = getFieldValue('mchId') || undefined;
            let createTime = getFieldValue('createTime') || [];
            if(!!createTime && createTime.length > 0){
                obj.startTime = createTime[0].format('YYYY-MM-DD');
                obj.endTime = createTime[1].format('YYYY-MM-DD');
            }
            data = obj;
        }
        SearchSubmit(data);
    }

    //分页
    let paginationProps = {
        current : pageIndex + 1,
        pageSize,
        total,
        showSizeChanger : true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    /*复选框*/
    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: rowSelectChangeAction,
    };

    return(
        <div>
            <Form className={styles.searchBox} style={{display:hiddenState}}>
                <div className={styles.searchItem}>
                   {getFieldDecorator('createTime')(
                      <RangePicker/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('mchName')(
                      <Input placeholder="机构名称" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('mchId')(
                      <Input placeholder="商户号" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    <Button onClick={ (e) => handleSearchSubmit(e,'search') } type="primary" style={{marginRight:'20px'}}><Icon type="search" />搜索</Button>
                    <Button onClick={ (e) => handleSearchSubmit(e,'clear') }><Icon type="delete" />清除</Button>
                </div>
            </Form>

            <div className={styles.btnBox}>
                <Button type="primary" onClick={exportFun} style={{marginLeft:'20px',float:'right'}}><Icon type="export" />导出</Button>
                <Button type="primary" onClick={showSearchFun} style={{marginLeft:'20px',float:'right'}}><Icon type="filter" />筛选</Button>
                <Button type="primary" onClick={sendInfoFun} style={{float:'right'}}><Icon type="mail" />发送短信</Button>
            </div>

            <Table
                columns = { columns }
                dataSource = { dataSource }
                bordered
                pagination={paginationProps}
                onChange={tableOnChange}
                loading = { tableLoading }
                rowKey = 'id'
                rowSelection = {rowSelection}
            />
        </div>
    );
}

export default Form.create({})(WsSendMaterialCom);
