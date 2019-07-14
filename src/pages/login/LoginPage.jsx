import React from 'react';
import { connect } from 'dva';
import LoginPageComponent from '../../components/login/LoginPageComponent';

function LoginPage({dispatch, loginModel}) {

    let {loading} = loginModel;

    function handleOnLoginAction(values) {
        dispatch({
            type: 'loginModel/loginAction',
            payload: values
        });
    }

    let componProps = {
        loading, handleOnLoginAction
    };

    return (
        <LoginPageComponent {...componProps} />
    );
}

function mapStateToProps({loginModel}) {
    return {loginModel};
}

export default connect(mapStateToProps)(LoginPage);
