import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

import styles from './GoldMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const GoldMgrSearch = ({
    searchData, searchVisible,searchChannelList,
    searchReset,
    searchSubmit,
    searchExport,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
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
                values.create_timeS = rangeValueC[0].format('YYYY-MM-DD');
                values.create_timeE = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete values.create_time;
            searchSubmit(values);
        });
    }

    function handleExport() {
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            const rangeValueC = fieldsValue['create_time'];
            values = {...fieldsValue};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.create_timeS = rangeValueC[0].format('YYYY-MM-DD');
                values.create_timeE = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete values.create_time;
            searchExport(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }


  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
               {getFieldDecorator('user_id')(
                  <Input placeholder="发送方用户ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('sNickName')(
                  <Input placeholder="发送方用户昵称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('source_id')(
                  <Input placeholder="接收方用户ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('nickname')(
                  <Input placeholder="接收方用户昵称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('trade_type')(
                  <Select placeholder="交易类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="101">打赏(主题)</Option>
                    <Option value="102">购买(主题)</Option>
                    <Option value="103">金币商城消费</Option>
                    <Option value="104">用户签到</Option>
                    <Option value="105">用户注册</Option>
                    <Option value="106">完善资料</Option>
                    <Option value="107">邀请好友成功</Option>
                    <Option value="999">系统</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('amount_limit')(
                    <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">≠</Option>
                    </Select>
                )}
                {getFieldDecorator('amount')(
                  <Input placeholder="发生额" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                    <span>发生时间：</span>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
            </div>

            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Popconfirm placement="top" title="确认要导出吗?" onConfirm={handleExport}>
                    <Button type="primary" ><Icon type="export" />导出</Button>
                </Popconfirm>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
            </div>
        </div>
    </Form>
  );
};

GoldMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport : PropTypes.func,
};

export default Form.create()(GoldMgrSearch);
