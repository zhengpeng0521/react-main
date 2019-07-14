import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

import styles from './TopicReward.less';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const CourseRewardSearch = ({
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
               {getFieldDecorator('userId')(
                  <Input placeholder="打赏人ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('nickname')(
                  <Input placeholder="打赏人昵称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('dataId')(
                  <Input placeholder="打赏主题ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('title')(
                  <Input placeholder="打赏主题标题" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('dataType')(
                  <Select placeholder="打赏类型" style={{ width: 120 }}>
                        <Option value="">全部</Option>
                        <Option value="1">购买打赏(主题)</Option>
                        <Option value="2">直接打赏(主题)</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('amount')(
                  <Select placeholder="打赏金额" style={{ width: 120 }}>
                        <Option value="">全部</Option>
                        <Option value="10">10</Option>
                        <Option value="20">20</Option>
                        <Option value="30">30</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                    <span>打赏时间：</span>
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

CourseRewardSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport : PropTypes.func,
};

export default Form.create()(CourseRewardSearch);
