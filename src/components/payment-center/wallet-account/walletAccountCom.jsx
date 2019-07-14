import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './walletAccountCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WalletComponent({
    dataSource,
    isShowDetails,
    showDetails,
    cancelDetails,
    dataSource1,
    showSearchFun,
    isShowSearch,
    SearchSubmit,
    exportFun,
    tableLoading,
    tableOnChange,
    tableOnChange1,
    total,
    pageSize,
    pageIndex,
    total1,
    pageSize1,
    pageIndex1,
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
			key       : 'mchId',
			dataIndex : 'mchId',
			title     : '钱包ID',
			width     : 80,
		},{
			key       : 'mchName',
			dataIndex : 'mchName',
			title     : '租户名称',
			width     : 150,
		},{
			key       : 'balance',
			dataIndex : 'balance',
			title     : '账户总余额',
			width     : 100,
		},{
			key       : 'vbalance',
			dataIndex : 'vbalance',
			title     : '账户可用余额',
			width     : 130,
		},{
			key       : 'unbalance',
			dataIndex : 'unbalance',
			title     : '冻结中',
			width     : 120,
		},{
			key       : 'dosth',
			dataIndex : 'dosth',
			title     : '操作',
			width     : 120 ,
            render : (text,record) => (
                <a onClick={() => showDetails(record.mchId)}>查看流水明细</a>
            )
		}
	];

    let colums1 = [
        {
			key       : 'tradeNo',
			dataIndex : 'tradeNo',
			title     : '订单号',
			width     : 100,
		},{
			key       : 'amount',
			dataIndex : 'amount',
			title     : '发生金额',
			width     : 100,
		},{
			key       : 'subject',
			dataIndex : 'subject',
			title     : '描述',
			width     : 100,
		},{
			key       : 'balance',
			dataIndex : 'balance',
			title     : '账户余额',
			width     : 100,
		},{
			key       : 'trxType',
			dataIndex : 'trxType',
			title     : '类型',
			width     : 100,
		},{
			key       : 'createTime',
			dataIndex : 'createTime',
			title     : '提交时间',
			width     : 100,
		}
    ]


    let tableDetailProp = {
        visible : isShowDetails,                //提示框是否显示
        title : '数据统计',                    //提示框标题
        onCancel : cancelDetails,              //提示框点击取
        onOk : cancelDetails,
        width : 1000
    }

    let hiddenState = '';
    isShowSearch == true ? hiddenState = 'block' : hiddenState = 'none';

    //搜索
    function handleSearchSubmit(e,type) {
        e.preventDefault();
        let data = {};
        if(type == 'clear'){
            resetFields();
        }else if(type == 'search'){
            let obj ={};
            obj.mchId = getFieldValue('mchId') || undefined;
            obj.tenantName = getFieldValue('tenantName') || undefined;
            data = obj;
        }
        SearchSubmit(data);
    }

    //钱包列表分页
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

    //详情分页
    let paginationProps1 = {
        current : pageIndex1 + 1,
        pageSize : pageSize1,
        total : total1,
        showSizeChanger : true,
        showQuickJumper :true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    //清空
    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
    }
    return(
        <div>
            <Form className={styles.searchBox} style={{display:hiddenState}}>
                <div className={styles.searchItem}>
                    {getFieldDecorator('mchId')(
                      <Input placeholder="钱包ID" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('tenantName')(
                      <Input placeholder="租户名称" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    <Button onClick={(e) => handleSearchSubmit(e,'search') } type="primary" style={{marginRight:'20px'}}><Icon type="search" />搜索</Button>
                    <Button onClick={(e) => handleSearchSubmit(e,'search') }><Icon type="delete" />清除</Button>
                </div>
            </Form>
            <div className={styles.btnBox}>
                <Button type="primary" onClick={ exportFun } style={{marginLeft:'20px'}}><Icon type="export" />导出</Button>
                <Button type="primary" onClick={showSearchFun}><Icon type="filter" />筛选</Button>
            </div>
            <Table
                rowKey='mchId'
                columns = { columns }
                dataSource = { dataSource }
                bordered
                loading = { tableLoading }
                pagination={paginationProps}
                onChange={tableOnChange}
                />
            <Modal {...tableDetailProp}>
                <Table
                    rowKey='key'
                    columns = { colums1 }
                    dataSource = { dataSource1 }
                    loading = { tableLoading }
                    pagination={paginationProps1}
                    onChange={tableOnChange1}
                    bordered
                />
            </Modal>
        </div>
    );
}

export default Form.create({})(WalletComponent);
