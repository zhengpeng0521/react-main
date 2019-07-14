import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const OpenUpSearch = ({
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
            const rangeValueC = getFieldValue('create_time');
            let  values = {...getFieldsValue()};
            if(rangeValueC != undefined && rangeValueC.length > 0){
                values.createStartTime = rangeValueC[0].format('YYYY-MM-DD ');
                values.createEndTime = rangeValueC[1].format('YYYY-MM-DD ');
            }
            delete values.create_time;

            const rangeValueE = getFieldValue('expire_time');
            if(rangeValueE != undefined && rangeValueE.length > 0){
                values.expireStartTime = rangeValueE[0].format('YYYY-MM-DD ');
                values.expireEndTime = rangeValueE[1].format('YYYY-MM-DD ');
            }
            delete values.expire_time;

            if('search' == type){
                searchSubmit(values);
            }else if('reset' == type){
                resetFields();
                searchSubmit({tenantId: '', expireStatus: '', createStartTime: '', createEndTime: '',expireStartTime:'',expireEndTime:''});
            }
        });
    }
     let pickerChangeFun = (value) => {
    	if(value == [] || value.length<=0)
    	{
    		searchSubmit({createStartTime: '', createEndTime: ''});
    	}
    }
     let expireChangeFun = (value) => {
    	if(value == [] || value.length<=0)
    	{
    		searchSubmit({expireStartTime: '', expireEndTime: ''});
    	}
    }

    return (
        <Form horizontal className="common-search-form" >
            <div className="search-content">

                <div className="search-item">
                    {getFieldDecorator('tenantId')(
                        <Input placeholder="租户号" style={{ width: 100 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('expireStatus')(
                       <Select placeholder="状态" style={{ width : 100 }}>
                            <Option value='1'>有效</Option>
                            <Option value='0'>过期</Option>
                        </Select>
                    )}
                </div>

                <div className="search-item">
                    <span>创建时间：</span>
                   {getFieldDecorator('create_time')(
                      <RangePicker onChange = { pickerChangeFun } />
                    )}
                </div>
                 <div className="search-item">
                    <span>有效期：</span>
                   {getFieldDecorator('expire_time')(
                      <RangePicker onChange = { expireChangeFun }/>
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

export default Form.create()(OpenUpSearch);
