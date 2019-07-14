import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './WeiXinGame.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const WeiXinGameSearch = ({
    weiXinGameSearchReset,
    weiXinGameSearchSubmit,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
  }) => {

    function handleSearchSubmit(e) {
        e.preventDefault();
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            values = {...fieldsValue};
            weiXinGameSearchSubmit(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        weiXinGameSearchReset();
    }

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('id')(
                  <Input placeholder="游戏ID" style={{ width: 150 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('gameTitle')(
                  <Input placeholder="标题" style={{ width: 150 }}/>
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

export default Form.create()(WeiXinGameSearch);
