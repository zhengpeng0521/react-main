import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, Popconfirm,DatePicker } from 'antd';
import styles from './Cousulting.less';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const ConsultingSearch = ({
    searchData, searchVisible,
    searchReset,
    searchSubmit,
    handleOpenButton,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldValue,
        getFieldsValue,
        resetFields,
    },
  }) => {

    function handleSearchSubmit(e) {
        e.preventDefault();
        validateFields((errors,fieldsValue) => {
          if (!!errors) {
            return;
          }
            const rangeValueC = getFieldValue('create_time');
            let data = {...getFieldsValue()};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                data.createTimeS = rangeValueC[0].format('YYYY-MM-DD');
                data.createTimeE = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete data.create_time;
          searchSubmit(data);
        });
    }
    function handleExport(){
        validateFields((errors) => {
          if (!!errors) {
            return;
          }
        searchExport(getFieldsValue());
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }

    let loopChannel = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id} style={{color:item.status=='1'?'black':'red'}}>{item.title}</Option>;
    });

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item" style={{ width: 140 }}>
               {getFieldDecorator('id')(
                  <Input placeholder="学员姓名" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('up')(
                  <Select placeholder="所属校区" style={{ width: 140 }}>
                    <Option value="">全部</Option>
                    <Option value="1" key="1">嘿嘿嘿</Option>
                    <Option value="0" key="0">哈哈哈</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除条件</Button>
                <Button type="primary" onClick={handleOpenButton}><Icon type="heart" />按钮设计</Button>
            </div>

        </div>
    </Form>
  );
};

ConsultingSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport: PropTypes.func,
};

export default Form.create()(ConsultingSearch);
