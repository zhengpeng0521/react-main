import React from 'react';
import { Button,Form,Input,DatePicker,Icon,Select,Pagination,Row, Col,Checkbox, Popover , Table , Modal , } from 'antd';
import styles from './toReviewCom.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function ToReviewComponent({
    dataSource,
    showSearchFun,
    isShowSearch,
    SearchSubmit,
    total,
    pageSize,
    pageIndex,
    operationStatus,
    modalVisible,
    buttonLoading,
    cancelShenhe,
    tableOnChange,
    Operation,
    okShenheSubmit,
    canCelOperation,
    isShowLoseModal,
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
			key       : 'id',
			dataIndex : 'id',
			title     : '编号',
			width     : 80,
		},{
			key       : 'mchId',
			dataIndex : 'mchId',
			title     : '商户号',
			width     : 80,
		},{
			key       : 'mchName',
			dataIndex : 'mchName',
			title     : '租户名称',
			width     : 150,
		},{
			key       : 'operator',
			dataIndex : 'operator',
			title     : '操作员',
			width     : 100,
		},{
			key       : 'operatorTel',
			dataIndex : 'operatorTel',
			title     : '操作员号码',
			width     : 130,
		},{
			key       : 'settAmount',
			dataIndex : 'settAmount',
			title     : '提现金额',
			width     : 120,
		},{
			key       : 'remitAmount',
			dataIndex : 'remitAmount',
			title     : '实际到账',
			width     : 120
		},{
			key       : 'settFee',
			dataIndex : 'settFee',
			title     : '手续费',
			width     : 120
		},{
			key       : 'remitWay',
			dataIndex : 'remitWay',
			title     : '到账方式',
			width     : 120
		},{
			key       : 'payeeRealName',
			dataIndex : 'payeeRealName',
			title     : '户名',
			width     : 120
		},{
			key       : 'payeeAccount',
			dataIndex : 'payeeAccount',
			title     : '银行账号',
			width     : 120
		},{
			key       : 'bankAddress',
			dataIndex : 'bankAddress',
			title     : '开户行',
			width     : 120
		},{
			key       : 'createTime',
			dataIndex : 'createTime',
			title     : '创建时间',
			width     : 120
		},{
			key       : 'settStatus',
			dataIndex : 'settStatus',
			title     : '状态',
			width     : 120
		},{
			key       : 'remark',
			dataIndex : 'remark',
			title     : '备注',
			width     : 120 ,
		},{
			key       : 'operateStatus',
			dataIndex : 'operateStatus',
			title     : '操作',
			width     : 120,
            render: (text, record,index) => (
                text == '0' ?
                <div>
                    <a style={{marginRight:'10px'}} onClick = {() => Operation(text,record)}>审核通过</a>
                    <a onClick = {() => canCelOperation(record)}>失败</a>
                </div>
                :
                text == '1' ?
                <div>
                    <a style={{marginRight:'10px'}} onClick = {() => Operation(text,record)}>打款</a>
                    <a onClick = {() => canCelOperation(record)}>失败</a>
                </div>
                :
                text == '2' ?
                '-'
                :
                text == '3' ?
                '-'
                :
                ''
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
            obj.status = getFieldValue('status') || undefined;
            let createTime = getFieldValue('create_time') || [];
            if(!!createTime && createTime.length > 0){
                obj.startTime = createTime[0].format('YYYY-MM-DD');
                obj.endTime = createTime[1].format('YYYY-MM-DD');
            }
            data = obj;
        }
        SearchSubmit(data);
    }


    //操作提交
    function okShenhe(){
        let remark = getFieldValue('remark')
        validateFieldsAndScroll((err, remark) => {
            if (!!err) {
                return;
            }
        });
        okShenheSubmit(remark);
        resetFields()
    }

    //审核弹框
    let shenhePassProp = {
        visible : modalVisible,                //提示框是否显示
        title : '标记打款',
        onCancel : cancelShenheFun,
        footer : [
            <Button key="cancel" type="ghost" onClick={cancelShenheFun}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={okShenhe}
                    disabled={buttonLoading}
                    loading={buttonLoading}
                    style={{marginLeft:'10px'}}>提交</Button>
        ]
    }
    //失败弹框
    let shenhePassProp1 = {
        visible : isShowLoseModal,                //提示框是否显示
        title : '失败原因',
        onCancel : cancelShenheFun,
        footer : [
            <Button key="cancel" type="ghost" onClick={cancelShenheFun}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={okShenhe}
                    disabled={buttonLoading}
                    loading={buttonLoading}
                    style={{marginLeft:'10px'}}>提交</Button>
        ]
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
                {getFieldDecorator('status', {
                })(
                    <Select className={styles.searchItem} placeholder="请选择状态" style={{ width : 120 }}>
                        <Option value=''>全部</Option>
                        <Option value='0'>待审核</Option>
                        <Option value='1'>打款中</Option>
                        <Option value='2'>失败</Option>
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
                rowKey='id'
                columns = { columns }
                dataSource = { dataSource }
                bordered
                pagination={paginationProps}
                onChange={tableOnChange}
                loading = { tableLoading }
                />
            <Modal {...shenhePassProp}>
                { operationStatus == '0' ?
                    <div className={styles.tips}>是否标记为打款中？</div>
                    :
                  operationStatus == '1' ?
                    <div className={styles.tips}>是否标记为已打款？</div>
                    :
                    null
                }

                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label = "备注"
                            >

                            { getFieldDecorator( 'remark', {
                                initialValue : undefined,
                                rules: [
                                    { required: true, message: '请填写备注' },
                                ],
                            })(
                                <Input type="textarea" style={{width: '100%'}} autosize = {{ minRows : 3 , maxRows : 4 }}/>
                            )}
                        </FormItem>
                    </Form>

            </Modal>

            <Modal {...shenhePassProp1}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label = "失败原因"
                        >

                        { getFieldDecorator( 'remark', {
                            initialValue : undefined,
                            rules: [
                                    { required: true, message: '请填写失败原因' },
                                ],
                        })(
                            <Input type="textarea" style={{width: '100%'}} autosize = {{ minRows : 3 , maxRows : 4 }}/>
                        )}

                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
}

export default Form.create({})(ToReviewComponent);
