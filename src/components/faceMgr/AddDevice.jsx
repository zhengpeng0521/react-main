import React from 'react'
import { Modal, Form, Input, Button } from 'antd'

const FormItem = Form.Item

function AddDevice({
  addDeviceVisible,
  addLoading,

  addOK,      // 保存设备
  addCancel,  // 取消添加

  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
    getFieldValue,
},
}){
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }

  /**点击保存 */
  function addOKAction(e){
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        addOK(values)
      }
    })
  }

  /** 点击取消 */
  function addCancelAction(){
    resetFields()
    addCancel()
  }

  return (
    <Modal
      title="添加设备"
      visible={addDeviceVisible}
      onOk={addOKAction}
      onCancel={addCancelAction}
      footer={[
        <Button key="back" onClick={addCancelAction}>取消</Button>,
        <Button key="submit" type="primary" loading={addLoading} onClick={addOKAction}>
          保存
        </Button>,
      ]}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="设备ID"
        >
          {getFieldDecorator('qrCode', {
            rules: [{
              required: true, message: '请输入设备ID',
            }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(AddDevice)
