import {
    query,
    initMenuAccept,
    ChangePwd
} from '../services/mainMenu';
import { parse } from 'qs';
import {message} from 'antd';

export default {

    namespace: 'mainMenu',

    state: {
        list: [], //菜单数据
        current: '', //当前选中菜单项
        openKeys: [], //打开的一级菜单项
        menuOneLight:false,         //判断菜单项1是否高亮
        menuTwoLight:false,         //判断菜单项2是否高亮
        menuThreeLight:false,       //判断菜单项3是否高亮
        modalVisible : false,       //是否显示蒙层
        answer : '',
        modalQuestionVisible : false,
        questionArray : [{name:'本公司的产品经理花名（填写一个即可）',id:'ProductManager',tips:'和尚/皮卡丘',answer:['一休','小智']},
                         {name:'本公司设计人员花名（填写一个即可）',id:'Designer',tips:'NANA/保护森林',answer:['大崎娜娜','熊大']},
                         {name:'本公司技术主管花名',id:'CTO',tips:'博士/强壮',answer:['浩克']},
                         {name:'钧伟的外号或者花名（填写一个即可）',id:'ZJW',tips:'灰色/登徒子',answer:['小灰兔','流氓兔']},
                         {name:'本系统开发人员的花名（填写一个即可）',id:'ZJ',tips:'太刀',answer:['贽殿遮那']}],
        questionTip : [{id:'ProductManager',tips:'和尚/皮卡丘'},
                      {id:'Designer',tips:'NANA/保护森林'},
                      {id:'CTO',tips:'博士/强壮'},
                      {id:'ZJW',tips:'灰色/登徒子'},
                      {id:'ZJ',tips:'太刀'}],
        chooseQuestionIndex : undefined,       //当前选择问题的索引
        showTip : false,

        acceptAllMenus: false,//是否允许访问所有菜单
        accept_menu_role: [],//允许访问的菜单角色

        /*修改密码modal*/
        changePwdModalVisible : false,
        changePwdModalLoading : false,
    },

     subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                dispatch({
                    type:'MessQuestionArray',
                });

                if(!window._has_init_menu_accept) {
                    if(window.manager_platform == 'thinknode') {
                        dispatch({
                            type:'initMenuAccept',
                        });
                    } else {
                        dispatch({
                            type:'updateState',
                            payload: {
                                acceptAllMenus: true,
                            },
                        });
                        window._has_init_menu_accept = true;
                    }
                }

            });
        },
    },

    effects: {
        *'query'({ payload }, { call, put, select }) {
            const { data } = yield call(query, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        total: data.page.total,
                        current: data.page.current,
                    },
                });
            }
        },

        *'initMenuAccept'({ payload }, { call, put, select }) {
            window._has_init_menu_accept = true;
            let { ret } = yield call(initMenuAccept);
            if( ret && ret.errorCode == 9000 ){
                yield put({
                    type: 'updateState',
                    payload: {
                        accept_menu_role: ret.data.menu_role
                    }
                });
            } else {
                message.error((ret && ret.errorMessage) || '初始化菜单访问权限出错啦');
                return false;
            }

            yield put({
                type: 'updateState',
                payload: {
                    acceptAllMenus: false,
                },
            });
        },

        //点击修改密码
        *'ChangePwd'({ payload }, { call, put, select }){
            yield put({ type : 'updateState' , payload : { changePwdModalLoading : true } })
            let res = yield call(ChangePwd,parse(payload));
            if(!!res && res.ret && res.ret.errorCode === 9000){
                message.success('密码修改成功');
                window.location.href = `${BASE_URL}/login/out`;
            }else if(!!res && res.ret && res.ret.errorCode === 1000){
                message.error(res.ret.errorMessage || '密码修改失败');
            }else{
                message.error('密码修改失败');
            }
            yield put({ type : 'updateState' , payload : { changePwdModalLoading : false } })
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload }
        },

        updateState(state, action) {
            return { ...state, ...action.payload }
        },

        menuItemClick(state, action, history, location) {
            return { ...state, ...action.payload }
        },

        subMenuOpenChange(state, action) {
            return { ...state, ...action.payload }
        },
        MessQuestionArray(state, action) {
            let questionMessArray = state.questionArray.sort(function(){ return 0.7 - Math.random() });
            let questionTipsMessArray = [];
            for(let i in questionMessArray){
                questionMessArray[i].index = i;
            }
            return { ...state, questionArray : questionMessArray , chooseQuestionIndex : 0 };
        },
    },

};
