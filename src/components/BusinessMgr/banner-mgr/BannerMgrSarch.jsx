import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';

import styles from './BannerMgr.less';

const Option = Select.Option;

const BannerMgrSearch = ({
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
               {getFieldDecorator('title')(
                  <Input placeholder="请输入标题" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('type')(
                  <Select placeholder="请选择类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="01" key="01">原生界面</Option>
                    <Option value="02" key="02">网页</Option>
                    <Option value="03" key="03">教程专题</Option>
                    <Option value="04" key="04">话题专题</Option>
                    <Option value="05" key="05">达人榜单</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('status')(
                  <Select placeholder="请选择类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">上架</Option>
                    <Option value="0">下架</Option>
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

BannerMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(BannerMgrSearch);
