import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker  } from 'antd';

import styles from './GoodsMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const GoodsMgrSearch = ({
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
    <Form horizontal className="common-search-form" style={{zIndex:'99999999999'}}>
        <div className="search-content">

            <div className="search-item">
               {getFieldDecorator('title')(
                  <Input placeholder="请输入标题" style={{ width: 120 }}/>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('status')(
                  <Select placeholder="状态" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="2">隐藏</Option>
                    <Option value="1">显示</Option>
                    <Option value="0">无效</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('goodsType')(
                  <Select placeholder="商品类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="101">实物</Option>
                    <Option value="102">虚拟</Option>
                    <Option value="103">活动</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('saleType')(
                  <Select placeholder="销售类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">普通商品</Option>
                    <Option value="2">秒杀商品</Option>
                    <Option value="3">试用活动</Option>
                    <Option value="4">实物兑换</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                {getFieldDecorator('saleStatus')(
                  <Select placeholder="销售状态" style={{ width: 120 }}>
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

GoodsMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
};

export default Form.create()(GoodsMgrSearch);
