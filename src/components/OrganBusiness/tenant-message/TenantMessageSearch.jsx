import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

import styles from './TenantMessage.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const TenantMessageSearch = ({
    searchSubmit,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
  }) => {

    function handleSearchSubmit(type) {
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            values = getFieldsValue();
            if('search' == type){
                searchSubmit(values);
            }else if('reset' == type){
                resetFields();
                searchSubmit();
            }
        });
    }

    return (
        <Form horizontal className="common-search-form" >
            <div className="search-content">
                <div className="search-item">
                   {getFieldDecorator('id')(
                      <Input placeholder="租户ID" style={{ width: 150 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('name')(
                      <Input placeholder="租户名称" style={{ width: 150 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('tel')(
                      <Input placeholder="租户手机号" style={{ width: 150 }}/>
                    )}
                </div>

                <div className="search-item">
                    <Button type="primary" onClick={() => handleSearchSubmit('search')}><Icon type="search" />搜索</Button>
                    <Button onClick={() => handleSearchSubmit('reset')}><Icon type="delete" />清除</Button>
                </div>
            </div>
        </Form>
    );
};

export default Form.create()(TenantMessageSearch);
