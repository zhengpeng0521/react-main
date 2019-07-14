import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';
import style from './RegistrationForm.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const RegistrationFormSearch = ({
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
                   {getFieldDecorator('channelName')(
                      <Input placeholder="渠道名称" style={{ width: 120 }}/>
                    )}
                </div>

                <div className = 'search-item'>
                    {getFieldDecorator('gameTime', {
                        rules: [{ type: 'array', message: '请选择游戏时间!' }],
                    })(
                        <RangePicker showTime format="YYYY-MM-DD HH:mm" style={{width: 300}}/>
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

export default Form.create()(RegistrationFormSearch);
