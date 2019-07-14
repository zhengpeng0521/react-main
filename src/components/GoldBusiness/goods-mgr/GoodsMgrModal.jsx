
import React, { PropTypes } from 'react';
import { Form, Input, Modal, Upload, Icon,Select,Button,message } from 'antd';
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

const GoodsMgrModal = ({
    formLoading, formData, formVisible,formType,
    formSubmit,
    formCancel,
    handleOk,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {
    function handleComplete(e){
        e.preventDefault();
        validateFieldsAndScroll((errors) => {
        if (errors) {
            return;
        }
        const data = {...getFieldsValue()};
        //处理图片显示
        if(data.IMG==''||data.IMG==null){
            data.imgurl = '';
        }else{
            data.imgurl = data.IMG[0].url;
        }
        delete data.IMG;

        switch(data.saleStatus){
            case '上架' : data.saleStatus = '1';break;
            case '下架' : data.saleStatus = '0';break;
        }
        data.id = formData.id;
        resetFields();
        formSubmit(data,formType);
        });
    }
    function handleCancel(e){
        e.preventDefault();
        resetFields();
        formCancel();
    }

    //检验是不是大于等于0的数
    function checkNumber(rule, value, callback) {
        if (!value) {
            callback();
        }
        if (!/^[\d]*[.]{0,1}[\d]*$/.test(value)) {
            callback(new Error('价格填写不合法，必须是大于等于0的数'));
        } else {
            callback();
        }
    }
    function checkZheng(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback();
        }else if (!/^[\d]*$/.test(value)) {
            callback(new Error('输入不合法，必须是自然数'));
        }else{
            callback();
        }
    }
    function checkImgUrl(rule, value, callback){
        if(value==undefined||value==''||value==null){
            callback(new Error('请选择图片'));
        }else{
            callback();
        }
    }

    const modalOpts = {
        title: formType == 'create' ? '新增' : '编辑',
        visible : formVisible,
        width : '600px',
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancle" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
            <Button key="submit" type="primary" size="large"
                    onClick={handleComplete}
                    disabled={formLoading}
                    loading={formLoading}>保存</Button>
        ],
    };

    let imgurlUploadProps = {
        name: 'file',
        action: `${BASE_URL}/systemController/upload`,
        listType: 'picture-card',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                info.file.url = info.file.response.data.url;
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
        beforeUpload(file) {
            let imgurl_list = getFieldValue('IMG');

            if(imgurl_list && imgurl_list.length > 0) {
                message.error('只能选择一张图片');
                return false;
            }
            return true;
        },
    };

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    let url = formData ? formData.imgurl : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : formData.intro,
        thumbUrl : url,
    }];

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            initialValue: formData.title,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
          label="简介："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('intro', {
            initialValue: formData.intro,
            rules: [
              { required: true, message: '简介未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
              label="图片"
              hasFeedback
              {...formItemLayout}
            >
                {getFieldDecorator('IMG', {
                    initialValue: formType=='update'?(displayImg[0].url!=''?displayImg:null):null,
                    valuePropName: 'fileList',
                    normalize: normFile,
                    rules: [
                        {validator: checkImgUrl},
                    ],
                })(
                    <Upload {...imgurlUploadProps} >
			             <Icon type="plus" />
                         <div className="ant-upload-text">选择图片</div>
			        </Upload>
                )}
        </FormItem>

        <FormItem
          label="市场价："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('marketPrice', {
            initialValue: formData.marketPrice?formData.marketPrice+'':'0',
          })(
            <Input type="text" style={{width:'97px'}}/>
          )}
        </FormItem>

        <FormItem
          label="商品价格："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('price', {
            initialValue: formData.price?formData.price+'':'',
            rules: [
              { required: true, message: '商品价格未填写' },{ validator: checkNumber },
            ],
          })(
            <Input type="text" style={{width:'97px'}}/>
          )}
        </FormItem>

        <FormItem
          label="金币价格："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('goldPrice', {
            initialValue: formData.goldPrice?formData.goldPrice+'':'',
            rules: [
              { required: true, message: '金币价格未填写' },{ validator: checkNumber },
            ],
          })(
            <Input type="text" style={{width:'97px'}}/>
          )}
        </FormItem>

        <FormItem
          label="钻石价格："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('diamondPrice', {
            initialValue: formData.diamondPrice?formData.diamondPrice+'':'',
            rules: [
              { validator: checkNumber },
            ],
          })(
            <Input type="text" style={{width:'97px'}}/>
          )}
        </FormItem>

        <FormItem
          label="库存："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('amount', {
            initialValue: formData.amount?formData.amount+'':'',
            rules: [
              { required: true, message: '库存未填写' },{ validator: checkZheng },
            ],
          })(
            <Input type="text" style={{width:'97px'}}/>
          )}
        </FormItem>

        <FormItem
          label="排序号："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('seqNo', {
            initialValue: formData.seqNo?formData.seqNo+'':'',
            rules: [
              { validator: checkZheng },
            ],
          })(
            <Input type="text" style={{width:'97px'}}/>
          )}
        </FormItem>

        <FormItem
          label="外链："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('linkUrl', {
            initialValue: formData.goodsUrl,
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
          label="商品类型："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('goodsType', {
            initialValue: formData.goodsType,
            rules: [
              { required: true, message: '商品类型未选择' }
            ],
          })(
            <Select placeholder='请选择商品类型'>
                <Option value='101'>实物奖品</Option>
                <Option value='102'>虚拟奖品</Option>
                <Option value='103'>活动</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="销售类型："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('saleType', {
            initialValue: formData.saleType,
            rules: [
              { required: true, message: '销售类型未选择' }
            ],
          })(
            <Select placeholder='请选择销售类型'>
                <Option value='1'>普通商品</Option>
                <Option value='2'>秒杀商品</Option>
                <Option value='3'>试用活动</Option>
                <Option value='4'>实物兑换</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="销售状态："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('saleStatus', {
            initialValue: formData.saleStatus=='1'?'上架':
                          formData.saleStatus=='0'?'下架':'',
            rules: [
              { required: true, message: '排序号未选择' }
            ],
          })(
            <Select placeholder='请选择销售状态'>
                <Option value='1'>上架</Option>
                <Option value='0'>下架</Option>
            </Select>
          )}
        </FormItem>

      </Form>
    </Modal>
  );
};

GoodsMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    formVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formSubmit : PropTypes.func,
};

export default Form.create()(GoodsMgrModal);
