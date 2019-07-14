import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

import styles from './UserMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const UserMgrSearch = ({
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
    function handleExport(){
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
            console.log(values);
            searchExport(values);
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
                    {getFieldDecorator('topic_cnt')(
                      <Input placeholder="主题数" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                    {getFieldDecorator('star_limit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">≠</Option>
                      </Select>
                    )}
                   {getFieldDecorator('star_cnt')(
                      <Input placeholder="关注数" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                    {getFieldDecorator('fans_limit')(
                      <Select placeholder="条件" style={{ width: 60 }}>
                        <Option value="0">=</Option>
                        <Option value="1">&lt;</Option>
                        <Option value="2">&lt;=</Option>
                        <Option value="3">&gt;</Option>
                        <Option value="4">&gt;=</Option>
                        <Option value="5">≠</Option>
                      </Select>
                    )}
                   {getFieldDecorator('fans_cnt')(
                      <Input placeholder="粉丝数" style={{ width: 120 }}/>
                    )}
                </div>

                 <div className="search-item">
                   {getFieldDecorator('expert')(
                      <Select placeholder="是否达人" style={{ width: 120 }}>
                        <Option value=''>全部</Option>
                        <Option value="1">达人</Option>
                        <Option value="0">普通</Option>
                      </Select>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('moderator')(
                      <Select placeholder="是否版主" style={{ width: 120 }}>
                        <Option value=''>全部</Option>
                        <Option value="1">版主</Option>
                        <Option value="0">普通</Option>
                      </Select>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('sex')(
                      <Select placeholder="请选择性别" style={{ width: 120 }}>
                        <Option value=''>全部</Option>
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                      </Select>
                    )}
                </div>

                <div className="search-item">
                    <span>注册时间：</span>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
                </div>

            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Popconfirm placement="top" title="确认要导出吗?" onConfirm={handleExport}>
                    <Button type="primary" ><Icon type="arrow-up"/>导出</Button>
                </Popconfirm>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
            </div>
        </div>
    </Form>
  );
};

UserMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport: PropTypes.func,
};

export default Form.create()(UserMgrSearch);
