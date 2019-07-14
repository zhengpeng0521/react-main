import React, {PropTypes} from 'react';
import {createForm} from 'rc-form';
import Input from 'antd/lib/input';

import DatePicker from 'antd-mobile/lib/date-picker';
import List from 'antd-mobile/lib/list';
import Toast from 'antd-mobile/lib/toast';
import InputItem from 'antd-mobile/lib/input-item';

import styles from './microModuleRenderUtil.less';
import qs from 'qs';
import moment from 'moment';

function FormRender({
    dateItem, renderType, handleSubmit,
    form : {
		getFieldProps,
		getFieldsValue,
        validateFields,
        resetFields,
	}
}) {

    async function submitAPI(params) {
      return requestData(`${BASE_URL}/appMicroActivity/addSubscribe`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
      });
    }

    function checkPhoneNum(rule, value, callback) {
        value = value.replace(new RegExp(" ","g"), '');
        if(!(/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value))){
    		callback('请输入正确的手机号码');
    	} else {
    		callback();
    	}
    }

    function checkOnlyNum(rule, value, callback) {
        if((/^[0-9.]+$/.test(value))){
    		callback('内容项不可以是纯数字');
    	} else {
    		callback();
    	}
    }

    function handleFormBtnClick() {
        validateFields((err, values) => {
            if (!!err) {
                for(let key in err) {
                    let errObj = err[key];
                    let errors = errObj.errors || [];
                    if(errors && errors.length > 0) {
                        Toast.fail(errors[0].message);
                        return;
                    }
                }
                return;
            }

            let activityDataId = (window._init_data && window._init_data.activityDataId) || '';
            values.id = activityDataId;

            if(values.birthday) {
                values.birthday = values.birthday.format('YYYY-MM-DD');
            }

            if(values.mobile) {
                values.mobile = values.mobile.replace(new RegExp(" ","g"), '');
            }

            submitAPI(values).then(result => {
                let {ret} = result;
                if(ret && ret.errorCode == 9000) {
                    Toast.info('表单信息提交成功!');
                    resetFields();
                } else {
                    Toast.info(ret&&ret.errorMessage || '表单信息提交失败');
                }
            });
        });
    }

    let inputContent = dateItem.inputSet.map(function(item,index){

        let form_input_div_style = {
            width: '100%',
            height: '12%',
            textAlign: 'center',
            marginTop: '4%',
            position: 'relative',
            display: 'block',
        };

        let form_input_style = {
            width: '70%',
            height: '100%',
            lineHeight: '1',
            display: 'block',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontSize: dateItem.inputPublicSet.font_size,
            color: dateItem.inputPublicSet.color,
            borderColor: dateItem.inputPublicSet.border_color,
            borderRadius: dateItem.inputPublicSet.border_radius+'px',
            textIndent: '20px',
            float: 'inherit',
            margin: '0 auto',
            paddingLeft: 0,
            paddingRight: 0,
        };

        let form_input_props = {};
        if(renderType != '4') {
            return (
                <div key={item.input_key} style={form_input_div_style}>
                    <Input type='text' readOnly='true'  placeholder={item.textcontent} style={form_input_style} />
                </div>
            );
        } else {

//            let input_type_arr = ['input','phone','date','area',];
//            let input_name_arr = ['name','mobile','birthday','note',];

//            item.input_type = input_type_arr[index];
//            item.name = input_name_arr[index];

            let form_data_pop_style = {
                baakgroundColor: '#DDD',
            };

            let date_extra_style = {
                fontSize: dateItem.inputPublicSet.font_size,
                borderRadius: dateItem.inputPublicSet.border_radius+'px',
                verticalAlign: 'middle',
            };

            return (
                <div key={item.input_key} style={form_input_div_style} className={styles.form_input_div_class} >
                    {item.input_type == 'input' ?
                        <InputItem type='text'
                           {...getFieldProps(item.name,{
                                validateTrigger: 'onBlur',
                                rules: [
                                    { required: true, message: '请输入' + item.textcontent, whitespace: true },
                                    { validator: checkOnlyNum },
                                ]
                            })}
                            placeholder={item.textcontent}
                            style={form_input_style} className={styles.form_input_class} />
                    : item.input_type == 'phone' ?
                        <InputItem type='phone'
                            {...getFieldProps(item.name,{
                                validateTrigger: 'onBlur',
                                rules: [
                                    { required: true, message: '请输入' + item.textcontent, whitespace: true },
                                    { validator: checkPhoneNum },
                                ]
                            })}
                            placeholder={item.textcontent}
                            style={form_input_style}
                        />
                    : item.input_type == 'date' ?
                        <div className={styles.form_date_item} style={form_input_style}>
                            <DatePicker
                               {...getFieldProps(item.name,{
                                    rules: [
                                        { required: true, message: '请选择' + item.textcontent, type: 'object' },
                                    ]
                                })}
                                extra={item.textcontent}
                                mode="date"
                                maxDate={moment()}
                            >
                                <List.Item className={styles.form_date_picker} style={date_extra_style} arrow="horizontal"></List.Item>
                            </DatePicker>
                        </div>

                    : item.input_type == 'area' ?
                        <InputItem type='text'
                           {...getFieldProps(item.name)}
                            placeholder={item.textcontent}
                            style={form_input_style} />
                    :
                        <InputItem type='text'
                           {...getFieldProps(item.name||'other')}
                            placeholder={item.textcontent} style={form_input_style} />
                    }

                </div>
            );
        }
    });

    let form_div_style = {
        width: '100%',
        height: '100%',
        backgroundColor: dateItem.background,
        backgroundImage: 'url('+dateItem.background_img+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        borderRadius: dateItem.border_radius,
        padding: '6% 0 3% 0 ',
    };

    let form_btn_cont_style = {
        width: '100%',
        height: '15%',
        textAlign: 'center',
        marginTop: '6%',
    };

	return(
		<div style={form_div_style}>
            {inputContent}
            <div style={form_btn_cont_style} >
                <button
                    style={{
                        display: 'inline-block',
                        width: '70%',
                        height: '100%',
                        backgroundColor: dateItem.buttonSet.background_color,
                        border: dateItem.buttonSet.border,
                        borderRadius: dateItem.buttonSet.border_radius+'px',
                        color: dateItem.buttonSet.font_color,
                        backgroundImage: 'url('+dateItem.buttonSet.background_img+')',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        fontSize: dateItem.buttonSet.font_size,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: dateItem.buttonSet.border_color,
                    }}
                    onClick={renderType == '4' ? handleFormBtnClick : null}
                >
                    {dateItem.buttonSet.btn_text}
                </button>
            </div>
        </div>
    );
}

export default createForm()(FormRender);
