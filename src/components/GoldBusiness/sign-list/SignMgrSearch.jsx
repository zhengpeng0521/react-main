import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './SignMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SignMgrSearch = ({
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
            console.log("组件点击查询");
            searchSubmit(values);
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
                  <Input placeholder="用户ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('nickname')(
                  <Input placeholder="昵称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                <span>签到具体时间：</span>
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

SignMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(SignMgrSearch);
