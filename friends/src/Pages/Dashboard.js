import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { logout, fetchFriends, addFriend } from '../Redux/Actions';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            email: '',
            error: '',
        }
    }

    componentWillMount() {
        this.props.fetchFriends();
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    handleSubmit = e => {
        e.preventDefault();

        const { name, age, email } = this.state;

        this.props.addFriend(name, age, email);
    }

    render() {
        const { user, logout, friends, history } = this.props;
        const { name, age, email, error } = this.state;
        return (
            <div className='dashboard'>
                <div className='dashboard__header'>
                    <h1>{user.username}</h1>
                    <button className='dashboard__header--btn' onClick={() => {
                        logout();
                        history.push('/login');
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                    }}>Logout</button>
                </div>
                {error && <h1>{error}</h1>}
                <form className='dashboard__form' onSubmit={this.handleSubmit}>
                    <input type='text' value={name} onChange={this.handleChange} name='name' placeholder="Friends Name" />
                    <input type='text' value={age} onChange={this.handleChange} name='age' placeholder="Friends Age" />
                    <input type='text' value={email} onChange={this.handleChange} name='email' placeholder="Friends Email" />
                    <input type='submit' value='Add Friend' />
                </form>
                <FriendList friends={friends} />
            </div>
        )
    }
}

const FriendList = ({ friends }) => {
    return (<ul className='dashboard__friends'>
        {friends && friends.map((friend, index) => (
            <li className='dashboard__friends__friend' key={index}>
                <ul className='dashboard__friends__friend__info'>
                    <li className='dashboard__friends__friend__info--name'>{friend.name}</li>
                    <li className='dashboard__friends__friend__info--age'>{friend.age} years old</li>
                    <li className='dashboard__friends__friend__info--email'>{friend.email}</li>
                </ul>
            </li>
        ))}
    </ul>)
}

export default connect(({
    user,
    friends
}) => ({
    user,
    friends,
}), {
        logout,
        fetchFriends,
        addFriend
    })(Dashboard);