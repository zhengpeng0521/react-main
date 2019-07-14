import React from "react"
import {
  Form,
  Input,
  Modal,
  Button,
  Upload,
  Icon,
  message,
  Spin,
  Radio
} from "antd"

const FormItem = Form.Item
const RadioGroup = Radio.Group

function AddOrEditRecommendModal({
  recommendType, //新增修改类型('add'/'edit')
  recommendVisible, //modal是否显示
  recommendInfo, //编辑时回填数据
  addRecommendLoading, //按钮是否加载状态

  recommendSubmit, //表单提交
  recommendCancel, //关闭modal

  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
    getFieldValue,
    validateFieldsAndScroll
  }
}) {

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  }

  const itemNoLabel = {
    wrapperCol: {
      span: 18,
      offset: 4
    },
  }

  function handleComplete(e) {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        return
      }

      //处理图片显示
      if (values.image == "" || values.image == null || values.image == undefined) {
        values.image = ""
      } else {
        values.image = values.image[0].url
          ? values.image[0].url
          : values.image[0].response.data.url
      }

      recommendSubmit(values)
    })
  }

  function handleCancel(e) {
    e.preventDefault()
    resetFields()
    recommendCancel()
  }

  //模态框的属性
  let modalOpts = {
    title: "add" == recommendType ? "新增最新推荐" : "编辑最新推荐",
    maskClosable: false,
    visible: recommendVisible,
    closable: true,
    width: 650,
    onOk: handleComplete,
    onCancel: handleCancel,
    footer: [
      <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        size="large"
        onClick={handleComplete}
        disabled={addRecommendLoading}
        loading={addRecommendLoading}>
        保存
      </Button>
    ]
  }

  /*上传图片属性*/
  let imgurlUploadProps = {
    name: "file",
    action: `${BASE_URL}/systemController/upload`,
    listType: "picture-card",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status === "done") {
        info.file.url = info.file.response.data.url
        message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`)
      }
    },
    beforeUpload(file) {
      let imgurl_list = getFieldValue("image")
      if (imgurl_list && imgurl_list.length > 0) {
        message.error("只能选择一张图片")
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error("图片大小不大于2M!")
        return false
      }
      return true
    }
  }

  function normFile(e) {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  let url =
    recommendType == "edit" &&
    recommendInfo.image &&
    recommendInfo.image != null &&
    recommendInfo.image != "" &&
    recommendInfo.image != undefined
      ? recommendInfo.image
      : null
  let displayImg = [
    {
      uid: -1,
      url: url,
      name: url,
      thumbUrl: url
    }
  ]

  /*检验图片是否上传*/
  function checkImgUrl(rule, value, callback) {
    if (value == undefined || value == "" || value == null) {
      callback(new Error("请选择图片"))
    } else {
      callback()
    }
  }

  /** 链接类型change */
  function typeChange(){
    resetFields(['link'])
  }

  return (
    <div className="zj_modal_header">
      <Modal {...modalOpts}>
        <Form>
          <FormItem label="图片" hasFeedback {...formItemLayout}>
            {getFieldDecorator("image", {
              initialValue:
                recommendType == "edit"
                  ? displayImg[0].url != ""
                    ? displayImg
                    : null
                  : null,
              valuePropName: "fileList",
              normalize: normFile,
              rules: [{ validator: checkImgUrl }]
            })(
              <Upload {...imgurlUploadProps}>
                {getFieldValue("image") && getFieldValue("image").length > 0 ? null : <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">选择图片</div>
                </div>}
              </Upload>
            )}
          </FormItem>

          <FormItem label="菜单id" {...formItemLayout}>
            {getFieldDecorator("menuId", {
              initialValue:
                recommendType == "edit" && recommendInfo.menuId
                  ? recommendInfo.menuId + ""
                  : undefined,
              rules: [{ required: true, message: '请填写菜单id' }]
            })(<Input placeholder="请填写菜单id" />)}
          </FormItem>

          <FormItem label="链接" {...formItemLayout}>
            {getFieldDecorator("type", {
              initialValue:
                recommendType == "edit" && recommendInfo.type
                  ? recommendInfo.type + ""
                  : '2',
              rules: [{ required: true, message: '请选择链接类型' }]
            })(
              <RadioGroup onChange={typeChange}>
                <Radio value="2">外链</Radio>
                <Radio value="1">内链</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem {...itemNoLabel}>
            {getFieldDecorator("link", {
              initialValue:
                recommendType == "edit" && recommendInfo.link
                  ? recommendInfo.link + ""
                  : undefined,
              rules: [{ required: true, message: `请填写${getFieldValue('type') == '1' ? '外链' : '内链'}` }]
            })(<Input placeholder={`请填写${getFieldValue('type') == '1' ? '外链' : '内链'}`} />)}
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create()(AddOrEditRecommendModal)
