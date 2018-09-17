import { toastr } from 'react-redux-toastr'
import API from '../services/api';
import { saveAuthToken, deleteAuthToken, saveState } from '../services/localStorage';
import history from '../history';

const setIsFetching = isFetching => ({
  type: 'SET_IS_FETCHING',
  isFetching,
});

const setNewUser = user => ({
  type: 'SET_NEW_USER',
  user,
});

const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  user,
});

const setAuthToken = token => ({
  type: 'SET_AUTH_TOKEN',
  token,
});

const getCurrentUser = () =>
  async dispatch => {
    try {
      const user = await API.getUser('me');
      dispatch(setCurrentUser(user));
    } catch (err) {
      console.error('Unable to get current user', err);
    }
  }

const signUp = formData =>
  async dispatch => {
    try {
      dispatch(setIsFetching(true));
      await API.signUp(formData);
      history.push('/login');
      toastr.success('Success', 'Your account has been created');
    } catch (err) {
      toastr.error('Error', 'Unable to complete the signup');
    }
  };

const logout = () =>
  async dispatch => {
    dispatch(setCurrentUser(null));
    saveState({ auth: null });
    deleteAuthToken();
    history.push('/login');
  };

const login = formData =>
  async dispatch => {
    try {
      dispatch(setIsFetching(true));
      const res = await API.login(formData);
      if (res.token) {
        dispatch(setAuthToken(res.token));
        saveAuthToken(res.token);
        dispatch(getCurrentUser());
        history.push('/dashboard');
      } else {
        toastr.error('Error', 'Unable to login. Please check your username and password.');
      }
    } catch (err) {
      toastr.error('Error', 'Unable to login. Please check your username and password.');
    }
  };

export {
  signUp,
  login,
  logout,
};
