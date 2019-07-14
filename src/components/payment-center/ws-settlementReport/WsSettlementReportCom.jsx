import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './WsSettlementReportCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WsSettlementReportComponent({
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
	appNameList,        //服务商信息下拉列表
	appId,            //服务商信息
	appNameChange,
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
			key       : 'mchId',
			dataIndex : 'mchId',
			title     : '商户号',
			width     : 100,
		},{
			key       : 'businessName',
			dataIndex : 'businessName',
			title     : '商户名称',
			width     : 150,
		},{
			key       : 'businessShort',
			dataIndex : 'businessShort',
			title     : '商户简称',
			width     : 150,
		},{
			key       : 'date',
			dataIndex : 'date',
			title     : '结算时间',
			width     : 150,
		},{
			key       : 'amount',
			dataIndex : 'amount',
			title     : '交易金额',
			width     : 100,
		},{
			key       : 'tradeNum',
			dataIndex : 'tradeNum',
			title     : '交易笔数',
			width     : 100,
		},{
			key       : 'refundAmount',
			dataIndex : 'refundAmount',
			title     : '退款金额',
			width     : 130,
		},{
			key       : 'refundNum',
			dataIndex : 'refundNum',
			title     : '退款笔数',
			width     : 100,
		},{
			key       : 'feeAmount',
			dataIndex : 'feeAmount',
			title     : '手续费',
			width     : 130,
		},{
			key       : 'settAmount',
			dataIndex : 'settAmount',
			title     : '结算净额',
			width     : 130,
		},{
			key       : 'fee',
			dataIndex : 'fee',
			title     : '享受扣率(%)',
			width     : 100,
            render : (text,record) => (
                <Popover content={ text == null ? '0.35' : text }>
                    {
                        text == null ? '0.35' : text
                    }
                </Popover>
            )
		},{
			key       : 'bankNum',
			dataIndex : 'bankNum',
			title     : '结算银行卡',
			width     : 150,
		},{
			key       : 'status',
			dataIndex : 'status',
			title     : '结算状态',
			width     : 120,
            render : (text,record) => (
                <Popover placement="top" content={ text == '0' ? '成功' : text == '1' ? '成功' : '' }>
                    {
                        text == '0' ? '失败' :
                  		text == '1' ? '成功' : ''
                    }
                </Popover>
            )
		},{
			key       : 'appName',
			dataIndex : 'appName',
			title     : '服务商信息',
			width     : 120,
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
//            obj.businessName = getFieldValue('businessName') || undefined;
//            obj.businessShort = getFieldValue('businessShort') || undefined;
//            obj.settState = getFieldValue('status') || undefined;
//            obj.mchId = getFieldValue('mchId') || undefined;
//            obj.appId = appName || undefined;
			obj= getFieldsValue() || ''
			let createTime = getFieldValue('date') || [];
            if(!!createTime && createTime.length > 0){
                obj.startDate = createTime[0].format('YYYY-MM-DD');
                obj.endDate = createTime[1].format('YYYY-MM-DD');
            }
			obj.date = null;
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
                   {getFieldDecorator('date')(
                      <RangePicker/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('businessName')(
                      <Input placeholder="商户名称" style={{ width: 150 }}/>
                    )}
                </div>
                 <div className={styles.searchItem}>
                    {getFieldDecorator('businessShort')(
                      <Input placeholder="商户简称" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('mchId')(
                      <Input placeholder="商户号" style={{ width: 150 }}/>
                    )}
                </div>
				{getFieldDecorator('appId', {
                })(
                    <Select className={styles.searchItem} placeholder="请选择服务商信息" style={{ width : 150 }} optionFilterProp="children" onChange={appNameChange}>
                       {
							appNameList && appNameList.map(function(item,index){
								return(
									<Option key={index+"_"} value={item.appId}>{item.appName}</Option>
								)
							})
						}
                    </Select>
                )}
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

export default Form.create({})(WsSettlementReportComponent);
