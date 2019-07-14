import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';
const Option = Select.Option;

const OutboundPackageManageSearch = ({
    searchData,
    searchVisible,
    searchReset,
    searchSubmit,
    tabKey,
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
            {tabKey=='1'?
                <div>
                    <div className="search-item">
                       {getFieldDecorator('id')(
                          <Input placeholder="产品编号" />
                        )}
                    </div>

                    <div className="search-item">
                       {getFieldDecorator('productName')(
                         <Input placeholder="产品名称" style={{ width: 150 }}/>
                        )}
                    </div>

                    <div className="search-item">
                       {getFieldDecorator('status')(
                          <Select placeholder="请选择状态" style={{ width: 120 }}>
                            <Option value="1">已上架</Option>
                            <Option value="2">已下架</Option>
                          </Select>
                        )}
                    </div>
                </div>
                  :
                <div>
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
                       {getFieldDecorator('orgName')(
                         <Input placeholder="请输入机构名称" style={{ width: 150 }}/>
                        )}
                    </div>
                    <div className="search-item">
                       {getFieldDecorator('orgId')(
                         <Input placeholder="请输入机构编号" style={{ width: 150 }}/>
                        )}
                    </div>
                    <div className="search-item">
                       {getFieldDecorator('statusCheck')(
                          <Select placeholder="全部" style={{ width: 120 }}>
                            <Option value="1">待审核</Option>
                            <Option value="2">已通过</Option>
                          </Select>
                        )}
                    </div>
                </div>

              }
            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
            </div>
        </div>


    </Form>
  );
};

OutboundPackageManageSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(OutboundPackageManageSearch);
