import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './Robot.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const RobotSearch = ({
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
        console.info("submit");
        e.preventDefault();
        console.info(getFieldsValue());

        validateFields((errors) => {
          if (!!errors) {
            return;
          }
          searchSubmit(getFieldsValue());
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
               {getFieldDecorator('channelId')(
                  <Select placeholder="请选择频道" style={{ width: 120 }}>
                    {loopChannel(searchChannelList || [])}
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('type')(
                  <Select placeholder="业务类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="0">用户</Option>
                    <Option value="1">帖子</Option>
                    <Option value="2">频道</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('ruleType')(
                  <Select placeholder="规则类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="0">粉丝数</Option>
                    <Option value="1">浏览数</Option>
                    <Option value="2">点赞数</Option>
                    <Option value="3">订阅数</Option>
                    <Option value="4">内容数</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('status')(
                  <Select placeholder="状态" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="0">未执行</Option>
                    <Option value="1">执行中</Option>
                    <Option value="2">已完成</Option>
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

RobotSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(RobotSearch);
