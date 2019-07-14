import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Icon, message, Select, Radio ,Popconfirm ,Table} from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './OutboundPackageManage.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const OutboundOpenPackageCheckModel = ({
    OutboundOpenPackageCheckModelVisible,                //模态框显示状态
    OutboundOpenPackageCheckModelCancel ,                //关闭
    OutboundOpenPackageCheckModelSave,                   //保存
    OutboundOpenPackageModelDetail,
    OutboundOpenPackageGradientAllData,                  //坐席总数据
    OutboundOpenPackageGradientTimeData,                 //时长包梯度总数据
    totalPrice,
    realPrice,

    OutboundOpenPackageModelType,

    //人员查看内部弹窗
    OutboundCheckInnerModalVisible,
    OutboundCheckInnerModalCancel,   //关闭
    OutboundCheckInnerEmployeeArr,   //坐席人员数据
    OutboundCheckPersonInnerView,    //打开

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
            totalPrice = Number(totalPrice) + Number(OutboundOpenPackageGradientAllData[i].totalPrice);
            realPrice = Number(realPrice) + Number(OutboundOpenPackageGradientAllData[i].actualPrice);
        }
    }

    if(OutboundOpenPackageGradientTimeData && OutboundOpenPackageGradientTimeData.length>0){
            totalPrice = Number(totalPrice) + Number(OutboundOpenPackageGradientTimeData[0].salePrice);
            realPrice = Number(realPrice) + Number(OutboundOpenPackageGradientTimeData[0].actualPrice);
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
            value.openInfoId = OutboundOpenPackageModelDetail && OutboundOpenPackageModelDetail.id

            OutboundOpenPackageCheckModelSave(value);
            resetFields();
        });
    }
    //关闭事件
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        OutboundOpenPackageCheckModelCancel();
    }

    //模态框的属性
    let modalOpts = null;
    if(OutboundOpenPackageModelType =='view'){
        modalOpts = {
            title: '查看',
            maskClosable : false,
            visible : OutboundOpenPackageCheckModelVisible,
            closable : true,
            width : 800,
            onOk: handleComplete,
            onCancel : handleCancel,
            footer : null,
          };
    }else{
        modalOpts = {
            title: '审核',
            maskClosable : false,
            visible : OutboundOpenPackageCheckModelVisible,
            closable : true,
            width : 900,
            onOk: handleComplete,
            onCancel : handleCancel,
            footer : [
                <Button key="submit" type="primary" size="large"
                        onClick={handleComplete}
                       >审核通过</Button>
            ],
          };
    }

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

    return (
        <div className='zj_modal_header'>
            <div>
                <Modal {...modalOpts}>
                    <Form>

                        <FormItem
                            label="机构名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('orgName', {

                            })(
                                 <span className="ant-form-text">{ OutboundOpenPackageModelDetail && OutboundOpenPackageModelDetail.orgName}</span>
                            )}
                        </FormItem>

                        <div style={{paddingLeft:'57px',marginBottom:'12px'}}>
                            <span style={{color:'red',paddingRight:'5px'}}>*</span>
                            <span style={{color:'#333',paddingRight:'5px'}}>购买产品:</span>
                        </div>

                        <div className='callCenter_all_gradient'>
                            { OutboundOpenPackageGradientAllData && OutboundOpenPackageGradientAllData.length > 0 ?
                                OutboundOpenPackageGradientAllData.map(function(item,index){
                                    return (
                                        <div key = {item.item_index}>
                                            <div className='callCenter_gradient_title' style={{width:'100%'}}>坐席：{item.packageName}</div>
                                            <div className='callCenter_gradient_table'>
                                                <ul>
                                                    <li>售卖价格</li>
                                                    <li>人数</li>
                                                    <li>周期数量</li>
                                                    <li>合计价格</li>
                                                    <li>实收价格</li>
                                                </ul>
                                                <ul style={{background:'#fff'}}>
                                                    <li>{item.salePrice+'/'+item.saleUnit}</li>
                                                    <li><a onClick = {()=>OutboundCheckPersonInnerView(item.goodsId)}>{item.pesonNum +'人'}</a></li>
                                                    { OutboundOpenPackageCheckModelVisible?
                                                        <Modal
                                                            title= '选择坐席'
                                                            maskClosable = {false}
                                                            visible = {OutboundCheckInnerModalVisible}
                                                            closable = {true}
                                                            onCancel = {OutboundCheckInnerModalCancel}
                                                            className = 'OutboundSelectTableInnerModal'
                                                            >
                                                                <Table
                                                                    columns={ columns }
                                                                    dataSource={ OutboundCheckInnerEmployeeArr }
                                                                    bordered
                                                                    rowKey="id"
                                                                    pagination = { false }
                                                                    scroll={{ y: 350 }}
                                                                />
                                                        </Modal>

                                                      :null
                                                    }
                                                    <li>{item.cycleNum}</li>
                                                    <li>{item.totalPrice +'元'}</li>
                                                    <li>{item.actualPrice +'元'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )


                                })
                              :null
                             }


                        </div>


                        <div className='callCenter_all_gradient' style={{marginBottom:'20px'}}>
                            { OutboundOpenPackageGradientTimeData && OutboundOpenPackageGradientTimeData.length > 0 ?
                                OutboundOpenPackageGradientTimeData.map(function(item,index){
                                    return(
                                        <div key = {item.item_index}>
                                            <div className='callCenter_gradient_title' style={{width:'100%'}}>蜂豆（通讯币）：</div>
                                            <div className='callCenter_time_gradient_table'>
                                                <ul>
                                                    <li>蜂豆数</li>
                                                    <li>成本价</li>
                                                    <li>售卖价格</li>
                                                    <li>实收价格</li>
                                                </ul>
                                                <ul style={{background:'#fff'}}>
                                                    <li>{item.duration}</li>
                                                    <li>{item.costPrice + '元'}</li>
                                                    <li>{item.salePrice +'元'}</li>
                                                    <li>{item.actualPrice  +'元'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                             :null
                            }

                            <div className = 'callCenter_modal_all_money'>
                                <li>总合计</li>
                                <li>{ totalPrice +'元' }</li>
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

                                })(
                                     <span className="ant-form-text">{ OutboundOpenPackageModelDetail && OutboundOpenPackageModelDetail.contractRemark}</span>
                                )}
                            </FormItem>
                            {
                                OutboundOpenPackageModelType =='view' ?
                                    <FormItem
                                        label="审核备注"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('contractRemark', {

                                        })(
                                             <span className="ant-form-text">{ OutboundOpenPackageModelDetail && OutboundOpenPackageModelDetail.auditRemark}</span>
                                        )}
                                    </FormItem>
                                :
                                    <FormItem
                                        label="审核备注"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('auditRemark', {
                                            rules: [
                                                    { required: true, message: '请选择审核备注' },
                                                ],
                                        })(
                                            <Input type="textarea" rows={4} style={{ width : 400 }} placeholder='请填写备注'/>
                                        )}
                                </FormItem>
                            }

                        </div>
                    </Form>

                </Modal>
            </div>
        </div>
    );
};

export default Form.create()(OutboundOpenPackageCheckModel);
