import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';
const Option = Select.Option;

const DomainNameSettingSearch = ({
    SearchSubmit,           //搜索栏清空或者提交
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
  }) => {

    function handleSearchSubmit(e) {
        e.preventDefault();
        validateFields((errors,values) => {
            if(!!errors) {
                return;
            }
            SearchSubmit(values);
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SearchSubmit();
    }


  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">
            <div className="search-item">
               {getFieldDecorator('tenantId')(
                  <Input placeholder="租户ID"/>
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('name')(
                  <Input placeholder="租户名称" />
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('tel')(
                  <Input placeholder="联系方式" />
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('hostName')(
                  <Input placeholder="域名名称(不包括'.saas.ishanshan.com')" style = {{ width : 230 }}/>
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('auditStatus')(
                  <Select placeholder="审核状态" style={{ width: 140 }}>
                    <Option value="">全部</Option>
                    <Option value="1" key="1">待审核</Option>
                    <Option value="2" key="2">审核通过，待开通</Option>
                    <Option value="3" key="3">已开通</Option>
                    <Option value="4" key="4">已驳回</Option>
                    <Option value="5" key="5">已关闭</Option>
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

export default Form.create()(DomainNameSettingSearch);
