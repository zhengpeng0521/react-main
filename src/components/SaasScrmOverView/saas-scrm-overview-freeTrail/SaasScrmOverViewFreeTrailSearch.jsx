import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

import styles from './SaasScrmOverViewFreeTrail.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SaasScrmOverViewFreeTrailSearch = ({
    SaasScrmOverViewFreeTrailSearchSubmit,      //搜索栏点击查询
    SaasScrmOverViewFreeTrailSearchReset,       //搜索栏点击清除条件
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
            let data = getFieldsValue();
            SaasScrmOverViewFreeTrailSearchSubmit(data);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SaasScrmOverViewFreeTrailSearchReset();
    }

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('orgName')(
                  <Input placeholder="机构名" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('name')(
                  <Input placeholder="姓名" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('userId')(
                  <Input placeholder="用户ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('mobile')(
                  <Input placeholder="手机号" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('status')(
                    <Select placeholder="状态" style={{ width: 150 }}>
                        <Option value="">全部</Option>
                        <Option value="2">未处理</Option>
                        <Option value="1">已处理</Option>
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

export default Form.create()(SaasScrmOverViewFreeTrailSearch);
