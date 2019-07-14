import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './TopicActivity.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const TopicActivitySearch = ({
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
            values = {...fieldsValue};
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
                {getFieldDecorator('title')(
                  <Input placeholder="活动标题" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('status')(
                      <Select placeholder="状态" style={{ width: 120 }}>
                        <Option value="2">全部</Option>
                        <Option value="1">上架</Option>
                        <Option value="0">下架</Option>
                      </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('content')(
                  <Input placeholder="内容" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('limitChannel')(
                  <Select placeholder="请选择频道" style={{ width: 120 }}>
                    <Option value="-1">全部</Option>
                    <Option value="0">不限频道</Option>
                    {loopChannel(searchChannelList || [])}
                  </Select>
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

TopicActivitySearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(TopicActivitySearch);
