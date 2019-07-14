import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Radio } from 'antd';
import style from './DataMgr.less';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const AlertModal = ({
    AlertVisible,formCancel,topChoose,
    handleSizeChangeTop,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    function handleCancel(e) {
        e.preventDefault();
    }

    let modalOpts = {
    title: 'Tip',
    maskClosable : false,
    visible : AlertVisible,
    closable : true,
    width : 585,
    onCancel : handleCancel,
    footer : [],
  };

  return (
    <Modal {...modalOpts}>
        <div className={style.alertModal}>
            <strong>请选择时间范围<strong style={{color:'red'}}>(必选)</strong></strong><br/><br/>
            <Radio.Group size="large" onChange={handleSizeChangeTop}>
                <Radio.Button value="1">昨&nbsp;日</Radio.Button>
                <Radio.Button value="7">近7天</Radio.Button>
                <Radio.Button value="30">近30天</Radio.Button>
            </Radio.Group>
        </div>
    </Modal>
  );
};

AlertModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formCreateSubmit : PropTypes.func,
    formUpdateSubmit : PropTypes.func,
    handleSizeChangeTop : PropTypes.func,
};

export default Form.create()(AlertModal);
