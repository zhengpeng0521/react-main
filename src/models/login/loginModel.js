import {message} from 'antd';
import { parse } from 'qs';
import {loginAction} from '../../services/loginService';

/**
 * 外包的运营后台 登陆页model
 */
export default {

    namespace: 'loginModel',

    state: {
        loading: false,
        userAccount: '',
        userPassword: '',
    },

    effects: {
        *'loginAction'({ payload }, { call, put, select }) {
            yield put({ type : 'updateState' , payload : { loading : true } });
            yield call(loginAction, parse(payload));
            yield put({ type : 'updateState' , payload : { loading : false } });
        },
    },

    reducers: {

        updateState(state, action) {
            return { ...state, ...action.payload };
        },

    },

};
