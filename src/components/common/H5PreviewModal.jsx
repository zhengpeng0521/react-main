import React, { PropTypes } from 'react';
import { Modal, Button } from 'antd';

const H5PreviewModal = ({
    previewUrl, previewModalVisible,
    previewOnOk
  }) => {

    let modalOpts = {
        maskClosable : false,
        visible : previewModalVisible,
        closable : false,
        width : 635,
        onOk: previewOnOk,
        onCancel : previewOnOk,
        footer : [
            <Button key="cancel" type="primary" size="large" onClick={previewOnOk}>关闭</Button>,
        ],
    };

    return (
        <Modal {...modalOpts}>
            <div>
                <iframe src={previewUrl} frameBorder="0" width="600" height="500" marginHeight="0" marginWidth="0" scrolling="auto"></iframe>
            </div>
        </Modal>
    );
};

H5PreviewModal.propTypes = {
    previewUrl : PropTypes.any,
    handleOk : PropTypes.func,
};

export default H5PreviewModal;
