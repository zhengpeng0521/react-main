import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Popconfirm, Radio, DatePicker, Col } from 'antd';
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
const ConsultingModal = ({
    formLoading, formData, formVisible,formType,searchChannelList,
    formSubmit,formCancel,
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
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors) => {
            if (!!errors) {
                return;
            }
            let data = { ...getFieldsValue()};
            data.birthDay = data.birth.format('YYYY-MM-DD');
            data.jingbanTime = data.jingban.format('YYYY-MM-DD hh:mm:ss');
            delete data.birth;
            delete data.jingban;
            console.log(data);
            //formSubmit(data);
        });
    }

    //检验数是否为正整数
    function checkNumber(rule, value, callback) {
        /*if(value==''||value==null||value==undefined){
            callback();
        }else if (!/^[+]*[\d]*$/.test(value)) {
            callback(new Error('输入不合法，必须是阿拉伯自然数'));
        }else {
            callback();
        }*/
        callback();
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

    let dateFormat = 'YYYY-MM-DD hh:mm:ss';

    let createTimeInitValue = formType=='update'?
                                moment(formData.createTime, dateFormat) : '';
    let modifyTimeInitValue = formType=='update'?
                                moment(formData.createTime, dateFormat) : '';
    let createTimeConfig = {
        initialValue: createTimeInitValue,
        rules: [{ type: 'object', required: true, message: '学员生日未选择' }],
    };
    let modifyTimeConfig = {
        initialValue: modifyTimeInitValue,
    };

    function disabledDate(current) {
        // can not select days after today and today
        return current && current.valueOf() > Date.now();
    }

    let modalOpts = {
    title: formType=='create'?'新增咨询':'编辑咨询',
    maskClosable : false,
    visible : formVisible,
    closable : true,
    width : 1000,
    onOk: handleComplete,
    onCancel : handleCancel,
    footer : [
        <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
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


return (
    <Modal {...modalOpts}>
        <Form horizontal>
            <FormItem
                label="学员姓名"
                hasFeedback
                {...formItemLayout}
            >
                {getFieldDecorator('学员姓名', {
                    initialValue:formType=='update'?'伍雨豪':'',
                    rules: [
                        { required: true, message: '学员姓名未填写' },{validator: checkNumber},
                    ],
                })(
                    <Input type="text" placeholder='请填写学员姓名' style={{width:120}}/>
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="学员性别"
                hasFeedback
            >
                {getFieldDecorator('学员性别', {
                    initialValue:formType=='update'?'1':'',
                    rules: [
                        { required: true, message: '学员性别未选择' },
                    ],
                })(
                <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                </RadioGroup>
            )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="学员生日"
                hasFeedback
                >
                {getFieldDecorator('birth', createTimeConfig)(
                    <DatePicker showTime disabledDate={disabledDate} format="YYYY-MM-DD"/>
                )}
            </FormItem>
        </Form>
        <Form inline>
            <FormItem
                label="家长信息"
                labelCol={{ span:8,offset:5  }}
                wrapperCol={{span: 11}}
            >
                {getFieldDecorator('家长姓名', {
                    initialValue:formType=='update'?'赵健':'',
                    rules: [
                        { required: true, message: '家长姓名未填写' }
                    ],
                })(
                    <Input placeholder='姓名'/>
                )}
            </FormItem>

            <FormItem
                hasFeedback
                labelCol={{ span: 20 }}
            >
                {getFieldDecorator('关系', {
                    initialValue:formType=='update'?'1':undefined,
                    rules: [
                        { required: true, message: '关系未选择' }
                    ],
                })(
                  <Select placeholder="关系" style={{ width: 100 }}>
                    <Option value="父亲" >父亲</Option>
                    <Option value="母亲" >母亲</Option>
                  </Select>
                )}
            </FormItem>

            <FormItem
                hasFeedback
                labelCol={{ span: 15,offset:8 }}
                wrapperCol={{span: 20}}
            >
                {getFieldDecorator('联系方式', {
                    initialValue:formType=='update'?formData.id+'':'',
                    rules: [
                        { required: true, message: '联系方式未填写' }
                    ],
                })(
                    <Input placeholder='联系方式'/>
                )}
            </FormItem>
        </Form>
        <br/>
        <Form>
            <FormItem
                label="其他信息"
                hasFeedback
                {...formItemLayout}
            >
                {getFieldDecorator('其他信息', {
                    initialValue:formType=='update'?'其他信息':'',
                })(
                    <Input type="textarea" rows={4} placeholder='请填写其他信息'/>
                )}
            </FormItem>
        </Form>

        <div className={styles.line}></div>

        <Form>
            <FormItem
                {...formItemLayout}
                label="渠道"
                hasFeedback
            >
                {getFieldDecorator('渠道', {
                    initialValue:formType=='update'?'1':undefined,
                })(
                <RadioGroup>
                    <Radio value='1'>来电</Radio>
                    <Radio value='2'>来访</Radio>
                    <Radio value='3'>网络</Radio>
                    <Radio value='4'>其他</Radio>
                </RadioGroup>
            )}
            </FormItem>
            <FormItem
                hasFeedback
                label="意向度"
                {...formItemLayout}
            >
                {getFieldDecorator('意向度', {
                    initialValue:formType=='update'?'低':undefined,
                })(
                  <Select placeholder="请选择意向度" style={{ width: 120 }}>
                    <Option value="无" >无</Option>
                    <Option value="低" >低</Option>
                    <Option value="中" >中</Option>
                    <Option value="高" >高</Option>
                  </Select>
                )}
            </FormItem>
            <FormItem
                hasFeedback
                label="咨询课程"
                {...formItemLayout}
            >
                {getFieldDecorator('咨询课程', {
                    initialValue:formType=='update'?'英语':undefined,
                })(
                  <Select placeholder="请选择咨询课程" style={{ width: 150 }}>
                    <Option value="语文" >语文</Option>
                    <Option value="数学" >数学</Option>
                    <Option value="英语" >英语</Option>
                  </Select>
                )}
            </FormItem>
        </Form>
        <Form inline style={{height:'60px',width:'100%',display:'inline-flex'}}>
            <FormItem
                labelCol={{ span:9,offset:6 }}
                wrapperCol={{span: 9}}
                label="跟进状态"
                hasFeedback
                style={{marginLeft:'-11px'}}
            >
                {getFieldDecorator('跟进状态', {
                    initialValue:formType=='update'?'待跟进':undefined,
                })(
                <Select style={{ width: 150 }} placeholder='请选择跟进状态'>
                    <Option value='跟进'>跟进</Option>
                    <Option value='待跟进'>待跟进</Option>
                </Select>
            )}
            </FormItem>
            <FormItem
                hasFeedback
                labelCol={{ span:30 }}
                label="关键词"
                style={{marginLeft:'130px'}}
            >
                {getFieldDecorator('关键词', {
                    initialValue:formType=='update'?'低':undefined,
                })(
                  <Select placeholder='请选择关键词' style={{ width: 135 }}>
                    <Option value="无" >无</Option>
                    <Option value="低" >低</Option>
                    <Option value="中" >中</Option>
                    <Option value="高" >高</Option>
                  </Select>
                )}
            </FormItem>
        </Form>
        <Form>
            <FormItem
                label="沟通内容"
                hasFeedback
                {...formItemLayout}
            >
                {getFieldDecorator('沟通内容', {
                    initialValue:formType=='update'?'沟通内容':'',
                })(
                    <Input type="textarea" rows={4} placeholder='请填写沟通内容'/>
                )}
            </FormItem>
        </Form>

        <div className={styles.line}></div>

        <Form inline style={{height:'60px',width:'100%',display:'inline-flex'}}>
            <FormItem
                labelCol={{ span:10,offset:5 }}
                wrapperCol={{span: 10}}
                label="经办校区"
                hasFeedback
                style={{marginLeft:'-2px'}}
            >
                {getFieldDecorator('经办校区', {
                    initialValue:formType=='update'?'A校区':undefined,
                })(
                <Select style={{ width: 150 }} placeholder='请选择经办校区'>
                    <Option value="A校区" >A校区</Option>
                    <Option value="B校区" >B校区</Option>
                </Select>
            )}
            </FormItem>
            <FormItem
                hasFeedback
                labelCol={{ span:30 }}
                label="经办时间"
                style={{marginLeft:'87px'}}
            >
                {getFieldDecorator('jingban', modifyTimeConfig)(
                    <DatePicker showTime disabledDate={disabledDate} format="YYYY-MM-DD hh:mm:ss"/>
                )}
            </FormItem>
        </Form>
        <Form>
            <FormItem
                hasFeedback
                {...formItemLayout}
                label="销售员"
            >
                {getFieldDecorator('请选择销售员', {
                    initialValue:formType=='update'?'职员':undefined,
                })(
                  <Select style={{ width: 150 }} placeholder='销售员'>
                    <Option value="管理员" >管理员</Option>
                    <Option value="职员" >职员</Option>
                  </Select>
                )}
            </FormItem>
        </Form>
    </Modal>
  );
};

ConsultingModal.propTypes = {
    form: PropTypes.object.isRequired,
    formLoading : PropTypes.any,
    formData : PropTypes.object,
    addFormVisible : PropTypes.any,
    formType : PropTypes.any,
    formCancel : PropTypes.func,
    formCreateSubmit : PropTypes.func,
    addCount : PropTypes.func,
};

export default Form.create()(ConsultingModal);
