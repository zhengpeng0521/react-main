import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

import styles from './TopicReport.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const TopicReportSearch = ({
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
            values = {...fieldsValue};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.create_timeS = rangeValueC[0].format('YYYY-MM-DD');
                values.create_timeE = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete values.create_time;
            searchSubmit(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }

    let loopChannel = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id}>{item.title}</Option>;
    });

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
               {getFieldDecorator('userId')(
                  <Input placeholder="举报人ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('nickname')(
                  <Input placeholder="举报人昵称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('dataId')(
                  <Input placeholder="举报对象ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('dataType')(
                  <Select placeholder="举报对象类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">主题</Option>
                    <Option value="2">评论</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('intro')(
                  <Input placeholder="举报理由" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                    <span>举报时间：</span>
                   {getFieldDecorator('create_time')(
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

TopicReportSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(TopicReportSearch);
