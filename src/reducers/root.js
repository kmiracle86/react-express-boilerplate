import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer as form } from 'redux-form';
import auth from './auth';

const root = combineReducers({
  toastr,
  form,
  auth,
});

export default root;
