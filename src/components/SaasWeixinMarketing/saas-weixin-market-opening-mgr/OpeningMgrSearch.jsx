import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './OpeningMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const OpeningMgrSearch = ({
    searchSubmit,
    searchReset,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    function handleSearchSubmit(e) {
        e.preventDefault();
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            const rangeValueC = getFieldValue('create_time');
            let data = {...getFieldsValue()};
            if(rangeValueC != undefined && rangeValueC.length > 0){
                data.startTime = rangeValueC[0].format('YYYY-MM-DD HH:mm:ss');
                data.endTime = rangeValueC[1].format('YYYY-MM-DD HH:mm:ss');
            }
            delete data.create_time;
            searchSubmit(data);
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
                {getFieldDecorator('title')(
                  <Input placeholder="套餐名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('organId')(
                  <Input placeholder="机构ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('organName')(
                  <Input placeholder="机构名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                    <span>创建时间：</span>
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

export default Form.create()(OpeningMgrSearch);
