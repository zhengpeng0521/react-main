import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './WeiXinAdminiCase.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const WeiXinAdminiCaseSearch = ({
    weiXinAdminiCaseSearchSelectContent,  //微信活动模板名称下拉列表
    weiXinAdminiCaseSearchReset,          //清空数据
    weiXinAdminiCaseSearchSubmit,         //点击搜索
    schoolTypeList,                         //机构类型
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
    },
  }) => {

    let children = [];
    if(weiXinAdminiCaseSearchSelectContent && weiXinAdminiCaseSearchSelectContent.length > 0){
        children = weiXinAdminiCaseSearchSelectContent.map((item) => {
            return(
                <Option value={item.id} key={item.id}>{item.title}</Option>
            );
        });
    }
    let schoolTypeOptions = [];
    if(schoolTypeList && schoolTypeList.length > 0){
        schoolTypeOptions = schoolTypeList.map((item,index) => {
            return(
                <Option value={item.value} key={item.value}>{item.name}</Option>
            );
        });
    }
    function handleSearchSubmit(e) {
        e.preventDefault();
        let values={};
        validateFields((errors,fieldsValue) => {
            if (!!errors) {
                return;
            }
            const rangeValueC = getFieldValue('create_time');
            let  values = {...getFieldsValue()};
            if(rangeValueC != undefined && rangeValueC.length > 0){
                values.startTime = rangeValueC[0].format('YYYY-MM-DD ');
                values.endTime = rangeValueC[1].format('YYYY-MM-DD ');
            }
            delete values.create_time;
            weiXinAdminiCaseSearchSubmit(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        weiXinAdminiCaseSearchReset();
    }

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">

            <div className="search-item">
                {getFieldDecorator('id')(
                  <Input placeholder="编号" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('instanceName')(
                  <Input placeholder="实例名称" style={{ width: 120 }}/>
                )}
            </div>



            <div className="search-item">
                {getFieldDecorator('status', {
                })(
                    <Select placeholder="实例状态" style={{ width : 120 }}>
                        <Option value=''>全部</Option>
                        <Option value='0'>删除</Option>
                        <Option value='1'>上架</Option>
                        <Option value='2'>下架</Option>
                    </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('orgName')(
                  <Input placeholder="机构名称" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('tenantId')(
                  <Input placeholder="租户ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('orgId')(
                  <Input placeholder="机构ID" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('tel')(
                  <Input placeholder="联系方式" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('create_time')(
                  <RangePicker/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('filterTid')(
                  <Input placeholder="过滤租户ID" style={{ width: 120 }}/>
                )}
            </div>
			<div className="search-item">
                {getFieldDecorator('addr')(
                  <Input placeholder="地址" style={{ width: 120 }}/>
                )}
            </div>
            <div className="search-item">
                {getFieldDecorator('schoolType', {
                })(
                    <Select placeholder="机构类型" style={{ width : 120 }}>
                        { schoolTypeOptions || [] }
                    </Select>
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

export default Form.create()(WeiXinAdminiCaseSearch);
