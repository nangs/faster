import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import { App } from './components/App';
import { NotFound } from './components/NotFound';
import { Login, SignUp, RequestPasswordReset, ResetPassword } from './components/Auth';
import { History } from './components/History';

import { Practice } from './components/Practice';
//import { Round } from './components/Round';
//import { LanguageSelection } from './components/LanguageSelection';

const routes = (
    <Route history={browserHistory} path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={RequestPasswordReset} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/language-selection" component={Practice} />
        <Route path="/round" component={Practice} />
        <Route path="/history" component={History} />
        <Route path={'*'} component={NotFound} status={404} />
    </Route>
);

export default routes;