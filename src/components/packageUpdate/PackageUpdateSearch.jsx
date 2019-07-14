import React, { PropTypes } from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Select,
  DatePicker,
  Popconfirm
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const OrganMessageSearch = ({
  searchReset,
  searchSubmit,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
    getFieldValue
  }
}) => {
  function handleSearchSubmit(e) {
    e.preventDefault();
    let values = {};
    validateFields((errors, fieldsValue) => {
      if (!!errors) {
        return;
      }
      const rangeValueC = getFieldValue("create_time");
      const rangeValueC2 = getFieldValue("create_time2");

      let values = { ...getFieldsValue() };
      if (rangeValueC != undefined && rangeValueC.length > 0) {
        values.startTime = rangeValueC[0].format("YYYY-MM-DD ");
        values.endTime = rangeValueC[1].format("YYYY-MM-DD ");
      }
      if (rangeValueC2 != undefined && rangeValueC2.length > 0) {
        values.exStartTime = rangeValueC2[0].format("YYYY-MM-DD ");
        values.exEndTime = rangeValueC2[1].format("YYYY-MM-DD ");
      }

      delete values.create_time;
      delete values.create_time2;
      //            window.exStartTime = values.exStartTime;
      //            window.exEndTime = values.exEndTime;
      console.info(values);
      searchSubmit(values);
    });
  }
  function handleSearchClear(e) {
    e.preventDefault();
    resetFields();
    searchReset();
  }

  return (
    <Form horizontal className="common-search-form">
      <div className="search-content">
        <div className="search-item">
          {getFieldDecorator("id")(
            <Input placeholder="机构ID" style={{ width: 140 }} />
          )}
        </div>

        <div className="search-item">
          {getFieldDecorator("orgName")(
            <Input placeholder="机构名称" style={{ width: 140 }} />
          )}
        </div>

        <div className="search-item">
          {getFieldDecorator("tel")(
            <Input placeholder="联系电话" style={{ width: 140 }} />
          )}
        </div>

        <div className="search-item">
          {getFieldDecorator("addr")(
            <Input placeholder="详细地址" style={{ width: 140 }} />
          )}
        </div>

        <div className="search-item">
          {getFieldDecorator("status", {})(
            <Select placeholder="机构状态" style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="0">无效</Option>
              <Option value="1">有效</Option>
              <Option value="2">停用</Option>
              <Option value="3">冻结</Option>
            </Select>
          )}
        </div>

        <div className="search-item">
          {getFieldDecorator("create_time")(<RangePicker />)}
        </div>

        <div className="search-item">
          {getFieldDecorator("create_time2")(
            <RangePicker placeholder={["到期时间", "到期时间"]} />
          )}
        </div>

        <div className="search-item">
          <Button type="primary" onClick={handleSearchSubmit}>
            <Icon type="search" />
            搜索
          </Button>
          <Button onClick={handleSearchClear}>
            <Icon type="delete" />
            清除
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Form.create()(OrganMessageSearch);
