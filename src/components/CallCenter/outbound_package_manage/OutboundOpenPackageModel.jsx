import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Icon, message, Select, Radio ,Popconfirm ,Transfer ,Table} from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './OutboundPackageManage.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const OutboundOpenPackageModel = ({
    outboundModalButtonLoading,                     //按钮禁止状态
    OutboundOpenPackageModelVisible,                //模态框显示状态
    OutboundOpenPackageModelCancel ,                //关闭
    OutboundOpenPackageModelSave,                   //保存
    ChooseOrgType,                                  //选择坐席

    OutboundOpenPackageModalAllcontent,             //搜索出来的总机构
    OutboundOpenPackageModalTransferTargetContent,  //选中的机构
    OutboundOpenPackageModalTransferhandleChange,   //机构选择加入事件
    OutboundOpenPackageModalSearchOrgName,          //机构搜索


    OutboundOpenPackageSelectTableIdArr,            //坐席下拉总数据
    OutboundSelectTableNum,                         //修改坐席人数
    OutboundSelectTableEmployeeArr,                 //坐席人员列表
    OutboundSelectedRowKeys,                        //选中的坐席人员
    OutboundRowSelectChangeAction,                  //选中事件
    OutboundTableInnerModalCycleNum,                //坐席周期失去焦点事件
    OutboundTableInnerModalActualPrice,             //实收价格失去焦点事件

    OutboundOpenPackageGradientAllData,             //坐席总数组
    OutboundOpenPackageTableAdd,                    //坐席新增
    OutboundOpenPackageTableDelete,                 //坐席删除


    OutboundOpenPackageTableTimeDelete,             //时长包删除
    OutboundOpenPackageTableTimeAdd,                //时长包新增
    OutboundOpenPackageGradientTimeData,            //时长包梯度总数据

    OutboundTableModalTimeActualPrice,              //时长包实收金额
    OutboundTableModalTimeCycleNum,                 //时长包数量失去焦点事件

    totalPrice,                                     //总价格
    realPrice,                                      //实收价格

    //选择坐席弹窗
    OutboundSelectTableInnerModalVisible,
    OutboundSelectTableInnerModalCancel,
    OutboundSelectTableInnerModalEnsure,

    OutboundOpenPackageModelDetail,                 //套餐详情

    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    if(OutboundOpenPackageGradientAllData && OutboundOpenPackageGradientAllData.length>0){
        for(var i in OutboundOpenPackageGradientAllData){
            totalPrice = (Number(totalPrice) + Number(OutboundOpenPackageGradientAllData[i].totalPrice)).toFixed(2);
            realPrice = (Number(realPrice) + Number(OutboundOpenPackageGradientAllData[i].actualPrice)).toFixed(2);
        }
    }

    if(OutboundOpenPackageGradientTimeData && OutboundOpenPackageGradientTimeData.length>0){
            totalPrice = (Number(totalPrice) + Number(OutboundOpenPackageGradientTimeData[0].salePrice)).toFixed(2);
            realPrice = (Number(realPrice) + Number(OutboundOpenPackageGradientTimeData[0].actualPrice)).toFixed(2);
    }


    //表单布局
	let formItemLayout = {
		labelCol : { span : 4 },
		wrapperCol : { span : 18 }
	};
    //保存事件
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,value) => {
            if (!!errors) {
                return;
            }
            value.totalPrice = totalPrice;
            value.realPrice = realPrice;
            if(OutboundOpenPackageModelDetail.id){
                value.id = OutboundOpenPackageModelDetail.id;
            }
            OutboundOpenPackageModelSave(value);
            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        OutboundOpenPackageModelCancel();
    }
    //坐席套餐下拉框数据
    let OutboundOpenPackageSelectTableChildren = [];
    if(OutboundOpenPackageSelectTableIdArr && OutboundOpenPackageSelectTableIdArr.length > 0){
        OutboundOpenPackageSelectTableChildren = OutboundOpenPackageSelectTableIdArr.map((item,index) => {
             return (<Option key = { item.id } value = { item.id } disabled = { !item.display }>{ item.productName }</Option>);
        });
    }

    //模态框的属性
    let modalOpts = {
        title: '开通套餐',
        maskClosable : false,
        visible : OutboundOpenPackageModelVisible,
        closable : true,
        width : 900,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={outboundModalButtonLoading}
                    loading= {outboundModalButtonLoading}
                   >保存</Button>
        ],
      };
     const columns = [{
                        title : '名称',
                        key : 'userName',
                        dataIndex : 'userName',
                        width :100,

                    },{
                        title : '手机号',
                        key : 'mobile',
                        dataIndex : 'mobile',
                        width : 120,

                    },{
                        title : '状态',
                        key : 'status',
                        dataIndex : 'status',
                        width : 80,
                        render : (text,record) => (
                            <div>
                                {text=='1'?
                                    <span>未激活</span>
                                : text=='2'?
                                    <span>已开通</span>
                                :
                                    <span>已过期</span>
                                }
                            </div>
                        )
                    }]

    let rowSelection = {
            selectedRowKeys : OutboundSelectedRowKeys,
            onChange        : OutboundRowSelectChangeAction,
    };

    //周期失去焦点事件
    function OutboundTableInnerModalCycleNumhandel(value,index){
        OutboundTableInnerModalCycleNum(value,index)
    }
    //实收价格失去焦点事件
    function OutboundTableModalActualPricehandel(value,index){
        OutboundTableInnerModalActualPrice(value,index)
    }
    //金钱校验
    function checkMoney(rule, value, callback) {
        if(value == '' || value == undefined || value == null){
            callback();
        }else if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('数字格式不正确,最多保留两位小数'));
        }else {
            callback();
        }
	}
    //整数校验
    function validator(rule, value, callback) {
        if (!/^(0|[1-9][0-9]*)$/.test(value)) {
            callback(new Error('请填写≥0的整数'));
        }else {
            callback();
        }

	}
    //蜂豆文本框触发事件
    function OutboundOpenPackageDuration(value,index){
        OutboundTableModalTimeCycleNum(value,index)
    }

    return (
        <div className='zj_modal_header'>
            <div>
                <Modal {...modalOpts}>
                    <Form>

                        <FormItem
                            label="搜索机构"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('orgName', {
                                initialValue : OutboundOpenPackageModelDetail.orgName || undefined,
                            })(
                                 <Input placeholder='请输入机构名称或ID进行搜索' style={{ width : 300 }}/>
                            )}
                            <span><a style={{position:'absolute',left:'320px',fontSize:'15px'}} onClick={() => OutboundOpenPackageModalSearchOrgName (getFieldValue('orgName'))}>搜索</a></span>
                        </FormItem>
                        <FormItem
                            label="选择机构"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('org', {
                            })(
                                <Transfer
                                    dataSource={OutboundOpenPackageModalAllcontent}
                                    targetKeys={OutboundOpenPackageModalTransferTargetContent}
                                    operations={['加入', '退出']}
                                    onChange={OutboundOpenPackageModalTransferhandleChange}
                                    listStyle={{ width: 246 , height: 200 }}
                                    titles={['全部机构','已选机构']}
                                    render={item => item.title}
                                  />
                            )}
                        </FormItem>
                        <div style={{paddingLeft:'57px',marginBottom:'12px'}}>
                            <span style={{color:'red',paddingRight:'5px'}}>*</span>
                            <span style={{color:'#333',paddingRight:'5px'}}>购买产品:</span>
                            <span style={{fontSize:'15px'}}>坐席：</span>
                        </div>
                        <div className='callCenter_all_gradient'>
                            { OutboundOpenPackageGradientAllData && OutboundOpenPackageGradientAllData.length > 0 ?
                                OutboundOpenPackageGradientAllData.map(function(item,index){
                                 return(
                                    <div className='callCenter_gradient' key={item.item_index}>
                                        <Popconfirm placement = "top" title = '确定要删除此项吗' okText = "是" cancelText = "否" onConfirm = {() => OutboundOpenPackageTableDelete(item.item_index,getFieldValue('searchType' + item.item_index))}>
                                            <Icon type="close" className='callCenter_gradient_close'/>
                                        </Popconfirm>
                                        <FormItem
                                            {...formItemLayout}
                                        >
                                            {getFieldDecorator('searchType'+ item.item_index, {
                                                initialValue : item.packId || undefined,
                                                rules: [
                                                    { required: true, message: '请选择坐席' },
                                                ],
                                            })(
                                                <Select
                                                    placeholder="请选择坐席"
                                                    notFoundContent = "未找到"
                                                    style={{ width : 200 }}
                                                    onChange = {(currentId) => ChooseOrgType(currentId,getFieldValue('searchType' + item.item_index),item.item_index)}
                                                 >
                                                    { OutboundOpenPackageSelectTableChildren || []}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <div className='callCenter_gradient_table'>
                                            <ul>
                                                <li>售卖价格</li>
                                                <li>人数</li>
                                                <li>周期数量</li>
                                                <li>合计价格</li>
                                                <li>实收价格</li>
                                            </ul>
                                            <div className='callCenter_gradient_data'>
                                                <li>{ item.salePrice+'/'+item.saleUnit || 0 }</li>
                                                <li>
                                                    <a onClick = { ()=>OutboundSelectTableNum(item.item_index) }>{ item.pesonNum || 0 }人</a>
                                                </li>
                                                { OutboundOpenPackageModelVisible?
                                                    <Modal
                                                            title= '选择坐席'
                                                            maskClosable = {false}
                                                            visible = {OutboundSelectTableInnerModalVisible}
                                                            closable = {true}
                                                            onCancel = {OutboundSelectTableInnerModalCancel}
                                                            onOk = {()=>OutboundSelectTableInnerModalEnsure()}
                                                            className = 'OutboundSelectTableInnerModal'
                                                            >
                                                                <Table
                                                                    columns={ columns }
                                                                    dataSource={ OutboundSelectTableEmployeeArr }
                                                                    bordered
                                                                    rowKey="id"
                                                                    pagination = { false }
                                                                    rowSelection = { rowSelection }
                                                                    scroll={{ y: 350 }}
                                                                />
                                                        </Modal>

                                                     :null
                                                    }
                                                <li>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('cycleNum'+item.item_index, {
                                                            initialValue : item.cycleNum+'' || undefined,
                                                            rules : [
                                                                { required : true , message : '请填写周期数量'},
                                                                { validator :  validator },
                                                            ]
                                                        })(
                                                            <Input onBlur={ (e)=>OutboundTableInnerModalCycleNumhandel(e.target.value,item.item_index) }/>
                                                        )}
                                                    </FormItem>
                                                </li>
                                                <li>{ item.totalPrice || 0 }元</li>
                                                <li>
                                                    <FormItem>
                                                        {getFieldDecorator('actualPrice'+item.item_index, {
                                                            initialValue :  item.actualPrice+'' || undefined,
                                                            rules : [
                                                                { required : true , message : '请输入金额' , whitespace : true },
                                                                { validator :  checkMoney },
                                                            ]
                                                        })(
                                                            <Input size = 'default'  addonAfter = '元'
                                                                onBlur={ (e)=>OutboundTableModalActualPricehandel(e.target.value,item.item_index) }
                                                                />
                                                        )}
                                                    </FormItem>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                                : null
                            }

                            {OutboundOpenPackageGradientAllData && OutboundOpenPackageGradientAllData.length > 0 ?
                                <Button size = 'small' type = 'primary'
                                    onClick = {() => OutboundOpenPackageTableAdd(OutboundOpenPackageGradientAllData[OutboundOpenPackageGradientAllData.length-1].item_index)}
                                    >新增</Button>
                                :
                                <Button size = 'small' type = 'primary'
                                    onClick = {() => OutboundOpenPackageTableAdd('null')}
                                    >新增</Button>
                            }

                        </div>

                        <div className='callCenter_gradient_title'>蜂豆（通讯币）：</div>
                        <div className='callCenter_all_gradient' style={{marginBottom:'20px'}}>
                            { OutboundOpenPackageGradientTimeData && OutboundOpenPackageGradientTimeData.length > 0 ?
                                OutboundOpenPackageGradientTimeData.map(function(item,index){
                                return(
                                    <div className='callCenter_gradient' key={item.item_index} style={{paddingTop:'40px'}}>
                                        <Popconfirm placement = "top" title = '确定要删除此项吗' okText = "是" cancelText = "否" onConfirm = {() => OutboundOpenPackageTableTimeDelete()}>
                                            <Icon type="close" className='callCenter_gradient_close'/>
                                        </Popconfirm>

                                        <div className='callCenter_time_gradient_table'>
                                            <ul>
                                                <li>蜂豆数</li>
                                                <li>成本价</li>
                                                <li>售卖价格</li>
                                                <li>实收价格</li>
                                            </ul>
                                            <div className='callCenter_time_gradient_data'>
                                                <li>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('time_duration', {
                                                            initialValue :item.duration || undefined,
                                                            rules : [
                                                                { required  : true , message : '请填写数量'},
                                                                { validator :  validator },
                                                            ]
                                                        })(
                                                            <Input size = 'default'
                                                                onBlur={ (e)=>OutboundOpenPackageDuration(e.target.value,'duration')}
                                                                />
                                                        )}
                                                    </FormItem>
                                                </li>
                                                <li>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('time_costPrice', {
                                                            initialValue :item.costPrice || undefined,
                                                            rules : [
                                                                { required  : true , message : '请输入金额'},
                                                                { validator :  checkMoney },
                                                            ]
                                                        })(
                                                            <Input size = 'default' addonAfter = '元'
                                                                onBlur={ (e)=>OutboundOpenPackageDuration(e.target.value , 'costPrice')}
                                                                />
                                                        )}
                                                    </FormItem>
                                                </li>
                                                <li>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator('time_sale_num', {
                                                            initialValue :item.salePrice || undefined,
                                                            rules : [
                                                                { required  : true , message : '请输入金额'},
                                                                { validator :  checkMoney },
                                                            ]
                                                        })(
                                                            <Input size = 'default' addonAfter = '元'
                                                                onBlur={ (e)=>OutboundOpenPackageDuration(e.target.value,'salePrice')}
                                                                />
                                                        )}
                                                    </FormItem>
                                                </li>
                                                <li>
                                                    <FormItem>
                                                        {getFieldDecorator('time_actual_price', {
                                                            initialValue :item.actualPrice +''|| undefined,
                                                            rules : [
                                                                { required : true , message : '请输入金额' , whitespace : true },
                                                                { validator :  checkMoney },
                                                            ]
                                                        })(
                                                            <Input size = 'default'  addonAfter = '元'
                                                                    onBlur={ (e)=>OutboundOpenPackageDuration(e.target.value,'actualPrice') }
                                                                />
                                                        )}
                                                    </FormItem>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                              :
                                <Button size = 'small' type = 'primary' onClick = {() => OutboundOpenPackageTableTimeAdd()}>新增</Button>
                             }

                            <div className = 'callCenter_modal_all_money'>
                                <li>总合计</li>
                                <li>{ totalPrice +'元'|| 0 }</li>
                                <li>总实收</li>
                                <li>{ realPrice +'元' }</li>
                            </div>
                        </div>
                        <div style={{width:'100%',height:'auto',overflow:'hidden'}}>
                            <FormItem
                                    label="合同备注"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('contractRemark', {
                                        initialValue :OutboundOpenPackageModelDetail.contractRemark || undefined,
                                    })(
                                        <Input type="textarea" rows={4} style={{ width : 400 }} placeholder='请填写备注'/>
                                    )}
                            </FormItem>
                        </div>
                    </Form>

                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(OutboundOpenPackageModel);
