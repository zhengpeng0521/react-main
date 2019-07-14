import React from 'react';
import { connect } from 'dva';
import { message , Modal , Form , Input , Select , Button } from 'antd';
import styles from './MainPage.less';
import commonStyles from './Common.less';

import MainMenu from '../../pages/main-menu/MainMenu';
import ChangePwd from './ChangePwd';
import Header from './Header';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

function MainPage({
    dispatch,
    location,
    children,
    mainMenu,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    }
}) {

    function dp(path,obj){
        dispatch({
            type : path ,
            payload : obj
        })
    }


    let {
        menuOneLight,       //判断菜单项1是否高亮
        menuTwoLight,       //判断菜单项2是否高亮
        menuThreeLight,     //判断菜单项4是否高亮
        modalVisible,
        answer,
        modalQuestionVisible,
        questionArray,
        chooseQuestionIndex ,   //当前选择问题的index
        showTip,
        changePwdModalVisible,
        changePwdModalLoading
    } = mainMenu;

    let question = [];          //问题数组
    if(questionArray && questionArray.length > 0){
        question = questionArray.map((item,index) => {
            return(
                <Option key={index}>{item.name}</Option>
            );
        });
    }
    //console.info('questionArray',questionArray)


    function checkOne(){
        dispatch({
            type:'mainMenu/querySuccess',
            payload:{
                menuOneLight : true
            }
        });
        dispatch({
            type: 'mainMenu/subMenuOpenChange',
            payload: {
                openKeys : ["organ_sub"]
            }
        });
    }

    function unCheckOne(){
        dispatch({
            type:'mainMenu/querySuccess',
            payload:{
                menuOneLight : false,
            }
        });
        dispatch({
            type: 'mainMenu/subMenuOpenChange',
            payload: {
                openKeys : []
            }
        });
    }

    function checkTwo(){
        dispatch({
            type:'mainMenu/querySuccess',
            payload:{
                menuTwoLight : true,
            }
        });
        dispatch({
            type: 'mainMenu/subMenuOpenChange',
            payload: {
                openKeys : ["saas_package"]
            }
        });
    }

    function unCheckTwo(){
        dispatch({
            type:'mainMenu/querySuccess',
            payload:{
                menuTwoLight : false,
            }
        });
        dispatch({
            type: 'mainMenu/subMenuOpenChange',
            payload: {
                openKeys : []
            }
        });
    }

    function checkThree(){
        dispatch({
            type:'mainMenu/querySuccess',
            payload:{
                menuThreeLight : true,
            }
        });
        dispatch({
            type: 'mainMenu/subMenuOpenChange',
            payload: {
                openKeys : ["saas_package"]
            }
        });
    }

    function unCheckThree(){
        dispatch({
            type:'mainMenu/querySuccess',
            payload:{
                menuThreeLight : false,
            }
        });
        dispatch({
            type: 'mainMenu/subMenuOpenChange',
            payload: {
                openKeys : []
            }
        });
    }

    function handleComplete(e){
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            let answer = (values.answer).replace(/(^\s*)|(\s*$)/g, "");
            let pass = false;
            let standardAns = questionArray[chooseQuestionIndex].answer;
            for(let i in standardAns){
                if(answer == standardAns[i]){
                    message.success('回答正确');
                    pass = true;
                    break;
                }
            }
            if(!pass){
                message.error('回答错误');
                return;
            }
            dispatch({
                type:'mainMenu/updateState',
                payload:{
                    modalQuestionVisible : !pass                //回答正确则关闭modal
                }
            });
        });
    }

    function questionSelectChange(value){
        dispatch({
            type:'mainMenu/updateState',
            payload:{
                showTip : false,
                chooseQuestionIndex : value
            }
        });
    }

    //点击提示
    function openTips(){
        dispatch({
            type:'mainMenu/updateState',
            payload:{
                showTip : true,
            }
        });
    }


    //模态框的属性
    let modalOpts = {
        title: '回答问题进入系统',
        maskClosable : false,
        visible : modalQuestionVisible,
        closable : true,
        width : 550,
        onOk: handleComplete,
        footer : [
            <Button key="submit" type="primary" size="large" onClick={handleComplete}>确定</Button>
        ],
    };

    let HeaderProps = {
        dp,
        location,
    }

    let ChangePwdProps = {
        dp,
        changePwdModalVisible,      //修改密码表单是否显示
        changePwdModalLoading       //修改密码加载状态
    }

    return (
        <div className={styles.main_page}>
        <ChangePwd {...ChangePwdProps}/>
        <div className={styles.top_container}>
            <Header {...HeaderProps}/>
        </div>
        <div className={styles.main_center}>
            { modalVisible == true ?
                <div style={{width:'100%',zIndex:9999}} className={styles.outer_content}>
                    <div className={styles.circle_one}></div>
                    <div className={styles.circle_two}></div>
                    <div className={styles.circle_three}></div>
                    <div className={styles.all_content}>
                        更新内容
                    </div>
                    <div className={styles.content_one} onMouseMove={() => checkOne()} onMouseOut={() => unCheckOne()}>
                        '机构业务'中'租户信息'菜单
                        <div className={styles.content_detail}>
                            1.&nbsp;&nbsp;租户信息表中可以在租户中新增总部机构。<br/><br/>
                            （具体菜单项见左侧<span style={{color:'#ff0000',fontWeight:'700'}}>标红</span>）
                        </div>
                    </div>
                    <div className={styles.content_two} onMouseMove={() => checkTwo()} onMouseOut={() => unCheckTwo()}>
                        'SAAS管理'菜单
                        <div className={styles.content_detail}>
                            1.&nbsp;&nbsp;SAAS套餐管理&nbsp;&nbsp;可以设置总部套餐和给总部结构分配套餐。<br/>
                            2.&nbsp;&nbsp;品牌管理&nbsp;&nbsp;转为总部系统用户品牌申请处理。<br/>
                            3.&nbsp;&nbsp;总部套餐分配&nbsp;&nbsp;为了使总部系统可以给其分布系统分配套餐。<br/><br/>
                            （具体菜单项见左侧<span style={{color:'#ff0000',fontWeight:'700'}}>标红</span>）
                        </div>
                    </div>
                    {/*<div className={styles.content_three} onMouseMove={() => checkThree()} onMouseOut={() => unCheckThree()}>
                        'SAAS管理'中'品牌管理'
                        <div className={styles.content_detail}>
                            1.&nbsp;&nbsp;转为总部系统用户品牌申请处理。<br/><br/>
                            （具体菜单项见左侧<span style={{color:'#ff0000',fontWeight:'700'}}>标红</span>）
                        </div>
                    </div>*/}
                </div>
                :
                null
            }
            <div className={styles.main_left}>
                <MainMenu location={location} />
            </div>
            <div className={styles.main_right}>
                <div className={styles.main_container}>
                   <div className={styles.page_content}>
                        {children}
                    </div>
                </div>
            </div>
            <div className={styles.mainTitle}>
                <Modal {...modalOpts}>
                    <Form>
                        <div style={{position:'relative'}}>
                            <FormItem
                                label="问题（可选）"
                                help={<span style={{color:'#ff0000'}}>可选择一项作答，答对即可（可点击提示）</span>}
                                {...formItemLayout}
                                >
                                    {getFieldDecorator('question', {
                                        initialValue : questionArray[0].name + '',
                                    })(
                                        <Select style={{width:'280px'}} onChange={questionSelectChange}>
                                            { question || [] }
                                        </Select>
                                    )}
                            </FormItem>
                            <div style={{position:'absolute',top:'9%',right:'3.2%',height:'20px',width:'150px',color:'#ff0000',cursor:'pointer',textAlign:'center',fontSize:'14px'}} onClick={openTips}>
                                {
                                  showTip ? questionArray[chooseQuestionIndex].tips : <span style={{color:'#5d9cec'}}>提示</span>
                                }

                            </div>
                        </div>
                        <FormItem
                            label="答案"
                            {...formItemLayout}
                            >
                                {getFieldDecorator('answer', {
                                    rules: [
                                        { required: true, message: '请输入答案' },
                                    ],
                                })(
                                    <Input
                                        placeholder='请输入答案'
                                        style={{width:'280px'}}
                                        onPressEnter={handleComplete}
                                        />
                                )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </div>
    </div>
  );
}
function mapStateToProps({ mainMenu }) {
    return { mainMenu };
}

let results = Form.create()(MainPage);
export default connect(mapStateToProps)(results);

