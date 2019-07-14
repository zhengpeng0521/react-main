import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, Popconfirm,DatePicker } from 'antd';

import styles from './TopicMgr.less';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const TopicMgrSearch = ({
    searchData, searchVisible,searchChannelList,
    searchReset,
    searchSubmit,
    searchExport,
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

            <div className="search-item">
               {getFieldDecorator('channelId')(
                  <Select placeholder="请选择频道" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    {loopChannel(searchChannelList || [])}
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('id')(
                  <Input placeholder="请输入主题ID" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('title')(
                  <Input placeholder="请输入主题标题" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('author')(
                  <Input placeholder="请输入作者" />
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('type')(
                  <Select placeholder="请选择主题类型" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">图文</Option>
                    <Option value="2">视频</Option>
                    <Option value="3">投票</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('essence')(
                  <Select placeholder="请选择是否加精" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1" key="1">是</Option>
                    <Option value="0" key="0">否</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('recommend')(
                  <Select placeholder="请选择是否推荐" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1" key="1">是</Option>
                    <Option value="0" key="0">否</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
               {getFieldDecorator('up')(
                  <Select placeholder="请选择是否置顶" style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1" key="1">是</Option>
                    <Option value="0" key="0">否</Option>
                  </Select>
                )}
            </div>

            <div className="search-item">
                    <span>发帖时间：</span>
                   {getFieldDecorator('create_time')(
                      <RangePicker/>
                    )}
            </div>

            <div className="search-item">
                <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                <Popconfirm placement="top" title="确认要导出吗?" onConfirm={handleExport}>
                    <Button type="primary" ><Icon type="export" />导出</Button>
                </Popconfirm>
                <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
            </div>
        </div>
    </Form>
  );
};

TopicMgrSearch.propTypes = {
    form: PropTypes.object.isRequired,
    searchData : PropTypes.any,
    searchVisible : PropTypes.any,
    searchReset : PropTypes.func,
    searchSubmit : PropTypes.func,
    searchExport: PropTypes.func,
};

export default Form.create()(TopicMgrSearch);
