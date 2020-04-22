import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, user, ...rest }) {
    const { token } = user;
    return <Route {...rest} render={props => token ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
}

export default connect(({user}) => ({
    user,
}), {})(PrivateRoute);