import React from 'react';
import styles from './SourceManager.less';
import {Form, Button, Input, Icon, Select, } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

function SourceSearchManager({
    filter, adComList, onFilterQuery,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
    },
    }) {

    function handleSearchSubmit() {
        validateFields((errors,values) => {
            if (!!errors) {
                return;
            }
            onFilterQuery && onFilterQuery(values);
        });
    }

    function handleSearchReset() {
        resetFields && resetFields();
        onFilterQuery && onFilterQuery({});
    }


    let adOpts = adComList && adComList.map(function(adItem, adIndex) {
            return (
                <Option key={'ad_item_' + adIndex} value={adItem.id} >{adItem.name}</Option>
            )
        });

    return (
        <div className={styles.filter_search_content}>

            <Form className="common-search-form" >
                <div className="search-content">

                    <div className="search-item">
                        {getFieldDecorator('modelName')(
                            <Input placeholder="模板名称" style={{ width: 150 }}/>
                        )}
                    </div>

                    <div className="search-item">
                        {getFieldDecorator('adId')(
                            <Select placeholder="广告" style={{ width : 150 }}>
                                <Option value=''>全部</Option>
                                {adOpts || []}
                            </Select>
                        )}
                    </div>

                    <div className="search-item">
                        <Button type="primary" onClick={() => handleSearchSubmit()}><Icon type="search" />搜索</Button>
                        <Button onClick={() => handleSearchReset()}><Icon type="delete" />清除</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Form.create()(SourceSearchManager);
