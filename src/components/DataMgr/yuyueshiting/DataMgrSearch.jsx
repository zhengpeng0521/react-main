import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, Popconfirm, DatePicker, message } from 'antd';

import styles from './DataMgr.less';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const DataMgrSearch = ({
    searchData, searchVisible,searchChannelList,
    searchReset,
    searchSubmit,
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
            let nowDate = FormatDate(new Date());
            const rangeValueC = fieldsValue['create_time'];
            values = {...fieldsValue};
            if(rangeValueC==''||rangeValueC==null||rangeValueC==undefined){
                message.error('请选择时间段后再进行查询');
                return;
            }
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.startTime = rangeValueC[0].format('YYYY-MM-DD');
                values.endTime = rangeValueC[1].format('YYYY-MM-DD');
            }
            if(values.endTime>=nowDate){
                message.error('结束日期必须小于等于当前日期');
                return;
            }
            delete values.create_time;
            searchSubmit(values);
        });
    }

    //时间格式化方法
    function charge(DateType,Number){
        if(DateType<Number){
            return '0'+DateType;
        }else{
            return DateType;
        }
    }
    //时间格式化函数
    function FormatDate (strTime) {
        //let date = new Date(strTime);  参数是毫秒数时使用
        let date = strTime;
        let Months,Day,Hours,Minutes,Seconds;
        Months = charge(date.getMonth()+1,10);
        Day = charge(date.getDate(),10);
        Hours = charge(date.getHours(),10);
        Minutes = charge(date.getMinutes(),10);
        Seconds = charge(date.getSeconds(),10);
        return date.getFullYear()+"-"+Months+"-"+Day+" "+Hours+":"+Minutes+":"+Seconds;
    }

    /*function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }*/

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">
           <div className="search-item">
                <span>创建时间：</span>
               {getFieldDecorator('create_time')(
                  <RangePicker/>
                )}
           </div>

           <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
           </div>
        </div>
    </Form>
  );
};

DataMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport: PropTypes.func,
};

export default Form.create()(DataMgrSearch);
