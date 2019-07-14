import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';

const Option = Select.Option;

let ApplicableActivitiesMgrSearch = ({
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

    let loopChannel = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id}>{item.title}</Option>;
    });

  return (
    <Form horizontal className="common-search-form" >
        <div className="search-content">
            <div className="search-item">
               {getFieldDecorator('id')(
                  <Input placeholder="请输入编号" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('title')(
                  <Input placeholder="请输入标题" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('status')(
                  <Select placeholder="请选择状态" style={{ width: 120 }}>
                    <Option value="" key="0">全部</Option>
                    <Option value="1" key="1">内部测试</Option>
                    <Option value="2" key="2">下架</Option>
                    <Option value="3" key="3">上架</Option>
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

ApplicableActivitiesMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(ApplicableActivitiesMgrSearch);
