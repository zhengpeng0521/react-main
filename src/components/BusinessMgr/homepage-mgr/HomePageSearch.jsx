import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './HomePage.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const HomePageSearch = ({
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
                   {getFieldDecorator('id')(
                      <Input placeholder="ID" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('nickname')(
                      <Input placeholder="昵称" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('mobile')(
                      <Input placeholder="手机号" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                    <span>注册时间：</span>
                   {getFieldDecorator('zhuCeTime')(
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

HomePageSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(HomePageSearch);
