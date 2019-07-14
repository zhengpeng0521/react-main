import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Popconfirm, Radio, DatePicker, Col } from 'antd';
import DIYButton from '../../common/DIYButton';
import moment from 'moment';
import styles from './Cousulting.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

const formItemLayout = {
  labelCol: {span: 3},
  wrapperCol: {span: 10},
};
const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 2, offset: 4 },
};
let uuid = 0;
let sex = 1;
const ButtonMaker = ({
    formLoading, formData, ButtonDesignVisible,formType,searchChannelList,
    formCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldValue,
        getFieldsValue,
        resetFields,
        validateFieldsAndScroll,
        setFieldsValue,
        fieldsValue
    },
  }) => {

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }
    let modalOpts = {
    title: formType=='create'?'新增':'编辑',
    maskClosable : false,
    visible : ButtonDesignVisible,
    closable : true,
    width : 133,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
    ],
  };


return (
    <Modal {...modalOpts}>
        <DIYButton/>
    </Modal>
  );
};

ButtonMaker.propTypes = {

};

export default Form.create()(ButtonMaker);
