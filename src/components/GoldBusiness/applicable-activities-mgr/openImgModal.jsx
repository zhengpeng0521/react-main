import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message, DatePicker } from 'antd';
import moment from 'moment';
import style from './ApplicableActivitiesMgr.less';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const OpenImgModal = ({
    imgVisible,imgContent,
    formCancle,
    form: {
        resetFields,
    },
  }) => {

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancle();
    };

    let modalOpts = {
        title: '预览大图',
        maskClosable : true,
        visible : imgVisible,
        closable : true,
        width : 620,
        onCancel : handleCancel,
        footer : [
            <Button key="cancle" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };

    return (
        <Modal {...modalOpts}>
            <img src={imgContent}  width='587px' height='400px'/>
        </Modal>
    );
};

OpenImgModal.propTypes = {
    form: PropTypes.object.isRequired,
    imgVisible : PropTypes.any,
    imgContent : PropTypes.any,
    formCancle : PropTypes.func,
};

export default Form.create()(OpenImgModal);
