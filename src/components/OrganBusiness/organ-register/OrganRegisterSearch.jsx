import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker,Popconfirm } from 'antd';

import styles from './OrganRegister.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const OrganRegisterSearch = ({
    searchData, searchVisible,searchChannelList,schoolType,
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
            values = getFieldsValue();
            searchSubmit(values);
        });
    }
    function handleExport(){
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            const rangeValueC = fieldsValue['create_time'];
            values = {...fieldsValue};
            if(rangeValueC!=undefined&&rangeValueC.length>0){
                values.create_timeS = rangeValueC[0].format('YYYY-MM-DD');
                values.create_timeE = rangeValueC[1].format('YYYY-MM-DD');
            }
            delete values.create_time;
            console.log(values);
            searchExport(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }

    let loopSchoolType = data => data.map((item) => {
    	return <Option value={item.value + ''} key={item.value}>{item.name}</Option>;
    });


  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

                <div className="search-item">
                   {getFieldDecorator('orgName')(
                      <Input placeholder="机构名称" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('tel')(
                      <Input placeholder="电话" style={{ width: 120 }}/>
                    )}
                </div>

                <div className="search-item">
                   {getFieldDecorator('userName')(
                      <Input placeholder="用户姓名" style={{ width: 120 }}/>
                    )}
                </div>

                { true == true ? null :
                    <div className="search-item" >
                        {getFieldDecorator('schoolType')(
                          <Select placeholder="学校类型" style={{ width: 120 }}>
                            <Option value=''>全部</Option>
                            {loopSchoolType(schoolType)||[]}
                          </Select>
                        )}
                    </div>
                }

                <div className="search-item">
                    {getFieldDecorator('status')(
                      <Select placeholder="条件" style={{ width: 120 }}>
                        <Option value="">全部</Option>
                        <Option value="3">已构建</Option>
                        <Option value="2">已处理</Option>
                        <Option value="1">未处理</Option>
                      </Select>
                    )}
                </div>
                <div className="search-item">
                    {getFieldDecorator('platform')(
                        <Input placeholder="申请平台" style={{ width: 120 }}/>

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

OrganRegisterSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(OrganRegisterSearch);
