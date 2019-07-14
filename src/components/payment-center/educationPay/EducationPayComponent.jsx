import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './EducationPayComponent.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function EducationPayComponent({
    dataSource,
    showSearchFun,
    isShowSearch,
    SearchSubmit,
    total,
    pageSize,
    pageIndex,
    tableOnChange,
    exportFun,
    tableLoading,
	addNewSchoolFun,      //新增学校
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

    let columns = [
        {
			key       : 'creatTime',
			dataIndex : 'creatTime',
			title     : '创建时间',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},
		{
			key       : 'id',
			dataIndex : 'id',
			title     : '学校编号',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'name',
			dataIndex : 'name',
			title     : '学校名称',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'address',
			dataIndex : 'address',
			title     : '所在地区',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'userName',
			dataIndex : 'userName',
			title     : '联系人姓名',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
        },{
			key       : 'tel',
			dataIndex : 'tel',
			title     : '联系人手机号',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'aliNum',
			dataIndex : 'aliNum',
			title     : '支付宝账号',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'auditMessage',
			dataIndex : 'auditMessage',
			title     : '审核结果',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},

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
			obj= getFieldsValue() || ''
            let createTime = getFieldValue('create_time') || [] ;
            if(!!createTime && createTime.length > 0){
                obj.startTime = createTime[0].format('YYYY-MM-DD');
                obj.endTime = createTime[1].format('YYYY-MM-DD');
            }
			obj.create_time = null;
			obj.audit = obj.auditMessage;
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

    return(
        <div>
            <Form className={styles.searchBox} style={{display:hiddenState}}>
                <div className={styles.searchItem}>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
                </div>
				<div className={styles.searchItem}>
                    {getFieldDecorator('name')(
                      <Input placeholder="学校名称" style={{ width: 150 }}/>
                    )}
                </div>
				<div className={styles.searchItem}>
                    {getFieldDecorator('tel')(
                      <Input placeholder="联系人手机号" style={{ width: 150 }}/>
                    )}
                </div>
				<div className={styles.searchItem}>
                    {getFieldDecorator('aliNum')(
                      <Input placeholder="支付宝账号" style={{ width: 150 }}/>
                    )}
                </div>
				{getFieldDecorator('auditMessage', {
                })(
                    <Select className={styles.searchItem} placeholder="审核结果" style={{ width : 150 }}>
                        <Option value='0'>审核失败</Option>
                        <Option value='1'>审核成功</Option>
                    </Select>
                )}
                <div className={styles.searchItem}>
                    <Button onClick={ (e) => handleSearchSubmit(e,'search') } type="primary" style={{marginRight:'20px'}}><Icon type="search" />搜索</Button>
                    <Button onClick={ (e) => handleSearchSubmit(e,'clear') }><Icon type="delete" />清除</Button>
                </div>
            </Form>

            <div className={styles.btnBox}>
                <Button type="primary" onClick={showSearchFun} style={{float:'right'}}><Icon type="filter" />筛选</Button>
				<Button key='addTet' type="primary" onClick={addNewSchoolFun} style={{marginRight:'20px',float:'right'}} ><Icon type="plus"/>新增</Button>
            </div>

            <Table
                columns = { columns }
                dataSource = { dataSource }
                bordered
                pagination={paginationProps}
                onChange={tableOnChange}
                loading = { tableLoading }
            />
        </div>
    );
}

export default Form.create({})(EducationPayComponent);
