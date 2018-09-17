import * as R from 'ramda';

const initialState = {
  error: false,
  forgotPasswordStep: 1,
  authToken: null,
  isFetching: false,
  currentUser: null,
};

const auth = (s = initialState, action) => {
  switch (action.type) {
    case 'SET_NEW_USER':
      return R.assoc('currentUser', action.user, s);
    case 'SET_CURRENT_USER':
      return R.assoc('currentUser', action.user, s);
    case 'SET_AUTH_TOKEN':
      return R.assoc('authToken', action.token, s);
    case 'CHANGE_FORGOT_PASSWORD_STEP':
      return R.assoc('forgotPasswordStep', action.step, s);
    // case 'SUBMIT_FORGOT_PASSWORD':
    //   return R.assoc('forgotPasswordStep', 2, s);
    // case 'RESET_FORGOT_PASSWORD':
    //   return R.assoc('forgotPasswordStep', 1, s);
    default:
      return s;
  }
}

export default auth;
