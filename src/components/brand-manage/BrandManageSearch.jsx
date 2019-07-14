import React from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const BrandManageSearch = ({
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
                {getFieldDecorator('brandName')(
                  <Input placeholder="品牌名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('name')(
                  <Input placeholder="总部名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('tenantId')(
                  <Input placeholder="租户ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('auditStatus')(
                    <Select placeholder="状态" style={{ width: 150 }}>
                        <Option value="1">待审核</Option>
                        <Option value="2">待开通</Option>
                        <Option value="3">已开通</Option>
                        <Option value="4">审核不通过</Option>
                        <Option value="5">已关闭</Option>
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

export default Form.create()(BrandManageSearch);
