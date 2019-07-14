import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const TenantSearch = ({
    searchSubmit,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
    },
  }) => {

    function handleSearchSubmit(type) {
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
//          const rangeValueC = getFieldValue('create_time');
            let  values = {...getFieldsValue()};
//          if(rangeValueC != undefined && rangeValueC.length > 0){
//              values.startCreateTime = rangeValueC[0].format('YYYY-MM-DD ');
//              values.endCreateTime = rangeValueC[1].format('YYYY-MM-DD ');
//          }
//          delete values.create_time;
            if('search' == type){
                searchSubmit(values);
            }else if('reset' == type){
                resetFields();
                searchSubmit({name: '', tenantId: '', tel: '', status: ''});
            }
        });
    }

    return (
        <Form horizontal className="common-search-form" >
            <div className="search-content">

                <div className="search-item">
                    {getFieldDecorator('name')(
                        <Input placeholder="租户名称" style={{ width: 150 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('status')(
                       <Select placeholder="状态" style={{ width : 150 }}>
                            <Option value='1'>有效</Option>
                            <Option value='0'>被删除</Option>
                        </Select>
                    )}
                </div>
				<div className="search-item">
                    {getFieldDecorator('tenantId')(
                        <Input placeholder="租户号" style={{ width: 150 }}/>
                    )}
                </div>
                <div className="search-item">
                    {getFieldDecorator('tel')(
                        <Input placeholder="手机号" style={{ width: 150 }}/>
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

export default Form.create()(TenantSearch);
