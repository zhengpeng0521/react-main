import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';

import styles from './GgMgr.less';

const Option = Select.Option;

const GgMgrSearch = ({
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
               {getFieldDecorator('status')(
                  <Select placeholder="请选择状态" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1" key="1">上架</Option>
                    <Option value="0" key="2">下架</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('type')(
                  <Select placeholder="请选择类型" style={{ width: 150 }}>
                    <Option value="">全部</Option>
                    <Option value="101">启动广告位</Option>
                    <Option value="102">首页弹屏广告</Option>
                    <Option value="103">首页提醒条位</Option>
                    <Option value="104">首页浮框广告位</Option>
                    <Option value="105">个人中心金币广告位</Option>
                    <Option value="106">个人中心底部广告位</Option>
                    <Option value="107">金币商城广告</Option>
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

GgMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(GgMgrSearch);
