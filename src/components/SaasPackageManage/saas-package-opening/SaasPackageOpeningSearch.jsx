import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';

import styles from './SaasPackageOpening.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SaasPackageOpeningSearch = ({
    SaasPackageOpeningSearchSubmit,      //搜索栏点击查询
    SaasPackageOpeningSearchReset,       //搜索栏点击清除条件
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
            let startDate,endDate;
            if(data.rangePicker){
                startDate =(data.rangePicker)[0].format('YYYY-MM-DD');
                endDate =(data.rangePicker)[1].format('YYYY-MM-DD');
            }else{
                startDate = undefined;
                endDate = undefined;
            }

            delete data.rangePicker;
            data.startDate = startDate;
            data.endDate = endDate;
            SaasPackageOpeningSearchSubmit(data);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SaasPackageOpeningSearchReset();
    }

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('tenantId')(
                  <Input placeholder="租户ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('orgId')(
                  <Input placeholder="机构/校区ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('orgName')(
                  <Input placeholder="机构/校区名称" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('resPgName')(
                  <Input placeholder="套餐名称" style={{ width: 150 }}/>
                )}
            </div>
            <div className="search-item">
                {getFieldDecorator('rangePicker')(
                  <RangePicker
                      format="YYYY-MM-DD"
                      placeholder={['套餐到期开始时间', '套餐到期结束时间']}
                    />
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

export default Form.create()(SaasPackageOpeningSearch);
