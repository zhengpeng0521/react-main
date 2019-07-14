import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, Popconfirm, DatePicker, message } from 'antd';

import styles from './WeiXinActivity.less';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

function WeiXinActicitySearch ({
    WeiXinActivitySelectValue,
    WeiXinActicityTimeOnSelectSubmit,
    WeiXinActivityGameChangeSelect,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) {

    let children = [];
    if(WeiXinActivitySelectValue && WeiXinActivitySelectValue.length>0){
        children = WeiXinActivitySelectValue.map((item) => {
            return(
                <Option value={item.id+''} key={item.id}>{item.title}</Option>
            );
        })
    }

    //选择时间范围
    function TimeOnSelect(dates, dateStrings){
        let time = {};
        time.startTime = dateStrings[0];
        time.endTime = dateStrings[1];
        WeiXinActicityTimeOnSelectSubmit(time);
    }

    //日期选择器不可选内容(包括当天及之后)
    function disabledDate(current) {
        return current && current.valueOf() > Date.now()-24*60*60*1000;  //今天之前
    }

    return (
        <div style={{height:'50px',width:'100%',position:'absolute',top:'513px',left:'20px'}}>
            <Form horizontal >
                <div style={{float:'left',margin:'20px'}}>
                    {getFieldDecorator('game', {
                        initialValue: WeiXinActivitySelectValue&&WeiXinActivitySelectValue.length>0?WeiXinActivitySelectValue[0].title+'':'',
                    })(
                    <Select placeholder="请选择游戏" style={{ width: 150 }} onChange={WeiXinActivityGameChangeSelect}>
                        {children || []}
                    </Select>
                )}
                </div>

                <div style={{float:'left',margin:'20px 20px 20px 0'}}>
                    {getFieldDecorator('create_time')(
                        <RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" onChange={TimeOnSelect}/>
                    )}
                </div>
            </Form>
        </div>
    );
};


export default Form.create()(WeiXinActicitySearch);
