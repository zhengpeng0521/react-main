import React from 'react'
import { Modal, Spin } from 'antd'
import styles from './DeviceList.less'

function DeviceList({
  deviceVisible,
  deviceLoading,
  deviceList,     //设备列表

  deviceOk,
  deviceCancel,
  addDevice,      //添加设备
}){
  return (
    <Modal
      title="设备列表"
      visible={deviceVisible}
      onOk={deviceOk}
      onCancel={deviceCancel}
    >
      <Spin tip="加载中..." spinning={deviceLoading}>
        <ul className={`${styles.device_list} ${styles.device_list_head}`}>
          <li>
            <div>设备ID</div>
            <div>操作</div>
          </li>
        </ul>
        <ul className={styles.device_list} style={{ marginBottom: 10 }}>
          {deviceList.length > 0 ? deviceList.map((item, index) => {
            return (
              <li key={`device${index}`}>
                <div>{item.devicesId}</div>
                <div>
                  {/* <a>编辑</a>
                  <a>删除</a> */}
                </div>
              </li>
            )
          }) : <div className={styles.device_empty}>暂无设备</div>}
        </ul>

        <a onClick={addDevice}>添加设备</a>
      </Spin>
    </Modal>
  )
}

export default DeviceList
