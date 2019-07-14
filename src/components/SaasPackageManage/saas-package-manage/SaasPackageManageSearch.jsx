import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

import styles from './SaasPackageManage.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SaasPackageManageSearch = ({
    SaasPackageManageSearchSubmit,      //搜索栏点击查询
    SaasPackageManageSearchReset,       //搜索栏点击清除条件
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
            SaasPackageManageSearchSubmit(data);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SaasPackageManageSearchReset();
    }

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('id')(
                  <Input placeholder="套餐ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('name')(
                  <Input placeholder="套餐名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('unitType')(
                    <Select placeholder="单位" style={{ width: 150 }}>
                        <Option value="">全部</Option>
                        <Option value="1">按季</Option>
                        <Option value="2">按月</Option>
                        <Option value="3">按年</Option>
                    </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('free')(
                    <Select placeholder="类型" style={{ width: 150 }}>
                        <Option value="">全部</Option>
                        <Option value="0">收费</Option>
                        <Option value="1">免费</Option>
                    </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('status')(
                    <Select placeholder="状态" style={{ width: 150 }}>
                        <Option value="">全部</Option>
                        <Option value="1">上架</Option>
                        <Option value="0">下架</Option>
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

export default Form.create()(SaasPackageManageSearch);
