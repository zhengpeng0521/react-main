import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './WsPromoterInfoCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WsPromoterInfoComponent({
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
			key       : 'nickName',
			dataIndex : 'nickName',
			title     : '微信昵称',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'userName',
			dataIndex : 'userName',
			title     : '姓名',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'mobile',
			dataIndex : 'mobile',
			title     : '手机号',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'createTime',
			dataIndex : 'createTime',
			title     : '注册时间',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
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
            obj.userName = getFieldValue('userName') || undefined;
            obj.mobile = getFieldValue('mobile') || undefined;
            let createTime = getFieldValue('create_time') || [];
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

    return(
        <div>
            <Form className={styles.searchBox} style={{display:hiddenState}}>
                <div className={styles.searchItem}>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('mobile')(
                      <Input placeholder="手机号" style={{ width: 120 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('userName')(
                      <Input placeholder="姓名" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    <Button onClick={ (e) => handleSearchSubmit(e,'search') } type="primary" style={{marginRight:'20px'}}><Icon type="search" />搜索</Button>
                    <Button onClick={ (e) => handleSearchSubmit(e,'clear') }><Icon type="delete" />清除</Button>
                </div>
            </Form>

            <div className={styles.btnBox}>
                <Button type="primary" onClick={exportFun} style={{marginLeft:'20px',float:'right'}}><Icon type="export" />导出</Button>
                <Button type="primary" onClick={showSearchFun} style={{float:'right'}}><Icon type="filter" />筛选</Button>
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

export default Form.create({})(WsPromoterInfoComponent);
