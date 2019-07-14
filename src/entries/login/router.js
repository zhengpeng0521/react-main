import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import LoginPage from '../../pages/login/LoginPage';

/* eslint react/prop-types:0 */
export default function ({ history }) {
    return (
        <Router history={history}>
            <Route path="/*" component={LoginPage} />
        </Router>
    );
}
