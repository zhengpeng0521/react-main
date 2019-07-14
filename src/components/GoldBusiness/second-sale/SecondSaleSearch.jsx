import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './SecondSale.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SecondSaleSearch = ({
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
                    {getFieldDecorator('topicLimit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">&lt;&gt;</Option>
                      </Select>
                    )}
                    {getFieldDecorator('titleCnt')(
                      <Input placeholder="主题数" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                    {getFieldDecorator('focusLimit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">&lt;&gt;</Option>
                      </Select>
                    )}
                   {getFieldDecorator('focusCnt')(
                      <Input placeholder="关注数" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                    {getFieldDecorator('fansLimit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">&lt;&gt;</Option>
                      </Select>
                    )}
                   {getFieldDecorator('fansCnt')(
                      <Input placeholder="粉丝数" style={{ width: 120 }}/>
                    )}
                </div>

                 <div className="search-item">
                   {getFieldDecorator('daRen')(
                      <Select placeholder="达人类型" style={{ width: 120 }}>
                        <Option value="">全部</Option>
                        <Option value="0">普通</Option>
                        <Option value="1">达人</Option>
                      </Select>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('sex')(
                      <Select placeholder="请选择性别" style={{ width: 120 }}>
                        <Option value="">全部</Option>
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                      </Select>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('up')(
                      <Select placeholder="请选择是否置顶" style={{ width: 120 }}>
                        <Option value="">全部</Option>
                        <Option value="0">未置顶</Option>
                        <Option value="1">置顶</Option>
                      </Select>
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

SecondSaleSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(SecondSaleSearch);
