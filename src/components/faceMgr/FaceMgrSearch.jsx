import React from 'react';
import moment from 'moment'
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const FaceMgrSearch = ({
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
            values.StartCreateTime = values.createTime && values.createTime[0].format('YYYY-MM-DD')
            values.EndCreateTime = values.createTime && values.createTime[1].format('YYYY-MM-DD')
            values.mealstartTime1 = values.mealstartTime && values.mealstartTime[0].format('YYYY-MM-DD')
            values.mealstartTime2 = values.mealstartTime && values.mealstartTime[1].format('YYYY-MM-DD')
            values.mealendTime1 = values.mealendTime && values.mealendTime[0].format('YYYY-MM-DD')
            values.mealendTime2 = values.mealendTime && values.mealendTime[1].format('YYYY-MM-DD')

            delete values.createTime
            delete values.mealstartTime
            delete values.mealendTime
            SearchSubmit(values)
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SearchSubmit({});
    }

  return (
    <Form layout="horizontal" className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('orgId')(
                  <Input placeholder="机构ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('orgName')(
                  <Input placeholder="机构名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('status')(
                  <Select placeholder="状态" style={{ width: 150 }}>
                    <Option value="1">已开通</Option>
                    <Option value="0">已过期</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('createTime')(
                    <RangePicker placeholder={["创建时间", "创建时间"]} />
                )}
            </div>
            <div className="search-item">
                {getFieldDecorator('mealstartTime')(
                    <RangePicker placeholder={["套餐开始时间", "套餐开始时间"]} />
                )}
            </div>
            <div className="search-item">
                {getFieldDecorator('mealendTime')(
                    <RangePicker placeholder={["套餐结束时间", "套餐结束时间"]} />
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

export default Form.create()(FaceMgrSearch);
