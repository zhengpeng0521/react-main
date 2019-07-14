import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Popconfirm } from 'antd';
import styles from './TopicMgr.less';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};
const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 20, offset: 4 },
};
let uuid = 0;
const TopicMgrModal = ({
    formLoading, formData, addFormVisible,formType,searchChannelList,imgContents,
    formCreateSubmit,formUpdateSubmit,addCount,
    formCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldValue,
        getFieldsValue,
        resetFields,
        validateFieldsAndScroll,
        setFieldsValue
    },
  }) => {
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors) => {
          if (!!errors) {
            return;
          }
          let data = { ...getFieldsValue()};
          let item = [];
          for(let i=0;i<imgContents.length;i++){
              let img = getFieldValue(`img${i}`);
              let text = getFieldValue(`text${i}`);
            if(img==''||img==null||img==undefined){
                item.push({'img':'','text':''});
                if(text==''||text==null||text==undefined){
                    item.push({'img':'','text':''});
                }else{
                    item.push({'img':'','text':data.text});
                }
            }else{
                item.push({'img':img[0].url,'text':''});
                if(text==''||text==null||text==undefined){
                    item.push({'img':'','text':''});
                }else{
                    item.push({'img':'','text':text});
                }
            }
          }
          data.content = JSON.stringify(item);
          data.type='1';
          resetFields();
          formCreateSubmit(data);
        });
    }

    //检验数是否为正整数
    function checkNumber(rule, value, callback) {
        if(value==''||value==null||value==undefined){
            callback();
        }else if (!/^[+]*[\d]*$/.test(value)) {
            callback(new Error('输入不合法，必须是阿拉伯自然数'));
        }else {
            callback();
        }
    }

    function addImgContents(){
        let result = getFieldValue('addArray');
        if(result==''||result==null||result==undefined){
            message.warn('请选择增加数量');
            return;
        }
        addCount(result);
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        formCancel();
    }

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    let modalOpts = {
    title: '新增',
    maskClosable : false,
    visible : addFormVisible,
    closable : true,
    width : 585,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}> 取 消 </Button>,
        <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={formLoading}
                loading={formLoading}>保存</Button>
    ],
  };

//    let imgurlUploadProps = {
//        name: 'file',
//        action: `${BASE_URL}/systemController/upload`,
//        listType: 'picture-card',
//        headers: {
//            authorization: 'authorization-text',
//        },
//        beforeUpload(file) {
//            let imgurl_list = getFieldValue('IMG');
//
//            if(imgurl_list && imgurl_list.length > 0) {
//                message.error('只能选择一张主图');
//                return false;
//            }
//            return true;
//        },
//        onChange(info) {
//            if (info.file.status === 'done') {
//                info.file.url = info.file.response.data.url;
//                message.success(`${info.file.name} 上传成功`);
//            } else if (info.file.status === 'error') {
//                message.error(`${info.file.name} 上传失败`);
//            }
//
//        },
//    };
    let url = formData ? formData.imgurl : null;
    let displayImg = [{
        uid : -1,
        url : url,
        name : formData.intro,
        thumbUrl : url,
    }];

    let loopChannel = data => data.map((item) => {
    	return <Option value={item.id + ''} key={item.id} style={{color:item.status=='1'?'black':'red'}}>{item.title}</Option>;
    });

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">选择内容图</div>
        </div>
    );

    let removeThis = function(){
        console.log('remove');
    }

    let loopImgContents = data => data.map((item) => {
        let img_item = getFieldValue('img_' + item);
        return (
            <div key={'item_' + item}>
                <div className={styles.content}>
                    <div className={styles.content_left} >
                        <FormItem
                        label="内容"
                        hasFeedback
                        {...formItemLayout}
                        >
                        {getFieldDecorator('img_' + item, {
                            valuePropName: 'fileList',
                            normalize: normFile,
                        })(
                            <Upload
                                name= 'file'
                                action= {BASE_URL + '/systemController/upload'}
                                listType= 'picture-card'
                                beforeUpload={(file) => {
                                    let imgurl_list = getFieldValue('img_' + item);
                                    if(imgurl_list && imgurl_list.length > 0) {
                                        message.error('只能选择一张主图');
                                        return false;
                                    }
                                    return true;
                                }}
                                onChange={(info) => {
                                    console.log('onChange enter');
                                    if (info.file.status === 'done') {
                                        console.log('onChange if');
                                        info.file.url = info.file.response.data.url;
                                        message.success(`${info.file.name} 上传成功`);
                                    } else if (info.file.status === 'error') {
                                        console.log('onChange else if');
                                        message.error(`${info.file.name} 上传失败`);
                                    }

                                }}
                                onRemove={removeThis}
                               >
                                    {img_item && img_item[0].status == 'done'  ? null : uploadButton}
                            </Upload>
                        )}
                        </FormItem>
                    </div>

                    <div className={styles.content_right}>
                        <FormItem
                        label=""
                        hasFeedback
                        {...formItemLayout}
                        >
                            {getFieldDecorator(`text${item}`, {
                            })(
                                <Input type='textarea' style={{height:'97px'}} rows={4} cols={35}/>
                            )}
                        </FormItem>
                    </div>
                </div>
          </div>
    );
 });


  return (
    <Modal {...modalOpts}>
      <Form horizontal={true}>

        <FormItem
          label="频道："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('channelId', {
            rules: [
              { required: true, message: '频道未选择' }
            ],
          })(
            <Select placeholder="请选择频道" style={{ width: 120 }}>
                 {loopChannel(searchChannelList || [])}
            </Select>
          )}
        </FormItem>

        <FormItem
          label="用户ID："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('userId', {
            rules: [
              { required: true, message: '用户ID未填写' },{validator: checkNumber},
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
          label="标题："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            rules: [
              { required: true, message: '标题未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
          label="请选择增加数量："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('addArray', {
            rules: [
              { required: true, message: '增加数未选择' },{validator: checkNumber},
            ],
          })(
            <Input type="text" placeholder="请选择增加数量"/>
          )}
        </FormItem>

        {loopImgContents(imgContents)}

        <div id='add' className={styles.add}>
            <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={addImgContents} style={{ width: '70%',left:'10%' }}>
                    <Icon type="plus" /> Add
                </Button>
            </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

TopicMgrModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    addFormVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formCreateSubmit : PropTypes.func,
    addCount : PropTypes.func,
};

export default Form.create()(TopicMgrModal);
