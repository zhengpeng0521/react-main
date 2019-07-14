import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const Search = ({
    SearchSubmit,                   //搜索栏点击查询或清除条件
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
        validateFields((errors,values) => {
            if (!!errors) {
                return;
            }
            SearchSubmit(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SearchSubmit({});
    }

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('orgName')(
                  <Input placeholder="总部名称" style={{ width: 150 }}/>
                )}
            </div>
            <div className="search-item">
                {getFieldDecorator('tenantId')(
                  <Input placeholder="租户号" style={{ width: 150 }}/>
                )}
            </div>
            <div className="search-item">
                {getFieldDecorator('tenantName')(
                  <Input placeholder="租户名称" style={{ width: 150 }}/>
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

export default Form.create()(Search);
