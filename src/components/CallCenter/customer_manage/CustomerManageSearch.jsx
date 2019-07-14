import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';


const Option = Select.Option;

const CustomerManageSearch = ({
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
        validateFields((errors) => {
          if (!!errors) {
            return;
          }
          searchSubmit(getFieldsValue());
        });
    }

    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        searchReset();
    }


  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">
            <div className="search-item">
               {getFieldDecorator('tenantId')(
                  <Input placeholder="请输入租户ID" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('tenantName')(
                 <Input placeholder="请输入租户名称" style={{ width: 150 }}/>
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('orgId')(
                 <Input placeholder="请输入机构ID" style={{ width: 150 }}/>
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('orgName')(
                 <Input placeholder="请输入机构名称" style={{ width: 150 }}/>
                )}
            </div>
            <div className="search-item">
               {getFieldDecorator('status')(
                  <Select placeholder="全部状态" style={{ width: 120 }}>
                    <Option value="1">待审核</Option>
                    <Option value="2">审核通过</Option>
                    <Option value="3">已驳回</Option>
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

CustomerManageSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(CustomerManageSearch);
