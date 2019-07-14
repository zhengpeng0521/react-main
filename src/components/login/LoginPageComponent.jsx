import React from 'react';
import styles from './LoginPageComponent.less';
import {Input,Icon, Form, Button} from 'antd';
import TweenOne from 'rc-tween-one';

const FormItem = Form.Item;

function LoginPageComponent ({
    loading, handleOnLoginAction,
    form: {
        getFieldDecorator,
        getFieldValue,
        setFieldsValue,
        validateFields,
        resetFields,
        setFields,
        getFieldError,
        validateFieldsAndScroll,
    }

}) {

    function handleOnSubmit() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            handleOnLoginAction && handleOnLoginAction(values);
        });
    }

    let formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    let info_input_style = {
        width: '100%',
    };

    let p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
    let p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
    let ease0 = TweenOne.easing.path(p0);
    let ease1 = TweenOne.easing.path(p1);

    let logo_animation = [
        {
            repeatDelay: 500,
            y: -70,
            repeat: -1,
            yoyo: true,
            ease: ease0,
            duration: 1000
        },
        {
            repeatDelay: 500,
            appearTo: 0,
            scaleX: 0,
            scaleY: 2,
            repeat: -1,
            yoyo: true,
            ease: ease1,
            duration: 1000,
        }
    ];

    return  (
        <div className={styles.manager_login_page}>
            <div className={styles.login_form_cont}>
                <div className={styles.login_form_content}>
                    <TweenOne
                        animation={logo_animation}
                        paused={false}
                        className={styles.logo_anim}
                        style={{
                            position: 'absolute',
                            transformOrigin: 'center bottom',
                          }}
                    >
                        <div className={styles.login_logo}>
                            <img src="http://img.ishanshan.com/gimg/img/193dc794235cf1187b9682c7f7eeb564"/>
                        </div>
                    </TweenOne>
                    <div style={{height: '120px'}}></div>
                    <FormItem className = { styles.form_item }>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请问你是谁!', whitespace: true }],
                        })(
                            <Input
                                disabled={loading}
                                placeholder="请输入用户名"
                                style={info_input_style}
                                size='default'
                            />
                        )}
                    </FormItem>
                    <FormItem className = { styles.form_item }>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: '别忘了密码啊!', whitespace: true }],
                        })(
                            <Input
                                disabled={loading}
                                type="password"
                                placeholder="请输入密码"
                                style={info_input_style}
                                size='default'
                                onPressEnter={handleOnSubmit}
                            />
                        )}
                    </FormItem>
                    <Button type="primary" className={styles.form_item} loading={loading} onClick={handleOnSubmit}>登录</Button>
                </div>
            </div>
        </div>
    )
}

export default Form.create({})(LoginPageComponent);
