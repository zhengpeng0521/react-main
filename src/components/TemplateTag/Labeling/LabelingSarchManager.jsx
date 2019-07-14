import React from 'react';
import styles from './Labeling.less';
import {Form, Button, Input, Icon} from 'antd';

const FormItem = Form.Item;

function LabelingSarchManager({
    onFilterQuery,

    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
    },
    }) {
    /*提交*/
    function handleSearchSubmit() {
        validateFields((errors,values) => {
            if (!!errors) {
                return;
            }
            onFilterQuery && onFilterQuery(values);
        });
    }
    /*清空*/
    function handleSearchReset() {
        resetFields && resetFields();
        onFilterQuery && onFilterQuery();
    }
    return (
        <div className={styles.filter_search_content}>

            <Form className="common-search-form" >
                <div className="search-content">

                    <FormItem className="search-item">
                        {getFieldDecorator('defName')(
                            <Input placeholder="模板名称" style={{ width: 150 }}/>
                        )}
                    </FormItem>
                    <div className="search-item">
                        <Button type="primary" onClick={() => handleSearchSubmit()}><Icon type="search" />搜索</Button>
                        <Button onClick={() => handleSearchReset()}><Icon type="delete"/>清除</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Form.create()(LabelingSarchManager);
