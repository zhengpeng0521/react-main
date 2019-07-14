import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './ChannelMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const ChannelMgrSearch = ({
    searchData, searchVisible,searchChannelList,
    searchReset,
    searchSubmit,
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
            const rangeValueM = fieldsValue['modify_time'];
            values = {...fieldsValue};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.create_timeS = rangeValueC[0].format('YYYY-MM-DD');
                values.create_timeE = rangeValueC[1].format('YYYY-MM-DD');
            }
            if(rangeValueM!=undefined&&rangeValueM.length>0){
                values.modify_timeS = rangeValueM[0].format('YYYY-MM-DD');
                values.modify_timeE = rangeValueM[1].format('YYYY-MM-DD');
            }
            delete values.create_time;
            delete values.modify_time;
            searchSubmit(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }

    let loopChannel = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id} style={{color:item.status=='1'?'black':'red'}}>{item.title}</Option>;
    });


  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
               {getFieldDecorator('id')(
                  <Input placeholder="频道ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('title')(
                  <Input placeholder="频道名称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('subscription_limit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">≠</Option>
                      </Select>
                    )}
                {getFieldDecorator('subscription')(
                  <Input placeholder="订阅数" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('topic_limit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">≠</Option>
                      </Select>
                    )}
                {getFieldDecorator('topic_count')(
                  <Input placeholder="主题数" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('article_limit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">≠</Option>
                      </Select>
                    )}
                {getFieldDecorator('article_count')(
                  <Input placeholder="贴子数" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                    <span>创建时间：</span>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
            </div>

            <div className="search-item">
                    <span>修改时间：</span>
                   {getFieldDecorator('modify_time')(
                      <RangePicker/>
                    )}
            </div>
            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
            </div>
        </div>
    </Form>
  );
};

ChannelMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(ChannelMgrSearch);
