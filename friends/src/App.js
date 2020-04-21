import React, {useEffect} from 'react';
import { fetchFriends, login } from './Redux/Actions';
import { connect } from 'react-redux';

function App({ user, fetchFriends, login }) {
  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <div className="app">
      <button onClick={() => {
        login('Lambda School', 'i<3Lambd4');
      }}>Test Fetch Friends</button>
    </div>
  );
}

export default connect(({ user }) => ({
  user
}), {
  fetchFriends,
  login
})(App);
