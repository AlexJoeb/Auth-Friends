import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/' render={props => <Redirect to='/login' />} />
          <Route path='/login' render={props => <Login />} />
          <PrivateRoute path='/dashboard' component={ Dashboard } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
