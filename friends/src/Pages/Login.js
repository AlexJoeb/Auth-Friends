import React from 'react';

import { connect } from 'react-redux';
import { login } from '../Redux/Actions';

import { Redirect } from 'react-router-dom';

function Login({ login, user }) {
    return !user.token ? (
        <div className='login'>
            <button className='login--btn' onClick={() => login('Lambda School', 'i<3Lambd4')}>Login</button>
        </div>
    ) : <Redirect to='/dashboard' />
}

export default connect(({ user }) => ({ user }), {
    login
})(Login);