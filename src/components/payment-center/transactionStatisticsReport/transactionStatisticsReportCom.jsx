import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './transactionStatisticsReportCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function transactionStatisticsReportComponent({
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
			key       : 'date',
			dataIndex : 'date',
			title     : '日期',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},
		{
			key       : 'tradeAmount',
			dataIndex : 'tradeAmount',
			title     : '交易金额',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'tradeNum',
			dataIndex : 'tradeNum',
			title     : '交易笔数',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'refundAmount',
			dataIndex : 'refundAmount',
			title     : '退款金额',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'refundNum',
			dataIndex : 'refundNum',
			title     : '退款笔数',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
        },{
			key       : 'feeAmount',
			dataIndex : 'feeAmount',
			title     : '手续费金额',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'isvFee',
			dataIndex : 'isvFee',
			title     : '网商返佣金额',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'settAmount',
			dataIndex : 'settAmount',
			title     : '结算金额',
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
            let createTime = getFieldValue('create_time') || [];
            if(!!createTime && createTime.length > 0){
                obj.startDate = createTime[0].format('YYYYMMDD');
                obj.endDate = createTime[1].format('YYYYMMDD');
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

export default Form.create({})(transactionStatisticsReportComponent);
