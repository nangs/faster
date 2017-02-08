import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import { App } from './components/App';
import { NotFound } from './components/NotFound';
import { Login, SignUp, RequestPasswordReset, ResetPassword } from './components/Auth';
import { Round } from './components/Round';
import { History } from './components/History';

const routes = (
    <Route history={browserHistory} path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={RequestPasswordReset} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/round" component={Round} />
        <Route path="/history" component={History} />
        <Route path={'*'} component={NotFound} status={404} />
    </Route>
);

export default routes;