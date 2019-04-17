import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Authenticate from '../auth/Authenticate';
import Account from '../components/Account';
import { deleteUser, updateUser } from '../actions';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

const Profile = props => {
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const id = localStorage.getItem('id');
  const username = localStorage.getItem('username');

  const useDelete = () => {
    axios
      .post('auth/login', { username, password })
      .then(res => (props.deleteUser(id), props.history.push('/')))
      .catch(err => message.error('Please check your password and try again'));
  };

  const useUpdate = () => {
    const newUser = {
      username,
      newUsername,
      password
    };
    if (newUsername && password) {
      props.updateUser(id, newUser);
      setNewUsername('');
      setPassword('');
    } else {
      message.error('Please fill in both fields');
    }
  };

  return (
    <Account
      newUsername={newUsername}
      setNewUsername={setNewUsername}
      password={password}
      setPassword={setPassword}
      useUpdate={useUpdate}
      useDelete={useDelete}
    />
  );
};

const mapStateToProps = ({ updateUserReducer }) => {
  return {
    message: updateUserReducer.message
  };
};
export default Authenticate(
  withRouter(
    connect(
      mapStateToProps,
      { deleteUser, updateUser }
    )(Profile)
  )
);
