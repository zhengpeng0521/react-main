import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './WsBusinessInfoCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WsBusinessInfoComponent({
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
    mchId,
    businessShort,
    cardLoad,   //台卡更新
    qrCodeLoad,   //二维码的下载
	appNameList,  //服务商信息下拉列表
	appNameChange,   //服务商信息的更新
	appId,            //服务商信息
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
    /*台卡下载*/
    function CardLoadFunc(value1,value2){
        cardLoad(value1,value2);
    }

    let columns = [
		{
			key       : 'mchId',
			dataIndex : 'mchId',
			title     : '商户号',
			width     : 80,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'mchType',
			dataIndex : 'mchType',
			title     : '商户类型',
			width     : 80,
            render : (text,record) => (
                <Popover placement="top" content={ text == '01' ? '自然人' :
                        text == '02' ? '个体工商户' :
                        text == '03' ? '企业商户' :
                        null }>
                    {
                        text == '01' ? '自然人' :
                        text == '02' ? '个体工商户' :
                        text == '03' ? '企业商户' :
                        null
                    }
                </Popover>
            )
		},{
			key       : 'mchName',
			dataIndex : 'mchName',
			title     : '商户名称',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'businessShort',
			dataIndex : 'businessShort',
			title     : '商户简称',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'sourceName',
			dataIndex : 'sourceName',
			title     : '邀请人',
			width     : 100,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'sourceMobile',
			dataIndex : 'sourceMobile',
			title     : '邀请人手机号',
			width     : 130,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'contact',
			dataIndex : 'contact',
			title     : '联系人',
			width     : 100,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'contactTel',
			dataIndex : 'contactTel',
			title     : '联系人电话',
			width     : 130,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'leadingUser',
			dataIndex : 'leadingUser',
			title     : '负责人',
			width     : 100,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'leadingTel',
			dataIndex : 'leadingTel',
			title     : '负责人手机号',
			width     : 130,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'bankUser',
			dataIndex : 'bankUser',
			title     : '银行户名',
			width     : 100,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'bankNum',
			dataIndex : 'bankNum',
			title     : '银行账号',
			width     : 150,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
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
			key       : 'createTime',
			dataIndex : 'createTime',
			title     : '申请时间',
			width     : 120,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
                </Popover>
            )
		},{
			key       : 'auditState',
			dataIndex : 'auditState',
			title     : '审核状态',
			width     : 120,
            render : (text,record) => (
                <Popover placement="top" content={  text == '1' ? '审核通过' :
                        text == '2' ? '审核失败' :
                        text == '0' ? '审核中' :
                        null }>
                    {
                        text == '1' ? '审核通过' :
                        text == '2' ? '审核失败' :
                        text == '0' ? '审核中' :
                        null
                    }
                </Popover>
            )
		},{
			key       : 'auditMsg',
			dataIndex : 'auditMsg',
			title     : '审核信息',
			width     : 120,
            render : (text,record) => (
                <Popover content={ text }>
                    {text}
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
		},{
			key       : 'operation',
			dataIndex : 'operation',
			title     : '操作',
			width     : 150,
            render : (text,record) => (
                <div>
                    <div style={{marginBottom:'10px'}}>
                        <a onClick={()=>CardLoadFunc(record.mchId,record.businessShort)}>台卡工牌</a>
                    </div>
                    <div>
                        <a onClick={()=>qrCodeLoad(record.mchId,record.businessShort)}>贴纸码</a>
                    </div>
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
//            obj.mchName = getFieldValue('mchName') || '';
//            obj.businessShort = getFieldValue('businessShort') || '';
//            obj.leadingTel = getFieldValue('leadingTel') || '';
//            obj.auditState = getFieldValue('auditState') || '';
//            obj.mchId = getFieldValue('mchId') || '';
			obj= getFieldsValue() || ''
            let createTime = getFieldValue('create_time') || [] ;
            if(!!createTime && createTime.length > 0){
                obj.startTime = createTime[0].format('YYYY-MM-DD');
                obj.endTime = createTime[1].format('YYYY-MM-DD');
            }
			obj.create_time = null;
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
                    {getFieldDecorator('mchName')(
                      <Input placeholder="商户名称" style={{ width: 150 }}/>
                    )}
                </div>
                 <div className={styles.searchItem}>
                    {getFieldDecorator('businessShort')(
                      <Input placeholder="商户简称" style={{ width: 150 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('leadingTel')(
                      <Input placeholder="负责人手机号" style={{ width: 120 }}/>
                    )}
                </div>
                <div className={styles.searchItem}>
                    {getFieldDecorator('mchId')(
                      <Input placeholder="商户号" style={{ width: 150 }}/>
                    )}
                </div>
                {getFieldDecorator('auditState', {
                })(
                    <Select className={styles.searchItem} placeholder="请选择状态" style={{ width : 150 }}>
                        <Option value='0'>审核中</Option>
                        <Option value='1'>审核通过</Option>
                        <Option value='2'>审核失败</Option>
                    </Select>
                )}
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

export default Form.create({})(WsBusinessInfoComponent);
