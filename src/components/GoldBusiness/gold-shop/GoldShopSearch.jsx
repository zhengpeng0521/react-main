import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm, AutoComplete  } from 'antd';

import styles from './GoldShop.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const GoldShopSearch = ({
    searchData, searchVisible,searchChannelList,DataNickName,DataUid,autoData,
    searchReset,
    searchSubmit,
    searchExport,
    changeInput,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
    },
  }) => {
     function handleSearchSubmit(e) {
        e.preventDefault();
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            const rangeValueC = fieldsValue['create_time'];
            values = {...fieldsValue};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.beginTime = rangeValueC[0].format('YYYY-MM-DD');
                values.endTime = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete values.create_time;

            //处理昵称
            if(values.nickname!=''&&values.nickname!=null&&values.nickname!=undefined){
                let index = getFieldValue('nickname').indexOf('￥$￥$￥$￥$￥$￥$￥$￥$￥');
                values.uid = getFieldValue('nickname').substr(index+17);
            }
            delete values.nickname;
            console.log(values);
            searchSubmit(values);
        });
    }
    function handleExport(){
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            const rangeValueC = fieldsValue['create_time'];
            values = {...fieldsValue};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.beginTime = rangeValueC[0].format('YYYY-MM-DD');
                values.endTime = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete values.create_time;

            //处理昵称
            if(values.nickname!=''&&values.nickname!=null&&values.nickname!=undefined){
                let index = getFieldValue('nickname').indexOf('￥$￥$￥$￥$￥$￥$￥$￥$￥');
                values.uid = getFieldValue('nickname').substr(index+17);
            }
            delete values.nickname;

            searchExport(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }

    function handleChange(value) {
        console.log('handleChange ', value);
        let index = value.indexOf('￥$￥$￥$￥$￥$￥$￥$￥$￥');
        if(index==-1){
            changeInput(value.substring(0,value.length));
        }else{
            changeInput(value.substring(0,index));
        }
    }
    let children = [];
    if(autoData && autoData.length > 0){
        children = autoData.map((item) => {
            return <Option key={item.nickname+`￥$￥$￥$￥$￥$￥$￥$￥$￥${item.id}`}>{item.nickname}</Option>;
        });
    }
  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

                <div className="search-item">
                   {getFieldDecorator('uid')(
                      <Input placeholder="用户ID" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                    {getFieldDecorator('nickname')(
                    <Select combobox
                        style={{ width: 120 }}
                        filterOption={false}
                        onChange={handleChange}
                        placeholder="请输入昵称"
                    >
                        {children||[]}
                    </Select>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('contacterName')(
                      <Input placeholder="收货人" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('address')(
                      <Input placeholder="地址" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('status')(
                        <Select placeholder="订单状态" style={{ width: 120 }}>
                            <Option value="">全部</Option>
                            <Option value="0">失效</Option>
                            <Option value="1">待付款</Option>
                            <Option value="2">待确认</Option>
                            <Option value="3">已发货</Option>
                            <Option value="4">已确认</Option>
                            <Option value="5">待评价/已解冻</Option>
                            <Option value="6">待退款</Option>
                            <Option value="7">已退款</Option>
                        </Select>
                    )}
                </div>

                <div className="search-item">
                    <span>创建时间：</span>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
                </div>

            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Popconfirm placement="top" title="确认要导出吗?" onConfirm={handleExport}>
                    <Button type="primary" ><Icon type="export"/>导出</Button>
                </Popconfirm>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
            </div>
        </div>
    </Form>
  );
};

GoldShopSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport : PropTypes.func,
    changeInput : PropTypes.func,
};

export default Form.create()(GoldShopSearch);
